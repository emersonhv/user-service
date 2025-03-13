# 🚀 Microservicios para una Red Social

Este proyecto implementa una red social utilizando microservicios con **Node.js**, **Express**, **TypeScript**, **Prisma ORM** y **JWT** para autenticación. La arquitectura está basada en dos microservicios:

- `user-service`: Gestión de usuarios (registro, autenticación, perfil).
- `post-service`: Gestión de publicaciones (crear, listar, dar like).

Cada servicio tiene su propia base de datos **PostgreSQL**, administrada con **Docker Compose**.

## 📌 Tecnologías Utilizadas

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT para autenticación
- Docker + Docker Compose
- React.js para el frontend
- Context API para gestión de estado

## 📂 Estructura del microservicio user-service 

```
📦 microservices-social
 ┣ 📂 user-service
 ┃ ┣ 📂 prisma
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 config   
 ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📂 dtos   
 ┃ ┃ ┣ 📂 middleware
 ┃ ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┣ 📂 repositoy
 ┃ ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📜 server.ts
 ┃ ┃ ┣ 📜 app.tsx
 ┣ 📜 docker-compose.yml
 ┣ 📜 Dockerfile
 ┣ 📜 README.md
```

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el Repositorio
```sh
git clone https://github.com/emersonhv/user-service.git
cd user-service
```

### 2️⃣ Configurar Variables de Entorno
Crea un archivo `.env` con las siguientes variables:

**user-service/.env**
```env
PORT=3000
DATABASE_URL=postgres://user_service:usuarios2025@localhost:5432/db-user
JWT_SEED=b26696e34d0b9b2ec61a89a79e17c03faf736843604b911fefad097a99d29fc6
```


### 3️⃣ Levantar los Servicios con Docker Compose
```sh
docker buil -t user-service .
docker-compose up --build
```
Esto iniciará los contenedores de PostgreSQL y los microservicios.

### 4️⃣ Ejecutar Migraciones y Seeder (Prisma)
Dentro del microservicio se ejecutan automaticamente las migraciones y seeder:

### 5️⃣ Acceder a los Endpoints
- **User Service**: `http://localhost:3000/api/users`

## 📜 API Endpoints

### 🔹 User Service (`/api/users`)
- `POST /register` → Registrar un usuario.
- `POST /login` → Iniciar sesión y recibir JWT.
- `GET /profile` → Obtener perfil (requiere autenticación).

## ✅ Pruebas
Ejecuta las pruebas unitarias con:
```sh
npm test
```

## 📄 Documentación
La documentación de la API está disponible en **Swagger** en:
- `http://localhost:3000/api-docs` (user-service)

## 🔥 Contribuciones
Las contribuciones son bienvenidas. Crea un **fork** del repositorio, genera una **branch** y abre un **pull request**. 🚀

## 📌 Licencia
Este proyecto está bajo la licencia **MIT**.

---
Fue todo un placer ❤️ 



