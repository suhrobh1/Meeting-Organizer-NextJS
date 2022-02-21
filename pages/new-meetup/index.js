import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {

   const router = useRouter();

  async function addMeetupHandler(enteredMeetupData){

    const response = await fetch ('/api/newMeetup', {

      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data)
    console.log(enteredMeetupData)

    router.push("/")
  }

  return (

    <NewMeetupForm onAddMeetup= {addMeetupHandler}/>
  )
}

export default NewMeetupPage;