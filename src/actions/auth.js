
import Swal from 'sweetalert2';
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else {
            Swal.fire("Error", body.msg, "error");
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.authLogout
})

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            console.log(body);
            dispatch(register({
                uid: body.uid,
                name: body.name,
                email: body.email,
                password: body.password
            }))
        }else {
            Swal.fire("Error", body.msg, "error");
        }
    }

}

const register = (newUser) => ({
    type: types.authRegister,
    payload: newUser
})

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }))
        }else {
            // Swal.fire("Error", body.msg, "error");
            dispatch(checkFinish())
        }
    }
}

const checkFinish = () => ({
    type: types.authCheckingFinish,
 })