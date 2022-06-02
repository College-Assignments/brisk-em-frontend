import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PRIVATE_MONGODB_URI!;
const MONGODB_DB = process.env.NEXT_PRIVATE_MONGODB_DB!;
export async function getMongo() {
  const mongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };

  const client = new MongoClient(MONGODB_URI, mongoClientOptions);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // Mongodb Collections
  const CAnswer = db.collection('answer');
  const CQuiz = db.collection('quiz');
  const CUsers = db.collection('users');

  return {
    client,
    db,
    // Export collections
    CAnswer,
    CQuiz,
    CUsers,
  };
}
