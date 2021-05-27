<template>
  <div>
    <h2 class="my-4 pt-4 fw-bold text-warning">Upcoming Movies
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
    </h2>
    

    <!-- <div class="row g-2">
      <UpComingItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div> -->


          <div class="carousel">
            <div class="carouselbox" ref="carousel">
              <div v-for="movie in movies" :key="movie.id" :movie="movie">
                <img 
                  :src="'https://www.themoviedb.org/t/p/original/' + movie.poster_path" alt=""
                  v-b-modal="movie.title"
                  @click="showModal(movie)"
                  ref="img"
                >
                <Modal 
                  :movie="movie"
                  @close-modal="isModal = false"
                />
              </div>
              
            </div>
            <a class="switchLeft sliderButton text-light" @click="sliderScrollLeft">&lt;</a>
            <a class="switchRight sliderButton text-light" @click="sliderScrollRight">&gt;</a>
          </div>
  </div>
</template>

<script>
// import UpComingItem from '@/components/UpComingItem.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'UpComing',
  components: {
    // UpComingItem
    Modal
  },
  data: function () {
    return {
      // sliders: document.querySelector(".carouselbox"),
      scrollAmount: 0,
      scrollPerClick: 0,
      isModal: false, 
    }
  },
  methods: {
    showModal: function (movie) {
      this.isModal = true
      this.$store.dispatch('getImages', movie.id)
      this.$store.dispatch('getCredits', movie.id)
    },
    getUpComingList: function () {
      this.$store.dispatch('getUpComingList')
    },
    sliderScrollLeft: function () {
      this.$refs.carousel.scrollTo({
        top: 0,
        left: (this.scrollAmount -= this.$refs.img[0].clientWidth+40),
        behavior: "smooth",
      });

      if (this.scrollAmount < 0) {
        this.scrollAmount = 0;
      }
    },
    sliderScrollRight: function () {
      if (this.scrollAmount <= this.$refs.carousel.scrollWidth - this.$refs.carousel.clientWidth) {
        this.$refs.carousel.scrollTo({
          top: 0,
          left: (this.scrollAmount += this.$refs.img[0].clientWidth+40),
          behavior: "smooth",
        });
      }
    },
  },
  created: function () {
    this.getUpComingList()
  },
  computed: {
    movies: function () {
      const tmpArray = this.$store.state.upComingList
      return tmpArray.slice(0, 10)
    }
  }
}
</script>

<style scoped>
.carousel {
  height: 250px;
  width: 100%;
  position: relative;
}
.carousel .switchLeft,
.carousel .switchRight {
  color: white;
  text-decoration: none;
  font-weight: bold;
  height: 100%;
  width: 45px;
  line-height: 250px;
  font-size: 25px;
  text-align: center;
  background-color: black;
  font-family: sans-serif;
  top: 0;
  z-index: 3;
}

.carousel .switchLeft {
  position: absolute;
  left: -50px;
}

.carousel .switchRight {
  position: absolute;

  right: -50px;
}

.carouselbox {
  height: 300px;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-align: center;
  padding-bottom: 10px !important;
  display: flex;
  align-items: center;
}

.carouselbox img {
  min-width: 147px;
  max-width: 147px;
  height: 200px;
  background-size: cover;
  background-color: lightgreen;
  margin: 5px 10px;
  cursor: pointer;
  transition: 0.5s ease;
  z-index: 2;

  /* margin: 15px; */
}

.carouselbox img:hover {
  transform: scale(1.4);
  z-index: 5;
}
</style>