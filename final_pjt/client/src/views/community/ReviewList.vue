<template>
  <div id="ReivewList">

    <div class="d-flex justify-content-between">
      <h2 class="d-inline text-warning fw-bold">Movie Review Community</h2>
      <button class="btn btn-secondary mt-2 d-inline" @click="createReview">New Review</button>
    </div>
    <hr class="text-warning">

    <div v-if="reviews.length > 0">
      <div class="row">
        <div class="col-12 col-lg-7 mb-4">
          <div class="list-group mx-auto" v-for="review in reviews" :key="review.pk">
            <a @click="getReviewDetail(review)" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 fw-bold d-inline">{{ review.title }}</h5>
                <small>{{ ago(review.created_at) }}</small>
              </div>
              <p class="mb-1">{{ review.movie_title }}</p>
              <p class="mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                {{ review.rank }}
              </p>
              <small>{{ review.username }}</small>
            </a>
          </div>
        </div>

        <div class="sorting-reviews col-12 col-lg-4 mx-auto">
          <div class="my-4">
            <h5 class="text-warning fw-bold mb-4">Most Comments</h5>
             <div class="list-group list-group-flush">
                <a 
                v-for="review in commentReviews"
                :key="review.pk"
                @click="getReviewDetail(review)" 
                class="list-group-item list-group-item-action border-dark">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 text-light fw-bold">{{ review.title }}</h5>
                    <small class="text-light fw-lighter">Comments: {{ review.comment_count }}</small>
                  </div>
                  <p class="mb-1 text-light fw-lighter">{{ review.movie_title }}</p>
                </a>
            </div>
          </div>
          <hr class="text-warning">
          <div class="my-5">
            <h5 class="text-warning fw-bold mb-4">Highest Rate</h5>
             <div class="list-group list-group-flush">
                <a 
                v-for="review in rankReviews"
                :key="review.pk"
                @click="getReviewDetail(review)" 
                class="list-group-item list-group-item-action border-dark">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 text-light fw-bold">{{ review.title }}</h5>
                    <small class="text-light fw-lighter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      {{ review.rank }}
                    </small>
                  </div>
                  <p class="mb-1 text-light fw-lighter">{{ review.movie_title }}</p>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="my-4">
      <p class="text-light fs-5 text-center">There are no reviews written yet.</p>
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
    },
    commentReviews: function () {
      const sortReviews = this.$store.state.reviews.slice(0).sort(function (a, b) {
        return b.comment_count - a.comment_count
      })
      return sortReviews.slice(0, 3)
    },
    rankReviews: function () {
      const sortReviews = this.$store.state.reviews.slice(0).sort(function (a, b) {
        return b.rank - a.rank
      })
      return sortReviews.slice(0, 3)
    },
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
.sorting-reviews .list-group-item {
  background-color: black !important;
}
</style>