import time
import json
from piir.io import receive
from piir.decode import decode
from piir.prettify import prettify
from piir.remote import Remote

RECEIVER_GPIO = 18
JSON_FILE = "store/aircon1.json"
KEYS_TO_LEARN = ["1", "2", "3"]

keys = {}

print("Beginning infrared signal recording. Press a button on the remote...")

for key_name in KEYS_TO_LEARN:
    print(f"Press the button '{key_name}'")
    raw_data = receive(RECEIVER_GPIO)
    decoded_data = decode(raw_data)
    if decoded_data is None:
        print(f"⚠️ '{key_name}' の信号を decode できませんでした（raw データは保存されます）")
    else:
        print(f"✅ '{key_name}' decoded successfully")
    keys[key_name] = decoded_data
    print(f"{key_name} signal has been recorded")

with open(JSON_FILE, "w") as f:
    json.dump(prettify(keys), f, indent=2)

print(f"Record saved to {JSON_FILE}")
