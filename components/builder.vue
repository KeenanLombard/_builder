<!-- @format -->

<template>
  <div>
    <div class="cnt">
      <!-- <div class="cnt-nav">SDK example Nuxt</div> -->
      <div class="cnt-body">
        <div class="editor" ref="editor"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import createStudioEditor from "@grapesjs/studio-sdk";
import "@grapesjs/studio-sdk/dist/style.css";

const { updateItem } = useDirectusItems();
const route = useRoute();

const props = defineProps(["project_data"]);

const editor = ref(null);

const saveProject = async (project) => {
  try {
    const newItem = { project_code: JSON.stringify(project) };
    await updateItem({
      collection: "projects",
      id: route.params.id,
      item: newItem,
    });
    console.log("Project Saved");
  } catch (error) {
    alert(error);
  }
};

onMounted(() => {
  createStudioEditor({
    root: editor.value,
    plugins: [(editor) => console.log("editor created!", editor)],
    theme: "light",
    storage: {
      type: "self",
      autosaveChanges: 5,
      project: props.project_data,
      onLoad: async () => {
        console.log("onLoad triggered");
        return props.project_data;
      },
      onStore: async ({ project }) => {
        console.log("onStore triggered", project);
        await saveProject(project);
      },
      onSave: async ({ project }) => {
        console.log("onSave triggered", project);
        await saveProject(project);
      },
    },
     blocks: {
    default: [
     {
  id: 'navbar-section-html',
  label: 'Navbar',
  media: '<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  content: `
    <nav style="padding: 20px; background-color: #333; color: white; display: flex; justify-content: space-between;">
      <div style="font-weight: bold;">MyLogo</div>
      <div>
        <a href="#" style="margin: 0 10px; color: white;">Home</a>
        <a href="#" style="margin: 0 10px; color: white;">About</a>
        <a href="#" style="margin: 0 10px; color: white;">Contact</a>
      </div>
    </nav>
  `
         },
{
  id: 'hero-section-html',
  label: 'Hero Section',
  media: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>',
  content: `
    <section style="padding: 60px; text-align: center; background: #e0f7fa;">
      <h1 style="font-size: 2.5rem;">Welcome to Our Website</h1>
      <p style="font-size: 1.2rem;">We provide awesome services to awesome people.</p>
      <button style="padding: 10px 20px; margin-top: 20px;">Get Started</button>
    </section>
  `
         },
{
  id: 'about-section-html',
  label: 'About Section',
  media: '<svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>',
  content: `
    <section style="padding: 40px; background: #f9f9f9;">
      <h2>About Us</h2>
      <p>We are a passionate team dedicated to building amazing experiences.</p>
    </section>
  `
         },
{
  id: 'contact-section-html',
  label: 'Contact Form',
  media: '<svg viewBox="0 0 24 24"><path d="M21 8V7l-3 2-2-1-1 1-1-1-2 1-2-1-2 1-3-2v1L3 9v11h18V9l-3 1z"/></svg>',
  content: `
    <section style="padding: 40px; background: #fff;">
      <h2>Contact Us</h2>
      <form style="max-width: 400px; margin-top: 20px;">
        <input type="text" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px;" />
        <input type="email" placeholder="Your Email" style="width: 100%; padding: 10px; margin-bottom: 10px;" />
        <textarea placeholder="Your Message" style="width: 100%; padding: 10px; margin-bottom: 10px;"></textarea>
        <button type="submit" style="padding: 10px 20px;">Send</button>
      </form>
    </section>
  `
}
    ]
  },
  });
  console.log("Editor instance:", editor.value);
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
/* .cnt-nav {
  padding: 10px;
  background-color: #020420;
  color: #00dc82;
} */
.cnt-body {
  flex-grow: 1;
}
.editor {
  height: 100%;
}
</style>
