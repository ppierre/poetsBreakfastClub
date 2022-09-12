<script setup lang="ts">
import { supabase } from "@/supabase";
import type { Poems } from "@/type";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{ id?: number }>();
let dataPoem: Poems = {};
if (props.id) {
  const { data, error } = await supabase
    .from<Poems>("poems")
    .select("*")
    .eq("id", props.id)
    .single();
  if (error) console.error("n'a pas pu retrouver l'id :", props.id, error);
  if (data) dataPoem = data;
  else console.error("pas trouvé dans la table poems l'id :", props.id);
}
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
    :value="dataPoem"
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
