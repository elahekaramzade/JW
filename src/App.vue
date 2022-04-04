<template>
  <div id="app">
    <div class="bg-green w-full h-8"></div>
    <main class="w-8/12 mx-auto px-6 py-16 mt-6 ">
      <router-view />
    </main>
  </div>
</template>
<style>
.bg-green {
  background-color: #11b980;
}
</style>