<template>
  <div class="card">
    <img :src="tmdbURL" alt="">
    <div class="card-body">
      <h5 class="card-title">{{ movieName.movieNm }}</h5>
      <p class="card-text">-</p>
    </div>
  </div>

  <!-- <div>
    <div class="carousel-item active">
      <img :src="tmdbURL" class="d-block w-10" alt="">
    </div>
    
    <b-carousel-slide>

      <template #img>
        <img :src="tmdbURL">
      </template>

    </b-carousel-slide>
    <p>{{this.engtitle}}</p>
  </div> -->

</template>

<script>
import axios from 'axios'
export default {
  name: 'MovieCurrentItem',
  data: function () {
    return {
      moviePosters: [],
      moviePoster: [],
      imgURL: null,
      tmdbURL: null,
      engtitle: null,
      qvalue: null,
    }
  },
  props: {
    movieName: {
      type: Object,
      require: true,
    }
  },
  created() {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/movies/poster/',
        data: {poster_title: this.movieName.movieNm},
      })
      .then(response => {
        this.moviePoster = response.data
        // console.log(this.moviePoster)
        this.moviePosters.push(this.moviePoster[0])
        this.tmdbURL = 'https://www.themoviedb.org/t/p/original/' + this.moviePoster[0]['poster_path']
        return this.tmdbURL
      })
      .catch(error => {
        return console.log(error)
      })
  }
}
</script>

<style>
/* .carousel-item img {
  width: 10vh !important ;
  height: 10vh !important;
} */

</style>