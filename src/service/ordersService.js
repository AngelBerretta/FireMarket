import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { updateProductStock } from "./firestoreService";

/**
 * Crea una nueva orden en Firestore y descuenta el stock de cada producto.
 * El stock se actualiza mediante una transacción atómica: si falla algún
 * producto, la orden NO se guarda y el stock NO cambia.
 *
 * @param {Object} orderData
 * @param {Object}   orderData.buyer  - { name, phone, email }
 * @param {Array}    orderData.items  - items del carrito [{ id, name/title, price, quantity }]
 * @param {number}   orderData.total  - total de la compra
 * @returns {Promise<string>} ID de la orden generada
 * @throws {Error} Si el stock es insuficiente o hay un error de red
 */
export const createOrder = async (orderData) => {
  // ── 1. Descontar stock primero (transacción atómica) ──────────────────────
  // Si algún producto no tiene stock suficiente, esto lanza un Error
  // y la ejecución se corta aquí; la orden nunca se crea.
  await updateProductStock(
    orderData.items.map(item => ({ id: item.id, quantity: item.quantity }))
  );

  // ── 2. Crear la orden en Firestore ────────────────────────────────────────
  try {
    const mappedItems = orderData.items.map(item => ({
      id: item.id,
      title: item.name || item.title,
      price: item.price,
      quantity: item.quantity
    }));

    const order = {
      buyer: {
        name: orderData.buyer.name,
        phone: orderData.buyer.phone,
        email: orderData.buyer.email
      },
      items: mappedItems,
      date: Timestamp.now(),
      total: orderData.total
    };

    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, order);

    return docRef.id;

  } catch (error) {
    throw new Error("No se pudo crear la orden. Inténtalo nuevamente.");
  }
};


