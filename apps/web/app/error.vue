<script setup lang="ts"></script>
<template>
  <UApp>
    <NuxtLayout>
      <div class="h-screen max-w-screen bg-white flex items-center">
        <div
          class="container flex flex-col-reverse md:flex-row items-center justify-center px-5 text-gray-700"
        >
          <div class="max-w-md">
            <div class="text-5xl font-dark font-bold">404</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <UButton
              icon="i-lucide-house"
              label="Back to homepage"
              :to="{ name: 'index' }"
            />
          </div>
          <div class="max-w-lg flex justify-center h-full w-full">
            <SvgoAnimalsCatTripBase
              :font-controlled="false"
              class="h-52 w-full sm:h-96"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </UApp>
</template>
