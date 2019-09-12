const mongoose  = require('mongoose')
const Article   = mongoose.model('Article')


const listArticles = function(req, res) {
  console.log("Server Entry --- listArticles")
  const lng = parseFloat(req.query.lng)
  const lat = parseFloat(req.query.lat)
  const maxDist = parseFloat(req.query.maxDistance)
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  }
  const geoOptions = {
    distanceField: "distance.calculated",
    spherical: true,
    maxDistance: maxDist
  }
  if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
    return res
      .status(400)
      .json({
        "message": "lng and lat query parameters are required"
      })
  }
  Article.aggregate([
    {
      $geoNear: {
        near,
        ...geoOptions
      },
    },
    {
      $limit: 10
    }
  ])
  .exec((err, results)=> {
    console.log("Server after exec in ArticleationsListByDistance")
    if (!results) {  // 일치하는 자료가 없을 때
      return res
        .status(404)
        .json({
          "message": "Articleation not found"
        })
    } else if(err) {  // 오류가 발생했을 때
      return res
        .status(404)
        .json(err)
    }

    const Articleations = results.map(result=> {
      return {
        id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}`
      }
    })

    res
    .status(200)
    .json(Articleations)
  })
}

const articlesCreate = function(req, res, next) {
  console.log("Server Entry --- listArticles: " + JSON.stringify(req.body))
  Article.create({
    title: req.body.name,
    name: req.body.address,
    text: req.body.text,
    categories: req.body.categories.split(","),
    tags: req.body.tags.split(",")
  }, (err, Articleation)=>{
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      res
        .status(201)
        .json(Articleation)
    }
  })
}

module.exports = {
  listArticles,
  articlesCreate
}