'use latest'

const MongoClient = require('mongodb').MongoClient
const express = require('express')
const webtask = require('webtask-tools')
const app = express()

// create a new comment
app.post('/', (req, res) => {
    MongoClient.connect(req.webtaskContext.data.MONGO_URL, (err, db) => {

      if (err) res.status(500).send('Could not connect to the database')

      // get the comments collection
      const commentsCollection = db.collection('comments')

      // insert the new comment
      commentsCollection.insertOne(req.webtaskContext.body, (err, result) => {
        db.close()

        if (err) {
          res.status(500).send(err)
        } else {
          res.send('Successfully added comment!')
        }
      })

    })
})

// get all comments
app.get('/', (req, res) => {
  MongoClient.connect(req.webtaskContext.data.MONGO_URL, (err, db) => {

    if (err) res.status(500).send('Could not connect to the database')

    // retrieve all the comments to be returned to the client
    let cursor = db.collection('comments').find()
    let comments = []

    cursor.each((err, doc) => {
       if (doc != null) {
          comments.push(doc)
       } else {
         db.close()
         res.send(comments)
       }
    })

  })
})

module.exports = webtask.fromExpress(app)
