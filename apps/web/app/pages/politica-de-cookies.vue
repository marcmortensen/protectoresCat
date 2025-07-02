<script setup lang="ts">
useSeoMeta({
  title: "Política de cookies | Adoptar.cat",
  description:
    "Consulta la nostra política de cookies per entendre com utilitzem les cookies al nostre lloc web.",
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-4"
  >
    <h1 class="text-3xl">Política de cookies</h1>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">1. Què són les cookies?</h2>
      <p>
        Les cookies són petits arxius de text que els llocs web poden
        emmagatzemar al navegador de l’usuari per recopilar informació i
        millorar l’experiència de navegació. Algunes són essencials per al
        funcionament del lloc web, mentre que d’altres serveixen per analitzar
        el trànsit o mostrar contingut personalitzat.
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">2. Tipus de cookies utilitzades</h2>
      <p>Aquest lloc web utilitza els següents tipus de cookies:</p>
      <ul>
        <li>
          <strong>Cookies tècniques (necessàries):</strong> Indispensables per
          al funcionament correcte del lloc web. No requereixen consentiment.
        </li>
        <li>
          <strong>Cookies analítiques (opcionals):</strong> Utilitzades per
          recollir informació sobre el comportament dels usuaris al lloc, de
          forma agregada i anònima, per millorar el contingut i el rendiment del
          web (Google Analytics). Aquestes cookies només s’activen amb el
          consentiment de l’usuari.
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">
        3. Gestió de cookies mitjançant el panell de configuració
      </h2>
      <p>
        El nostre lloc web utilitza la llibreria
        <code>@dargmuesli/nuxt-cookie-control</code> per mostrar un panell de
        configuració de cookies, que et permet:
      </p>
      <ul class="list-disc pl-6">
        <li>Acceptar o rebutjar cookies no essencials.</li>
        <li>Canviar la teva elecció en qualsevol moment.</li>
      </ul>
      <p>
        Pots accedir al panell de configuració de cookies en qualsevol moment
        clicant al botó <strong>“Configuració de cookies”</strong> present al
        lloc web.
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">4. Cookies de tercers</h2>
      <p>
        Utilitzem el servei de <strong>Google Analytics</strong> proporcionat
        per Google LLC per mesurar audiències. Aquest servei pot emmagatzemar
        cookies al teu navegador amb l’objectiu d’obtenir estadístiques anònimes
        d’ús.
      </p>
      <p>
        Les dades poden ser transferides als Estats Units, però Google declara
        complir amb el marc legal de transferència internacional de dades
        conforme al Reglament General de Protecció de Dades (RGPD).
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">5. Llista de cookies utilitzades</h2>
      <p>Les cookies concretes poden variar, però en general inclouen:</p>
      <div class="overflow-x-auto">
        <table
          class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-left"
        >
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="px-4 py-2 font-semibold">Nom</th>
              <th class="px-4 py-2 font-semibold">Tipus</th>
              <th class="px-4 py-2 font-semibold">Finalitat</th>
              <th class="px-4 py-2 font-semibold">Durada</th>
              <th class="px-4 py-2 font-semibold">Proveïdor</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr>
              <td class="px-4 py-2">_ga</td>
              <td class="px-4 py-2">Analítica</td>
              <td class="px-4 py-2">
                Identificar usuaris únics (anònimament) per analitzar
                estadístiques del lloc
              </td>
              <td class="px-4 py-2">2 anys</td>
              <td class="px-4 py-2">Google</td>
            </tr>
            <tr>
              <td class="px-4 py-2">_gid</td>
              <td class="px-4 py-2">Analítica</td>
              <td class="px-4 py-2">
                Distingir usuaris dins d’un període de 24h
              </td>
              <td class="px-4 py-2">24 hores</td>
              <td class="px-4 py-2">Google</td>
            </tr>
            <tr>
              <td class="px-4 py-2">cookie_control_consent</td>
              <td class="px-4 py-2">Tècnica</td>
              <td class="px-4 py-2">
                Guardar l’estat del consentiment de l’usuari
              </td>
              <td class="px-4 py-2">1 any</td>
              <td class="px-4 py-2">Local</td>
            </tr>
            <tr>
              <td class="px-4 py-2">cookie_control_enabled_cookies</td>
              <td class="px-4 py-2">Tècnica</td>
              <td class="px-4 py-2">
                Guardar les preferències de cookies seleccionades
              </td>
              <td class="px-4 py-2">1 any</td>
              <td class="px-4 py-2">Local</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">
        6. Com pots canviar o revocar el teu consentiment?
      </h2>
      <p>
        Pots modificar les teves preferències de cookies en qualsevol moment
        mitjançant el panell de control disponible al lloc web. També pots
        eliminar les cookies emmagatzemades des de la configuració del teu
        navegador.
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">7. Més informació</h2>
      <p>
        Per a més informació sobre el tractament de les teves dades, pots
        consultar la nostra
        <UButton
          class="pl-0"
          variant="link"
          label="Política de privacitat."
          :to="{ name: 'politica-de-privacitat' }"
        />
      </p>
    </section>
    <time class="italic text-gray-300"
      >Última actualització 25 de Maig del 2025.
    </time>
  </div>
</template>
