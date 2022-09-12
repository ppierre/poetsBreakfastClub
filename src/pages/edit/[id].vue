<script setup lang="ts">
import FormPoems from "../../components/FormPoems.vue";
const props = defineProps<{ id: string }>();
</script>
<template>
  <FormPoems :id="Number(id)" />
</template>
