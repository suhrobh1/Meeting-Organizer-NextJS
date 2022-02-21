import { Fragment } from "react/cjs/react.production.min";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <MeetupDetail //Importing it from components folder. Reason for doing this is to keep things clean.
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://suhrobh1:1Jjm4v6Lb8zzkSlQ@cluster0.hzh7q.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  //fetch data from API for single meeting

  const meetupId = context.params.meetupId; //we are getting the meetupId from parents key values encoded in the URL

  const client = await MongoClient.connect(
    "mongodb+srv://suhrobh1:1Jjm4v6Lb8zzkSlQ@cluster0.hzh7q.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const targetMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  }); //findOne based on id of the meeting
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        //this what we get from API
        id: targetMeetup._id.toString(),
        title: targetMeetup.title,
        address: targetMeetup.address,
        image: targetMeetup.image,
        description: targetMeetup.description,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;
