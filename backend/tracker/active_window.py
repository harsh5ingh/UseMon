import win32gui
import win32process
import psutil

def get_active_window():

    hwnd = win32gui.GetForegroundWindow()

    if not hwnd:
        return "Unknown"

    _, pid = win32process.GetWindowThreadProcessId(hwnd)

    try:
        process = psutil.Process(pid)

        return {
            "process": process.name(),
            "title": win32gui.GetWindowText(hwnd)
        }

    except:
        return {
            "process": "Unknown",
            "title": ""
        }