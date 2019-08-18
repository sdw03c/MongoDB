$(".btn-success").on("click", function(){
  // alert("here")
   id = this.value
   console.log(id)
   $.ajax("/saved/" + id, {
     type: "PUT",
     data: id
   }).then(function(){
 window.location = self.location
 location.reload(true)
 console.log(`Changed to eaten: ${id}`)
 })
 $(document).ajaxStop(function(){
 window.location.reload();
 })
 })

 $(".btn-danger").on("click", function(){
  // alert("here")
   id = this.value
   console.log(id)
   $.ajax("/delete/" + id, {
     type: "PUT",
   //  data: id
   }).then(function(){
 })
 //window.location = self.location
 //location.reload(true)
 $(document).ajaxStop(function(){
 window.location.reload();
 })
 console.log(`ID: ${id}`)
 })
 
 
 
 //$(document).ajaxStop(function(){
 //window.location.reload();
 //})
 
 
 
 
 
 $(".btn-warning").on("click", function(event){
   event.preventDefault()
   id = this.value
 
   console.log(id)
 $.ajax("/saved/notes/" + id, {
   type: "GET"
  }).then(function(data){
    $("#notes").html("")
    console.log(data)
 let articleID = $("#modal-title").html("Notes for Article: " + id)
 let saveButton = $("#save-note").attr('value', id)
 
 if(data[0].note.length){
 for(i=0; i<data[0].note.length; i++){
 noteList = $("<li id='test' class='list-group-item'></li>").html(data[0].note[i].body + "<input type='button' style = 'float:right' class='btn btn-danger delete-Note' value='X'>")
 $(noteList).appendTo(".note-container")
          console.log(data[0].note[i].body)
         console.log(noteList)
          
 }
}
else{
  $("#notes").html("You do not have any notes saved for this Article")
}
 console.log($(".list-group-item").attr('value'))
                     console.log(id + "herer")
                     console.log(data[0]._id)
                     console.log(saveButton)
                     console.log(data[0].note)
                
             });
         });
 //window.location = self.location
 //location.reload(true)
 //console.log(`Changed to eaten: ${id}`)
 
 $(".saved").on("click", function(){
  console.log($("#save-note").attr('value'))
  id = $("#save-note").attr('value')
  articleNoteInfo = {
  body: $("#new-note").val().trim()
  }
  $.ajax("/saved/notes/" + id, {
    type:"POST",
    data: articleNoteInfo
  
  }).then(function(data){
  console.log(data)
  })
    console.log(id)
    console.log(articleNoteInfo.body)
  })