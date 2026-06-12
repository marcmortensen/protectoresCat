import type { MaybeRefOrGetter } from "vue";

type RobotsMeta =
  | string
  | {
      index?: boolean;
      follow?: boolean;
      noimageindex?: boolean;
    };

export function useAppSeo(options: {
  title: MaybeRefOrGetter<string | undefined>;
  description: MaybeRefOrGetter<string | undefined>;
  ogImage?: MaybeRefOrGetter<string | undefined>;
  articleModifiedTime?: MaybeRefOrGetter<string | undefined>;
  canonical?: MaybeRefOrGetter<string | false | undefined>;
  robots?: MaybeRefOrGetter<RobotsMeta | undefined>;
}) {
  useSeoMeta(options);
}
