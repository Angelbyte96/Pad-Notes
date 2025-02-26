
# 📝 Notas App - Gestión de Notas con Autenticación

Una aplicación web para crear y gestionar notas personales, con autenticación de usuarios integrada usando Strapi como backend.

![Captura de pantalla de la aplicación](https://res.cloudinary.com/ddinz4ewu/image/upload/v1740539657/Web.png) <!-- Agrega una imagen aquí -->

## 🚀 Características

- **Autenticación de usuarios**: Registro e inicio de sesión con JWT.
- **CRUD de notas**: Crear, leer y eliminar notas personales.
- **Persistencia de sesión**: Datos de usuario almacenados en `localStorage`.
- **Diseño responsive**: Interfaz adaptativa construida con Tailwind CSS.
- **Filtrado seguro**: Cada usuario solo ve sus propias notas.

## 🛠 Tecnologías Utilizadas

- **Frontend**:  
  ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)  
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

- **Backend**:  
  ![Strapi](https://img.shields.io/badge/Strapi-2F2E8B?logo=strapi&logoColor=white)

- **Otros**:  
  ![Auth0](https://img.shields.io/badge/Auth0-EB5424?logo=auth0&logoColor=white) (Opcional)

## 📦 Instalación

### Requisitos Previos

- Node.js (v18+)
- npm (v9+)
- Strapi CLI (`npm install -g strapi`)

### Pasos para Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Angelbyte96/AppNotas
   cd tu-repositorio
   ```

2. **Instalar dependencias del frontend**:
   ```bash
   cd frontend
   npm install
   ```

3. **Configurar backend Strapi**:
   ```bash
   cd ../backend
   npm install
   ```

4. **Crear archivo `.env` en backend con**:
   ```env
    # Generar claves en base64
    HOST=0.0.0.0
    PORT=http://localhost:1337
    APP_KEYS=toBeModified1,toBeModified2,toBeModified3,toBeModified4
    API_TOKEN_SALT=tobemodified
    ADMIN_JWT_SECRET=tobemodified
    TRANSFER_TOKEN_SALT=tobemodified

   # Database
    DATABASE_CLIENT=sqlite
    DATABASE_HOST=
    DATABASE_PORT=
    DATABASE_NAME=
    DATABASE_USERNAME=
    DATABASE_PASSWORD=
    DATABASE_SSL=false
    DATABASE_FILENAME=.tmp/data.db
    JWT_SECRET=tobemodified
   ```
5. **Crear archivo `.env` en client con**:
   ```env
   VITE_AUTH0_DOMAIN=dominioDeAuth0
   VITE_AUTH0_CLIENT_ID=opcionalSiSeUsaAuth0
   VITE_STRAPI_HOST=tuHostDeStrapi -> http://localhost:1337
   VITE_STRAPI_TOKEN=toTokenDeStrapi
   
7. **Levantar los servidores**:

   - **Client**:
     ```bash
     cd client
     npm run dev
     ```

   - **Backend**:
     ```bash
     cd ../backend
     npm run dev
     ```
## 🎮 Uso
1. **Registro/Login**:
    - Accede a http://localhost:1337
    - Usa el formulario para registrarte o iniciar sesión.
2. **Crear nota**:
    - Escribe tu nota en el campo de texto y haz clic en "Guardar".
3. **Ver notas**:
    - Las notas se mostrarán automáticamente en la lista.
4. **Cerrar sesión**:
    - Usa el botón "Cerrar sesión" situado en la inferior.

### 🗄 Estructura del Proyecto
```
StrapiWithAuth0/
├── client/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── hooks/          # Lógica de autenticación
│   │   └── App.jsx         # Componente principal
│
├── backend/                # Proyecto Strapi
│   ├── api/
│   │   └── note/           # Modelo y controladores de notas
│   └── config/             # Configuración de plugins

```

# 🔍 Capturas de Pantalla

![Login](https://res.cloudinary.com/ddinz4ewu/image/upload/v1740539807/Login.png)
![Home](https://res.cloudinary.com/ddinz4ewu/image/upload/v1740544025/Home.png)
![Lista de Notas](https://res.cloudinary.com/ddinz4ewu/image/upload/v1740544195/Notes.png)

## 🤝 Contribución

Sigue estos pasos para contribuir al proyecto:

1. **Haz un fork del proyecto**
2. **Crea tu rama**  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Realiza commits descriptivos**
4. **Haz push a la rama**  
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Abre un Pull Request**

---

Hecho con ❤️ por [Angelbyte](https://github.com/Angelbyte96)
