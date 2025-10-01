<script setup lang="ts">
useSeoMeta({
  title: "Avís legal | Adoptar.cat",
  description:
    "Avís legal d'Adoptar.cat, informació sobre l'ús del lloc web i responsabilitats.",
  articleModifiedTime: "2025-08-07T00:00:00.000Z",
});

defineRouteRules({
  sitemap: {
    lastmod: "2025-08-07T00:00:00.000Z",
    changefreq: "yearly",
    priority: 0.3,
  },
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-4"
  >
    <h1 class="text-3xl">Avís legal</h1>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Informació general</h2>
      <p>
        En compliment amb el que estableix la Llei 34/2002, d’11 de juliol, de
        serveis de la societat de la informació i comerç electrònic (LSSI-CE),
        s’informa que aquest lloc web és titularitat de:
      </p>
      <ul class="flex flex-col gap-1">
        <li><strong>Nom del responsable: </strong>Marc Garriga Mortensen</li>
        <li>
          <strong>Contacte: </strong>
          <a href="mailto:legal@adoptar.cat">legal@adoptar.cat</a>
        </li>
        <li>
          <strong>Finalitat del lloc web:</strong> Proporcionar informació sobre
          entitats i associacions registrades a Catalunya que permitin
          adopcions, plana sense ànim de lucre ni activitat econòmica associada.
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Condicions d’ús</h2>
      <p>
        L’accés i ús d’aquesta web atribueix la condició d’usuari, qui accepta
        des del mateix moment d’accés les condicions generals d’ús aquí
        reflectides. Aquestes condicions podran ser modificades pel titular en
        qualsevol moment, i seran publicades degudament.
      </p>
      <p>
        L’usuari es compromet a fer un ús adequat dels continguts i serveis que
        s’ofereixen, i a no emprar-los per activitats il·lícites, il·legals o
        contràries a la bona fe i a l’ordre públic.
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Propietat intel·lectual</h2>
      <p>
        Tots els continguts del lloc web (textos, imatges, documents, logotips,
        etc.) són propietat del responsable del lloc o de tercers que n'han
        autoritzat l’ús. Queda prohibida la seva reproducció, distribució o
        modificació sense autorització expressa del titular.
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Responsabilitat</h2>
      <p>
        El responsable no es fa responsable de la informació publicada per
        tercers a través d’enllaços externs o comentaris, ni dels possibles
        errors en la informació proporcionada, tot i comprometre’s a revisar-la
        i actualitzar-la regularment.
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Dades identificatives</h2>
      <p>
        Les dades identificatives completes del responsable del lloc web (inclòs
        NIF) estan a disposició de les autoritats competents. Podeu
        sol·licitar-les escrivint a:
        <a href="mailto:legal@adoptar.cat">legal@adoptar.cat</a>.
      </p>
    </section>
    <time class="italic">Última actualització 7 de Juliol del 2025. </time>
  </div>
</template>
