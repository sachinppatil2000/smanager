import sqlite3
conn = sqlite3.connect("vibrationsense.db")
c=conn.cursor()
conn.close()
