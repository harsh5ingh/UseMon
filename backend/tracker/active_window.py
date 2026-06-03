import win32gui
import win32process
import psutil


def get_active_window():
    window = win32gui.GetForegroundWindow()
    _, pid = win32process.GetWindowThreadProcessId(window)

    try:
        process = psutil.Process(pid)
        return process.name()
    except:
        return "Unknown"