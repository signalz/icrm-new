import axios from 'axios';

const base = "http://localhost" + '/api';

function getHeaders() {
  const accessToken = localStorage.getItem('loginToken') || null;
  if (accessToken) {
    return {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
}

axios.defaults.baseURL = base;

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('loginToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    const originalRequest = error.config;
    if (error.response.status === 500 && originalRequest.url === (base + '/refresh-token')) {
        localStorage.removeItem('loginToken');
        window.location.replace("http://localhost" + '/login')
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axios.post(`${base}/refresh-token`,
            {
                isRefreshToken: true
            },{
                headers: getHeaders(),
            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('loginToken', res.data.data.token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
                    return axios(originalRequest);
                }
            }
        )
    }
    return Promise.reject(error);
});

function getApi(path, option = {}) {
  return axios.get(`${base}/${path.replace(/^\//, '')}`, {
    ...option,
    headers: getHeaders(),
  });
}

function postApi(path, body, option = {}) {
  return axios.post(`${base}/${path.replace(/^\//, '')}`, body, {
    ...option,
    headers: getHeaders(),
  });
}

function putApi(path, body, option = {}) {
  return axios.put(`${base}/${path.replace(/^\//, '')}`, body, {
    ...option,
    headers: getHeaders(),
  });
}

function deleteApi(path, option = {}) {
  return axios.delete(`${base}/${path.replace(/^\//, '')}`, {
    ...option,
    headers: getHeaders(),
  });
}

const AxiosApi = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
};

export default AxiosApi;
