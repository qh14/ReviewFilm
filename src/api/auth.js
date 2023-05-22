import client from "./client"

export const createUser = async (userInfo) =>{
    try {
        const {data} = await client.post('/user/create',userInfo);
        return data;
    } catch (error) {
        console.log(error.response?.data);
        const {response} = error;
        if (response?.data) {
            return response.data;
        }
        return {error: error.message || error};
    }
}
export const verifyEmail = async (userInfo) =>{
    try {
        const {data} = await client.post('/user/verify-email',userInfo);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.response?.data);
        const {response} = error;
        if (response?.data) {
            return response.data;
        }
        return {error: error.message || error};
    }
}
export const signIn = async (userInfo) =>{
    try {
        const {data} = await client.post('/user/sign-in',userInfo);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.response?.data);
        const {response} = error;
        if (response?.data) {
            return response.data;
        }
        return {error: error.message || error};
    }
}

