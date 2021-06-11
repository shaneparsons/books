<template>
  <b-modal @keydown.native.enter="addBook" @ok="addBook" @hidden="reset" id="add-book-modal" ok-title="Add" ref="modal" title="Add Book">
    <b-alert :show="alert.show" :variant="alert.variant" @dismissed="alert.show = false" fade v-html="alert.message"></b-alert>
    <b-form>
      <b-form-group label="Title" label-for="title" label-sr-only v-b-tooltip.hover="'Title'">
        <b-form-input id="title" placeholder="Title" required type="text" v-model="book.title" />
      </b-form-group>
      <b-form-group label="Author" label-for="author" label-sr-only v-b-tooltip.hover="'Author'">
        <b-form-input id="author" placeholder="Author" required type="text" v-model="book.author" />
      </b-form-group>
      <b-form-group label="Description" label-for="description" label-sr-only v-b-tooltip.hover="'Description'">
        <b-form-textarea id="description" placeholder="Description" required rows="3" v-model="book.description" />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      alert: {
        variant: '',
        message: '',
        show: false,
      },
      book: {
        title: '',
        author: '',
        description: '',
      },
    };
  },
  methods: {
    async addBook(event) {
      event.preventDefault();
      try {
        // update book
        const response = await axios.post('/api/books', this.book);
        // console.log(response.data);

        // emit response
        this.$emit('response', { variant: 'success', message: 'Book added.', reload: true });
        this.$refs.modal.hide();
      } catch (error) {
        // console.log(error.response);
        if (error.response.status == 422) {
          // validator error (displayed nicely)
          let message = '';
          const errors = Object.values(error.response.data.errors);
          for (const error of errors) {
            message += error + '<br>';
          }
          this.alert = { variant: 'danger', message: message, show: 4 };
        } else {
          // non-validator error
          this.$emit('response', { variant: 'danger', message: error.response.data.message });
          this.$refs.modal.hide();
        }
      }
    },
    reset() {
      this.book = {
        title: '',
        author: '',
        description: '',
      };
    },
  },
};
</script>
