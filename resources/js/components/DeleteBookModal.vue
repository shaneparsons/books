<template>
  <div>
    <b-modal @keydown.native.enter="deleteBook" @ok="deleteBook" cancel-title="No" id="delete-book-modal" modal-class="no-borders" ok-title="Yes" ok-variant="danger" title="Delete Book">Are you sure you want to delete this book?</b-modal>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
  },
  methods: {
    async deleteBook(event) {
      event.preventDefault();
      try {
        const response = await axios.delete('/api/books/' + this.book.id);
        // console.log(response);
        // emit response
        this.$emit('response', { variant: 'success', message: 'Book deleted.', reload: true });
      } catch (error) {
        // console.log(error);
        // display error
        this.$emit('response', { variant: 'danger', message: error.response.data.message });
      } finally {
        // hide modal
        this.$bvModal.hide('delete-book-modal');
      }
    },
  },
};
</script>
