from time import sleep
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(4,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
def detectVibration(channel):
	if GPIO.input(4) :
		print (" Event of motion ")

GPIO.add_event_detect(4,GPIO.RISING,callback=detectVibration)
#while True:
#	result=GPIO.input(4)
#	if result==1:
#		print("vibrated")

try : 
	print ("starting the program")
	sleep(250)

finally :
	GPIO.cleanup()
