<template>
  <div>
    <p>{{movie.title}}</p>
    <img v-b-modal="movie.title" @click="showModal" class="movieImg"  :src="'https://www.themoviedb.org/t/p/original/' + movie.poster" alt="">
    <p>{{movie.movieid}}</p>

    <Modal 
      v-if="isModal" 
      :movie="movieData"
      @close-modal="isModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import axios from 'axios'
export default {
  name: 'WatchlistItem',
  components: {
    Modal,
  },
  props: {
    movie: {
      type: Object,
    }
  },
  data: function () {
    return {
      isModal: false,
      movieData: [],
    }
  },
  methods: {
    showModal: function () {
      this.isModal = true
      this.$store.dispatch('getImages', this.movie.movieid)
      this.$store.dispatch('getCredits', this.movie.movieid)
    },
  },
  created() {
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.movie.movieid}?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR`
      })
      .then(res => {
        this.movieData = res.data
        return this.movieData
      })
      .catch(err => (
        console.log(err)
      ))
  }
}
</script>
<style>
.movieImg {
  width: 10%;
  height: auto;
}
</style>