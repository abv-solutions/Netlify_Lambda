const randomWords = require('random-words');

exports.handler = async (event, context) => {
  const subject = randomWords().toUpperCase();
  const { user } = context.clientContext;

  if (!user) {
    return {
      statusCode: 401,
      body: 'NOT ALLOWED'
    }
  }
  if (event.httpMethod == 'GET') {
    try {
      return {
        statusCode: 200,
        body: subject
      }
    }
    catch (err) {
      return {
        statusCode: 500,
        body: err.toString()
      }
    }
  }
}
