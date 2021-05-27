<template>
  <div id="MovieCurrent">
    <h2 class="text-center mb-4">현재 상영작</h2>
      <div class="row">
        <div class="col-md-9">

           
          <!-- <template>
            <div class="card-group"> -->

            <carousel
              :perPage="2"
              :autoplay="true"
            >
            <slide v-for="movie in tmdbCurrent" :key="movie.id">
              <img :src="'https://www.themoviedb.org/t/p/original/' + movie.poster_path" alt="" height="480" width="auto">
              <!-- <span>{{ movie.title }}</span> -->
            </slide>
              <!-- <MovieCurrentItem 
                v-for="movieName in currentList" 
                :key="movieName.rnum"
                :movieName="movieName"
              /> -->
            </carousel>
            <!-- </div>
          </template> -->

        </div>
        <div class="col-md-3">
          <h4 class="text-center">순위</h4>
          <ul class="list-group" 
            v-for="(movieName, idx) in currentList" 
            :key="movieName.rnum"
            :movieName="movieName">
            <li class="list-group-item"><b>{{ idx+1 }}위</b> {{ movieName.movieNm }}</li>
          </ul>
        </div>
      </div>
      
    
  </div>
</template>

<script>
import axios from 'axios'
// import MovieCurrentItem from '@/components/MovieCurrentItem.vue'
// import VueCarousel from '@chenfengyuan/vue-carousel.vue'

export default {
  name: 'MovieCurrent',
  components: {
    // MovieCurrentItem,
  },
  data: function () {
    return {
      currentList: [],
      tmdbCurrent: [],
      today: this.$moment().format('YYYYMMDD'),
      yesterday: this.$moment(this.today).subtract(1, 'days').format('YYYYMMDD'),

      
    }
  },
  methods: {
    
  },
  created() { 
      // const KOFIC_KEY = process.env.VUE_APP_KOFIC_API_KEY
      const KOFIC_URL = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'
      const params = {
        key: '04455cff29ada04fa486cc61ac4f0e9d',
        targetDt: this.yesterday,
      }
      axios({
        url: KOFIC_URL,
        method: 'GET',
        params,
      })
      .then(response => {
        this.currentList = response.data.boxOfficeResult.dailyBoxOfficeList
        for (let movie of this.currentList) {
          axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/search/movie?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&query=${movie.movieNm}&include_adult=false`,
          })
          .then(res => {
            if (res.data.results.length > 1 && res.data.results) {
              const sortReviews = res.data.results.slice(0).sort(function (a, b) {
                return b.release_date - a.release_date
              })
              this.tmdbCurrent = this.tmdbCurrent.concat(sortReviews[0])
            }
            else {
              this.tmdbCurrent = this.tmdbCurrent.concat(res.data.results)
            }
          })
          .catch(err => {
              console.log(err)
            })
          }
      })
      .catch(error => {
        return console.log(error)
      })

      // var xhr = new XMLHttpRequest(); 
      // var url = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&nation=대한민국'); 
      // /*URL*/ 
      // var queryParams = '?' + encodeURIComponent('ServiceKey=서비스키'); 
      // /*Service Key*/ 
      // queryParams += '&' + encodeURIComponent('val001') + '=' + encodeURIComponent('2018')); 
      // /*상영년도*/ 
      // queryParams += '&' + encodeURIComponent('val002') + '=' + encodeURIComponent('01')); 
      // /*상영월*/
      // xhr.open('GET', url + queryParams); 
      // xhr.onreadystatechange = function () { 
      //   if (this.readyState == 4) { 
      //     alert('Status: '+this.status+'Headers: '+JSON.stringify(this.getAllResponseHeaders())+'Body: '+this.responseText);
      //     } 
      //   }; 
      //   xhr.send('');



        // this.furl = `${KOFIC_URL}?key=${params.key}&targetDt=${params.targetDt}`
        // console.log(this.furl)
        // return this.furl

  }

}
</script>

<style>
.card-group {
  border-color: black;
  border-style: double;
}
.label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.VueCarousel-slide {
  position: relative;
  background: #42b983;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
}
</style>