import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Universityinterface {
    id: string,
    username: string,
    password: string,
    email: string,
    images: Array<string>,
    bachelor_courses: string,
    masters_courses: string,
    description: string,
    address : string,
    website: string
}

interface Mentorinterface {
    id: string,
    username: string,
    password: string,
    email: string,
    images: Array<string>,
    description: string,
    country: string,
    gender: string,
    rating: number
}

interface Menteeinterface {
    id: string,
    username: string,
    password: string,
    email: string,
    images: Array<string>,
    description: string,
    country: string,
    gender: string,
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
