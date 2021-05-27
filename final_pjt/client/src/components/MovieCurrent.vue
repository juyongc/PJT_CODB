<template>
  <div id="MovieCurrent">
    <h2 class="mb-4 fw-bold text-warning">
      Boxoffice Today
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
    </h2>
      <div class="row">
        <div class="col-md-9">
          <carousel
            :perPage="2"
            :autoplay="true"
            :loop="true"
            paginationColor="#3c3c3c" paginationActiveColor="white"
          >
            <slide v-for="movie in tmdbCurrent" :key="movie.id">
              <img :src="'https://www.themoviedb.org/t/p/original/' + movie.poster_path" alt="" height="480" width="auto">
            </slide>
          </carousel>
        </div>

        <div class="col-md-3">
          <h5 class="text-warning fw-bold mb-4">Top Boxoffice</h5>
            <div class="list-group list-group-flush" >
              <button class="list-group-item border-warning" 
                v-for="(movie, idx) in tmdbCurrent" 
                :key="movie.id" 
                :movie="movie"
                v-b-modal="movie.title"
                @click="showModal(movie)">
              <Modal 
                :movie="movie"
                @close-modal="isModal = false"
              />
              <div class="text-start">
                <b class="text-light pe-3">{{ idx+1 }}위</b> 
                <span class="fw-light text-light">{{ movie.title }}</span>
              </div>
              <!-- <hr style="color: rgb(255,193,7); border: 1px rgb(255,169,0); opacity: 1"> -->
              </button>
            </div>
        </div>
      </div>
      
    
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'

export default {
  name: 'MovieCurrent',
  components: {
    Modal
  },
  data: function () {
    return {
      currentList: [],
      tmdbCurrent: [],
      today: this.$moment().format('YYYYMMDD'),
      yesterday: this.$moment(this.today).subtract(1, 'days').format('YYYYMMDD'),

      isModal: false,      
    }
  },
  methods: {
    showModal: function (movie) {
      this.isModal = true
      this.$store.dispatch('getImages', movie.id)
      this.$store.dispatch('getCredits', movie.id)
    },
  },
  created() { 
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
  }
}
</script>

<style scoped>
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
  background: none;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
}
.list-group-item {
  background-color: black;
}
img {
  border-radius: 3%;
}

</style>