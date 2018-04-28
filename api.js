// Google Custom Search: 
// https://developers.google.com/custom-search/json-api/v1/reference/cse/list#try-it

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/imagesearch/:search', (req, res) => {
  res.json({status: 200});
})

apiRouter.get('/latest/imagesearch/', (req, res) => {
  res.json({status: 200});
});


module.exports = apiRouter;