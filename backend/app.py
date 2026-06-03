from flask import Flask
import threading
from flask_cors import CORS
from routes.stats import get_stats
from routes.data import get_data
from tracker.usage_tracker import track_usage

app = Flask(__name__)

CORS(app)

from routes.screen_time import get_screen_time

app.add_url_rule(
  "/screen-time",
  "screen_time",
  get_screen_time
)

app.add_url_rule(
  "/stats",
  "stats",
  get_stats
)

app.add_url_rule(
  "/data",
  "data",
  get_data
)

if __name__ == "__main__":
  
  threading.Thread(
    target=track_usage,
    daemon=True
  ).start()

  app.run()