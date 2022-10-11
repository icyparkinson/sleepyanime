const Anime = require('../models/Anime')

module.exports = {
    getAnime: async (req,res)=>{
        try{
            const animeTitle = await Anime.find({userId:req.user.id}).sort({startDate: -1})
            res.render('animes.ejs', {animes: animeTitle, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
 

    addAnime: async (req, res)=>{
        try{
            await Anime.create({
                animeTitle: req.body.animeTitle, 
                animeImgUrl : req.body.animeImgUrl,
                startDate : req.body.startDate,
                selector : req.body.selector,
                animeURL : req.body.animeURL,
                altTitle : req.body.altTitle,
                userId: req.user.id})
            console.log('Anime has been added!')
            res.redirect('/animes')
        }catch(err){
            console.log(err)
        }
    },


    deleteAnime: async (req, res)=>{
        console.log(`${req.body.dbID}`)
        try{
            await Anime.findOneAndDelete({_id:req.body.dbID})
            console.log("Deleted anime")
            console.log(`${req.body.dbID}`)
            res.json(`Deleted It`)
        }catch(err){
            console.log(err)
        }
    },
}    