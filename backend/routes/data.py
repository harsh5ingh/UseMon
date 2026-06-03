from flask import jsonify
from databases.db import cursor

def get_data():

    cursor.execute("""
        SELECT app_name,
               SUM(duration)
        FROM usage
        GROUP BY app_name
    """)

    rows = cursor.fetchall()

    result = {}

    for app, duration in rows:
        result[app] = duration

    return jsonify(result)