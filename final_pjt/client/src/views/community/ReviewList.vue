<template>
  <div>
    <h2>커뮤니티</h2>
    <button @click="createReview">글 쓰기</button>
    <ul>
      <li v-for="review in reviews" :key="review.pk" @click="getReviewDetail(review)">
        <h3>제목 : {{ review.title }} ({{ review.comment_count }})</h3>
        <h4>리뷰 대상 영화 : {{ review.movie_title }}</h4>
        <!-- <h5 class="text-muted"> 유저 번호 : {{ review.user }}</h5> -->
        <p>{{ review.pk }}</p>
        <p></p>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'ReviewList',
  methods: {
    getReviewDetail: function (review) {
      this.$store.dispatch('getReviewDetail', review.pk)
      this.$router.push({ name: "ReviewDetail", params: { pk: review.pk }})
    },
    createReview: function () {
      this.$router.push({ name: "CreateReview" })
    }
  },
  computed: {
    reviews: function () {
      const sortReviews = this.$store.state.reviews.slice(0).sort(function (a, b) {
        return b.pk - a.pk
      })
      return sortReviews
    }
  },
  created: function () {
    this.$store.dispatch('getReviews')
  },
}
</script>

<style>

</style>