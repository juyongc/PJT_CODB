<template>
  <div>
    <h2 class="my-4 fw-bold">Upcoming Movies
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
    </h2>
    

    <div class="row g-2">
      <UpComingItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>


          <!-- <div class="carousel">
            <div class="carouselbox">
 
              

            </div>

            <a class="switchLeft sliderButton" @click="sliderScrollLeft">&lt;</a>
            <a class="switchRight sliderButton" @click="sliderScrollRight">&gt;</a>
          </div> -->
  </div>
</template>

<script>
import UpComingItem from '@/components/UpComingItem.vue'

export default {
  name: 'UpComing',
  components: {
    UpComingItem
  },
  // data: function () {
  //   return {
  //     sliders: document.querySelector(".carouselbox"),
  //     scrollPerClick: document.querySelector(".img-1").clientWidth + 20,
  //     scrollAmount: 0,
  //   }
  // },
  methods: {
    getUpComingList: function () {
      this.$store.dispatch('getUpComingList')
    },
    // sliderScrollLeft: function () {
    //   this.sliders.scrollTo({
    //     top: 0,
    //     left: (this.scrollAmount -= this.scrollPerClick),
    //     behavior: "smooth",
    //   });

    //   if (this.scrollAmount < 0) {
    //     this.scrollAmount = 0;
    //   }

    //   console.log("Scroll Amount: ", this.scrollAmount);
    // },
    // sliderScrollRight: function () {
    //   if (this.scrollAmount <= this.sliders.scrollWidth - this.sliders.clientWidth) {
    //     this.sliders.scrollTo({
    //       top: 0,
    //       left: (this.scrollAmount += this.scrollPerClick),
    //       behavior: "smooth",
    //     });
    //   }
    //   console.log("Scroll Amount: ", this.scrollAmount);
    // }
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

<style>
.carousel {
  height: 250px;
  width: 80%;
  position: relative;
}
.carousel .switchLeft,
.carousel .switchRight {
  color: black;
  font-weight: bold;
  height: 100%;
  width: 45px;
  line-height: 250px;
  font-size: 25px;
  text-align: center;
  background-color: white;
  font-family: sans-serif;
  top: 0;
  z-index: 3;
  text-decoration: none;
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
  height: 250px;
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