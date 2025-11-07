from fastapi import FastAPI
from typing import TypedDict
from lib.sensor import read_bme280, read_tsl2591, BME280Data, TSL2591Data

class SensorData(BME280Data, TSL2591Data):
    pass

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/sensors")
def read_sensors() -> SensorData:
    bme280_data = read_bme280()
    tsl2591_data = read_tsl2591()
    return {**bme280_data, **tsl2591_data}
