<template>
  <li>
    <h5>{{ movie.title }}</h5>
  </li>
</template>

<script>
export default {
  name: 'UpcomingItem',
  props: {
    movie: {
      type: Object
    }
  },
}
</script>

<style>

</style>