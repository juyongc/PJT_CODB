<template>
  <div id="Recommendation">
    <h2 class="mb-4">Featured Movie</h2>
    <div v-if="movies.length > 0">
      <div class="d-grid gap-2 d-md-block">
        <button @click="reload" type="button" class="btn btn-secondary">Other Featured Movies</button>
        <button @click="choiceMovie" type="button" class="btn btn-secondary">To get more recommendations</button>
      </div>
      <div class="container-fluid">
        <RecommendationItem
          v-for="(movie, index) in movies.slice(0, 20)"
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
}
</style>

