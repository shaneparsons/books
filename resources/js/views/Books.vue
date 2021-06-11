<template>
  <div>
    <b-container class="py-5">
      <!-- cards -->
      <h1 class="mb-3">
        Books
        <b-button @click.stop="addBook()" class="p-0" size="lg" type="button" variant="link" v-b-tooltip.hover="'Add Book'">
          <b-icon icon="plus" variant="success"></b-icon>
        </b-button>
      </h1>
      <b-alert :show="alert.show" :variant="alert.variant" @dismissed="alert.show = 0" fade>{{ alert.message }}</b-alert>
      <b-alert show v-if="loaded && !books.length" variant="warning">No books found</b-alert>
      <b-card-group columns>
        <b-card v-for="book in books" :key="book.id" :title="book.title">
          <b-card-text style="white-space: pre-line">{{ book.description }}</b-card-text>
          <b-card-text class="small text-muted">{{ book.author }}</b-card-text>
          <!-- buttons -->
          <b-button @click.stop="editBook(book)" class="py-0" size="sm" type="button" variant="link" v-b-tooltip.hover="'Edit'">
            <b-icon icon="pencil" variant="secondary"></b-icon>
          </b-button>
          <b-button @click.stop="deleteBook(book)" class="py-0" size="sm" type="button" variant="link" v-b-tooltip.hover="'Delete'">
            <b-icon icon="trash" variant="secondary"></b-icon>
          </b-button>
        </b-card>
      </b-card-group>
    </b-container>

    <add-book-modal @response="respond" />
    <edit-book-modal :book="selected" @response="respond" />
    <delete-book-modal :book="selected" @response="respond" />
  </div>
</template>



<script>
import addBookModal from '../components/AddBookModal';
import editBookModal from '../components/EditBookModal';
import deleteBookModal from '../components/DeleteBookModal';

export default {
  components: {
    addBookModal,
    editBookModal,
    deleteBookModal,
  },
  data() {
    return {
      alert: {
        variant: '',
        message: '',
        show: false,
      },
      fields: ['title', 'description', 'author', 'actions'],
      books: [],
      selected: {},
      loaded: false,
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      try {
        const response = await axios.get('/api/books');
        console.log(response);
        this.books = response.data;
        this.loaded = true;
      } catch (error) {
        console.error(error);
      }
    },
    addBook() {
      this.$bvModal.show('add-book-modal');
    },
    editBook(book) {
      this.selected = JSON.parse(JSON.stringify(book)); // deep copy
      this.$bvModal.show('edit-book-modal');
    },
    deleteBook(book) {
      this.selected = book;
      this.$bvModal.show('delete-book-modal');
    },
    async respond(response) {
      // response: { variant: '', message: '', reload: '' }
      try {
        if (response.reload) {
          // refresh data
          await this.getBooks();
        }
      } catch (error) {
        console.log(error);
      } finally {
        // show response
        this.alert.variant = response.variant;
        this.alert.message = response.message;
        this.alert.show = 3;

        console.log(this.alert);
      }
    },
  },
};
</script>