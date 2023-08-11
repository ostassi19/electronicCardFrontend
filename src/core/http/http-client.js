import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

const requestHandler = request => {
    const token = localStorage.getItem('token');
    request.headers.Authorization = 'Bearer ' + token;
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/connexion';
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

httpClient.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

httpClient.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


export default httpClient;
