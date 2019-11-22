const axios = require('axios');

const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;

const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`;

exports.handler = async (event, context) => {
  if (event.httpMethod == 'GET') {
    return axios.get(URL)
      .then(res => ({
        statusCode: 200,
        body: JSON.stringify(res.data)
      }))
      .catch(err => ({
        statusCode: 500,
        body: err.toString()
      }));
  }
}
