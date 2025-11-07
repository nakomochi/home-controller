import smbus2
import bme280
from python_tsl2591 import tsl2591
from typing import TypedDict

class BME280Data(TypedDict):
    temperature: float
    pressure: float
    humidity: float

class TSL2591Data(TypedDict):
    full: float
    ir: float
    lux: float

def read_bme280() -> BME280Data:
    bus_num = 1
    address = 0x76
    bus = smbus2.SMBus(bus_num)
    calibration_params = bme280.load_calibration_params(bus, address)
    data = bme280.sample(bus, address, calibration_params)
    return {
        "temperature": data.temperature,
        "pressure": data.pressure,
        "humidity": data.humidity,
    }

def read_tsl2591() -> TSL2591Data:
    sensor = tsl2591()
    full, ir = sensor.get_full_luminosity()
    lux = sensor.calculate_lux(full, ir)
    return {
        "full": full,
        "ir": ir,
        "lux": lux
    }

if __name__ == "__main__":
    try: 
        temp, pre, hum = read_bme280()
        print("BME280")
        print(f"Temperature: {temp:.2f} °C")
        print(f"Pressure:    {pre:.2f} hPa")
        print(f"Humidity:    {hum:.2f} %")
    except Exception as e:
        print("BME280 Error:", e)

    try:
        full, ir, lux = read_tsl2591()
        print("TSL2591")
        print(f"Full Spectrum: {full}")
        print(f"Infrared:      {ir}")
        print(f"Lux:           {lux:.2f}")
    except Exception as e:
        print("TSL2591 Error:", e)
