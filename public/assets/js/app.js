$("#scrape-articles").on("click", function(event){
event.preventDefault()

$.ajax("/scraped", {
    type: "GET", 
    data:
})
})


$(".btn-default").on("click", function(){
    console.log("here")
  //event.preventDefault()
  var 

  var updateBurger = {
  eatenVariable: 1,
  newBurger: this.value
  }
  console.log(`${updateBurger.newBurger} and ${updateBurger.eatenVariable} `)
  $.ajax("/api/burger/", {
    type:"PUT",
    data:updateBurger
  }).then(function(){
  console.log(`Changed to eaten: ${updateBurger} + ${updateBurger.newBurger}`)
  window.location = self.location
  location.reload(true)
  })
  })   