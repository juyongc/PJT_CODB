<template>
  <div id="ChoiceMovie">
    <div class="d-flex justify-content-between my-4">
      <h2 class="d-inline">Choose your favorite movie</h2>
      <button type="button" class="btn btn-secondary mb-4 d-inline" @click="completedChoice">Selection done</button>
    </div>
    <div class="row">
      <div class="sidebar order-md-last col-12 col-md-2 ">
        <h4>Selected movie</h4>
        <ul class="list-group" v-for="myMovie in myChoice" :key="myMovie.id">
          <li class="list-group-item">{{ myMovie.title }}</li>
        </ul>
      </div>
      <div class="container-fluid col-12 col-md-10">
        <div class="row row-cols-1 row-cols-md-4 g-4">  
          <ChoiceMovieItem
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </div>

    <div class="pagination justify-content-center my-4">
      <button v-if="this.$store.state.page > 1" type="button" class="btn btn-outline-primary" @click="previousPage">&lt;</button>
      <button v-else type="button" class="btn btn-outline-secondary disabled">&lt;</button>
      <span class="pt-2 mx-2">{{ this.$store.state.page }} page</span>
      <button v-if="this.$store.state.page < 10" type="button" class="btn btn-outline-primary" @click="nextPage">&gt;</button>
      <button v-else type="button" class="btn btn-outline-secondary disabled">&gt;</button>
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
</style>