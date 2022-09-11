<script setup lang="ts">
import { supabase, user } from "../supabase";
async function signIn(data) {
  const { user, error } = await supabase.auth.signIn(data);
  if (error) console.error(error);
}
</script>
<template>
  <div>
    <button v-if="user" @pointerdown="supabase.auth.signOut()">
      Se déconnecter ({{ user.email }})
    </button>
    <FormKit
      v-else
      type="form"
      submit-label="Se connecter ou s'inscrire"
      @submit="signIn"
    >
      <FormKit name="email" label="Votre eMail" type="email" />
      <FormKit name="password" label="Mot de passe" type="password" />
    </FormKit>
  </div>
</template>
