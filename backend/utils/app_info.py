import psutil
import os

def get_app_name(process_name):
  try:
    return os.path.splitext(process_name)[0]
  except:
    return process_name