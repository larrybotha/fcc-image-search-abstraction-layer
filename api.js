// Google Custom Search: 
// https://developers.google.com/custom-search/json-api/v1/reference/cse/list#try-it
const express = require('express');
const apiRouter = express.Router();
const fetch = require('isomorphic-fetch');
const querystring = require('querystring');

const dbConnection = require('./db');

const GOOGLE_CSE_URL = "https://www.googleapis.com/customsearch/v1";
// enable image search in Google Custom Search config
// set "sites to search" to "search entire web"
const GOOGLE_CSE_API_KEY = process.env.GOOGLE_CSE_API_KEY;
const GOOGLE_CSE_CX = process.env.GOOGLE_CSE_CX;

const getRequestUrl = (q, page = 0) => {
  const numResults = 10;
  const params = {
    q,
    cx: GOOGLE_CSE_CX,
    key: GOOGLE_CSE_API_KEY,
    num: numResults,
    start: numResults * page || undefined,
    searchType: 'image',
  };
  const query = querystring.stringify(params);
  
  return [GOOGLE_CSE_URL, query].join('?');
};

apiRouter.get('/imagesearch/:search', async (req, res) => {
  const requestUrl = getRequestUrl(req.params.search, req.query.offset);
  const db = dbConnection.db;

  try {
    const response = await fetch(requestUrl).then(res => res.json());
    const images = response.items.map(item => ({
      alt: item.title,
      imageUrl: item.link,
      pageUrl: item.image.contextLink,
    }));

    await db.collection('imagesearches')
            .insert({ 
              term: req.params.search,
              offset: req.query.offset 
            });

    res.json(images);
  } catch (e) {
    res.json({ message: e });
  }
})

apiRouter.get('/latest/imagesearch/', async (req, res) => {
  const db = dbConnection.db;
  const collection = db.collection('imagesearches');
  const searches = await collection.find().toArray(); 
  
  res.json(searches);
});

module.exports = apiRouter;