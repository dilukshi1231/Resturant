import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null, // Role property to differentiate between users and admins
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role; // Set the user role
    },
    logoutRedux: (state) => {
      state.user = null;
      state.role = null; // Reset both user and role on logout
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;





/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state.user = action.payload.user;  // Store the user data
        },
        logoutRedux: (state) => {
            state.user = null;  // Reset user data on logout
        }
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;



/*
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            console.log(action.payload.data);
            state.user = action.payload.data;  // Store the user data in Redux, including the isAdmin field
        },
        logoutRedux: (state) => {
            state.user = null;  // Reset the user state on logout
        }
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
*/


/*
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            console.log(action.payload.data);
            state.user = action.payload.data;
        },
        logoutRedux: (state) => {
            state.user = null;  // Reset the user state on logout
        }
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;

*/

/*import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    user:null,
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginRedux : (state,action)=>{
            console.log(action.payload.data);
            state.user = action.payload.data;
        }
    }
})
export const {loginRedux} = userSlice.actions;
export default userSlice.reducer;*/