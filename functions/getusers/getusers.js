const axios = require('axios');

const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;

exports.handler = async (event, context) => {
  if (event.httpMethod == 'GET') {
    return axios
      .get(API_URL, {
        auth: {
          username: API_CLIENT_ID,
          password: API_CLIENT_SECRET
        }
      })
      .then(res => ({
        statusCode: 200,
        body: JSON.stringify(res.data)
      }))
      .catch(err => ({
        statusCode: 500,
        body: err.toString()
      }));
  }
};
