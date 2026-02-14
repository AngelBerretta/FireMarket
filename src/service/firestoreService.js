import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  runTransaction
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Obtiene todos los productos de Firestore
 * @returns {Promise<Array>} Array de productos
 */
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "productos");
    const snapshot = await getDocs(productsCollection);

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return products;
  } catch (error) {
    throw new Error("No se pudieron cargar los productos");
  }
};

/**
 * Obtiene un producto por su ID de Firestore
 * @param {string} id - ID del documento en Firestore
 * @returns {Promise<Object|null>} Producto o null si no existe
 */
export const getProductById = async (id) => {
  try {
    const productDoc = doc(db, "productos", id);
    const snapshot = await getDoc(productDoc);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("No se pudo cargar el producto");
  }
};

/**
 * Obtiene productos filtrados por categoría
 * @param {string} category - Categoría a filtrar ('all' para todos)
 * @returns {Promise<Array>} Array de productos filtrados
 */
export const getProductsByCategory = async (category) => {
  try {
    const productsCollection = collection(db, "productos");

    if (category === "all" || !category) {
      return await getProducts();
    }

    const q = query(productsCollection, where("category", "==", category));
    const snapshot = await getDocs(q);

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return products;
  } catch (error) {
    throw new Error("No se pudieron cargar los productos de esta categoría");
  }
};

/**
 * Descuenta el stock de múltiples productos usando una transacción atómica.
 * Si cualquier producto no tiene stock suficiente, se cancela todo.
 *
 * @param {Array<{ id: string, quantity: number }>} items - Items a descontar
 * @returns {Promise<void>}
 * @throws {Error} Si algún producto no tiene stock suficiente o no existe
 */
export const updateProductStock = async (items) => {
  await runTransaction(db, async (transaction) => {
    // 1. Leer todos los documentos primero (Firestore exige leer antes de escribir)
    const snapshots = await Promise.all(
      items.map(item => transaction.get(doc(db, "productos", item.id)))
    );

    // 2. Validar stock de cada producto
    for (let i = 0; i < items.length; i++) {
      const snap = snapshots[i];
      const { id, quantity } = items[i];

      if (!snap.exists()) {
        throw new Error(`El producto "${id}" ya no existe.`);
      }

      const currentStock = snap.data().stock ?? 0;

      if (currentStock < quantity) {
        const name = snap.data().name || id;
        throw new Error(
          `Stock insuficiente para "${name}". Disponible: ${currentStock}, solicitado: ${quantity}.`
        );
      }
    }

    // 3. Escribir los nuevos stocks (solo si todas las validaciones pasaron)
    for (let i = 0; i < items.length; i++) {
      const snap = snapshots[i];
      const { id, quantity } = items[i];
      const newStock = snap.data().stock - quantity;
      transaction.update(doc(db, "productos", id), { stock: newStock });
    }
  });
};
