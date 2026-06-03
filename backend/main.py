import win32gui
import win32api
import win32ui
import win32process
import psutil
import time
import threading
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

# -----------------------------
# Flask setup
# -----------------------------
app = Flask(__name__)
CORS(app)

#-------------------------------
# Database setup
#-------------------------------

conn = sqlite3.connect("usemon.db",
check_same_thread = False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS usage (
               id INTEGER  PRIMARY KEY AUTOINCREMENT,
               app_name TEXT,
               duration REAL,
               timestamp DATETIME DEFAULT
CURRENT_TIMESTAMP
)
""")

conn.commit()

# -----------------------------
# Global data (shared)
# -----------------------------
app_usage = {}

# -----------------------------
# Time formatter
# -----------------------------
def format_time(seconds):
    minutes = int(seconds // 60)
    remaining_seconds = int(seconds % 60)

    if minutes == 0:
        return f"{remaining_seconds} sec"
    return f"{minutes} min {remaining_seconds} sec"

def save_usage(app_name, duration):
    cursor.execute(
        "INSERT INTO usage (app_name, duration) VALUES(?, ?)",
        (app_name, duration)
    )
    conn.commit()

# -----------------------------
# Get active window
# -----------------------------
def get_active_window():
    window = win32gui.GetForegroundWindow()
    _, pid = win32process.GetWindowThreadProcessId(window)

    try:
        process = psutil.Process(pid)
        return process.name()
    except:
        return "Unknown"

# -----------------------------
# Tracking function (background)
# -----------------------------
def track_usage():
    global app_usage

    current_app = get_active_window()
    start_time = time.time()

    while True:
        time.sleep(1)
        new_app = get_active_window()

        if new_app != current_app:
            end_time = time.time()
            duration = end_time - start_time

            # store data
            app_usage[current_app] = app_usage.get(current_app, 0) + duration
            save_usage(current_app, duration)

            print(f"{current_app} used for {format_time(duration)}")

            current_app = new_app
            start_time = time.time()

# -----------------------------
# Flask routes
# -----------------------------
@app.route("/")
def home():
    return "UseMon API running 🚀"

@app.route("/data")
def data():
    return jsonify(app_usage)

@app.route("/stats")
def stats():

    cursor.execute("""
    SELECT app_name,
      ROUND(SUM(duration),2)
    FROM usage
    GROUP BY app_name
    ORDER BY SUM(duration) DESC
""")
    
    rows = cursor.fetchall()

    result = []

    for row in rows:
        result.append({
            "app":row[0],
            "seconds":row[1]
        })

    return jsonify(result)

@app.route("/screen-time")
def scree_time():

    cursor.execute("""
        SELECT SUM(duration)
        FROM usage
""")
    
    total = cursor.fetchone()[0] or 0

    return jsonify({
        "seconds": round(total, 2)
    })


# -----------------------------
# Start everything
# -----------------------------
if __name__ == "__main__":
    # run tracking in background
    threading.Thread(target=track_usage, daemon=True).start()

    # run flask
    app.run(debug=False)