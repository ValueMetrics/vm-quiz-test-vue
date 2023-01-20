<template>
  <div class="flex flex-col w-full items-center my-32">
    <img
      class="w-32 mb-4"
      src="https://valuemetrics.nl/wp-content/uploads/2020/02/cropped-200224_Website_ValueMetrics-Logo-RGB-3.png"
    />
    <template v-if="questions.length">
      <h1 class="my-8 question">{{ currentQuestion.question }}</h1>
      <div class="answer-wrapper">
        <Pill
          class="pill"
          v-for="answer in scrambledAnswers"
          :label-text="answer"
          color="blue"
          :outline="true"
          @click="answerQuestion(answer)"
        />
      </div>
    </template>
    <Countdown
      class="countdown"
      ref="countdown"
      @finished="answerQuestion('')"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import Pill from "./Pill.vue";
import router from "../router";
import Countdown from "./Countdown.vue";

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const questions = ref<Question[]>([]);
const currentQuestionId = ref<number>(0);
const results = ref<number[]>([]);
const countdown = ref();

onMounted(async () => {
  const route = useRoute();
  const pickedCategory = route.query.pickedCategory as unknown as number;
  const pickedDifficulty = route.query.pickedDifficulty as string;
  await requestQuestions(pickedCategory, pickedDifficulty);
});

const requestQuestions = async (
  pickedCategory: number,
  pickedDifficulty: string
) => {
  try {
    if (pickedCategory && pickedDifficulty) {
      const request = await axios.get(
        `https://opentdb.com/api.php?amount=12&category=${pickedCategory}&difficulty=${pickedDifficulty}`
      );
      questions.value = request.data.results;
      countdown.value.start();
    } else {
      throw new Error("Missing category or difficulty");
    }
  } catch (error) {
    console.log(error);
  }
};

const currentQuestion = computed(() => {
  return questions.value[currentQuestionId.value];
});

const scrambledAnswers = computed(() => {
  const answers = [currentQuestion.value.correct_answer].concat(
    currentQuestion.value.incorrect_answers
  );
  answers.forEach((item, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [answers[index], answers[randomIndex]] = [
      answers[randomIndex],
      answers[index],
    ];
  });
  return answers;
});

const answerQuestion = (answer: string) => {
  const correctAnswer = currentQuestion.value.correct_answer;
  if (correctAnswer === answer) {
    results.value.push(1);
  } else {
    results.value.push(0);
  }
  if (results.value.length === 12) {
    router.push({ path: "/results", query: { results: results.value } });
  } else {
    currentQuestionId.value += 1;
    countdown.value.reset();
  }
};
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

.pill {
  margin: 5px;
}

.question {
  max-width: 900px;
  text-align: center;
}

.countdown {
  position: absolute;
  top: 10px;
  right: 40px;
}
</style>
