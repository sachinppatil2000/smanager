from time import sleep
import RPi.GPIO as GPIO
import serial
GPIO.setmode(GPIO.BCM)
GPIO.setup(4,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
vibrationstatus="false"
ser = serial.Serial(
	port='/dev/ttyAMA0',
	baudrate = 9600,
	parity=serial.PARITY_NONE,
	stopbits=serial.STOPBITS_ONE,
	bytesize=serial.EIGHTBITS,
	timeout=1
	)
def detectVibration(channel):
	if GPIO.input(4) :
#	        vibrationstatus = "true"	
                print ser.readline()
#	else :
#		print "no vibration"
#		vibrationstatus = "false"		
GPIO.add_event_detect(4,GPIO.RISING,callback=detectVibration)
def printvibration():
	print "{status:%s}" %vibrationstatus
        return;
try : 
	print ("starting the program")
	sleep(250)

finally :
	GPIO.cleanup()
