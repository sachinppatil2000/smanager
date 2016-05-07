import wiringpi2 as wiringpi
from time import sleep
wiringpi.wiringPiSetupGpio()
wiringpi.pinMode(4,0)

try:
	while True:
		if wiringpi.digitalRead(7):
			print "Printing the vibration" + str( wiringpi.analogRead(4))
		sleep(0.5)

finally:
               print " end of the program"
	
