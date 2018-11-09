const express = require('express')
const rp = require('request-promise')
const app = express()

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

let category = ''

app.get('/movie', (req, res) => {
 const option = {
  url:`https://api.themoviedb.org/3/discover/movie?api_key=2a4b3099dad677e428df3e4d028a6e60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${cat}`,
  qs: {
   api_key: '2a4b3099dad677e428df3e4d028a6e60'
  }
 }
 rp(option)
  .then(data => {
   const movieTitle = data.results.map(movie => movie.title)
   res.send(movieTitle)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server is running on port ${port}`))