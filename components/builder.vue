<!-- @format -->

<template>
  <div>
    <div class="cnt">
      <div class="cnt-nav">SDK example Nuxt</div>
      <div class="cnt-body">
        <div class="editor" ref="editor"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import createStudioEditor from "@grapesjs/studio-sdk";
import "@grapesjs/studio-sdk/dist/style.css";

const props = defineProps(["project_data"]);

const editor = ref(null);

onMounted(() => {
  createStudioEditor({
    root: editor.value,
    plugins: [(editor) => console.log("editor created!", editor)],
    storage: {
      type: "self",
      autosaveChanges: 10,
      project: props.project_data,
      onSave: async ({ project }) => console.log("Save project", { project }),
    },
  });
});
</script>

<style>
body {
  margin: 0;
}
.cnt {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}
.cnt-nav {
  padding: 10px;
  background-color: #020420;
  color: #00dc82;
}
.cnt-body {
  flex-grow: 1;
}
.editor {
  height: 100%;
}
</style>
