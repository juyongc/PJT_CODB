<template > 
<!-- 위에 스타일 사용 -->
<div >
  <b-modal content-class="my-class" :id="movie.title" size="lg" hide-header-close @ok="goReviews">
    <template #modal-header>
      <div>
        <h3>{{ movie.title }}</h3>
        <h5 class="d-inline">{{ movie.original_title }} | </h5>
        <h5 class="d-inline">{{ movie.release_date}}</h5>
      </div>
      <button class="btn">
        <p @click="CallWatchlist" v-if="like" style="color: #dc3545;" class="align-text-top">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
          </svg>
        </p>
        <p @click="CallWatchlist" v-if="!like" style="color: #dc3545;" class="align-text-top">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
          </svg>
        </p>
      </button>
    </template>
    
    <div class="d-block">
      <template>
        <div>
          <b-carousel
            id="carousel-1"
            :interval="4000"
            no-animation
            controls
            img-width="1024"
            img-height="480"
          >
            <b-carousel-slide class="img-thumbnail" v-for="(img, index) in imgs" :key="index" :img-src="img"></b-carousel-slide>
          </b-carousel>
        </div>
      </template>
      <div v-if="this.$store.state.credits">
        <br>
        <p>{{ movie.overview }}</p>

        <span class="fw-bold text-warning">Director: </span>
        <div class="d-inline" v-for="crew in this.$store.state.credits.crew" :key="crew.credit_id">

          <span v-if="crew.department === 'Directing'">{{ crew.name }} | </span>
        </div>
        <br>
        <span class="fw-bold text-warning">Stars: </span>
        <div class="d-inline" v-for="cast in this.$store.state.credits.cast" :key="cast.credit_id">
          <span v-if="cast.popularity > 5">{{ cast.name }} |  </span>
        </div>
      </div>

    </div>
    <template #modal-footer="{ ok, close }">

      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="ok()">
        Review
      </b-button>
      <b-button size="sm" variant="secondary" @click="close()">
        Close
      </b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Modal',
  data: function () {
    return {
      like: null,
    }
  },
  props: {
    movie: {
      type: Object
    }
  },
  // watchlist용 추가
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    CallWatchlist: function () {
      if (!this.$store.state.isLogin) {
        this.$router.push({ name: 'Login' })
      }
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/',
        data: {
          title: this.movie.title,
          movieid: this.movie.id,
          poster: this.movie.poster_path
        },
        headers: this.setToken()
      })
      .then((res) => {
        this.like = res.data
      })
    },
    goReviews: function () {
      this.$router.push({ name: 'CreateReview' })
    }
  },
  created() {
    // console.log(this.movie)
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/check/',
        data: {
          title: this.movie.title,
          movieid: this.movie.id,
          poster: this.movie.poster_path
        },
        headers: this.setToken()
      })
      .then((res) => {
        this.like = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    imgs: function () {
      const imgs = this.$store.state.backdropsImg.map(x => 'https://www.themoviedb.org/t/p/original/' + x)
      return imgs
    },
    // casts: function () {
    //   return this.$store.state.credits.cast.filter(function (cast) {
    //     return cast.popularity > 5
    //   })
    // },
    // crews: function () {
    //   return this.$store.state.credits.crew.filter(function (crew) {
    //     return crew.department === 'Directing'
    //   })
    // }
  },
}
</script>

<style scoped>
/deep/ .my-class {
  background: rgb(50, 50, 50);
  color: rgb(230, 230, 230);
}

</style>