document.addEventListener("DOMContentLoaded",()=>{

    function displayMovieData(){
       //Get request for movie data
       fetch( 'http://localhost:3000/films')
       .then(resp => resp.json())
       .then(movieList => {
          //div element creation that will contanin first movie's details
          const movieDetails = document.createElement('div')
          movieDetails.innerHTML = `
          <img id='firstPoster' src ='${movieList[0].poster}'>
          <h4>Movie title: ${movieList[0].title}</h4>
          <h4>Runtime: ${movieList[0].runtime}</h4>
          <h4>Showtime: ${movieList[0].showtime}</h4>
      `
      const movieDisplay = document.getElementById('movieDetails')
      movieDisplay.appendChild(movieDetails)
    })
 }
 displayMovieData();
 
 //function to display list of other movie names
 function displayMovieListNames(){
    //Get request for movie data
    fetch( 'http://localhost:3000/films')
    .then(resp => resp.json())
    .then(movieList =>{
       //Iteration that displays list of movie names
       movieList.forEach(movie =>{
          const movieItem = document.createElement('li')
          movieItem.innerHTML = `
          ${movie.title}
        `
        const movieListNames = document.getElementById('movieItems')
        movieListNames.appendChild(movieItem)
        //Event listener enabling user to click movie title to display movie details
        movieItem.addEventListener('click', (event) => {
           const moreDetailsList = document.querySelector('#movieDetails');
           moreDetailsList.innerHTML = `
           <img id='firstPoster' src ='${movie.poster}'>
           <h4>Movie title: ${movie.title}</h4>
           <h4>Runtime: ${movie.runtime}</h4>
           <h4>Showtime: ${movie.showtime}</h4>
           <h4>Available tickets:<span id='ticket'> ${movie.capacity - movie.tickets_sold}</span></h4>
           <button id='buyTicket' type="button">Buy Ticket</button>
           `
           //Displays message when available tickets are zero
           if(movie.capacity - movie.tickets_sold<=0){
            moreDetailsList.innerHTML = `
            <img id='firstPoster' src ='${movie.poster}'>
            <h4>Movie title: ${movie.title}</h4>
            <h4>Runtime: ${movie.runtime}</h4>
            <h4>Showtime: ${movie.showtime}</h4>
            <h4>Tickets are SOLD OUT!</h4>
            `
         }
            
           moreDetailsList.querySelector('#buyTicket').addEventListener('click', (event)=>{
              event.preventDefault()
              if(movie.tickets_sold === movie.capacity){
               movieDetails.querySelector('#ticket').textContent= 'SOLD OUT!'
              }else{
              //Updating number of tickets sold and available tickets
              movie.tickets_sold+=1;
              movieDetails.querySelector('#ticket').textContent= movie.capacity - movie.tickets_sold
              updateTicketSold(movie)
              }
         })
           ;
        })
     })
   })
}
displayMovieListNames();


//PATCH request that updates number of tickets sold
 function updateTicketSold(movieObj){
   console.log(movieObj.id)
     fetch('http://localhost:3000/films/'+movieObj.id,{
   method:'PATCH',
   headers:{
   "Content-Type" : "application/json"
   },
   body:JSON.stringify({tickets_sold:movieObj.tickets_sold})
   })   
}
})
