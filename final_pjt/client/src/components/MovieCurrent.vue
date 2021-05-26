<template>
  <div id="MovieCurrent">
    <h2 class="text-center mb-4">현재 상영작</h2>
      <div class="row">
        <div class="col-md-9">

          <template>
            <div class="card-group">
              <!-- <b-carousel
                id="carousel-1"
                :interval="2000"
                fade
                controls
                img-width=1024
                img-height=480
              > -->
                <MovieCurrentItem
                  v-for="movieName in currentList" 
                  :key="movieName.rnum"
                  :movieName="movieName"
                />
              <!-- </b-carousel> -->

              <!-- <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <MovieCurrentItem
                    v-for="movieName in currentList" 
                    :key="movieName.rnum"
                    :movieName="movieName"
                  />
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div> -->
            </div>
          </template>
        </div>
        <div class="col-md-3">
          <h4 class="text-center">순위</h4>
          <ul class="list-group" 
            v-for="(movieName, idx) in currentList" 
            :key="movieName.rnum"
            :movieName="movieName">
            <li class="list-group-item">{{ idx+1 }}위 {{ movieName.movieNm }}</li>
          </ul>
        </div>
      </div>
      
    
  </div>
</template>

<script>
import axios from 'axios'
import MovieCurrentItem from '@/components/MovieCurrentItem.vue'
export default {
  name: 'MovieCurrent',
  components: {
    MovieCurrentItem,
  },
  data: function () {
    return {
      currentList: [],
      today: this.$moment().format('YYYYMMDD'),
      yesterday: this.$moment(this.today).subtract(1, 'days').format('YYYYMMDD'),
    }
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
      }).then(response => {
        this.currentList = response.data.boxOfficeResult.dailyBoxOfficeList
        // console.log(this.currentList)
      }).catch(error => {
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
</style>