const isProduction = process.env.NODE_ENV === 'production';

const url = 'http://localhost:8080';

const apiUrl = url+'/ysh';


export {
  apiUrl,
  url
};
