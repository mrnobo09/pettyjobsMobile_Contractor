import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:"",
    job_type:"",
    location:"",
    description:"",
    status:"",
    criticality:"",
    approved_by:"",
    accepted_by:"",
    uploaded_at:"",
    approved_at:"",
    completed_at:"",
    images:[],
    rating:0,
    rating_2:0,
}

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{
        viewJob(state,action){
            state.id = action.payload.id
            state.title = action.payload.title
            state.job_type = action.payload.job_type
            state.location = action.payload.location
            state.description = action.payload.description
            state.status = action.payload.status
            state.criticality = action.payload.criticality
            state.approved_by = action.payload.approved_by
            state.accepted_by = action.payload.accepted_by
            state.uploaded_at = action.payload.uploaded_at
            state.approved_at = action.payload.approved_at
            state.completed_at = action.payload.completed_at
            state.images = action.payload.images

            action.payload.rating ? state.rating = action.payload.rating : state.rating = 0
            action.payload.rating_2 ? state.rating_2 = action.payload.rating_2 : state.rating_2 = 0
        },
    }
})

export const {viewJob} = jobSlice.actions
export default jobSlice.reducer
