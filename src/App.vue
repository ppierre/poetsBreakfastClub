<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/20/solid";
import { user } from "./supabase";
</script>
<template>
  <nav>
    <h4 class="text-xl">
      <Bars3Icon class="inline-block h-5 w-5 text-blue-500" />
      menu (dans <code class="font-mono">/src/App.vue</code>)
    </h4>
    <ul>
      <li>
        <router-link class="text-red-600 underline" to="/">
          Accueil
        </router-link>
      </li>
      <li>
        <router-link class="text-red-600 underline" to="/login-logout">
          Login/logout
        </router-link>
      </li>
      <li v-if="user">
        <router-link class="text-red-600 underline" to="/edit/new">
          Ajouter Poem
        </router-link>
      </li>
    </ul>
  </nav>

  <!-- Affiche les pages -->
  <router-view class="m-2 border-2 p-2" />
</template>
