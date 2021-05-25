<template>
  <div>
    <h2 class="mb-3">리뷰 수정</h2>
    <button @click="backToList">돌아가기</button>
    <b-form v-if="show">
      <b-form-group
        id="title-input"
        label="글 제목"
        label-for="title"
        class="mb-3"
      >
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="movie-title-input"
        label="영화 제목"
        label-for="movie-title"
        class="mb-3"
      >
        <b-form-input
          id="movie-title"
          v-model="form.movieTitle"
          type="text"
          placeholder="Movie title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group class="mb-3">  
        <label for="rating">영화 평점</label>
        <b-input-group>
          <b-input-group-prepend>
            <b-button @click="form.value = 0">Clear</b-button>
          </b-input-group-prepend>
          <b-form-rating id="rating" v-model="form.value" stars="10"></b-form-rating>
          <b-input-group-append>
            <b-input-group-text class="justify-content-center" style="min-width: 3em;">
              {{ form.value }}
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group class="mb-3">
        <label for="textarea">내용</label>
        <b-form-textarea
          id="textarea"
          v-model="form.text"
          placeholder="Content"
          rows="8"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="onUpdate">수정</b-button>
      <b-button type="reset" variant="danger" @click="onReset">초기화</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateReview',
  data: function () {
    return {
      form: {
        title: '',
        movieTitle: '',
        value: '-',
        text: null,
      },
      show: true
    }
  },
  methods: {
    onUpdate: function (event) {
      event.preventDefault()

      const reviewItem = {
        title: this.form.title,
        movie_title: this.form.movieTitle,
        rank: this.form.value,
        content: this.form.text,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/review/${this.$route.params.pk}/`,
        data: reviewItem,
      })
      .then(res => {
        if (res.status === 200) {
          this.$router.push({ name: 'Reviews' })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    onReset: function (event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.movieTitle = ''
      this.form.value = '-'
      this.form.text = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    backToList: function () {
      this.$router.push({ name: "Reviews" })
    },
  },
  created: function () {
    console.log(this.$route.params)
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/community/review/${this.$route.params.pk}/`
    })
    .then(res => {
      console.log(res)
      this.form.title = res.data.title
      this.form.movieTitle = res.data.movie_title
      this.form.value = res.data.rank
      this.form.text = res.data.content
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>