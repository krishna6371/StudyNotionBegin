import axios from "axios";
export const axiosInstance = axios.create({});

export const ApiConnector = (method, url, bodyData, headers, params) => {
  console.log(url);
  console.log(headers);
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
