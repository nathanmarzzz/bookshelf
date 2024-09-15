import { MongoClient } from "mongodb";


const url_local = 'mongodb://localhost:27017'

export const client = new MongoClient(url_local)

