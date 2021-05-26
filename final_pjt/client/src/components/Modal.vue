<template>
<div>
  <b-modal :id="movie.title" size="xl" hide-header-close ok-title="닫기" ok-only>
    <template #modal-title>
      <h3>{{ movie.title }}</h3>
      <h5>{{ movie.original_title }}</h5>      
      <button @click="CallWatchlist" v-if="!like">좋아요</button>
      <button @click="CallWatchlist" v-if="like">좋아요 취소</button>
    </template>
    <div class="d-block text-center">
      <template>
        <div>
          <b-carousel
            id="carousel-1"
            :interval="4000"
            fade
            background="#ababab"
            controls
            img-width="1024"
            img-height="480"
          >
            <b-carousel-slide v-for="(img, index) in imgs" :key="index" :img-src="img"></b-carousel-slide>
          </b-carousel>
        </div>
      </template>
      <p>감독 까꿍</p>
      <p>주연 배우</p>
      <p>줄거리 : {{ movie.overview }}</p>
    </div>
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
    }
  },
  created() {
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
  },
  computed: {
    imgs: function () {
      const imgs = this.$store.state.backdropsImg.map(x => 'https://www.themoviedb.org/t/p/original/' + x)
      return imgs
    }
  }
}
</script>

<style>

</style>