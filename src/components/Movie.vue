<template>
  <router-link :to="`/${movie.id}`">
    <div class="h-full w-full bg-gray-100 rounded-md flex border border-gray-200">
      <div class="w-1/2">
        <img
          :src="movie.poster_path?'https://www.themoviedb.org/t/p/w220_and_h330_face'+movie.poster_path:'/img/picture.png'"
          alt=""
          class="h-full w-full object-cover"
        >
      </div>
      <div class="relative p-4 w-1/2">
        <h2 class="font-bold text-md">{{movie.title}}</h2>
        <div class="w-full absolute bottom-1 pr-4">
          <div class="w-full flex text-gray-500 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg><time>{{movie.release_date}}</time>
          </div>
          <div class="space-x-1 flex flex-wrap content-center">
            <span
              v-for="item in movie.genre_ids"
              :key='item'
              class="text-xs text-gray-500"
            >&bull;
              {{genres.find(g=>g.id == item)?genres.find(g=>g.id == item).name:''}}</span>
          </div>
          <div class="flex items-end space-x-1">
            <star-rating
              :rating="vote_average"
              :read-only="true"
              :star-size='15'
              :round-start-rating="false"
              :show-rating="false"
            ></star-rating>
            <span class="text-xs text-gray-500"> {{movie.vote_average}}
            </span>
          </div>

        </div>

      </div>
    </div>
  </router-link>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  props: { movie: Object, genres: Array },
  data() {
    return {};
  },
  components: {
    StarRating,
  },
  computed: {
    vote_average() {
      return (this.movie.vote_average * 5) / 10;
    },
  },
};
</script>

<style>
</style>