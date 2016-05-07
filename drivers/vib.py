import subprocess
results = subprocess.check_output(["sudo","python","gpiovibration.py"])
print(results)
