import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

const mongoUri = process.env.NEXT_PUBLIC_MONGODB_URI!;

const client = new MongoClient(mongoUri, mongoClientOptions);

export function mongodbConnect() {
  client.connect((err) => {
    const collection = client.db('test').collection('devices');
    // perform actions on the collection object
    client.close();
  });
}
