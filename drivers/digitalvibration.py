from time import sleep
from datetime import datetime
import RPi.GPIO as GPIO
import serial
GPIO.setmode(GPIO.BCM)
GPIO.setup(4,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
vibrationstatus="false"
def detectVibration(channel):
		print "{status:'on',currenttime:'%s'}" %datetime.strftime(datetime.now(),'%Y-%m-%d %H:%M:%S')
#	if GPIO.input(4) :
#                print "vibration is on" 
#	else :
#		print "no vibration"
GPIO.add_event_detect(4,GPIO.RISING,callback=detectVibration)
try : 
	print ("starting the program")
	sleep(250)

finally :
	GPIO.cleanup()
