<template>
  <p class="countdown" @click="reset">{{ count }}</p>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
const emit = defineEmits(["finished"]);

const count = ref<number>(10);
const intervalId = ref<number>(0);

const start = () => {
  intervalId.value = setInterval(() => {
    count.value--;
    if (count.value === 0) {
      clearInterval(intervalId.value);
      emit("finished");
    }
  }, 1000);
};

const reset = () => {
  clearInterval(intervalId.value);
  count.value = 10;
  start();
};

defineExpose({
  reset,
  start,
});
</script>

<style>
.countdown {
  font-size: 50px;
}
</style>
