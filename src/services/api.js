// import Axios from 'axios';
// import _ from 'lodash';
// import {makeUseAxios} from 'axios-hooks';
// import LRU from 'lru-cache';
// import {baseUrl} from '../utils/config';
// import {store} from '../redux/store/store';

// const toFormData = data => {
//   const formData = new FormData();
//   _.forOwn(data, (value, key) => {
//     formData.append(key, value);
//   });
//   return formData;
// };

// let apiUrl = `${baseUrl}`;

// store.subs(() => {
//   const state = store.getState();
//   const {locale} = state.langState;
//   const {token} = state.userState;
//   apiUrl = `${baseUrl}`;

//   axios.defaults.baseURL = apiUrl;
//   if (token) {
//     axios.defaults.headers.common.authorization = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common.authorization;
//   }
// });

// const axios = Axios.create({
//   baseURL: apiUrl,
//   timeout: 10000,
//   headers: {
//     Accept: 'application/json',
//     // 'Content-Type': false,
//   },
//   // transform request data obj to FormData
// });

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       // validation errors
//       if (error.response.status === 422) {
//         const {errors: errorsArr} = error.response.data;
//         const validationErrors = [];
//         _.forOwn(errorsArr, (value, name) => {
//           validationErrors.push({
//             name,
//             message: value[0],
//             type: 'manual',
//           });
//         });

//         const errors = {...error, validationErrors};
//         return Promise.reject(errors);
//       }
//       if (error.response.status === 401) {
//         // store.dispatch(logoutUser());
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// const cache = new LRU({max: 90});

// const useAxios = makeUseAxios({
//   axios,
//   cache,
// });

// export default {
//   axios,
//   useAxios,
//   toFormData,
// };
