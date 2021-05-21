<template>
  <div>
    <!-- 만 :checked="bool" -->
    <input type="checkbox"  @click="updateChoice" :id="movie.id" :value="movie.id" :checked="inMyList">
    <label :for="movie.id">{{ movie.title }}</label>
  </div>
</template>

<script>
export default {
  name: 'ChoiceMovieItem',
  props: {
    movie: {
      type: Object,
    }
  },
  data: function () {
    return {
      inMyList: false,
    }
  },
  methods: {
    updateChoice: function () {
      this.$store.dispatch('updateChoice', this.movie.id)
    }
  },
  created: function () {
    if (this.$store.state.myChoice.includes(this.movie.id)) {
      this.inMyList = true
    }
    else {
      this.inMyList = false
    }
  }
}
</script>

<style>

</style>