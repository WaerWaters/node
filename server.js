const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

let db

MongoClient.connect("mongodb+srv://WaerWaters:Danielmai1141_@cluster0.z7udyfy.mongodb.net/?retryWrites=true&w=majority", function (err, database) {
    if(err) return console.log(err)
    db = database.db()
    app.listen(3000, function () {
        console.log('listening...')
    })
})

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))


app.post('/postPolicy', async function (req, res) {
    db.collection('policies').insertOne(req.body)
    console.log('saved to db')
    res.redirect('/')
})

app.get('/getPolicy', async function (req, res) {
    reqPolicy = req.query.policy
    policies = db.collection('policies')
    policy = await policies.findOne({policy: reqPolicy})
    if (policy != null) {
        console.log(policy)
        res.redirect('/')
    } else {
        console.log(`Policy: ${reqPolicy} not in database`)
        res.redirect('/')
    }
})