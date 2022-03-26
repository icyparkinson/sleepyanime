// DELETE BUTTON //
const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAnime)
})

async function deleteAnime(){
    const aniTitle = this.parentNode.childNodes[5].innerText
    const stDate = this.parentNode.childNodes[11].innerText
    try{
        const response = await fetch('deleteAnime', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'animeTitleS': aniTitle,
              'startDateS': stDate
            })
          })
        const data = await response.json()
        console.log(data)
        window.location.reload(true)

    }catch(err){
        console.log(err)
    }
} 


// ADD ANIME // 
document.querySelector("#animeButton").addEventListener("click", addTitle)

async function addTitle(){


  //Get the MAL ID from the link
  console.log("clicked")
  let link = document.querySelector("#link").value
  console.log(link)
  let numberID = link.split("/")[4]
  console.log(numberID)

  //Use the MAL ID to fetch from JIKAN API
  await fetch(`https://api.jikan.moe/v4/anime/${numberID}`)

    .then(res => res.json())
    .then(anime => {

          // Set up variables to make things easier to read
          console.log(`${anime.data.title} added to database!`)
          let animeSel = document.querySelector("#selector").value
          let animeDate = document.querySelector("#date").value
          
          // Create an async function to fetch
          async function postAnime(){
          await fetch("/addAnime", {
         
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "animeTitle": anime.data.title,
              "animeImgUrl" : anime.data.images.jpg.large_image_url,
              "startDate" : animeDate,
              "selector" : animeSel,
           }) 
          } 
           ) 
           // Refresh the page to see the new addition
           window.location.reload(true)
          }
           postAnime()
       })
       
    .catch(err => {
      console.log(`error ${err}`)
  })

}