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
  return new Promise((resolve) => {
    //, reject
    let data = [];
    let total = null;
    let previous, next;
    if (path === "photoupload") {
      request[reqType](path, body, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((r) => {
          const success = r.success;
          if (success) {
            data.push(r.data);
            resolve({ success: true, data: data });
          } else {
            const error = `${r.error} Failed to upload image.`;
            resolve({ success: false, error: error });
          }
        })
        .catch((e) => {
          //data.push({ error: e });
          // reject(e);
          resolve({ success: false, error: e });
        });
    } else {
      request[reqType](path, body)
        .then((r) => {
          if (!("success" in r) || r.success) {
            if (reqType === "get") {
              data.push(...r.data.results);
              previous = r.data.previous;
              next = r.data.next;
              total = r.data.count || null;
            } else if (Object.keys(body).length > 0) {
              data.push(r.data);
            }
            resolve({ success: true, data: [data, previous, next, total] });
          } else if ("success" in r && !r.success) {
            resolve({ success: false, error: r.error });
          }
        })
        .catch((e) => {
          //data.push({ error: e });
          //console.log(e.message);
          // reject(e);
          resolve({ success: false, error: e });
        });
    }
  });
}
