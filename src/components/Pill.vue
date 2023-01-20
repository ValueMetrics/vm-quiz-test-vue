<template>
  <div :class="styleClass" class="pil-wrapper">{{ labelText }}</div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{
  labelText: string;
  outline: Boolean;
  color: String;
  disable?: Boolean;
}>();

const styleClass = computed(() => {
  if (props.outline && props.disable) {
    return props.color + "-outline disable";
  } else if (props.outline) {
    return props.color + "-outline";
  }
  return props.color;
});
</script>

<style scoped>
.pil-wrapper {
  border-radius: 50px;
  padding: 5px 10px;
  cursor: pointer;
  min-width: fit-content;
  text-align: center;
  border: 1px solid #ffffff;
}

.grey {
  background-color: #565555;
  color: #ffffff;
}

.red {
  background-color: #ef0000;
  color: #ffffff;
}

.blue {
  background-color: #002c77;
  color: #ffffff;
}

.green {
  background-color: #009c49;
  color: #ffffff;
}

.grey-outline {
  color: #565555;
  border: 1px solid #565555;
}

.red-outline {
  color: #ef0000;
  border: 1px solid #ef0000;
}

.blue-outline {
  color: #002c77;
  border: 1px solid #002c77;
}

.green-outline {
  color: #009c49;
  border: 1px solid #009c49;
}

.blue-outline:hover {
  background-color: #002c77;
  color: #ffffff;
}
.disable:hover {
  cursor: not-allowed;
}
</style>
