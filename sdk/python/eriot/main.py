import paho.mqtt.client as mqtt
import time
from machine_id import machineId


class Client:
    def __init__(self, place, device, server='localhost', port=2994, callbackMap={}):
        self.place = place
        self.device = device
        self.__connect(server, port)
        self.__initCallbacks(callbackMap)

    def __connect(self, server, port):
        self.server = server
        self.port = port
        self.client = mqtt.Client()
        self.client.connect(self.server, self.port, 60)

    def __initCallbacks(self, cbMap):
        for k, v in cbMap.items():
            setattr(self.client, 'on_{}'.format(k), v)

    def __topic(self):
        return '{place}/{device}/{client}'.format(**{
            'place': self.place,
            'device': self.device,
            'client': machineId(False)
        })

    def subscribe(self):
        self.client.subscribe(self.__topic())

    def publish(self, msg):
        self.client.publish(self.__topic(), msg)

    def ready(self):
        self.client.loop_forever()

    def start(self):
        self.client.loop_start()

    def stop(self):
        self.client.loop_stop()
