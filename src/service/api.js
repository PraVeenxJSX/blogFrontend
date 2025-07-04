import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

const API_URL = 'https://blogbackend-k8of.onrender.com/' || 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE?.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE?.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        // Stop global loader here
        return processResponse(response);
    },
    function(error) {
        // Stop global loader here
        return Promise.reject(ProcessError(error));
    }
)

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.data?.msg || response?.msg,
            code: response?.code
        }
    }
}

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////
const ProcessError = async (error) => {
    if (error.response) {
        // Request made and server responded with a status code 
        // that falls out of the range of 2xx
        if (error.response?.status === 403) {
            sessionStorage.clear();
            return {
                isError: true,
                msg: 'Session expired. Please login again.',
                code: error.response.status
            }
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: error.response?.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
                code: error.response.status
            }
        }
    } else if (error.request) { 
        // The request was made but no response was received
        console.log("ERROR IN REQUEST: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: ""
        }
    } else { 
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN NETWORK: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError.message,
            code: ""
        }
    }
}

const API = {
    userSignup: async (data) => {
        try {
            const response = await axiosInstance.post(SERVICE_URLS.userSignup.url, data);
            return response;
        } catch (error) {
            return error;
        }
    },
    userLogin: async (data) => {
        try {
            const response = await axiosInstance.post(SERVICE_URLS.userLogin.url, data);
            return response;
        } catch (error) {
            return error;
        }
    },
    // ... other API methods ...
};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    if (!API[key]) {  // Only add if not already defined
        API[key] = (body, showUploadProgress, showDownloadProgress) =>
            axiosInstance({
                method: value.method,
                url: value.url,
                data: value.method === 'DELETE' ? '' : body,
                responseType: value.responseType,
                headers: {
                    authorization: getAccessToken(),
                },
                TYPE: getType(value, body),
                onUploadProgress: function(progressEvent) {
                    if (showUploadProgress) {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showUploadProgress(percentCompleted);
                    }
                },
                onDownloadProgress: function(progressEvent) {
                    if (showDownloadProgress) {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showDownloadProgress(percentCompleted);
                    }
                }
            });
    }
}

export default API;