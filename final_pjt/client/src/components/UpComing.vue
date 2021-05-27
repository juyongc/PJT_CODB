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