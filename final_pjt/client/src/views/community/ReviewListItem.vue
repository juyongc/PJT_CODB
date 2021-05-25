<template>
  <div>
    <h2>제목 : {{ review.title }}</h2>
    <h4 class="text-muted">영화 제목 : {{ review.movie_title }}</h4>
    <h5 class="text-muted">작성자 : | 평가 점수 {{ review.rank }}</h5>
    <h5 class="text-muted">작성 시간 : {{ review.created_at }}</h5>
    <h5 class="text-muted">수정 시간 : {{ review.updated_at }}</h5>
    <p>{{ review.content }}</p>
    <hr>
    <button @click="updateReview(review)">수정</button>
    <button @click="deleteReview(review)">삭제</button>
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
    <ul v-for="comment in review.comments" :key="comment.id" :comment="comment">
      <li>
        <span>작성자 : {{ comment.user }} | </span>
        <span class="text-muted">{{ comment.created_at }} | </span>
        <button @click="deleteComment(comment)">삭제</button>
        <p>내용 : {{ comment.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewListItem',
  data: function () {
    return {
      newComment: null,
    }
  },
  methods: {
    backToList: function () {
      this.$router.push({ name: "Reviews" })
    },
    deleteReview: function (review) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/review/${review.id}/`
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
        user: 1,
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/review/${this.review.id}/comments/`,
        data: commentData
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
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/comments/${comment.id}/`,
      })
      .then(res => {
        if (res.status === 204) {
          this.getReviewagain()
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
    }
  },
}
</script>

<style>

</style>