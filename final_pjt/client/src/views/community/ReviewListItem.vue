<template>
  <div>
    <h2>제목 : {{ review.title }}</h2>
    <h4 class="text-muted">영화 제목 : {{ review.movie_title }}</h4>
    <h5 class="text-muted">작성자 {{ review.username }}: | 평가 점수 {{ review.rank }}</h5>
    <h5 class="text-muted">작성 시간 : {{ ago(review.created_at) }}</h5>
    <h5 class="text-muted">수정 시간 : {{ ago(review.updated_at) }}</h5>
    <p>{{ review.content }}</p>
    
    <div v-show="review.isEqual">
      <hr>
      <button @click="updateReview(review)">수정</button>
      <button @click="deleteReview(review)">삭제</button>
    </div>
    
    <hr>
    <button @click="backToList">돌아가기</button>
    <hr>
    <div>
      <b-input-group>
        <label for="comment-input">댓글</label>
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
    </div>
    <hr>
    <ul>
      <Comments v-for="comment in review.comments" :key="comment.id" :comment="comment" @deleteComment="getReviewagain"/>
    </ul>
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

</style>