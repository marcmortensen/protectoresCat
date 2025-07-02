<script setup lang="ts"></script>
<template>
  <UApp class="font-display">
    <NuxtLayout>
      <div class="h-screen max-w-screen bg-white flex items-center">
        <div
          class="container flex flex-col-reverse md:flex-row items-center justify-center px-5 text-gray-700"
        >
          <div class="max-w-md">
            <div class="text-5xl font-dark font-bold">404</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              La pàgina no s’ha trobat.
            </p>
            <p class="mb-8">Potser ha estat eliminada o no existeix.</p>

            <UButton
              icon="i-lucide-house"
              label="Tornar a l'inici"
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
