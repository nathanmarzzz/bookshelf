import { MongoClient } from 'mongodb';

const url_local = 'mongodb://localhost:27017';

export const db_client = new MongoClient(url_local);
