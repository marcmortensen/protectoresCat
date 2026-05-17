import type { RegionsCollectionItem } from "@nuxt/content";

// https://api.idescat.cat/emex/v1/nodes.xml
const IDESCAT_ID_TO_REGION_SLUG: Record<string, RegionsCollectionItem["slug"]> =
  {
    "01": "alt-camp",
    "02": "alt-emporda",
    "03": "alt-penedes",
    "04": "alt-urgell",
    "05": "alta-ribagorca",
    "06": "anoia",
    "07": "bages",
    "08": "baix-camp",
    "09": "baix-ebre",
    "10": "baix-emporda",
    "11": "baix-llobregat",
    "12": "baix-penedes",
    "13": "barcelones",
    "14": "bergueda",
    "15": "cerdanya",
    "16": "conca-de-barbera",
    "17": "garraf",
    "18": "garrigues",
    "19": "garrotxa",
    "20": "girones",
    "21": "maresme",
    "22": "montsia",
    "23": "noguera",
    "24": "osona",
    "25": "pallars-jussa",
    "26": "pallars-sobira",
    "27": "pla-durgell",
    "28": "pla-de-lestany",
    "29": "priorat",
    "30": "ribera-debre",
    "31": "ripolles",
    "32": "segarra",
    "33": "segria",
    "34": "selva",
    "35": "solsones",
    "36": "tarragones",
    "37": "terra-alta",
    "38": "urgell",
    "39": "aran",
    "40": "valles-occidental",
    "41": "valles-oriental",
    "42": "moianes",
    "43": "llucanes",
  };

function idToRegionSlug(idescatId: string | null | undefined) {
  if (!idescatId) return null;
  return IDESCAT_ID_TO_REGION_SLUG[idescatId] || null;
}

export function useGeolocation() {
  const locating = ref(false);

  function getCurrentPositionCoords(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!import.meta.client || !navigator.geolocation) {
        reject(new Error("Geolocation not available"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        reject,
        {
          enableHighAccuracy: false,
          maximumAge: 60_000,
          timeout: 15_000,
        }
      );
    });
  }

  async function getRegionSlug(): Promise<
    RegionsCollectionItem["slug"] | null
  > {
    if (!import.meta.client) {
      return null;
    }
    locating.value = true;
    try {
      const { lat, lon } = await getCurrentPositionCoords();
      const res = await $fetch<{ region: string; regionId: string | null }>(
        "/api/icgc-reverse",
        { query: { lat, lon } }
      );
      return idToRegionSlug(res.regionId);
    } catch {
      return null;
    } finally {
      locating.value = false;
    }
  }

  return {
    locating,
    getRegionSlug,
  };
}
