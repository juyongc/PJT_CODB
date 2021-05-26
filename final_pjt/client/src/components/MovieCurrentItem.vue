<template>
  <div>
    <!-- <h4>*{{this.movieName.movieNm}}</h4>
    <img :src="tmdbURL" alt=""> -->
    <b-carousel-slide>
      <template #img>
        <img :src="tmdbURL">
      </template>
    </b-carousel-slide>
    <p>{{this.engtitle}}</p>
  </div>
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
      // 문제점 발생: TMDB랑 KOFIC 띄어쓰기 다른 영화 찾기 불가
      // NAVER는 postman은 서치되는데 CORS 해결해야함....
      // client에서 해결방법은 proxy 서버를 구성하면 된다는데
      // 임시방편 느낌이 강함 - 내일 질문하기
      // console.log(this.movieName.movieNm)
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/movies/poster/',
        data: {poster_title: this.movieName.movieNm},
      }).then(response => {
        // console.log('sucess!',response)
        // console.log(response.data)
        this.moviePoster = response.data
        this.moviePosters.push(this.moviePoster[0])
        this.tmdbURL = 'https://www.themoviedb.org/t/p/original/' + this.moviePoster[0]['poster_path']
        // this.imgURL = this.moviePoster[0]['image']
        // this.engtitle = this.moviePoster[0]['subtitle']
        // this.engtitle = this.engtitle.replace('<b>','')
        // this.engtitle = this.engtitle.replace('</b>','')
        // this.engtitle = this.engtitle.replace('&amp;','&')
        // console.log(this.tmdbURL)
        // this.qvalue = this.engtitle
        return this.tmdbURL
      }).catch(error => {
        return console.log(error)
      })

      // console.log(this.qvalue)
      // const params = {
      //   api_key: '7ecf0fa910e1bacb146ddf503cf3ec72',
      //   query: this.engtitle,
      // }
      
      // axios({
      //   method: 'GET',
      //   url: `https://api.themoviedb.org/3/search/movie?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&query=${this.qvalue}&include_adult=false`,
        
      // }).then(response => {
      //   // console.log('sucess!',response)
      //   console.log(response.data)
      // }).catch(error => {
      //   return console.log(error)
      // })

      // const NAVER_KEY = process.env.VUE_APP_NAVER_API_KEY
      // const NAVER_PW = process.env.VUE_APP_NAVER_API_PW
      // const NAVER_URL = 'https://openapi.naver.com/v1/search/movie.json'
      // const headers = {
      //   'X_Naver-Client-Id': NAVER_KEY,
      //   'X-Naver-Client-Secret': NAVER_PW
      // }
      // const params = {
      //   query: this.movieName.movieNm,
      // }
      // axios({
      //   url: NAVER_URL,
      //   method: 'GET',
      //   headers,
      //   params,
      // }).then(response => {
      //   this.moviePoster = response.data
      //   console.log(this.moviePoster)
      //   return this.moviePoster
      // }).catch(error => {
      //   return console.log(error)
      // })

  }
}
</script>

<style>
/* .carousel-item img {
  width: 10vh !important ;
  height: 10vh !important;
} */
</style>