import React,{useState} from "react";
import AppComponent from "./AppComponent";
import { Link } from "react-router-dom";

function Home({setSelectedMediaType}){
   const [selectedOption,setSelectedOption]=useState("video");

   const handleOptionChange=(event)=>{
   console.log(event);
    setSelectedOption(event.target.value);
    setSelectedMediaType(event.target.value);
   }
    return(
        <div className="flex justify-center items-center h-screen w-screen bg-pink-100">
            <label>
                <input
                type="radio"
                value="video"
                checked={selectedOption==="video"}
                onChange={handleOptionChange}
                />
                Video
            </label>
            <label>
                <input
                type="radio"
                value="screen"
                checked={selectedOption==="screen"}
                onChange={handleOptionChange}
                />
                screen
            </label>
            <Link to="/app">Go to App</Link>
        </div>
    )
}
export default Home