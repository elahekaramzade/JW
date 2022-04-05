<template>
  <div>
    <div class="bg-gray-100 w-full px-4 py-2 flex justify-between items-center rounded-md border border-gray-200">
      <div class="flex items-center space-x-2"><label>Search by release date</label>
        <date-range-picker
          ref="picker"
          v-model="dateRange"
          single-date-picker='range'
          date-range
          :ranges="false"
        >
        </date-range-picker>
      </div>
      <button
        type="button"
        @click="getMovies"
        class="bg-blue-400 text-white rounded-2xl px-4 py-1 items-center"
      >search</button>
    </div>
    <div class="w-full grid grid-cols-3 gap-4 my-8">
      <movie
        v-for="movie in data.results"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      ></movie>
    </div>
    <div class="w-full flex flex-col py-8 space-y-4">
      <div class="w-full flex space-x-4 justify-center">
        <button
          @click="getMovies(data.page-1)"
          :disabled="data.page == 1"
          :class="{'text-gray-200 cursor-not-allowed':data.page == 1}"
        >Prev Page</button>
        <span>|</span>
        <button
          @click="getMovies(data.page+1)"
          :disabled="data.page == data.total_pages"
          :class="{'text-gray-200 cursor-not-allowed':data.page == data.total_pages}"
        >Next Page</button>
      </div>
      <span
        class="text-center text-gray-400"
        v-if="data.results"
      >Showing result {{(data.page-1) * 20+1}}-{{(data.page-1) * 20 + data.results.length}}</span>
    </div>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import axios from "axios";

export default {
  name: "Home",
  components: { Movie, DateRangePicker },
  data() {
    return {
      dateRange: { startDate: null, endDate: null },
      data: {},
      genres: [],
    };
  },
  methods: {
    async getMovies(page) {
      let date =
        this.dateRange.startDate && this.dateRange.endDate
          ? {
              "primary_release_date.gte": this.dateRange.startDate,
              "primary_release_date.lte": this.dateRange.endDate,
            }
          : {};
      const data = await axios.get("discover/movie", {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          page: page,
          ...date,
        },
      });
      this.data = data.data;
    },
    async getGenre() {
      const data = await axios.get("genre/movie/list", {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
        },
      });
      this.genres = data.data.genres;
    },
  },
  created() {
    this.getMovies();
    this.getGenre();
  },
};
</script>
<style>
.vue-daterange-picker {
  min-width: 200px !important;
}
</style>
