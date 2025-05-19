import {configureStore} from "@reduxjs/toolkit" 
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { gamificationApiSlice } from "@/features/api/gamificationApi";
import { recommendationApi } from "@/features/api/recommendationApi";
import { quizApiSlice } from "@/features/api/quizApi";
import authReducer from "@/features/authSlice";

export const appStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [purchaseApi.reducerPath]: purchaseApi.reducer,
        [courseProgressApi.reducerPath]: courseProgressApi.reducer,
        [gamificationApiSlice.reducerPath]: gamificationApiSlice.reducer,
        [recommendationApi.reducerPath]: recommendationApi.reducer,
        [quizApiSlice.reducerPath]: quizApiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            courseApi.middleware,
            purchaseApi.middleware,
            courseProgressApi.middleware,
            gamificationApiSlice.middleware,
            recommendationApi.middleware,
            quizApiSlice.middleware
        ),
});

setupListeners(appStore.dispatch);

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();