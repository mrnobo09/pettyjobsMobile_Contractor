import axios from "axios"
import {viewJob} from "../State/jobSlice"
import backendURL from "../config"

export const getJob = (jobID) => async dispatch =>{
    const config = {
        params : {
            jobID: jobID,
        },
        headers:{
            "Content_Type" : "application/json",
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NTU1OTk5LCJpYXQiOjE3MjU5NTExOTksImp0aSI6ImFlNGIzMjY4NjIwYTRjNzk5YTAwNDg2OGUxZjhmMWIzIiwidXNlcl9pZCI6Mn0._alqhZCoO3IGOIGDdoOPIpX7cltQIkUgt-tPMtJILmE",
            "Accept" : "application/json"
        }
    }
    try{
        const response = await axios.get(`${backendURL}/app/view_job_as_contractor/`,config)
        dispatch(viewJob(response.data))
    }catch(error){
        console.log(error)
    }
    
}