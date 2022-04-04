<template>
  <div>
    <div class="bg-gray-100 w-full px-4 py-2 flex justify-start space-x-2 items-center rounded-md border border-gray-200">
      <router-link
        to="/"
        class="bg-blue-400 text-white rounded-2xl px-4 py-1 flex space-x-1 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        Back
      </router-link>
      <div>
        <h2 class="font-bold text-md">{{movie.title}}</h2>
        <p class="text-md text-gray-600">{{movie.tagline}}</p>
      </div>
    </div>
    <div class="w-full flex flex-col space-y-8 mt-8">

      <div class="w-full flex justify-between">
        <div class="w-2/5">
          <img
            :src="movie.poster_path?'https://www.themoviedb.org/t/p/w220_and_h330_face'+movie.poster_path:'/img/picture.png'"
            class="h-full w-full rounded-md"
            alt=""
          >
        </div>
        <dl class="w-full grid grid-cols-1 gap-4 px-4">

          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">budget</dt>
            <dd class="mt-1 text-sm text-gray-900">$ {{movie.budget}}</dd>
          </div>
          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">revenue</dt>
            <dd class="mt-1 text-sm text-gray-900">$ {{movie.revenue}}</dd>
          </div>
          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">release date</dt>
            <dd class="mt-1 text-sm text-gray-900">{{movie.release_date}}</dd>
          </div>
          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">runtime</dt>
            <dd class="mt-1 text-sm text-gray-900">{{convertToHour(movie.runtime)}}</dd>
          </div>
          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">Score</dt>
            <dd class="mt-1 text-sm text-gray-900">{{`${movie.vote_average} (${movie.vote_count} votes)`}}</dd>
          </div>
          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">Genre</dt>
            <dd class="mt-1 text-xs text-gray-900">
              <span
                v-for="(g,i) in movie.genres"
                :key="i"
              >&bull; {{g.name}}</span>
            </dd>
          </div>
          <div class="sm:col-span-1 flex justify-between">
            <dt class="text-sm font-medium">IMBD link</dt>
            <dd class="mt-1 text-sm text-gray-900"><a
                class="text-blue-500"
                :href="`https://www.imdb.com/title/${movie.imdb_id}`"
                target="_blank"
                rel="noopener noreferrer"
              >Link</a></dd>
          </div>

        </dl>
      </div>

      <div>
        <p>{{movie.overview}}</p>
      </div>
      <div>
        <h3 class="font-bold text-md">Credit</h3>
        <span
          v-for="item in credit"
          :key='item.cast_id'
          class="mr-2"
        >&bull;
          {{item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movie: {},
      credit: null,
    };
  },
  methods: {
    convertToHour(totalMinutes) {
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
    },
    async getMovieDetail(movie_id) {
      const data = await axios.get(`movie/${movie_id}`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
        },
      });
      this.movie = data.data;
    },
    async getMovieCredit(movie_id) {
      const data = await axios.get(`movie/${movie_id}/credits`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
        },
      });
      this.credit = data.data.cast.sort((a, b) => b.popularity - a.popularity);
      this.credit =
        this.credit.length >= 10 ? this.credit.splice(1, 10) : this.credit;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getMovieDetail(id);
    this.getMovieCredit(id);
  },
};
</script>

<style>
</style>