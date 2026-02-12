import { createSlice } from "@reduxjs/toolkit"   ;

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
}






const initialState : UserState = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,   
}

const userSlice  = createSlice({
  name: 'users',
  initialState : initialState ,
  reducers: {
          setFirstName: (state, action) => {
            state.firstName = action.payload;
          }, 
          setLastName: (state, action) => {     
            state.lastName = action.payload;
            },
            setEmail: (state, action) => {
                state.email = action.payload;
            },
            setAge: (state, action) => {
                state.age = action.payload;
            },

  },

})

export const { setFirstName, setLastName, setEmail, setAge } = userSlice.actions;
export default userSlice.reducer

