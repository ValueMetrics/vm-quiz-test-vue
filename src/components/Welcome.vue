<template>
  <div class="flex flex-col w-full items-center my-32">
    <img
      class="w-32 mb-4"
      src="https://valuemetrics.nl/wp-content/uploads/2020/02/cropped-200224_Website_ValueMetrics-Logo-RGB-3.png"
    />
    <h1 class="my-8">{{ msg }}</h1>
    <h2>Pick a category</h2>
    <div class="pill-wrapper">
      <Pill
        class="pill"
        v-for="category in categories"
        @click="pickCategory(category)"
        :label-text="category.name"
        :outline="fillCategoryPill(category)"
        color="blue"
      />
    </div>
    <br />
    <h2>Pick a difficulty</h2>
    <div class="pill-wrapper">
      <Pill
        class="pill"
        v-for="difficulty in difficulties"
        @click="pickDifficulty(difficulty)"
        :label-text="difficulty"
        :outline="fillDifficultyPill(difficulty)"
        color="blue"
      />
    </div>
    <br />
    <Pill
      @click="startQuiz"
      label-text="Start"
      :outline="disableStartButton"
      :disable="disableStartButton"
      color="green"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";

import Pill from "./Pill.vue";
import router from "../router";

defineProps<{ msg: string }>();

type Category = {
  id: number;
  name: string;
};

// Options
const categories = ref<Category[]>([]);
const difficulties = ref<string[]>(["easy", "medium", "hard"]);

// Chosen values
const pickedCategory = ref<Category>();
const pickedDifficulty = ref<string>();

onMounted(async () => {
  // Get all categories
  const request = await axios.get("https://opentdb.com/api_category.php");
  categories.value = request.data.trivia_categories;
});

const pickCategory = (category: Category) => {
  pickedCategory.value = category;
};

const pickDifficulty = (difficulty: String) => {
  pickedDifficulty.value = difficulty;
};

const startQuiz = async () => {
  router.push({
    path: "/quiz",
    query: {
      pickedCategory: pickedCategory.value?.id as number,
      pickedDifficulty: pickedDifficulty.value as string,
    },
  });
};

const fillCategoryPill = (category: Category): Boolean => {
  if (category.id === pickedCategory.value?.id) {
    return false;
  }
  return true;
};

const fillDifficultyPill = (difficulty: String): Boolean => {
  if (difficulty === pickedDifficulty.value) {
    return false;
  }
  return true;
};

const disableStartButton = computed(() => {
  if (pickedCategory.value?.id && pickedDifficulty.value) {
    return false;
  }
  return true;
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

.pill-wrapper {
  width: 700px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.pill {
  margin: 5px;
}
</style>
