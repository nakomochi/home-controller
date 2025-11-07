import time
import json
from piir.io import receive
from piir.decode import decode
from piir.prettify import prettify
from piir.remote import Remote

SENDER_GPIO = 17
JSON_FILE = "store/light.json"
KEYS = ["all", "scene", "night", "off", "up", "down"]

remote = Remote(JSON_FILE, SENDER_GPIO)

for key_name in KEYS:
    print(f"Send {key_name}")
    remote.send(key_name)
    time.sleep(1)
