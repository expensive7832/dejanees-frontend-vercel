import { createSlice } from "@reduxjs/toolkit"


export type initialStateProps = {
    login: boolean,
    userData:{
        id: number,
        first_name: string
        last_name: string
        email: string,
        is_superuser: boolean,
        is_active: boolean,
       
    },
    token:{
        access: string,
        refresh: string,
    }
}

const initialState: initialStateProps = {
    login: false,
    userData: {
        id: parseInt(""),
        first_name: "",
        last_name: "",
        email: "",
        is_superuser: false,
        is_active: false,
    },
    token :{
        access: '',
        refresh: ''
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        isLogin: (state, action) =>{
            state.login = true;
            state.token = action.payload
        },
        
        isLogout: (state) =>{
            state.login = false;
            state.userData = {
                id: parseInt(""),
                first_name: "",
                last_name: "",
                email: "",
                is_superuser: false,
                is_active: false
            }
            state.token = {
                access: '',
                refresh: ''
            }

        },
        userInfo: (state, action) =>{
            state.userData = {...action.payload}
        },
       updateUser: (state, action) =>{
        const {fname, lname} = action.payload;
        state.userData = {...state.userData, first_name: fname, last_name: lname}
       }
    }
})

export const { isLogin, isLogout, updateUser, userInfo } = userSlice.actions
export default userSlice.reducer