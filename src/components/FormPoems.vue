<script setup lang="ts">
import { supabase } from "@/supabase";
import type { Poems } from "@/type";
import { useRouter } from "vue-router";
const router = useRouter();
async function submit(formData: Poems) {
  const { data, error } = await supabase.from("poems").upsert(formData);
  if (error) console.error("Erreur lors de l'envoi d'un poem : ", error);
  else {
    router.push("/");
  }
}
</script>
<template>
  <FormKit
    @submit="submit"
    type="form"
    :config="{
      classes: {
        form: '$reset grid grid-cols-1 gap-2',
        label: 'text-gray-700',
        input:
          'mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus-style',
        actions: 'justify-self-end',
      },
    }"
    :submit-attrs="{
      inputClass: 'rounded-md shadow-sm focus-style p-2 bg-blue-300 ',
      wrapperClass: '',
      outerClass: '',
    }"
  >
    <FormKit type="hidden" name="id" />
    <FormKit name="title" label="titre du poem" />
    <FormKit type="textarea" name="content" label="texte du poem" />
    <!-- <FormKit
      type="file"
      name="illustrationurl"
      accept="image/png, image/jpeg"
    /> -->
    <FormKit
      type="checkbox"
      name="hidden"
      label="cacher le poem"
      input-class="w-4"
      inner-class="inline-block"
      label-class="inline-block"
    />
  </FormKit>
</template>
