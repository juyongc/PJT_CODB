<template>
<div>
  <b-modal :id="movie.title" size="xl" hide-header-close ok-title="닫기" ok-only>
    <template #modal-title>
      <h3>{{ movie.title }}</h3>
      <h5>{{ movie.original_title }}</h5>
    </template>
    <div class="d-block text-center">
      <template>
        <div>
          <b-carousel
            id="carousel-1"
            :interval="4000"
            fade
            background="#ababab"
            controls
            img-width="1024"
            img-height="480"
          >
            <b-carousel-slide v-for="(img, index) in imgs" :key="index" :img-src="img"></b-carousel-slide>
          </b-carousel>
        </div>
      </template>
      <p>감독 까꿍</p>
      <p>주연 배우</p>
      <p>줄거리 : {{ movie.overview }}</p>
    </div>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    movie: {
      type: Object
    }
  },
  computed: {
    imgs: function () {
      const imgs = this.$store.state.backdropsImg.map(x => 'https://www.themoviedb.org/t/p/original/' + x)
      return imgs
    }
  }
}
</script>

<style>

</style>