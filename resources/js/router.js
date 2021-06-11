import Vue from "vue";
import VueRouter from "vue-router";
import Books from "./views/Books.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "active",
    routes: [
        {
            path: "/",
            redirect: "/books"
        },
        {
            path: "/books",
            name: "books",
            component: Books
        },
    ]
});

export default router;
