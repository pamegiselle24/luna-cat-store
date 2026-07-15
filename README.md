# 🐾 Luna Cat Store

E-commerce de productos para gatos desarrollado con React y Vite como proyecto del curso de programación. Permite a los usuarios navegar productos, agregarlos al carrito, y cuenta con un panel de administración protegido por autenticación para gestionar productos y cupones.

## 🚀 Tecnologías utilizadas

- React
- React Router DOM
- Firebase (Authentication + Firestore)
- CSS Modules
- Vite

## ⚙️ Funcionalidades

- Catálogo de productos con detalle individual
- Carrito de compras
- Sistema de cupones de descuento (creación, listado y eliminación)
- Autenticación de usuarios (registro e inicio de sesión) con Firebase Auth
- Panel de administración protegido por rol ("admin"), con rutas protegidas
- Gestión de productos (crear, editar, eliminar) con carga de imágenes

## 📦 Instalación y ejecución en entorno local

1. Clonar el repositorio:

```bash
git clone https://github.com/pamegiselle24/luna-cat-store.git
cd luna-cat-store
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm run dev
```

4. Abrir el navegador en:

```
http://localhost:5173
```

## 🔑 Usuario de prueba (administrador)

Para acceder al panel de administración (Gestión de Productos y Gestión de Cupones), podés loguearte con el siguiente usuario de prueba:

- **Email:** admin@lunacatstore.com
- **Contraseña:** luna123456

También podés registrar un usuario nuevo desde la pantalla de Registro, que por defecto tendrá rol de usuario común (sin acceso al panel de administración).

## 🔥 Firebase

El proyecto utiliza Firebase para:

- **Authentication:** login con correo electrónico y contraseña
- **Firestore:** almacenamiento de productos y cupones (colecciones "productos" y "cupones")
