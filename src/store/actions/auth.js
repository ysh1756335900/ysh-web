import { saveUserInfo, clearUserInfo } from './user';
import { loginUser, registerUser } from '@/utils/api';

export const login = (loginName, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        loginUser({ "loginName": loginName.trim(), "password": password })
        .then(res => {
            console.log('登录===', res)
            if (res.code === 0) {
                dispatch(saveUserInfo(res.data));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const register = (loginName, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        registerUser({ loginName: loginName.trim(), password: password })
        .then(res => {
            console.log('注册===', res)
            if (res.code === 0) {
                dispatch(saveUserInfo(res.data));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const logout = () => (dispatch) => {
    console.log('logout')
    dispatch(clearUserInfo());
    window.location.href = '/login';
}

export const goto_404 = () => (dispatch) => {
    window.location.href = '/404';
}