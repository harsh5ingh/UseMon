from databases.db import cursor, conn

def save_usage(app_name, duration):

    cursor.execute(
        """
        INSERT INTO usage
        (app_name, duration)

        VALUES (?, ?)
        """,
        (app_name, duration)
    )

    conn.commit()