<script setup lang="ts">
useSeoMeta({
  title: "Política de privacitat | Adoptar.cat",
  description:
    "Consulta la nostra política de privacitat per entendre com gestionem les dades dels usuaris.",
});
</script>
<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-4"
  >
    <h1 class="text-3xl">Política de privacitat</h1>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">1. Responsable del tractament</h2>
      <p><strong>Nom: </strong> Marc Garriga Mortensen</p>
      <p>
        <strong>Contacte: </strong>
        <a href="mailto:legal@adoptar.cat">legal@adoptar.cat</a>
      </p>
      <p>Aquest lloc web és de caràcter informatiu i no té ànim de lucre.</p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">2. Dades que es recullen</h2>
      <p>
        No es recullen dades personals directament mitjançant formularis o
        subscripcions.
      </p>
      <p>
        Tanmateix, el lloc utilitza <strong>Google Analytics</strong> per
        analitzar l’ús que fan els usuaris del lloc web, sempre sota
        consentiment explícit de l’usuari mitjançant el banner de cookies.
      </p>
      <p>Google Analytics pot recollir dades com ara:</p>
      <ul class="list-disc pl-6 mt-2">
        <li>Adreça IP anonimitzada</li>
        <li>Tipus de dispositiu i navegador</li>
        <li>Pàgines visitades i temps de navegació</li>
        <li>Ubicació aproximada (ciutat, país)</li>
      </ul>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">3. Finalitat del tractament</h2>
      <p>
        Les dades recollides mitjançant Google Analytics es fan servir
        exclusivament per obtenir estadístiques agregades sobre l’ús del lloc
        web, amb la finalitat de millorar-ne el contingut i l’experiència de
        navegació.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">4. Base legal</h2>
      <p>
        La base legal per al tractament d’aquestes dades és el
        <strong>consentiment</strong> exprés de l’usuari, manifestat en acceptar
        les cookies analítiques mitjançant el banner de cookies.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">5. Conservació de les dades</h2>
      <p>
        Les dades es conserven durant el termini establert per Google Analytics
        per defecte, o fins que l’usuari sol·liciti la seva eliminació
        mitjançant l'eina d'opt-out de Google.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">6. Cessions de dades</h2>
      <p>
        Les dades no es comuniquen a tercers, excepte a Google LLC, proveïdor
        del servei Google Analytics, amb seu als Estats Units i acollit al marc
        legal de transferència internacional de dades conforme al RGPD.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">7. Drets dels usuaris</h2>
      <p>
        Els usuaris poden exercir els seus drets d’accés, rectificació,
        supressió, oposició, limitació del tractament i portabilitat de les
        dades, escrivint a:
        <a href="mailto:legal@adoptar.cat">legal@adoptar.cat</a>
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">8. Política de cookies</h2>
      <p>
        Per a més informació sobre l’ús de cookies i com configurar-les,
        consulteu la
        <UButton
          class="pl-0"
          variant="link"
          label="Política de cookies."
          :to="{ name: 'politica-de-cookies' }"
        />
      </p>
    </section>
    <time class="italic text-gray-300"
      >Última actualització 25 de Maig del 2025.
    </time>
  </div>
</template>
