import {MongoClient} from "mongodb";

export interface Database {
  client: any;
} 
export const database = {
  client: null
} as Database;

export const connect = async() => {
  database.client = await MongoClient.connect('mongodb://127.0.0.1/video-games', { useUnifiedTopology: true });
}