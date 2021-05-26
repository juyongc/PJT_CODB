<template>
  <div id="ReivewList">

    <div class="d-flex justify-content-between my-4">
      <h2 class="d-inline">Movie Review Community</h2>
      <button class="btn btn-secondary mb-4 d-inline" @click="createReview">New Review</button>
    </div>

    <div class="list-group" v-for="review in reviews" :key="review.pk">
      <a @click="getReviewDetail(review)" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ review.title }}</h5>
          <small>{{ ago(review.created_at) }}</small>
        </div>
        <p class="mb-1">{{ review.movie_title }}</p>
        <small>{{ review.username }} | {{ review.comment_count }}</small>
      </a>
    </div>

    <!-- <ul>
      <li v-for="review in reviews" :key="review.pk" @click="getReviewDetail(review)">
        <h3>제목 : {{ review.title }} ({{ review.comment_count }})</h3>
        <h4>리뷰 대상 영화 : {{ review.movie_title }}</h4>
        <h5 class="text-muted"> 유저 번호 : {{ review.user }}</h5>
        <p>{{ review.pk }}</p>
        <p></p>
        <hr>
      </li>
    </ul> -->
  </div>

</template>

<script>


export default {
  name: 'ReviewList',
  methods: {
    ago: function (time) {
      const today = new Date();
      const timeValue = new Date(time);

      const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
      if (betweenTime < 1) return 'just now';
      if (betweenTime < 60) {
          return `${betweenTime} minutes ago`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
          return `${betweenTimeHour} hours ago`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
          return `${betweenTimeDay} days ago`;
      }
      return `${Math.floor(betweenTimeDay / 365)} years ago`;
    },
    getReviewDetail: function (review) {
      // this.$store.dispatch('getReviewDetail', review.pk)
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
    if (this.$store.state.isLogin) {
      this.$store.dispatch('getReviews')
    }
    else {
      this.$router.push({ name: 'Login' })
    }
  },
}
</script>

<style>
#ReivewList {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
</style>