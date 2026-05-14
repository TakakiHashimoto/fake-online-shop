const BASE_URL = "http://localhost:5000/api/products";

async function getAllProducts() {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.data.products;
}

async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data.data.product;
}

export { getAllProducts, getProductById };
