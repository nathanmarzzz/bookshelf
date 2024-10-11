import configparser
import os
from pymongo import MongoClient


config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))

client = MongoClient('localhost', 27017)

def get_db_local():
    return client.local