<template>
  <div class="col-3">
    <img v-b-modal="movie.title" @click="showModal" :src="movie_poster" alt="" class="img-fluid img-thumbnail">

    <Modal 
    v-if="isModal" 
    :movie="movie"
    @close-modal="isModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'UpcomingItem',
  components: {
    Modal,
  },
  data: function () {
    return {
      isModal: false,
    }
  },
  props: {
    movie: {
      type: Object
    }
  },
  methods: {
    searchMovie: function () {
      // console.log(this.movie.title)
      this.$store.dispatch('searchDetail', this.movie.id)
      this.$router.push({ name: 'SearchMovieDetail', params: { title: this.movie.title }})
    },
    showModal: function () {
      this.isModal = true
      this.$store.dispatch('getImages', this.movie.id)
    },
  },
  computed: {
    movie_poster: function () {
      return 'https://www.themoviedb.org/t/p/original/' + this.movie.poster_path
    },
  }
}
</script>

<style>

</style>