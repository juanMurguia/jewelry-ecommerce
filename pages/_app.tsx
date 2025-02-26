import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { DefaultSeo } from "next-seo";
import { Provider } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Jewelry Store"
        description="Luxury jewelry for all occasions."
        openGraph={{
          title: "Jewelry Store",
          description: "Luxury jewelry for all occasions.",
          url: "https://jewelry-ecommerce-delta.vercel.app",
          siteName: "Jewelry Store",
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Suspense>
    </>
  );
}
