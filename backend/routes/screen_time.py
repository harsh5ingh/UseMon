from flask import jsonify
from databases.db import cursor

def get_screen_time():

    cursor.execute("""
        SELECT SUM(duration)
        FROM usage
""")
    
    total = cursor.fetchone()[0] or 0

    return jsonify({
        "seconds": round(total, 2)
    })