<!-- @format -->

<template>
  <div class="h-screen text-gray-800">
    <Header title="Dashboard" subtitle="Get insights into your data" />
    <!-- Sidebar -->

    <!-- Main content area -->
    <div class="flex flex-col flex-1">
      <!-- Dashboard content -->
      <main class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Emails -->
          <div class="bg-white p-4 rounded border border-gray-200">
            <h4 class="font-semibold text-gray-700 mb-3">Recent Emails</h4>
            <ul class="text-sm space-y-2">
              <li class="flex justify-between">
                <span>✅ Welcome Email</span>
                <span class="text-gray-500">Draft</span>
              </li>
              <li class="flex justify-between">
                <span>📧 Product Launch</span>
                <span class="text-green-600">Sent</span>
              </li>
              <li class="flex justify-between">
                <span>📬 Newsletter</span>
                <span class="text-yellow-600">Scheduled</span>
              </li>
            </ul>
          </div>

          <!-- Pages -->
          <div class="bg-white p-4 rounded border border-gray-200">
            <h4 class="font-semibold text-gray-700 mb-3">Recent Web Pages</h4>
            <ul class="text-sm space-y-2">
              <li class="flex justify-between">
                <span>🌐 Landing Page</span>
                <span class="text-green-600">Published</span>
              </li>
              <li class="flex justify-between">
                <span>🛠 Pricing Page</span>
                <span class="text-gray-500">Draft</span>
              </li>
              <li class="flex justify-between">
                <span>📄 About Us</span>
                <span class="text-green-600">Published</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// no logic yet, sample only
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
