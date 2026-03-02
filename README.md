# 🔥 Fire Market 🛒

> E-commerce desarrollado con **React + Firebase** 

---

## 📋 Descripción

**Fire Market** es una tienda online donde los usuarios pueden:

* Explorar productos por categoría
* Ver el detalle de cada artículo
* Gestionar un carrito de compras persistente
* Finalizar una orden de compra

Los productos y órdenes se almacenan en **Firestore**, y el stock se actualiza en tiempo real mediante **transacciones atómicas**.

---

# 💻 Version Host 💻

Si desea ver el proyecto online, puede ingresar al siguiente link:
👉 **[App](https://fire-market-angel.vercel.app/)**

---

## 🚀 Funcionalidades principales

* 🗂️ Catálogo de productos con filtro por categoría
* 🔍 Vista de detalle con stock en tiempo real
* 🛒 Carrito con persistencia en `localStorage`
* ✅ Validación de stock al agregar productos y en checkout
* 📦 Actualización atómica del stock en Firestore
* 📱 Diseño responsive con menú hamburguesa
* 🔔 Notificaciones toast al agregar productos

---

# 🖥️ Preview del proyecto

## 🏠 Pantalla principal (catálogo + filtros)

![Home](./public/gifs/home.gif)

---

## 📦 Detalle del producto + agregar al carrito

<p align="center">
  <img src="https://i.postimg.cc/sxM1PNs0/0aade779_7f4e_4fb0_a583_a032ff1fd93b.gif" width="800"/>
</p>

---

## 🧾 Checkout + generación de orden

Al finalizar la compra:

* Se despliega un modal con formulario
* Se genera un número de orden
* Se valida en Firebase la creación correcta

<p align="center">
  <img src="https://i.postimg.cc/Kv4tQ002/output-onlinegiftools.gif" width="800"/>
</p>

---

# ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/fire-market.git
```

### 2️⃣ Ingresar al proyecto

```bash
cd fire-market
```

### 3️⃣ Instalar dependencias

```bash
npm install
```

### 4️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:5173
```

> ⚠️ Requisito: **Node.js v22.11.0 o superior**

---

# 📁 Estructura del proyecto

```
src/
│
├── components/
│   ├── NavBar.jsx
│   ├── ItemListContainer.jsx
│   ├── ItemDetailContainer.jsx
│   ├── ItemDetail.jsx
│   ├── ItemCount.jsx
│   ├── Item.jsx
│   ├── CartWidget.jsx
│   ├── CartContainer.jsx
│   ├── CartView.jsx
│   ├── Checkout.jsx
│   ├── Toast.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── EmptyCart.jsx
│   ├── Error.jsx
│   └── ScrollToTop.jsx
│
├── context/
│   └── CartContext.jsx
│
├── service/
│   ├── firebase.jsx
│   ├── firestoreService.js
│   └── ordersService.js
│
└── css/
```

---

# 📚 Librerías utilizadas

| Librería         | Versión | Uso                        |
| ---------------- | ------- | -------------------------- |
| React            | ^19.2.0 | Biblioteca principal de UI |
| React DOM        | ^19.2.0 | Renderizado en navegador   |
| React Router DOM | ^7.12.0 | Navegación SPA             |
| Firebase         | ^12.9.0 | Base de datos Firestore    |
| React Icons      | ^5.5.0  | Íconos SVG                 |
| Prop Types       | ^15.8.1 | Validación de props        |
| Vite             | 7.2.5   | Bundler y servidor         |

---

# 👨‍💻 Autor

Desarrollado por **Angel Gabriel Berretta** 🔥

---
