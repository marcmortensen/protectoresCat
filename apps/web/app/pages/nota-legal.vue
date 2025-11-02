<script setup lang="ts">
useSeoMeta({
  title: "Avís legal | Adoptar.cat",
  description:
    "Avís legal d'Adoptar.cat, informació sobre l'ús del lloc web i responsabilitats.",
  articleModifiedTime: "2025-11-02T00:00:00.000Z",
});

defineRouteRules({
  sitemap: {
    lastmod: "2025-11-02T00:00:00.000Z",
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
        El codi font i continguts d'aquest lloc web estan llicenciats sota la
        <a
          href="https://github.com/marcmortensen/protectoresCat/blob/master/apps/web/LICENSE"
          target="_blank"
          rel="noopener"
          class="font-semibold hover:text-primary"
          >Llicència Apache, versió 2.0</a
        >. Això vol dir que podeu utilitzar, modificar i distribuir el codi i
        continguts lliurement, sempre que respecteu els termes de la llicència
        (incloent-hi la indicació de canvis realitzats i la inclusió de la
        llicència).
      </p>
      <p>
        <strong>Excepcions:</strong> El nom "Adoptar.cat", el logotip del lloc i
        les icones/imatges d'animals no estan coberts per aquesta llicència
        oberta. Aquests elements són propietat exclusiva del responsable del
        lloc i no poden ser utilitzats en obres derivades, forks o altres
        projectes sense autorització expressa per escrit.
      </p>
      <p>
        Els logotips i altres materials proporcionats per terceres parts
        (associacions, entitats, etc.) poden tenir les seves pròpies llicències
        i restriccions d'ús.
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
