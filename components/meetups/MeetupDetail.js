 import { Fragment } from "react";
 import classes from './MeetupDetail.module.css';


//This component will recieve data via props from the meetupId component in pages folder and return the layout of the page with specific data for each item. 
const MeetupDetail = (props) => {
  return (
    <section className = {classes.detail}>
        <h1>{props.title}</h1>
        <img src={props.image} alt={props.title}/>
        <p> {props.description}</p>
        <p> {props.address}</p>
    </section>
  )
}

export default MeetupDetail 