import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';



const HomePage = (props) => {


    return (
      <MeetupList meetups = {props.meetups}/> 
    )
  }
  export async function getStaticProps(context) {
      //fetch data from API

      const client = await MongoClient.connect('mongodb+srv://suhrobh1:1Jjm4v6Lb8zzkSlQ@cluster0.hzh7q.mongodb.net/meetups?retryWrites=true&w=majority');

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray();

        client.close();
      return {
          props:{
              meetups: meetups.map(meetup => ({
                  title: meetup.title,
                  address: meetup.address,
                  image: meetup.image,
                  id: meetup._id.toString()
              }))
          },
          revalidate: 10 
      };
  }

  export default HomePage;