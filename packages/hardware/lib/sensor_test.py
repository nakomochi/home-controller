import time
import smbus2
import bme280
from python_tsl2591 import tsl2591

def test_bme280(bus_num: int = 1, address: int = 0x76):
    try:
        bus = smbus2.SMBus(bus_num)
        calibration_params = bme280.load_calibration_params(bus, address)
        data = bme280.sample(bus, address, calibration_params)
        print("BME280")
        print(f"Temperature: {data.temperature:.2f} °C")
        print(f"Pressure:    {data.pressure:.2f} hPa")
        print(f"Humidity:    {data.humidity:.2f} %")
    except Exception as e:
        print("BME280 Error:", e)


def test_tsl2591():
    try:
        sensor = tsl2591()
        full, ir = sensor.get_full_luminosity()
        lux = sensor.calculate_lux(full, ir)
        print("TSL2591")
        print(f"Full Spectrum: {full}")
        print(f"Infrared:       {ir}")
        print(f"Lux:            {lux:.2f}")
    except Exception as e:
        print("TSL2591 Error:", e)


if __name__ == "__main__":
    test_bme280()
    test_tsl2591()
