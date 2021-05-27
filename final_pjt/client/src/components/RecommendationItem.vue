<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 mt-3">
        <div class="card h-100" v-b-modal="movie.title" @click="showModal" style="background-color:rgb(35, 30, 30); border:1px solid rgb(35, 30, 30)">
          <div class="row g-0">
            <div class="col-md-2">
              <img class="reco-img-left" :src="movie_poster" alt="movie poster">
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
h4,p {
  color: rgb(220, 220, 220);
}

.reco-img-left {
  width: 100%;
  max-height: 100% !important;
  height: 100%;
  /* height: 15vw; */
  /* object-fit: contain; */
}

/* 줄거리 5줄 요약 */
.card-text {
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
/* 이미지 카드 크기 100% 맞추기 */
/* .recoImg {
  height: 100% !important;
} */
</style>