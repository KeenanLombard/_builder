<!-- @format -->

<!-- @format -->

<template>
  <div>
    <!-- Navigation bar -->
    <nav class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <!-- Mobile menu button -->
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="isOpen = !isOpen">
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed -->
              <svg
                v-if="!isOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open -->
              <svg
                v-else
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Logo and Desktop Navigation -->
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <!-- Logo -->
            <div class="flex flex-shrink-0 items-center">
              <div
                class="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                ⚡
              </div>
              <span class="ml-2 text-lg font-semibold hidden sm:block"
                >Form Forge</span
              >
            </div>

            <!-- Desktop Menu -->
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a
                  href="/"
                  class="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >Dashboard</a
                >
                <a
                  href="/project/projects"
                  class="text-gray-500 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >Projects</a
                >
                <a
                  href="/template/templates"
                  class="text-gray-500 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >Templates</a
                >
              </div>
            </div>
          </div>

          <!-- User Profile Dropdown -->
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              class="rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <button
                  type="button"
                  class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="profileOpen = !profileOpen">
                  <span class="sr-only">Open user menu</span>
                  <div
                    class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    U
                  </div>
                </button>
              </div>

              <!-- Profile dropdown menu -->
              <div
                v-if="profileOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-100 ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Your Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state -->
      <div v-if="isOpen" class="sm:hidden" id="mobile-menu">
        <!-- <div class="space-y-1 px-2 pt-2 pb-3">
          <a
            href="#"
            class="bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >Dashboard</a
          >
          <a
            href="#"
            class="text-gray-500 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >Projects</a
          >
          <a
            href="#"
            class="text-gray-500 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >Calendar</a
          >
          <a
            href="#"
            class="text-gray-500 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >Reports</a
          >
        </div> -->
      </div>
    </nav>

    <!-- Main content -->
    <main>
      <div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Toggle states for mobile menu and profile dropdown
const isOpen = ref(false);
const profileOpen = ref(false);

// Close profile dropdown when clicking outside (optional enhancement)
/*
onMounted(() => {
  document.addEventListener('click', (e) => {
    const profileButton = document.getElementById('user-menu-button');
    if (profileButton && !profileButton.contains(e.target) && profileOpen.value) {
      profileOpen.value = false;
    }
  });
});
*/
</script>

<style lang="scss" scoped></style>
