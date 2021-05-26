<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="card" v-b-modal="movie.title" @click="showModal">
          <div class="row g-0">
            <div class="col-md-2">
              <img class="card-img-left img-fluid" :src="movie_poster" alt="movie poster">
            </div>
            <div class="col-md-10 p-3">
              <h4 class="card-title">{{ movie.title }}</h4>
              <p class="text-muted">{{ movie.release_date }}</p>
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal 
    v-if="isModal" 
    :movie="movie"
    @close-modal="isModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'RecommendationItem',
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
      type: Object,
    }
  },
  methods: {
    clickList: function () {
      // console.log(this.movie.title)
      this.$store.dispatch('searchDetail', this.movie.id)
      this.$router.push({ name: 'SearchMovieDetail', params: { title: this.movie.title }})
    },
    showModal: function () {
      this.isModal = true
      this.$store.dispatch('getImages', this.movie.id)
      this.$store.dispatch('getCredits', this.movie.id)
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