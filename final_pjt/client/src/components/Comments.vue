<template>
  <li class="list-group-item">
    <div class="d-flex justify-content-between">
      <span class="text-light p-2">{{ thisComment.content }}</span>

      <div class="p-2">
        <small class="text-light">{{ thisComment.username }} / {{ ago(thisComment.created_at) }}</small>
        <button 
          v-if="thisComment.isEqual" @click="deleteComment(thisComment)"
          type="button" class="btn-close btn-close-white ms-3" aria-label="Close"></button>
      </div>
    </div>
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

<style scoped>
.list-group-item {
  background-color: #212529 !important;
}
</style>