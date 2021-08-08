import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchResources = createAsyncThunk(
    'resource/fetchResources', async () => {
         const response = axios.get(`https://reqres.in/api/unknown`)
         return (await response).data
    });

export const fetchResourcesById = createAsyncThunk(
    'resource/fetchResourcesById', async (id) => { 
        const response = axios.get(`https://reqres.in/api/unknown/${id}`)
        return (await response).data
    });