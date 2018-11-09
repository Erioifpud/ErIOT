import paho.mqtt.client as mqtt
import time
from random import random


def on_connect(client, userdata, flags, rc):
    pass

client = mqtt.Client()
client.connect('localhost', 2994, 60)
client.on_connect = on_connect

while True:
    data = '{:.2f} {}'.format(random() * 10, int(round(time.time() * 1000)))
    print(data)
    client.publish(
        'pub/livingroom/test/e3e7e0d1749b42055cf0628067efe9caf7a4c5e7a7ad3615c320289fee436d64', 
        data)
    time.sleep(2)

client.loop_forever()