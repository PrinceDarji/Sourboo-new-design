import { notFound } from 'next/navigation';
import Navbar from '../../components/about/AboutNavbar';
import SiteFooter from '../../components/SiteFooter';
import PdpInteractiveSection from '@/app/components/product/PdpInteractiveSection';
import { CATALOG_PRODUCTS, findCatalogProduct } from '@/src/lib/catalog/products';
import { siteUrl } from '@/src/lib/siteUrl';
import { productStructuredData, serializeJsonLd } from '@/src/lib/seo/structuredData';
import type { Metadata } from 'next';

export const revalidate = 300;

export async function generateStaticParams() {
  return CATALOG_PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findCatalogProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Sourboo',
    };
  }

  const title = `${product.name} | Sourboo`;
  const description = product.detailInJarSummary || product.name;

  return {
    alternates: { canonical: `/product/${product.slug}` },
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `/product/${product.slug}`,
      images: [{ url: product.jarImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.jarImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findCatalogProduct(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = productStructuredData(product, siteUrl);

  return (
    <main className="sb-pdp-container" style={{ minHeight: '100vh', background: '#8B5CF6' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Navbar />

      <PdpInteractiveSection product={product} />

      <SiteFooter />
    </main>
  );
}
