import { useEffect, useState } from "react";
import { type Product } from "../types/products.type";
import { getAllProducts } from "../features/products/productsApi";
import HomeHeader from "../components/HomeHeader";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getAndSetProducts() {
    const products = await getAllProducts();
    setProducts(products);
  }
  useEffect(() => {
    getAndSetProducts();
  }, [products]);

  const dummyData = [
    {
      id: "fakeP123",
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2RRmg5zLST6U-noOqq-TMPrxbGeA8I72_zTTA6iCkYxkUUbSsCE5ACRBuqcNR3-yNr3f9W6WvJ-h52K4ezBw_oKcu7VfK4fEykT-ZHtgpJ-lqg4U933CJcUzo7JVjXD9JeSLrY_OA6WX_KG9oDNxuiN0guXeuxOhA3zzXMWO6gIGta1xZ0fYRDiilWcE4mw8D-AF--0NIJQW1L1j2R2AeDhzwpb039QYNY26YaA_UcFcwoRoR7Rtho8WY4FKbZkj5eHxJnLyYDPs",
      name: "Crystal Clear meth",
      description: "It makes you crazy",
      price: 200,
      stock: 99,
    },
    {
      id: "fakeP223",
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2RRmg5zLST6U-noOqq-TMPrxbGeA8I72_zTTA6iCkYxkUUbSsCE5ACRBuqcNR3-yNr3f9W6WvJ-h52K4ezBw_oKcu7VfK4fEykT-ZHtgpJ-lqg4U933CJcUzo7JVjXD9JeSLrY_OA6WX_KG9oDNxuiN0guXeuxOhA3zzXMWO6gIGta1xZ0fYRDiilWcE4mw8D-AF--0NIJQW1L1j2R2AeDhzwpb039QYNY26YaA_UcFcwoRoR7Rtho8WY4FKbZkj5eHxJnLyYDPs",
      name: "Crystal Clear meth",
      description: "It makes you crazy",
      price: 200,
      stock: 99,
    },
    {
      id: "fakeP323",
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2RRmg5zLST6U-noOqq-TMPrxbGeA8I72_zTTA6iCkYxkUUbSsCE5ACRBuqcNR3-yNr3f9W6WvJ-h52K4ezBw_oKcu7VfK4fEykT-ZHtgpJ-lqg4U933CJcUzo7JVjXD9JeSLrY_OA6WX_KG9oDNxuiN0guXeuxOhA3zzXMWO6gIGta1xZ0fYRDiilWcE4mw8D-AF--0NIJQW1L1j2R2AeDhzwpb039QYNY26YaA_UcFcwoRoR7Rtho8WY4FKbZkj5eHxJnLyYDPs",
      name: "Crystal Clear meth",
      description: "It makes you crazy",
      price: 200,
      stock: 99,
    },
  ];

  return (
    <main>
      <HomeHeader />
      <div className="flex flex-col gap-4 mx-4">
        <div className="mt-3">
          <h1 className="font-headline-lg text-headline-lg text-primary-fixed-dim uppercase tracking-tighter mb-xs">
            FORBIDDEN CARGO
          </h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant max-w-2xl mb-5">
            VERIFIED VENDOR LISTINGS. ALL QUANTITIES MEASURED IN METRIC
            STANDARDS. NO QUESTIONS ASKED, NO REFUNDS GIVEN.
          </p>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {dummyData.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Home;
