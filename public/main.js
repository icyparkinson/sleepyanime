const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAnime)
})

async function deleteAnime(){
    const animeID = this.parentNode.childNodes[1].innerText
    const aName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteAnime', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'animeIDS': animeID,
              'animeNameS': aName
            })
          })
        const data = await response.json()
        console.log(data)
        window.location.reload(true)

    }catch(err){
        console.log(err)
    }
} 



document.querySelector("#animeButton").addEventListener("click", addNumber)

async function addNumber(){
    console.log("clicked")
    let link = document.querySelector("#link").value
    console.log(link)
    let numberID = link.split("/")[4]
    console.log(numberID)
    let animeSel = document.querySelector("#selector").value
    let animeDate = document.querySelector("#date").value
     
     await fetch('/addAnime', {
         
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "animeId": numberID,
        "selector" : animeSel,
        "startDate" : animeDate,
     }) 
    }
     )}




// function fetchMongo(){

  
//     fetch(`https://api.jikan.moe/v4/anime/${number}`)
  
//       .then(res => res.json())
//       .then(anime => {
//             console.log(anime.data.images.jpg.image_url)
//             document.querySelector("img").src = anime.data.images.jpg.image_url
//          })

        
//       .catch(err => {
//         console.log(`error ${err}`)
//     })
//   }
