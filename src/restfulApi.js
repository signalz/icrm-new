import api from './axiosApi';

export const RestfulEntityApi = (endpoint, keyName = 'codes') => {
  const GET = (primary_key, params) =>
    api.get(`/${endpoint}/${primary_key}`, {
      params,
    });
  const POST = body => api.post(`/${endpoint}`, body);
  const PUT = (primary_key, body, params) =>
    api.put(`/${endpoint}/${primary_key}`, body, {
      params,
    });
  const DELETE = (primary_key, params) =>
    api.delete(`/${endpoint}/${primary_key}`, {
      params,
    });
  return {
    GET,
    POST,
    PUT,
    DELETE,
  };
};
