import time
import json
from piir.io import receive
from piir.decode import decode
from piir.prettify import prettify
from piir.remote import Remote

RECEIVER_GPIO = 18
JSON_FILE = "light.json"
KEYS_TO_LEARN = ["all", "scene", "night", "off", "up", "down"]

keys = {}

print("Beginning infrared signal recording. Press a button on the remote...")

for key_name in KEYS_TO_LEARN:
    print(f"Press the button '{key_name}'")
    raw_data = receive(RECEIVER_GPIO)
    decoded_data = decode(raw_data)
    keys[key_name] = decoded_data
    print(f"{key_name} signal has been recorded")

with open(JSON_FILE, "w") as f:
    json.dump(prettify(keys), f, indent=2)

print(f"Record saved to {JSON_FILE}")
