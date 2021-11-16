import axiosApi from 'axios'

const axios = axiosApi.create({
    baseURL: 'http://localhost:8000/api/'
})

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const request = { 'post': axios.post, 'put': axios.put, 'delete': axios.delete }

export default async function httpRequest(path, reqType = null, body = {}) {
    data = []
    try {
        if (!reqType) {
            const r = await axios.get(path);
            data.push({ 'result': [...r.data.results] });
            const next = r.data.next || null;
            data.push({ 'next': next });
        } else if (Object.keys(body).length > 0) {
            const r = await request[reqType](endpoint, body);
            data.push({ 'data': r.data });
        }
    } catch (e) {
        data.push({ 'error': e.response.statusText })
    } finally {
        return data
    }
};