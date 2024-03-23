import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState,AppDispatch } from "../store";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface Universityinterface {
    id: String,
    username: String,
    password: String,
    email: String,
    images: Array<String>,
    bachelor_courses: Array<String>,
    masters_courses: Array<String>,
    description: String,
    address : String,
    website: String
}

interface Mentorinterface {
    id: String,
    username: String,
    password: String,
    email: String,
    images: Array<String>,
    description: String,
    country: String,
    gender: String,
    rating: Number
}

interface Menteeinterface {
    id: String,
    username: String,
    password: String,
    email: String,
    images: Array<String>,
    description: String,
    country: String,
    gender: String,
}

interface AuthState{
  credentials:Universityinterface | Mentorinterface | Menteeinterface | null,
  type: String
};

const initialState = {
  credentials:null,
  type:""
} as AuthState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setcredentials: (state,action:PayloadAction<AuthState>) => {
        state.credentials = action.payload.credentials,
        state.type = action.payload.type
    },
  },
});

export const {
  setcredentials,
  reset
} = auth.actions;
export default auth.reducer;
