<template>
  <div id="UpdateReview">
    <div class="d-flex justify-content-between">
      <h2 class="d-inline text-warning fw-bold">Edit review</h2>
      <button class="btn btn-secondary mt-2 d-inline mybtn" @click="backToList">Back to List</button>
    </div>
    <hr style="color: rgb(255,193,7); border: 2px solid rgb(255,169,0); opacity: 1">
    <b-card bg-variant="dark" v-if="show">
      <b-form-group
        id="title-input"
        label-class="text-light fw-bold text-center"
        class="mb-3"
      >
        <b-form-input
          id="title-input"
          type="text"
          placeholder="Review Title"
          v-model="form.title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="movie-title-input"
        class="mb-3"
      >
        <b-form-input
          id="movie-title"
          v-model="form.movieTitle"
          type="text"
          placeholder="Movie title"
          required
          @input="searchingMovie"
          list='searchingList'
        ></b-form-input>
        <b-form-datalist 
          id="searchingList" 
          :options="this.$store.state.searchingList"
        >
        </b-form-datalist>
      </b-form-group>

      <b-form-group 
        id="movie-rating-input"
        class="mb-3">  

        <b-input-group>
          <b-input-group-prepend>
            <b-button @click="form.value = 0">Clear</b-button>
          </b-input-group-prepend>

          <b-form-rating id="movie-rating" v-model="form.value" variant="warning" stars="10"></b-form-rating>
          
          <b-input-group-append>
            <b-input-group-text class="justify-content-center fw-bold" style="min-width: 3em;" required>
              {{ form.value }}
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>

      </b-form-group>
      
      <!-- <b-form-group
        id="title-input"
        label=""
        label-size="lg"
        label-for="title-input"
        label-cols-sm="6"
        label-cols-lg="6"
        label-class="text-light fw-bold text-center"
        content-cols-sm="6"
        content-cols-lg="6"
        class="d-flex mb-3"
      >
        <b-form-input
          id="title-input"
          type="text"
          placeholder="Review Title"
          v-model="form.title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="movie-title-input"
        label-for="movie-title"
        label-class="text-light"
        label-cols-sm="6"
        label-cols-lg="6"
        content-cols-sm="6"
        content-cols-lg="6"
        class="d-flex mb-4"
      >
        <b-form-input
          id="movie-title"
          v-model="form.movieTitle"
          type="text"
          placeholder="Movie title"
          required
          @input="searchingMovie"
          list='searchingList'
        ></b-form-input>
        <b-form-datalist 
          id="searchingList" 
          :options="this.$store.state.searchingList"
        >
        </b-form-datalist>
      </b-form-group>

      <b-form-group 
        id="movie-rating-input"
        label-for="movie-rating"
        label-class="text-light"
        label-cols-sm="6"
        label-cols-lg="6"
        content-cols-sm="6"
        content-cols-lg="6"
        class="d-flex mb-3">  

        <b-input-group>
          <b-input-group-prepend>
            <b-button @click="form.value = 0">Clear</b-button>
          </b-input-group-prepend>

          <b-form-rating id="movie-rating" v-model="form.value" variant="warning" stars="10"></b-form-rating>
          
          <b-input-group-append>
            <b-input-group-text class="justify-content-center fw-bold" style="min-width: 3em;" required>
              {{ form.value }}
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>

      </b-form-group> -->

      <b-form-group class="mb-3">
        <b-form-textarea
          id="textarea"
          v-model="form.text"
          placeholder="Content"
          rows="8"
          required
        ></b-form-textarea>
      </b-form-group>
      
      <b-button class="me-2" type="submit" variant="success" @click="onUpdate">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        Edit
      </b-button>
      <b-button type="reset" variant="secondary" @click="onReset">Reset</b-button>

    </b-card>
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
        isEqual: true,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/review/${this.$route.params.pk}/`,
        data: reviewItem,
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
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
      url: `http://127.0.0.1:8000/community/review/${this.$route.params.pk}/`,
      headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => {
      this.form.title = res.data.title
      this.form.movieTitle = res.data.movie_title
      this.form.value = res.data.rank
      this.form.text = res.data.content
      this.form.isEqual = res.data.isEqual
      this.form.user = res.data.user
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
#UpdateReview {
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