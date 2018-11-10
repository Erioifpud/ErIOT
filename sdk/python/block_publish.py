from eriot import Client
from random import random
import time


def onConnect(client, userdata, flags, rc):
    print("connected")


callbacks = {
    'connect': onConnect
}
client = Client(place='livingroom', device='test', callbackMap=callbacks)
client.start()

while True:
    msg = '{:.2f}'.format(random() * 10)
    client.publish(msg)
    time.sleep(2)
