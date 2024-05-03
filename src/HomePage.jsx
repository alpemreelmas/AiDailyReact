import './assets/css/App.css'
import {useEffect} from "react";
import axiosInstance from "./lib/axiosInstance.js";

function HomePage() {
  useEffect(()=>{
    axiosInstance.get("/daily").then((res)=>{
      console.log(res)
    })
  },[])
  return (
      <span>test</span>
  )
}

export default HomePage
