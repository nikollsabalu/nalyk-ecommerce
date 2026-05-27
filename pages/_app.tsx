import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout"; 
import {CartProvider} from '@/context/CartContext'
import { CollectionsProvider } from "@/context/CollectionContext";

export default function App({ Component, pageProps }: AppProps) { 

  return (
    <CartProvider>
      <CollectionsProvider>
      <Layout >
        <Component {...pageProps} />
      </Layout>
      </CollectionsProvider>
    </CartProvider>
  );
}