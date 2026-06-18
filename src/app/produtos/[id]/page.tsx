import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProductById } from "./actions";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950/50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <ProductDetailsClient product={product} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
