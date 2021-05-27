<template>
  <div id="ChoiceMovie">
    <h2 class="mb-4 text-warning fw-bold">Choose your favorite movie</h2>
    <button type="button" class="mybtn btn btn-secondary" @click="goRecommendation">Done Selected Movies</button>
    <div class="container-fluid">
      <ChoiceMovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div class="pagination justify-content-center my-4">
      <button v-if="this.$store.state.page > 1" type="button" class="mybtn btn btn-primary" @click="previousPage">&lt;</button>
      <button v-else type="button" class="btn btn-secondary disabled">&lt;</button>
      <span class="pt-2 mx-2 text-light">{{ this.$store.state.page }} page</span>
      <button v-if="this.$store.state.page < 10" type="button" class="mybtn btn btn-primary" @click="nextPage">&gt;</button>
      <button v-else type="button" class="btn btn-secondary disabled">&gt;</button>
    </div>

  </div>
</template>

<script>
// 페이지네이션 기능을 추가? 첫번째 페이지 맘에 드는 영화가 없으면 다음 목록을 봐야함
import ChoiceMovieItem from '@/components/ChoiceMovieItem.vue'

export default {
  name: 'ChoiceMovie',
  components: {
    ChoiceMovieItem,
  },
  computed: {
    movies: function () {
      return this.$store.state.choiceList
    },
    myChoice: function () {
      return this.$store.state.myChoice
    }
  },
  methods: {
    goRecommendation: function () {
      this.$router.push({ name: 'Recommendation'})
    },
    previousPage: function () {
      this.$store.commit('PREVIOUS_PAGE')
      this.$store.dispatch('choiceMovie', this.$store.state.page)
    },
    nextPage: function () {
      this.$store.commit('NEXT_PAGE')
      this.$store.dispatch('choiceMovie', this.$store.state.page)
    },
    completedChoice: function () {
      console.log(this.$store.state.myChoice)
      this.$store.dispatch('makeRecommendation')
      this.$router.push({ name: 'Recommendation' })
    }
  },
  created: function () {
    this.$store.state.page = 1
  }

}
</script>

<style>
#ChoiceMovie {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
.mybtn {
  margin-right: .5rem !important;
  background-color: rgb(50, 50, 50) !important;
  border-color: rgb(50, 50, 50) !important;
}
</style>