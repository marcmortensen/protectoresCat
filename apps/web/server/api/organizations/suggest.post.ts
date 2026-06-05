import { z } from "zod";
import { verifyRecaptcha } from "../verifyRecaptcha";
import type {
  OrganizationsCollectionItem,
  ProvincesCollectionItem,
} from "@nuxt/content";

type GitHubIssueResponse = {
  number: number;
  html_url: string;
};

const PROVINCE_LABELS: Record<ProvincesCollectionItem["slug"], string> = {
  barcelona: "Barcelona",
  girona: "Girona",
  lleida: "Lleida",
  tarragona: "Tarragona",
};

const ANIMAL_FOCUS_LABELS: Record<
  OrganizationsCollectionItem["animalFocus"],
  string
> = {
  cats: "Gats",
  dogs: "Gossos",
  "cats&dogs": "Gats i gossos",
};

const optionalUrlField = z
  .string()
  .trim()
  .refine((value) => value === "" || z.url().safeParse(value).success);

const organizationSuggestRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    animalFocus: z.enum(["cats", "dogs", "cats&dogs"]),
    province: z.enum(["barcelona", "girona", "lleida", "tarragona"]),
    website: optionalUrlField.optional().default(""),
    facebook: optionalUrlField.optional().default(""),
    instagram: optionalUrlField.optional().default(""),
    tiktok: optionalUrlField.optional().default(""),
    twitter: optionalUrlField.optional().default(""),
    recaptchaToken: z.string().min(1),
  })
  .refine(
    (data) =>
      [
        data.website,
        data.facebook,
        data.instagram,
        data.tiktok,
        data.twitter,
      ].some((url) => url && url.trim() !== ""),
    { path: ["website"] }
  );

type SuggestFormData = Omit<
  z.infer<typeof organizationSuggestRequestSchema>,
  "recaptchaToken"
>;

function buildIssueBody(data: SuggestFormData): string {
  const lines = [
    "## Nova entitat proposada",
    "",
    `**Nom:** ${data.name}`,
    `**Focus animal:** ${ANIMAL_FOCUS_LABELS[data.animalFocus] ?? data.animalFocus}`,
    `**Província:** ${PROVINCE_LABELS[data.province] ?? data.province}`,
    "",
    "### Enllaços",
  ];

  const linkFields = [
    { label: "Lloc web", value: data.website },
    { label: "Facebook", value: data.facebook },
    { label: "Instagram", value: data.instagram },
    { label: "TikTok", value: data.tiktok },
    { label: "Twitter / X", value: data.twitter },
  ];

  for (const { label, value } of linkFields) {
    if (value && value.trim() !== "") {
      lines.push(`- **${label}:** ${value.trim()}`);
    }
  }

  lines.push(
    "",
    "---",
    "_Proposat des del formulari [adoptar.cat/suggest-organization](https://adoptar.cat/suggest-organization)_"
  );

  return lines.join("\n");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.githubToken) {
    throw createError({
      statusCode: 503,
      statusMessage: "El servei no està configurat.",
    });
  }

  if (!config.recaptchaSecretKey) {
    throw createError({
      statusCode: 503,
      statusMessage: "El servei no està configurat.",
    });
  }

  const body = await readBody(event);
  const parsed = organizationSuggestRequestSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Dades del formulari no vàlides.",
    });
  }

  const { recaptchaToken, ...formData } = parsed.data;
  const clientIp = getRequestIP(event, { xForwardedFor: true }) ?? undefined;

  const recaptchaValid = await verifyRecaptcha(
    recaptchaToken,
    config.recaptchaSecretKey,
    clientIp
  );

  if (!recaptchaValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "La verificació reCAPTCHA ha fallat. Torna-ho a provar.",
    });
  }

  const owner = config.githubRepoOwner;
  const repo = config.githubRepoName;
  const title = `[Nova entitat] ${formData.name} — ${PROVINCE_LABELS[formData.province] ?? formData.province}`;
  const issueBody = buildIssueBody(formData);

  let response: Response;
  try {
    response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.githubToken}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "adoptar.cat-suggest-form",
        },
        body: JSON.stringify({
          title,
          body: issueBody,
        }),
      }
    );
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "No s'ha pogut enviar la proposta. Torna-ho a provar.",
    });
  }

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: "No s'ha pogut enviar la proposta. Torna-ho a provar.",
    });
  }

  const issue = (await response.json()) as GitHubIssueResponse;

  return {
    issueUrl: issue.html_url,
    issueNumber: issue.number,
  };
});
