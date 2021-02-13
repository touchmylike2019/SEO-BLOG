import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie' // javascript API เอาไว้จัดการกับ cookies
import { API } from '../config'

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout success')
        }) .catch (err => console.log(err))
}

// set cookie
export const setCookie = (key, value) => {
    //ตรวจสอบว่าทำงานบน Browser อยู่หรือเปล่า
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1 //มีอายุใช้งาน 1 วัน
        })
    }
}

export const removeCookie = key => {
    if(process) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

//get cookie
export const getCookie = key => {
    if(process.browser) {
        return cookie.get(key)
    }
}

// localstorage
export const setLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = key => {
    if(process.browser) {
        localStorage.removeItem(key)
    }
}

// ใช้ตรวจสอบความถูกต้องของ user ที่เข้ามาโดยส่งข้อมูลเป็น cookie เเละ localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next()
}

// ใช้บอก page ที่ต้องการให้มีการ authenticate ก่อนรู้ว่าผู้ใช้ authenticate เเล้ว
export const isAuth = () => {
    if(process.browser) {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}