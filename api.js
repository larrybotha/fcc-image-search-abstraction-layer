// Google Custom Search: 
// https://developers.google.com/custom-search/json-api/v1/reference/cse/list#try-it

const express = require('express');
const apiRouter = express.Router();

const GOOGLE_CSE_URL = "https://www.googleapis.com/customsearch/v1";
const GOOGLE_CSE_API_KEY = process.env.GOOGLE_CSE_API_KEY;
const GOOGLE_CSE_CX = process.env.GOOGLE_CSE_CX;

const getRequestUrl = (q, page = 0) => {
  const numResults = 10;
  const params = {
    cx: GOOGLE_CSE_CX,
    key: GOOGLE_CSE_API_KEY,
    num: numResults,
    start: numResults * page,
  };
  
  return Object.keys(params).reduce((acc, k) => `${acc}&${k}=${params[k]}`, '');
};

apiRouter.get('/imagesearch/:search', (req, res) => {
  const requestUrl = getRequestUrl(req.params.search, req.query.offset);
  
  res.json({req: requestUrl});
})

apiRouter.get('/latest/imagesearch/', (req, res) => {
  res.json({status: 200});
});


module.exports = apiRouter;