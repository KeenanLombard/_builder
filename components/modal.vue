<!-- @format -->

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center">
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        @click.self="emitClose">
        <slot name="header">
          <h3 class="text-lg font-semibold mb-4">Modal Title</h3>
        </slot>

        <slot> Modal body goes here. </slot>

        <slot name="footer">
          <div class="mt-6 text-right">
            <button
              @click="emitClose"
              class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
              Close
            </button>
          </div>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);

function emitClose() {
  emit("close");
}
</script>
