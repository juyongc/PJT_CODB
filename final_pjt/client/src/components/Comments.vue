<template>
  <li>
    <span>작성자 : {{ thisComment.user }} | </span>
    <span class="text-muted">{{ thisComment.created_at }} | </span>
    <button v-if="thisComment.isEqual" @click="deleteComment(thisComment)">삭제</button>
    <p>내용 : {{ thisComment.content }}</p>
  </li>
</template>

<script>
import axios from 'axios'

export default {
  name: "Comments",
  props: {
    comment: {
      type: Object,
    }
  },
  data: function () {
    return {
      thisComment: ''
    }
  },
  methods: {
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/comments/${comment.id}/`,
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => {
        if (res.status === 204) {
          this.$emit('deleteComment')
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: function () {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/community/comments/${this.comment.id}/`,
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => {
      this.thisComment = res.data
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>