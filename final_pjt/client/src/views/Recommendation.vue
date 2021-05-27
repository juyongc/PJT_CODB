<template>
  <div id="Recommendation">
    <h2 class="mb-4 text-warning fw-bold">Featured Movie</h2>
    <div v-if="movies.length > 0">
      <div class="d-grid gap-2 d-md-block">
        <button @click="reload" type="button" class="btn btn-secondary">Other Featured Movies</button>
        <!-- <button @click="choiceMovie" type="button" class="btn btn-secondary">To get more recommendations</button> -->
      </div>
      <div class="container-fluid">
        <RecommendationItem
          v-for="(movie, index) in movies.slice(0, 10)"
          :key="index"
          :movie="movie"
        />
      </div>
      <hr>
    </div>
    <div v-else>
      <p>
        There is not enough data to recommend, Choose your favorite movie and get featured movies!
      </p>
      <button @click="choiceMovie" type="button" class="btn btn-secondary">To get more recommendations</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RecommendationItem from '@/components/RecommendationItem'
import _ from 'lodash'

export default {
  name: 'Recommendation',
  components: {
    RecommendationItem,
  },
  computed: {
    movies: function () {
      return this.$store.state.recommendList
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    choiceMovie: function () {
      this.$store.dispatch('choiceMovie', this.$store.state.page)
      this.$router.push({ name: 'ChoiceMovie' })
    },
    reload: function () {
      this.$store.state.recommendList = _.shuffle(this.$store.state.recommendList)
    }
  },
  created: function () {
    // this.$store.state.recommendList = []
    // this.$store.state.myChoice = []
    if (this.$store.state.isLogin) {
      this.$store.dispatch('getReviews')
    }
    else {
      this.$router.push({ name: 'Login' })
    }
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/accounts/',
      headers: this.setToken()
    })
    .then((res) => {
      const similar = res.data
      this.$store.dispatch('makeRecommendation', similar)
    })
  }
}
</script>

<style scoped>
#Recommendation {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
button {
  margin-right: .5rem !important;
  background-color: rgb(50, 50, 50);
  border-color: rgb(50, 50, 50);
}
</style>

