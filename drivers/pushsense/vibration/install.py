import json
import datetime
import sqlite3 as sqlite
f=open("sensorconfig.json")
conf_s = f.read()
parse_conf=json.loads(conf_s)
dbname=parse_conf["database"]
# sqlite.register_adapter(datetime.datetime,adapt_datetime)
conn = sqlite.connect(dbname)
print "creating database " + dbname
c=conn.cursor()
c.execute("CREATE TABLE timekeeper(start_interval timestamp,end_interval timestamp,currenttime timestamp,worked int,consolidated_work int,sensor_value int,reconcilation_flag text)")
conn.close()
			
