<script setup lang="ts">
import { supabase, user } from "@/supabase";
import type { FileObject } from "@supabase/storage-js";
import { ref } from "@vue/reactivity";
// redirect
import { useRouter } from "vue-router";
const router = useRouter();
if (!user.value) {
  router.push({ name: "login-logout" });
}
const imageList = ref<(FileObject & { publicURL: string })[]>([]);
async function updateImageList() {
  const { data, error } = await supabase.storage
    .from("images")
    .list(`${user.value?.id}`);
  if (error) console.error("impossible de lire la liste des images : ", error);
  imageList.value =
    data
      ?.filter((image) => image.name !== ".emptyFolderPlaceholder")
      .map((image) => ({
        ...image,
        publicURL: supabase.storage
          .from("images")
          .getPublicUrl(`${user.value?.id}/${image.name}`).publicURL,
      })) || [];
}
updateImageList();
async function submitImage(dataForm: { image: [File] }) {
  console.log(`${user.value?.id}/${dataForm.image[0].name}`);
  const { data, error } = await supabase.storage
    .from("images")
    .upload(
      `${user.value?.id}/${dataForm.image[0].name}`,
      dataForm.image[0].file
    );
  if (error) console.error("Erreur lors de l'envoi de l'image : ", error);
  else {
    updateImageList();
  }
}
</script>
<template>
  <div class="p-2">
    <h1 class="text-2xl">Galerie</h1>
    <p>Page de la galerie</p>
    <div class="grid grid-cols-3 gap-2">
      <div v-for="image of imageList" :key="image.name">
        <img :src="image.publicURL" />
      </div>
    </div>
    <div>
      <h2>uploader une image</h2>
      <FormKit type="form" @submit="submitImage">
        <FormKit type="file" name="image" accept="image/png, image/jpeg" />
      </FormKit>
    </div>
  </div>
</template>
