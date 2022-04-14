const express = require("express")
const app = express()
const mongoose = require('mongoose')
// const MongoClient = require("mongodb").MongoClient
const axios = require("axios")
const { response } = require("express")
const passport = require("passport")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
require ("dotenv").config()
const PORT = 8000
const mainRoutes = require('./routes/main')
const animeRoutes = require('./routes/animes')

// Passport config
require('./config/passport')(passport)

connectDB()

//This is OLD CONNECTION that connects the app to the MongoDB// 
// let db,
//     dbConnectionStr = process.env.DBStringAnime,
//     dbName = "anime"

    
// MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true })
//     .then (client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(logger('dev'))



// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)
    
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


//This is what loads when you open the app
// app.get("/", (req, res) => {
//     db.collection("anime").find().sort({startDate: -1}).toArray()
//     .then(data => {
//         res.render("index.ejs", {info: data})
        
//     })
//     .catch(error => console.error(error))
// })

//This connects the post method to the database
// app.post("/addAnime", (req, res) => {
//     db.collection("anime").insertOne(req.body)
//     .then(result => {
//         console.log("Anime added")
//         res.redirect("/")
//     })
//     .catch(error => console.error(error))
// })

//This connects the delete method to the database
// app.delete("/deleteAnime", (req, res) =>{
//     db.collection("anime").deleteOne({animeTitle: req.body.animeTitleS})
//     .then(result => {
//         console.log(`Anime Deleted`)
//         res.json(`Anime Deleted`)
//     })
//     .catch(error => console.error(error))
// })

app.use('/', mainRoutes)
app.use('/animes', animeRoutes)


app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})