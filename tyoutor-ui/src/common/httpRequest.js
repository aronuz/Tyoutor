import axiosApi from "axios";

const axios = axiosApi.create({
  baseURL: "http://localhost:8000/api/",
});

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const request = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default function httpRequest(path, reqType, body = null) {
  return new Promise((resolve, reject) => {
    let data = [];
    let next = 0;
    request[reqType](path, body)
      .then((r) => {
        if (reqType === "get") {
          data.push(...r.data.results);
          next = r.data.next || null;
        } else if (Object.keys(body).length > 0) {
          data.push(r.data);
        }
        resolve([data, next]);
      })
      .catch((e) => {
        data.push({ error: e.message });
        console.log(e.message);
        reject(data);
      });
  });
}
