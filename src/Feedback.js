import React from 'react'
import axios from "axios"
import {useState} from "react";

function Feedback() {
    const [name,setName] = useState("")
    const [feedback,setFeedback] = useState("excellent")
    const [msg,setMsg] = useState("")

    const hName = (event) => {setName(event.target.value)}
    const hFeedback = (event) => {setFeedback(event.target.value)}

    const save = (event)=>{
        event.preventDefault();
        let data = {name,feedback};
        let urladd = "http://localhost:9000/create";
        axios.post(urladd,data)
        .then(res=>{
            if(res.data.affectedRows == 1)
            {
                setMsg("Thank You")
                setName("");
                setFeedback("excellent");
            }
        })
        .catch(err =>{
            if(err.code == "ERR_NETWORK")
            {
                setMsg("Server Down Try Again after Sometime");
                setName("");
                setFeedback("excellent")
            }
        })
    }

  return (
    <div>
        <center>
            <h1> Feedback Please </h1>
            <form onSubmit={save}>
                <input type={"text"} placeholder="Enter Your Name here" onChange={hName} value={name}/>
                <br/><br/>
                <input type={"radio"} name="f" value={"excellent"} defaultChecked={true} 
                onChange={hFeedback} checked={feedback=="excellent"}/>Excellent
                <input type={"radio"} name="f" value={"superb"}  
                onChange={hFeedback} checked={feedback=="superb"}/>Superb
                <input type={"radio"} name="f" value={"good"} 
                onChange={hFeedback} checked={feedback=="good"}/>Good
                <br/><br/>
                <input type = "submit"/>
            </form>
            <h2>{msg}</h2>
        </center>
    </div>
  )
}

export default Feedback