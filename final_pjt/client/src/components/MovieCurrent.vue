<template>
  <div>
    <h2 class="text-center my-4">현재 상영작</h2>
    <MovieCurrentItem
      v-for="movieName in currentList" 
      :key="movieName.rnum"
      :movieName="movieName"
    />
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
      const KOFIC_KEY = process.env.VUE_APP_KOFIC_API_KEY
      const KOFIC_URL = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'
      const params = {
        key: KOFIC_KEY,
        targetDt: this.yesterday,
      }
      axios({
        url: KOFIC_URL,
        method: 'GET',
        params,
      }).then(response => {
        this.currentList = response.data.boxOfficeResult.dailyBoxOfficeList
      }).catch(error => {
        return console.log(error)
      })

      
        // this.furl = `${KOFIC_URL}?key=${params.key}&targetDt=${params.targetDt}`
        // console.log(this.furl)
        // return this.furl

  }

}
</script>

<style>

</style>