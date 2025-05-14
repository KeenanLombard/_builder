<!-- @format -->

<template>
  <div
    class="max-w-md rounded-lg overflow-hidden cursor-pointer shadow-md bg-white transition-transform duration-200 hover:scale-102 hover:shadow-lg">
    <!-- Cover Image -->
    <div
      @click="() => router.push(getPath())"
      class="h-48 bg-gray-200 relative">
      <!-- Using a placeholder since we don't have the actual image -->
      <!-- In a real app, you would use: :src="getImageUrl(project.cover_image)" -->
      <img
        :src="`http://localhost:8055/assets/${project.cover_image}`"
        alt="Project Cover"
        class="w-full h-full object-cover" />

      <!-- Status Badge -->
      <div class="absolute top-4 right-4">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            getStatusColor(project.status),
          ]">
          {{ formatStatus(project.status) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div @click="() => router.push(getPath())" class="p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-2">{{ project.name }}</h2>

      <div class="text-gray-600 mb-4 text-sm">
        {{ formatDescription(project.description) }}
      </div>

      <!-- Metadata -->
      <div class="pt-4 border-t border-b pb-4 border-gray-200">
        <div class="flex items-center text-gray-500 text-sm mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Created: {{ formatDate(project.date_created) }}</span>
        </div>

        <div class="flex items-center text-gray-500 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Updated: {{ formatDate(project.date_updated) }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mb-4 mx-6 space-x-2">
      <button
        v-if="props.type === 'project'"
        @click.stop="$emit('convert', project)"
        class="flex items-center bg-blue-100 text-blue-900 hover:bg-blue-200 cursor-pointer font-semibold px-3 py-2 rounded-xl space-x-2 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
        <p>Convert to template</p>
      </button>
      <button
        v-if="project.name !== 'Blank Website'"
        @click.stop="$emit('delete', project)"
        class="flex items-center bg-red-100 text-red-900 hover:bg-red-200 cursor-pointer font-semibold px-3 py-2 rounded-xl space-x-2 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        <p>Delete</p>
      </button>
      <button
        v-else
        class="flex items-center bg-blue-100 text-blue-900 hover:bg-blue-200 cursor-pointer font-semibold px-3 py-2 rounded-xl space-x-2 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>

        <p>No Actions Available</p>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["project", "type"]);

const project = ref(null);
const router = useRouter();

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getPath = () => {
  if (props.type === "project") {
    return `/project/${project.value.id}`;
  } else if (props.type === "template") {
    return `/project/new-project`;
  }
  return "/";
};

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-yellow-100 text-yellow-800";
    case "archived":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDescription = (description) => {
  if (!description) return "No description available.";
  return description.length > 30
    ? description.substring(0, 30) + " . . . "
    : description;
};

const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

onBeforeMount(() => {
  project.value = props.project;
});
</script>
