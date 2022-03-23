const express = require("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 8000
const axios = require("axios")
const { response } = require("express")


let db,
    dbConnectionStr = "mongodb+srv://demo:demo@cluster0.8igav.mongodb.net/anime?retryWrites=true&w=majority",
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


// THIS IS OLD CODE FROM LEON'S FORMAT
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// })

// app.get("/", (req, res) => {
//     db.collection("anime").find({}).toArray()
//     .then(data => {
//         console.log(data)
         
//         res.render("index.ejs", { info: data })
        
          
//     })
//     .catch(error => console.error(error))
// })

// =============================================================

// THIS SUCCESSFULLY FETCHES TITLE FOR EJS TO USE AND PULLS MAL ID FROM DB!
// app.get("/", (req,res) => {
//         db.collection("anime").find({}).toArray()
//             .then (data => {

//                 for (let i = 0; i < data.length; i++){

//                     let malID = data[i].animeId
                    //  console.log(malID)
                     
            //     }
            // })
                
            //          const fetchData = await axios.get(`https://api.jikan.moe/v4/anime/${malID}`)   
            //             .then(anime => {
                            
            //                 animeData.push(anime.data.data.title)
            //                 console.log(animeData)
                        
            //         })

            //     } res.render ("index.ejs", { animeData })
                
            // })
            // .catch(error => console.error(error))

        //     let path = 'https://api.jikan.moe/v4/anime/'
        //     let ids = ['1000', '1001', '1002']
        //       .map(elt => 
        //       new Promise((resolve, reject) => 
        //       resolve(axios.get(path + elt)
        //       .then(elt => elt.data)
        //       )
        //       )
        //       )
            
        //     Promise.all(ids)
        //       .then(animeData => res.render('index.ejs', {animeData}))
            

        // })



app.get("/", (req, res) => {
    db.collection("anime").find().toArray()
    .then(data => {
        res.render("index.ejs", {info: data})
        
    })
    .catch(error => console.error(error))
})











app.post("/addAnime", (req, res) => {
    db.collection("anime").insertOne(req.body)
    .then(result => {
        console.log("Anime added")
        res.redirect("/")
    })
    .catch(error => console.error(error))
})


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