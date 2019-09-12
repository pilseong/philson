const express = require('express')
const router  = express.Router()

const ctrlArticle   = require('../controllers/articles')


router
  .route('/articles')
  .get(ctrlArticle.listArticles)
  .post(ctrlArticle.articlesCreate)

module.exports = router  