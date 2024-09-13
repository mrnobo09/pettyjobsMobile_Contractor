import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Check for tokens in AsyncStorage during initial state setup
SecureStore.getItemAsync('access').then((token) => {
    if (token) {
        initialState.isAuthenticated = true;
        initialState.access = token;
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            const access = action.payload.access_token;
            const refresh = action.payload.refresh_token;
            const user = action.payload.user_data;

            SecureStore.setItemAsync('access', access);
            SecureStore.setItemAsync('refresh', refresh);
            
            //state.access = access;
            //state.refresh = refresh;
            state.user = user;
            state.isAuthenticated = true;
        },
        loginFail(state) {
            SecureStore.deleteItemAsync('access');
            AsyncStorage.deleteItemAsync('refresh');
            
            state.user = null;
            state.isAuthenticated = false;
        },
        logout(state) {
            // Remove tokens asynchronously
            SecureStore.deleteItemAsync('access');
            SecureStore.deleteItemAsync('refresh');
            
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { loginSuccess, loginFail, logout } = loginSlice.actions;
export default loginSlice.reducer;
