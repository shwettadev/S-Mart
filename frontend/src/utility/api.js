import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_BASE_PATH;
const apiInstance = axios.create({
  baseURL: apiBaseUrl,
});

export const getAPIDetails = async(url)=>{
  return await apiInstance.get(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const postAPIDetails = async(url, data) =>{
  return await apiInstance.post(url, data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// export default class API {
//   getAPIDetails(url) {
//     return apiInstance.get(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   };
//   postAPIDetails(url, data) {
//     return apiInstance.post(url, data, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   };
// };
