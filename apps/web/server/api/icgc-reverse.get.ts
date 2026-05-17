//http://eines.icgc.cat/geocodificador/api-docs/#/geocodificador/invers
const ICGC_BASE = "https://eines.icgc.cat/geocodificador/invers";

type IcgcProperties = {
  comarca?: string;
  id_comarca?: string;
};

export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const lat = Number(q.lat);
  const lon = Number(q.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid parameters: lat and lon are required.",
    });
  }

  const url = new URL(ICGC_BASE);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("layers", "address,topo1");
  url.searchParams.set("size", "5");

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "No s'ha pogut contactar el geocodificador ICGC.",
    });
  }

  if (!res.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: "Resposta invàlida del geocodificador ICGC.",
    });
  }

  const data = (await res.json()) as {
    features?: { properties?: IcgcProperties }[];
  };

  for (const feature of data.features ?? []) {
    const region = feature.properties?.comarca;
    if (region && region !== "-") {
      const regionId = feature.properties?.id_comarca;
      return {
        region,
        regionId,
      };
    }
  }

  throw createError({
    statusCode: 404,
    statusMessage: "No s'ha trobat cap comarca per aquestes coordenades.",
  });
});
