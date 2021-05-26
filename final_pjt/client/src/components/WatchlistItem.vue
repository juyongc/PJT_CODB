<template>
  <div>
    <p>{{movie.title}}</p>
    <img v-b-modal="movie.title" @click="showModal" class="movieImg"  :src="'https://www.themoviedb.org/t/p/original/' + movie.poster" alt="">
    <p>{{movie.movieid}}</p>

    <Modal 
      v-if="isModal" 
      :movie="movie"
      @close-modal="isModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
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
    }
  },
  methods: {
    searchMovie: function () {
      console.log(this.movie.title)
      this.$store.dispatch('searchDetail', this.movie.movieid)
      this.$router.push({ name: 'SearchMovieDetail', params: { title: this.movie.title }})
    },
    showModal: function () {
      this.isModal = true
      this.$store.dispatch('getImages', this.movie.movieid)
    },
  },
  created() {
    console.log(this.movie.movieid)
  }
}
</script>
<style>

</style>