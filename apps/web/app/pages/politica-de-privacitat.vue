<script setup lang="ts">
useAppSeo({
  title: "Política de privacitat",
  description:
    "Consulta la nostra política de privacitat per entendre com gestionem les dades dels usuaris.",
  articleModifiedTime: "2026-06-15T00:00:00.000Z",
});

defineRouteRules({
  sitemap: {
    lastmod: "2026-06-15T00:00:00.000Z",
    changefreq: "yearly",
    priority: 0.3,
  },
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
        El formulari de
        <NuxtLink
          class="font-semibold hover:text-primary"
          :to="{ name: 'suggest-organization' }"
          >proposta d'entitats</NuxtLink
        >
        recull el nom de l'entitat, la província, el tipus d'animals que
        acull i enllaços web o de xarxes socials que l'usuari introdueix
        voluntàriament. Aquestes dades s'envien per correu electrònic a
        <a href="mailto:info@adoptar.cat">info@adoptar.cat</a> mitjançant el
        servei <strong>Web3Forms</strong>. El formulari inclou
        <strong>hCaptcha</strong> per prevenir l'enviament automatitzat (bots).
      </p>
      <p>
        A més, el lloc utilitza <strong>Google Analytics</strong> per analitzar
        l'ús que fan els usuaris del lloc web, sempre sota consentiment explícit
        de l'usuari mitjançant el banner de cookies.
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
        Les dades del formulari de proposta d'entitats es fan servir per revisar
        i, si escau, incorporar noves entitats al recull del lloc web.
      </p>
      <p>
        Les dades recollides mitjançant Google Analytics es fan servir
        exclusivament per obtenir estadístiques agregades sobre l'ús del lloc
        web, amb la finalitat de millorar-ne el contingut i l'experiència de
        navegació.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">4. Base legal</h2>
      <p>
        La base legal per al tractament de les dades del formulari de proposta
        és l'<strong>interès legítim</strong> de gestionar i millorar el recull
        d'entitats del lloc web.
      </p>
      <p>
        La base legal per al tractament de les dades analítiques és el
        <strong>consentiment</strong> exprés de l'usuari, manifestat en acceptar
        les cookies analítiques mitjançant el banner de cookies.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">5. Conservació de les dades</h2>
      <p>
        Les propostes d'entitats es conserven el temps necessari per revisar-les
        i gestionar-les. Les dades analítiques es conserven durant el termini
        establert per Google Analytics per defecte, o fins que l'usuari
        sol·liciti la seva eliminació mitjançant l'eina d'opt-out de Google.
      </p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">6. Cessions de dades</h2>
      <p>
        Les dades del formulari de proposta es comuniquen a
        <strong>Web3Forms</strong> (proveïdor del servei d'enviament de correu)
        i a <strong>hCaptcha</strong> (Intuition Machines, Inc.), que processa
        la verificació antibot. Google Analytics rep dades d'ús del lloc amb
        consentiment de l'usuari; Google LLC té seu als Estats Units i està
        acollit al marc legal de transferència internacional de dades conforme al
        RGPD.
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
        <NuxtLink
          class="pl-0 hover:text-primary font-semibold"
          :to="{ name: 'politica-de-cookies' }"
          >Política de cookies.</NuxtLink
        >
      </p>
    </section>
    <time class="italic">Última actualització 15 de Juny del 2026. </time>
  </div>
</template>
