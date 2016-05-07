#subprocess.call(["sudo","python","AdafruitDHT.py"])
import subprocess
results = subprocess.check_output(["sudo","python","AdafruitDHT.py","11","4"])
print(results)
