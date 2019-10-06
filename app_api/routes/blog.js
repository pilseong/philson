const express = require('express')
const router  = express.Router()
const jwt     = require('express-jwt')
const auth    = jwt({
  secret: process.env.JWT_SECRET,
  requestProperty: 'payload'
})

const ctrlArticle   = require('../controllers/articles')

// blog/categories
// blog/categories/{id}
// blog/articles
// blog/articles?category=
// blog/aritcles/{id}

router
  .route('/categories')
  .get(ctrlArticle.listCategores)

router
  .route('/categories/:appid')
  .get(ctrlArticle.listCategoresById)

router
  .route('/articles')
  .post(auth, ctrlArticle.articlesCreate)
  .get(ctrlArticle.listArticles)

router
  .route('/articles/:articleid')
  .get(ctrlArticle.getArticleById)

router
  .route('/articles/categories/:categoryid')
  .get(ctrlArticle.listArticlesByCategory)
  // .put(ctrlArticle.articlesUpdateOne)
  // .delete(ctrlArticle.articlesDeleteOne)


module.exports = router


