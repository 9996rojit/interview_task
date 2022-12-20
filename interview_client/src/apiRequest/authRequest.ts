import { axiosPrivate } from "../api/axios"
import axios from "../api/axios"

export const login = async (data: { email: string, password: string }) => {
    try {
        const response = await axiosPrivate.post('/login', data)
        return response

    }
    catch (err) {
        return err
    }
}

export const RegisterApi = async (data: { email: string, password: string }) => {
    try {
        const response = await axios.post('/register', data)
        return response
    }
    catch (err) {
        return err
    }
}