<template>
  <div>
    <h3>좋아하는 영화를 선택하세요</h3>
    <!-- 선택한 영화들을 한 눈에 볼 수 있는 리스트? 필요 -->
    <div class="row row-cols-1 row-cols-md-4 g-4">  
      <ChoiceMovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <button v-if="this.$store.state.page > 1" @click="previousPage">이전 페이지</button>
    <button @click="nextPage">다음 페이지</button>
    <hr>
    <button @click="completedChoice">선택 완료</button>
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
  }

}
</script>

<style>

</style>