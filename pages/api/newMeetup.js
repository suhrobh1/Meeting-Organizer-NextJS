// api/new-meetup
import {MongoClient} from 'mongodb';


 async function handler(req, res) {
  if (req.method === "POST") {
    //checking whther the request is POST
    const data = req.body; // creating a variable that will hold req.body

    //const { title, image, address, description } = data; //destructuring to get the items from data.

   const client = await MongoClient.connect('mongodb+srv://suhrobh1:1Jjm4v6Lb8zzkSlQ@cluster0.hzh7q.mongodb.net/meetups?retryWrites=true&w=majority');

   const db = client.db();
   const meetupsCollection = db.collection('meetups');
   const result = await meetupsCollection.insertOne(data);// we could possibly get and auto genenrated ID back form DB
   console.log("Message from API newMeetup",result);
   client.close();
   res.status(201).json({message: "Meeting Added Success!"});
  }

}

export default handler;
