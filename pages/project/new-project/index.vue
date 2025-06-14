<!-- @format -->

<template>
  <div>
    <Header title="New Project" subtitle="Create a new project" />
    <form class="space-y-6" action="">
      <div>
        <div class="relative">
          <!-- Slider -->
          <div
            ref="slider"
            class="flex overflow-x-auto space-x-4 pb-2 snap-x snap-mandatory scroll-smooth">
            <div
              v-for="(template, index) in templates"
              :key="index"
              @click="selected = index"
              class="min-w-[200px] snap-center bg-white border-2 rounded-xl shadow-md cursor-pointer transition-all duration-300"
              :class="
                selected === index ? 'border-indigo-500' : 'border-transparent'
              ">
              <img
                :src="`http://localhost:8055/assets/${template.cover_image}`"
                :alt="template.name"
                class="w-full h-30 object-cover rounded-t-xl" />
              <div class="p-3 text-center font-semibold">
                {{ template.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <div class="mt-1">
          <input
            id="name"
            v-model="name"
            type="name"
            autocomplete="name"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>
      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700">
          Project Description
        </label>
        <div class="mt-1">
          <textarea
            id="description"
            v-model="description"
            type="description"
            rows="2"
            autocomplete="description"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="image">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImageUpload"
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <hr class="text-gray-200" />

      <div class="flex justify-between space-x-2">
        <!-- Light Gray Button -->
        <button
          class="w-full py-2 px-4 rounded-md font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-all duration-200 shadow focus:outline-none focus:ring-2 focus:ring-gray-300">
          Cancel
        </button>

        <!-- Indigo Button -->
        <button
          type="button"
          @click="handleCreateProject"
          class="w-full py-2 px-4 rounded-md font-semibold text-indigo-800 bg-indigo-100 hover:bg-indigo-200 transition-all duration-200 shadow focus:outline-none focus:ring-2 focus:ring-indigo-300">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const { createItems } = useDirectusItems();
const { getItems } = useDirectusItems();

const router = useRouter();

const name = ref("");
const description = ref("");
const imageName = ref("");
const selected = ref(0);
const templates = ref([]);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageName.value = file;
    console.log(file);
  } else {
    imageName.value = "";
  }
};

const handleCreateProject = async () => {
  try {
    //upload image first and refer to id in payload

    if (name.value === "" || description.value === "") {
      alert("Please fill in all fields");
      return;
    } else if (name.value === "Blank Website") {
      alert("Please select a diffrent name");
      return;
    } else {
      const items = [
        {
          name: name.value,
          description: description.value,
          project_code: templates.value[selected.value].template_code,
          // cover_image: imageName.value,
          status: "draft",
        },
      ];
      await createItems({ collection: "projects", items });
      router.push("/project/projects");
    }
  } catch (e) {
    alert("Error creating project: " + e.message);
  }
};

onMounted(async () => {
  try {
    const items = await getItems({
      collection: "templates",
    });
    templates.value.push(...items);
    console.log(templates.value);
  } catch (e) {}
});
</script>

<style lang="scss" scoped></style>
