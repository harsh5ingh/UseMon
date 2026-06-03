from flask import jsonify
from databases.db import cursor

def get_stats():

  cursor.execute("""
        SELECT SUM(duration)
        FROM usage
""")
    
  total_seconds = cursor.fetchone()[0] or 0

  return jsonify({
        "seconds": round(total_seconds)
    })