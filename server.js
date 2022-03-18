const express = require("express")
const app = express()
const cors = require("cors")
const { MongoClient } = require("mongodb")
const { response } = require("express")
const PORT = 8000

app.use(cors())

let db,
    dbConnectionStr = "mongodb+srv://icyparkinson:4mango@cluster0.8igav.mongodb.net/anime?retryWrites=true&w=majority",
    dbName = anime

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true })
    .then (client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


let anime ={
    "ggo" : {
        "id" : 1,
        "title" : "Sword Art Online Alternative: Gun Gale Online",
        "episodes" : 12,
        "selector" : "Sleepy",
        "startDate" : "August 12, 2018",
    },
    "classroom elite" : { 
        "id" : 2,
        "title" : "Classroom of the Elite",
        "episodes" : 12,
        "selector" : "Lukas",
        "startDate" : "August 26, 2018",
    },
    "unknown" : {
        "id" : 0,
        "title" : "unknown",
        "episodes" : 0,
        "selector" : "unknown",
        "startDate" : "unknown",
    }
  
}


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// })

app.get("/", (req, res) => {
    db.collection("anime").find().toArray()
    .then(data => {
        response.render("index.ejs", { info: data })
    })
    .catch(error => console.error(error))
})


app.get("/api/anime/:animeTitle", (req, res) => {
    const title = req.params.animeTitle.toLowerCase()
    console.log(title)
    if(anime[title]){
        res.json(anime[title])
    } else{
        res.json(anime["unknown"])
    }

})


app.post("/addAnime", (req, res) => {
    db.collection("anime").insertOne(req.body)
    .then(result => {
        console.log("Anime added")
        response.redirect("/")
    })
    .catch(error => console.error(error))
})


app.delete("/deleteAnime", (req, res) =>{
    db.collection("anime").deleteOne({animeTitle: req.body.title})
    .then(result => {
        console.log("Anime Deleted")
        res.json("Anime Deleted")
    })
    .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})