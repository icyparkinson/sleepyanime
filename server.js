const express = require("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 8000
const axios = require("axios")
const { response } = require("express")
require ("dotenv").config()

//This connects the app to the MongoDB// 
let db,
    dbConnectionStr = process.env.DBStringAnime,
    dbName = "anime"

    
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true })
    .then (client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


//This is what loads when you open the app
app.get("/", (req, res) => {
    db.collection("anime").find().toArray()
    .then(data => {
        res.render("index.ejs", {info: data})
        
    })
    .catch(error => console.error(error))
})

//This connects the post method to the database
app.post("/addAnime", (req, res) => {
    db.collection("anime").insertOne(req.body)
    .then(result => {
        console.log("Anime added")
        res.redirect("/")
    })
    .catch(error => console.error(error))
})

//This connects the delete method to the database
app.delete("/deleteAnime", (req, res) =>{
    db.collection("anime").deleteOne({animeTitle: req.body.animeTitleS})
    .then(result => {
        console.log(`Anime Deleted`)
        res.json(`Anime Deleted`)
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})