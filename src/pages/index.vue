<script setup lang="ts">
import { supabase, user } from "@/supabase";
import type { Poems } from "@/type";
import { useRouter } from "vue-router";

const { data, error } = await supabase.from<Poems>("poems").select();
if (error) console.error("imposible de lire la liste des Poems : ", error);
const router = useRouter();
function editPoem(id: number) {
  router.push({ name: "edit-id", params: { id } });
}
</script>
<template>
  <section>
    <h1 class="text-2xl">Liste des poems</h1>
    <div v-for="poem of data" :key="poem.id">
      <h2 class="text-xl">{{ poem.title }}</h2>
      <p>{{ poem.content }}</p>
      <div v-if="user?.email === poem.email" class="bg-red-800">
        <span v-if="poem.hidden === true">Est caché</span>
        <button @click="editPoem(poem.id)">Editer le poem</button>
      </div>
    </div>
  </section>
</template>
