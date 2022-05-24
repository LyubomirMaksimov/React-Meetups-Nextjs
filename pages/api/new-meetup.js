// api/new-meetup
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://Lubo:1234@cluster0.zw0h3.mongodb.net/?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
