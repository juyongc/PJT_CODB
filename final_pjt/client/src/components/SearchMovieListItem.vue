<template>
<div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 mt-3">
        <div class="card" v-b-modal="movie.title" @click="showModal" style="background-color:rgb(35, 30, 30); border:1px solid rgb(35, 30, 30)">
          <div class="row g-0">
            <div class="col-md-2">
              <img class="card-img-left" :src="movie_poster" alt="movie poster">
            </div>
            <div class="col-md-10">
              <div class="px-3 py-5">
                <h4 class="card-title fw-bold">{{ movie.title }}</h4>
                <p>{{ movie.release_date }}</p>
                <p class="card-text ">{{ movie.overview }}</p>
              </div>
            </div>
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
  name: 'SearchMovieListItem',
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
  methods:{
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
.card-img-left {
  width: 100%;
  max-height: 100% !important;
  height: 100%;
  /* object-fit: contain; */
}

/* .searchImg {
  height: 100% !important;
} */
</style>
