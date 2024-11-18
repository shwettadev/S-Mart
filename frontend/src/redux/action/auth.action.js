import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { getAPIDetails } from "../../utility/api";
// const getAPI = new API()?.getAPIDetails;
// const postAPI = new API()?.postAPIDetails;

export const getSampleJson = createAsyncThunk("getSampleJson",async({url,callback},{rejectWithValue}) => {
    try {
       let resp= await getAPIDetails(url);
       let apiResponse = resp.data;
        return{
            apiResponse,callback
        }
    }
    catch(error) {
        return rejectWithValue({callback, error});
    };
});