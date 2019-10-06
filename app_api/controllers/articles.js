const mongoose  = require('mongoose')
const Article   = mongoose.model('Article')
const Category  = mongoose.model('Category')

const listCategores = function(req, res, next) {
  console.log("listCategores : " + JSON.stringify(req.query))

  const name = req.query.name ? { name: { $in: req.query.name.split(',') } } : {};
  const children = req.query.children === 'true' ? { children: { $exists : true } } : {}

  console.log(children)
  Category
    .find({...name, ...children })
    .populate('children')
    .exec((err, results)=> {
      console.log("Server after exec in listCategores")
      if (!results) {  // 일치하는 자료가 없을 때
        return res
          .status(404)
          .json({
            "message": "Category not found"
          })
      } else if(err) {  // 오류가 발생했을 때
        return res
          .status(404)
          .json(err)
      }

      // let categories = results
      //   .filter(result=> ((result.parent === undefined) || (result.parent === '')))
      //   .map(result=> result)
      
      res
      .status(200)
      .json(results)
    })
}

const listCategoresById = function(req, res, next) {
  console.log("Server Entry --- listCategoresById: " + req.params.appid)
  const children  = req.query.children === 'true' ? { children: { $exists : true } } : {}
  const parent    = req.query.parent === 'true' ? { parent: { $exists : false } } : {}

  console.log(parent)
  if (req.params.appid === 'blog') {
    Category
      .find({ ...children, ...parent })
      .populate('children')
      .exec((err, results)=> {
        console.log("Server after exec in listCategoresById")
        if (!results) {  // 일치하는 자료가 없을 때
          return res
            .status(404)
            .json({
              "message": "Category not found"
            })
        } else if(err) {  // 오류가 발생했을 때
          return res
            .status(404)
            .json(err)
        }
        res
        .status(200)
        .json(results)
      })
  } else {
    res
    .status(200)
    .json(null)
  }
}

const listArticles = function(req, res, next) {
  console.log("Server Entry --- listArticles")
  const categories = req.query.categories && req.query.categories !== 'all' ?
                      { categories: { $in: req.query.categories.split(',') } } : {};
  console.log(categories)
  Article
  .find({...categories})
  .sort({createdOn: -1})
  .exec((err, results)=> {
    console.log("Server after exec in listArticles")
    if (!results) {  // 일치하는 자료가 없을 때
      return res
        .status(404)
        .json({
          "message": "Article not found"
        })
    } else if(err) {  // 오류가 발생했을 때
      return res
        .status(404)
        .json(err)
    }
    const articlelist = results.map(result=> result)

    console.log(articlelist)
    res
    .status(200)
    .json(articlelist)
  })
}

const getArticleById = function(req, res, next) {
  console.log("Server Entry --- getArticleById: " + req.params.articleid)
  Article
    .findById(req.params.articleid)
    .exec((err, article)=> {
      if (!article) {  // 일치하는 자료가 없을 때
        return res
          .status(404)
          .json({
            "message": "article not found"
          })
      } else if(err) {  // 오류가 발생했을 때
        return res
          .status(404)
          .json(err)
      }
      console.log("Server exec success getArticleById: " + JSON.stringify(article))
      res
        .status(200)
        .json(article)
    })
}


const listArticlesByCategory = function(req, res, next) {
  console.log("Server Entry --- listArticlesByCategory: " + req.params.categoryid)

  Article
  .find({categories: req.params.categoryid})
  .exec((err, results)=> {
    console.log("Server after exec in listArticlesByCategory")
    if (!results) {  // 일치하는 자료가 없을 때
      return res
        .status(404)
        .json({
          "message": "Article not found"
        })
    } else if(err) {  // 오류가 발생했을 때
      return res
        .status(404)
        .json(err)
    }

    console.log(results)
    res
    .status(200)
    .json(results)
  })
}

const articlesCreate = function(req, res, next) {
  console.log("Server Entry --- articlesCreate: " + JSON.stringify(req.payload))
  console.log("Server Entry --- articlesCreate: " + JSON.stringify(req.body))

  Article.create({
    title: req.body.title,
    name: req.body.name,
    text: req.body.text,
    categories: req.body.categories.split(","),
    tags: req.body.tags.split(",")
  }, (err, article)=>{
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      res
        .status(201)
        .json(article)
    }
  })
}




module.exports = {
  listArticles,
  listArticlesByCategory,
  articlesCreate,
  getArticleById,
  // articlesUpdateOne,
  // articlesDeleteOne
  listCategores,
  listCategoresById
}