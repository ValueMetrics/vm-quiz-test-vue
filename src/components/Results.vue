<template>
  <div class="flex flex-col w-full items-center my-32">
    <img
      class="w-32 mb-4"
      src="https://valuemetrics.nl/wp-content/uploads/2020/02/cropped-200224_Website_ValueMetrics-Logo-RGB-3.png"
    />
    <h1 class="my-8 question">Results</h1>
    <div class="results-wrapper">
      <Pill
        v-for="(result, index) in results"
        class="answer-pill pill"
        :label-text="(index + 1).toString()"
        :outline="true"
        :color="resultPillColor(result)"
      />
    </div>
    <br />
    <p class="percentage">{{ resultPercentage }}</p>
    <Pill
      class="pill"
      @click="playAgain"
      label-text="Play again"
      :outline="false"
      color="green"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, resolveTransitionHooks } from "vue";
import { useRoute } from "vue-router";

import Pill from "./Pill.vue";
import router from "../router";

const results = ref<string[]>([]);

onMounted(async () => {
  const route = useRoute();
  results.value = route.query.results as unknown as string[];
});

const playAgain = () => {
  router.push({ path: "/" });
};

const resultPillColor = (result: string): string => {
  if (result === "1") {
    return "green";
  }
  return "red";
};

const resultPercentage = computed(() => {
  let totalCorrect = 0;
  results.value.forEach((result) => {
    if (result === "1") {
      totalCorrect += 1;
    }
  });
  const percentage = Math.round((totalCorrect / 12) * 100);
  return percentage.toString() + "%";
});
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
  @apply underline;
}

.answer-wrapper {
  width: 700px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.results-wrapper {
  width: 700px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.pill {
  margin: 5px;
}

.answer-pill {
  width: 10px;
}
</style>
