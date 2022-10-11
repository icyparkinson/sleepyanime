// DELETE BUTTON //
const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAnime)
})

async function deleteAnime(){
    const animeID = this.parentNode.dataset.id
    let check = confirm("Are you sure you want to delete this anime?")
    if (check == true){
              try{
                  const response = await fetch('animes/deleteAnime', {
                      method: 'delete',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        'dbID': animeID
                      })
                    })
                  const data = await response.json()
                  console.log(data)
                  window.location.reload(true)

              }catch(err){
                  console.log(err)
              }
          } 
          
}

let linkInput = document.querySelector("#link")
// LISTENS FOR CLICK ON SUBMIT // 
document.querySelector("#animeButton").addEventListener("click", addTitle)

// ALLOWS USER TO PRESS ENTER KEY TO SUBMIT //

linkInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13){
    addTitle()
  }
})

// ADD ANIME //


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
          await fetch("/animes/addAnime", {


         
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "animeTitle": anime.data.title,
              "animeImgUrl" : anime.data.images.jpg.image_url,
              "startDate" : animeDate,
              "selector" : animeSel,
              "animeURL" : anime.data.url,
              "altTitle" : anime.data.title_english,
              "animeTime" : anime.time,
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


// SEARCH BAR //

function searchAnime(){
  let searchInput = document.getElementById("searchBar").value
  searchInput = searchInput.toLowerCase()

  let searchFor = document.querySelector("input[name='searchFor']:checked").value 

  let x = document.getElementsByClassName("searchVal")
  let y = document.getElementsByClassName("altTitleCol")
  let z = document.getElementsByClassName("selCol")

if (searchFor === "forTitle"){
  for (let i = 0; i < x.length; i++){
    x[i].parentNode.parentNode.style.display="contents"
    if (!x[i].innerHTML.toLowerCase().includes(searchInput)){
      x[i].parentNode.parentNode.style.display="none"
    }
  }
} else if (searchFor === "forSel"){
  for (let i = 0; i < z.length; i++){
    z[i].parentNode.parentNode.style.display="contents"
    if (!z[i].innerHTML.toLowerCase().includes(searchInput)){
      z[i].parentNode.parentNode.style.display="none"
    }
  }
}

  
}