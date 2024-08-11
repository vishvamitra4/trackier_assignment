import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        email: "",
        id: "",
    },
    reducers: {
        updateUser(state, action) {
            const { userName, email, id } = action.payload;
            state.id = id;
            state.userName = userName;
            state.email = email;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;