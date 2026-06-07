from tracker.active_window import get_active_window
from services.usage_service import save_usage

import time

app_usage = {}

def track_usage():

    global app_usage

    current_window = get_active_window()
    current_app = current_window["process"]
    start_time = time.time()

    while True:

        time.sleep(1)

        new_window = get_active_window()
        new_app = new_window["process"]

        if new_app != current_app:

            duration = time.time() - start_time

            app_usage[current_app] = (
                app_usage.get(current_app, 0)
                + duration
            )

            save_usage(
                current_app,
                duration
            )

            print(
                current_app,
                round(duration, 2)
            )

            current_app = new_app
            start_time = time.time()