import Head from "next/head";
import { useRouter } from "next/router";

import config from "~/admin.config";

export type SeoProps = {
  title?: string;
  type?: string;
};

const SITE_NAME = config.name;

export function Seo(props: SeoProps) {
  const router = useRouter();

  const meta = {
    type: "website",
    ...props,
  };

  const title = props.title ? `${props.title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Head>
      <title>{title}</title>

      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="robots" content="noindex" />
    </Head>
  );
}
