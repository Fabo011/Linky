import requests
import time
from datetime import datetime

url = 'http://localhost:3000/healthcheck'

while True:
    current_time = datetime.now().time()
    if current_time >= time(6, 0, 0) and current_time <= time(20, 0, 0):
        response = requests.get(url)
        if response.status_code == 200:
            print('API is available')
        else:
            print('API is unavailable')
    time.sleep(180) # wait for 3 minutes before checking the time again
