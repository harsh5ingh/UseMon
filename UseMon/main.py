import win32gui
import win32process
import psutil
import time

def format_time(seconds):
    minutes = int(seconds // 60)
    remaining_seconds = int(seconds % 60)

    if minutes == 0:
        return f"{remaining_seconds} sec"
    return f"{minutes} min {remaining_seconds} sec"

def get_active_window():
    window = win32gui.GetForegroundWindow()
    _, pid = win32process.GetWindowThreadProcessId(window)
    
    try:
        process = psutil.Process(pid)
        return process.name()
    except:
        return "Unknown"

current_app = get_active_window()
start_time = time.time()

try:
 while True:
    time.sleep(1)
    new_app = get_active_window()

    if new_app != current_app:
        end_time = time.time()
        duration = end_time - start_time

        print(f"{current_app} used for {format_time(duration)}")

        current_app = new_app
        start_time = time.time()

except KeyboardInterrupt:
  print("\nTracking Stopped")
