<template>
  <div id="ReviewListItem">
    <div class="d-flex justify-content-between">
      <h2 class="d-inline text-warning fw-bold">User Review</h2>
      <button class="btn btn-secondary mt-2 d-inline mybtn" @click="backToList">Back to List</button>
    </div>
    <hr style="color: rgb(255,193,7); border: 2px solid rgb(255,169,0); opacity: 1">

    <div class="card text-light bg-dark">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <div class="title-group ps-2 pt-2">
            <h2 class="d-inline ">{{ review.title }}</h2>
            <span class="fs-3 text-warning ms-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </span>
            <span class="ms-2">{{ review.rank }}</span>
          </div>
          <small class="d-line my-auto pe-2">{{ review.username }} / {{ ago(review.created_at) }}</small>
          
        </div>
        <div class="sub-group d-flex justify-content-between">
          <i class="text-muted d-block ps-2">{{ review.movie_title }}</i>
          <div v-show="review.isEqual" class="button-group pe-2">
            <button class="btn btn-success" @click="updateReview(review)">Edit</button>
            <button class="btn btn-secondary ms-2" @click="deleteReview(review)">Delete</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text p-2">{{ review.content }}</p>
        
      </div>
      <div class="card-footer text-muted">
        <!-- <label for="comment-input" class="p-2 mb-2">Comment</label> -->
        <b-form-group class="px-2 py-3">
          <b-input-group>
            <b-form-input
              id="comment-input"
              type="text"
              required 
              placeholder="Enter Comment"
              v-model="newComment"
              @keyup.enter="createComment">
            </b-form-input>
            <b-button @click="createComment">입력</b-button>
          </b-input-group>
        </b-form-group>
        <ul class="list-group list-group-flush">
          <Comments v-for="comment in review.comments" :key="comment.id" :comment="comment" @deleteComment="getReviewagain"/>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Comments from '@/components/Comments.vue'

export default {
  name: 'ReviewListItem',
  // props: {
  //   pk: {
  //     type: Number,
  //   }
  // },
  components: {
    Comments,
  },
  data: function () {
    return {
      newComment: null,
    }
  },
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
    backToList: function () {
      this.$router.push({ name: "Reviews" })
    },
    deleteReview: function (review) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/review/${review.id}/`,
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => {
        if (res.status === 204) {
          this.$router.push({ name: "Reviews" })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getReviewagain: function () {
      this.$store.dispatch('getReviewDetail', this.review.id)
      this.$router.push({ name: "ReviewDetail", params: { pk: this.review.id }})
        .catch(() => {})
    },
    updateReview: function () {
      this.$router.push({ name: 'UpdateReview', params: { pk: this.review.id }})
    },
    createComment: function () {
      const commentData = {
        content: this.newComment,
        isEqual: true,
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/review/${this.review.id}/comments/`,
        data: commentData,
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => {
        if (res.status === 201) {
          this.getReviewagain()
          this.newComment = ''
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  computed: {
    review: function () {
      return this.$store.state.review
    },
  },
  created: function () {
    if (!this.$store.state.isLogin) {
      this.$router.push({ name: 'Login' })
    }
    this.$store.dispatch('getReviewDetail', this.$route.params.pk)
    // console.log(this.review)
  }
}
</script>

<style>
#ReviewListItem{
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
.mybtn {
  margin-right: .5rem !important;
  background-color: rgb(50, 50, 50);
  border-color: rgb(50, 50, 50);
}
</style>