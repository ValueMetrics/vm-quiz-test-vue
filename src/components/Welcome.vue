<template>
  <div class="flex flex-col w-full items-center my-32">
    <img
      class="w-32 mb-4"
      src="https://valuemetrics.nl/wp-content/uploads/2020/02/cropped-200224_Website_ValueMetrics-Logo-RGB-3.png"
    />
    <h1 class="my-8">{{ msg }}</h1>
    <span class="mb-32 mt-24">So far so good!😉</span>
    <h2>Some useful links</h2>
    <a href="https://opentdb.com/api_config.php" target="_blank"
      >https://opentdb.com/api_config.php</a
    >
    <a href="https://opentdb.com/api_category.php" target="_blank"
      >https://opentdb.com/api_category.php</a
    >
    <a href="https://router.vuejs.org/" target="_blank"
      >https://router.vuejs.org/</a
    >
    <a href="https://tailwindcss.com/" target="_blank"
      >https://tailwindcss.com/</a
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<style lang="postcss" scoped>
h1 {
  @apply text-3xl font-bold gradient-text;
}

h2 {
  @apply text-lg gradient-text;
}

p {
  @apply mb-4;
}

.gradient-text {
  @apply text-transparent bg-clip-text bg-gradient-to-br from-[#009cbd] to-[#002c77];
}

a:hover {
  @apply gradient-text;
}
</style>
