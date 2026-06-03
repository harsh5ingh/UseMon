from tracker.active_window import get_active_window
from services.usage_service import save_usage

import time

app_usage = {}

def track_usage():

    global app_usage

    current_app = get_active_window()
    start_time = time.time()

    while True:

        time.sleep(1)

        new_app = get_active_window()

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