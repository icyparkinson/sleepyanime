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
            await Anime.create({todo: req.body.todoItem, userId: req.user.id})
            console.log('Anime has been added!')
            res.redirect('/animes')
        }catch(err){
            console.log(err)
        }
    },


    deleteAnime: async (req, res)=>{
        try{
            await Anime.findOneAndDelete({animeTitle: req.body.animeTitleS})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
}    