const axios = require('axios');

export const makeApiCall = async (options) => {
  try{
    return axios(options).then(res => {
      return res;
      });
  }
  catch(err) {
    console.log(err);
  }
}