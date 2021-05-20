<template>
  <div>
    <h2>개봉 예정작</h2>
    <ul>
      <UpComingItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </ul>
  </div>
</template>

<script>
import UpComingItem from '@/components/UpComingItem.vue'

export default {
  name: 'UpComing',
  components: {
    UpComingItem
  },
  methods: {
    getUpComingList: function () {
      this.$store.dispatch('getUpComingList')
    }
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

</style>