import datetime
import json
import sqlite3 as sqlite
from time import sleep
import RPi.GPIO as GPIO
import serial

# get details from the config file
f=open("sensorconfig.json")
parse_conf=json.loads(f.read())
dbname = parse_conf["database"]
port = parse_conf["pin"]
#startofday = parse_conf["startofday"]
print(parse_conf)


# initialize the controller variables
GPIO.setmode(GPIO.BCM)
GPIO.setup(port,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
vibrationstatus = "false"

#function to get the operating interval at any point in time.

def getinterval(fortime):
	currtime = datetime.datetime.now()
	print "in getinterval"
	print fortime.minute
	if (fortime.minute <10) :
		startinterval= currtime.replace(minute=0)
	elif (fortime.minute < 20) :
		startinterval=currtime.replace(minute=10)
	elif (fortime.minute < 30) :
		startinterval=currtime.replace(minute=20)
	elif (fortime.minute<40) :
		startinterval=currtime.replace(minute=30)
	elif (fortime.minute<50) :
		startinterval=currtime.replace(minute=40)
	elif (fortime.minute>50) :
		startinterval=currtime.replace(minute=50)
	endinterval=startinterval + datetime.timedelta(minutes=10)

	interval=[startinterval,endinterval]

	return interval 

 
#initialize the variables
interval=getinterval(datetime.datetime.now())
print interval
global startinterval 
startinterval = interval[0]
global endinterval 
endinterval= interval[1]
global lastvibration 
lastvibration = startinterval
global worktime 
worktime = datetime.timedelta(minutes=0)

#callback function to process vibration
def detectVibration(channel):
	currenttime = datetime.datetime.now()
	sensorvalue  = 1
	global startinterval
	global endinterval
	global lastvibration
	global worktime
	interval  = getinterval(currenttime)
#create connnection to database
#	sqlite.register_adapter(datetime.datetime,adapt_datetime)
	conn = sqlite.connect(dbname)
	c=conn.cursor()
	c.execute("SELECT consolidated_work currenttime FROM timekeeper WHERE currenttime = (SELECT MAX(currenttime) FROM timekeeper)")
        print "consolidate work:"	
	print c.fetchone()
	data = c.fetchone()
        
# handling when threre are no entries in the database
	if (data is None):	
		consolidated_worktime=datetime.timedelta(minutes=0)
		lastconsolidated=datetime.timedelta(minutes = 0)
		lastvibration = currenttime
# at the change of the date reset the worked data
	if(currenttime.date()>lastvibration.date()) :
		data[0] = 0
		lastvibration = currenttime

# calcualte the worked time based on when the lastvibration occured 	
	if(data is not None): 
		lastconsolidated=data[0]
		lastvibration = data[1]
	elapsedtime = currenttime - lastvibration
	print "lastvibration on date"
        print lastvibration.date() 
	if(elapsedtime < datetime.timedelta(minutes = 1)) :
		worktime=worktime + elapsedtime
	if(currenttime>=endinterval) :
		consolidated_worktime = lastconsolidated + worktime
	t = [startinterval,endinterval,currenttime,worktime.seconds,consolidated_worktime.seconds,sensorvalue,"I"]
        print "current status:"	
	print t
	if currenttime >= endinterval:	
		c.execute("INSERT into timekeeper(start_interval,end_interval,currenttime,worked,consolidated_work,sensor_value,reconcilation_flag) values (?,?,?,?,?,?,?)",t)
		interval =getinterval(currenttime)	
		startinterval = interval[0]
		endinterval=interval[1]
	c.execute("SELECT count(*) FROM timekeeper")
	countofrows = c.fetchall()[0]
	print countofrows
	conn.commit()	
	conn.close() 

GPIO.add_event_detect(port,GPIO.RISING,callback=detectVibration)
try : 
	print("starting the program")
	sleep(25000000000)

finally :
	GPIO.cleanup()

