// import { configureStore } from '@reduxjs/toolkit'
// import { eventApiSlice } from '../feature/eventslice/eventApiSlice'




// export const store = configureStore({
//   reducer: {
 
//     [eventApiSlice.reducerPath]: eventApiSlice.reducer,
//   },
 
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(eventApiSlice.middleware),
// })

import { configureStore } from '@reduxjs/toolkit';
import { studentApiSlice } from '../feature/studentslice/studentApiSlice';

export const store = configureStore({
  reducer: {
    [studentApiSlice.reducerPath]: studentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApiSlice.middleware),
});
