export const products = [
  {
    id: 1,
    name: "Smartphone Galaxy S23",
    price: 899.99,
    description: "Último modelo de smartphone con pantalla AMOLED de 6.1 pulgadas, 128GB de almacenamiento.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1694829822213-294a26f36efe?w=400&h=400&fit=crop",
    stock: 15
  },
  {
    id: 2,
    name: "Laptop Gamer Pro",
    price: 1299.99,
    description: "Laptop para gaming con procesador i7, 16GB RAM y RTX 3060.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w-400&h=400&fit=crop",
    stock: 8
  },
  {
    id: 3,
    name: "Camiseta Deportiva",
    price: 29.99,
    description: "Camiseta técnica para deporte, material transpirable y secado rápido.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    stock: 45
  },
  {
    id: 4,
    name: "Zapatillas Running",
    price: 89.99,
    description: "Zapatillas profesionales para running con amortiguación premium.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    stock: 25
  },
  {
    id: 5,
    name: "Sofá Moderno",
    price: 499.99,
    description: "Sofá de tres plazas con diseño escandinavo y tejido resistente.",
    category: "home",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    stock: 12
  },
  {
    id: 6,
    name: "Lámpara de Pie",
    price: 79.99,
    description: "Lámpara de pie con diseño minimalista y luz regulable.",
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    stock: 30
  },
  {
    id: 7,
    name: "Bicicleta de Montaña",
    price: 349.99,
    description: "Bicicleta todo terreno con 21 velocidades y suspensión delantera.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop",
    stock: 10
  },
  {
    id: 8,
    name: "Set de Pesas",
    price: 129.99,
    description: "Set completo de pesas ajustables de 5 a 25kg.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=400&h=400&fit=crop",
    stock: 18
  }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      resolve(product);
    }, 1000);
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === "all") {
        resolve(products);
      } else {
        const filteredProducts = products.filter(p => p.category === category);
        resolve(filteredProducts);
      }
    }, 1000);
  });
};