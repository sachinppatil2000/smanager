import datetime
import json
import os
import sqlite3 as sqlite
from time import sleep
from json import dumps

# get details from the config file
os.chdir("/home/pi/Accumulator/drivers/pushsense/vibration")

#print os.getcwd()

f=open("sensorconfig.json")
parse_conf=json.loads(f.read())
dbname = parse_conf["database"]
port = parse_conf["pin"]
message = parse_conf["message"]
#print(parse_conf)

def json_serial(obj):
    if isinstance(obj, datetime.datetime):
	serial = obj.isoformat()
	return serial 
    raise TypeError("Type not serializable")

def getlatestdata():
#create connnection to database
	conn = sqlite.connect(dbname,detect_types=sqlite.PARSE_DECLTYPES)
	c=conn.cursor()
	c.execute("SELECT * FROM timekeeper WHERE currenttime = (SELECT MAX(currenttime) FROM timekeeper)")
#        print "consolidate work:"	
#	print c.fetchone()
	data = c.fetchone()
	message["startinterval"]=data[0]
	message["endinterval"]=data[1]
	message["currenttime"]=data[2]
	message["workdone"]=data[3]
	message["consolidatedwork"]=data[4]
	#	if(
#	print datetime.datetime.strptime(data[2],'%Y-%m-%dT%H:%M:%S.%fZ')-datetime.datetime.now()
	timepostlastvib = (datetime.datetime.now()-data[2]).total_seconds()/60
#	print timepostlastvib
	if timepostlastvib > 20  :
			message["status"]="off"
	else :
			message["status"]="on" 
#	print "message:"
#	print message
	jsondata = json.dumps(message,default=json_serial)       	 
	c.execute("SELECT count(*) FROM timekeeper")
	countofrows = c.fetchall()[0]
#	print countofrows
	conn.commit()	
	conn.close() 
        return jsondata	
print getlatestdata()
