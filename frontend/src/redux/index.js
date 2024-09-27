import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from "./userSlice";
import productSlideReducer from './productSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer, 
    product : productSlideReducer
    // Correctly referencing the user slice
  },
});


/*import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,  // Adjusted to properly reference the user slice
  },
});
*/

/*import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from "./userSlice";

export const store = configureStore({
  reducer: userSliceReducer,
})*/