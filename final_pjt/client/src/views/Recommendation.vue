<template>
  <div class="Recommendation">
    <h2>추천 영화</h2>
    <div v-if="movies.length > 0">
      <h3>추천 영화 목록</h3>
      <button @click="reload">다른 추천 영화 보기</button>
      <ul>
        <RecommendationItem
          v-for="movie in movies.slice(0, 20)"
          :key="movie.id"
          :movie="movie"
        />
      </ul>
      <hr>
      <p @click="choiceMovie">좋아하는 영화 추가하기</p>
    </div>
    <div v-else @click="choiceMovie">
      <p>
        추천하기 위한 데이터가 부족합니다, 
      </p>
      <p>
        좋아하는 영화를 선택해 추천 영화를 받아보세요!
      </p>
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
  }
}
</script>

<style>

</style>

