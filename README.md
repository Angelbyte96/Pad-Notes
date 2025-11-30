
# 📝 PAD NOTES - Gestión de Notas con Autenticación

Una aplicación web moderna para crear y gestionar notas personales, con autenticación segura mediante Clerk, base de datos serverless con Turso, y protección contra abuso con rate limiting.

![Captura de pantalla de la aplicación](https://res.cloudinary.com/ddinz4ewu/image/upload/v1746399001/Recursos/PadNotes/Home.png)

## 🚀 Características

- **Autenticación robusta**: Login con Google OAuth y Email/Password mediante Clerk
- **CRUD completo de notas**: Crear, leer, actualizar y eliminar notas personales
- **Rate Limiting**: Protección contra abuso con límites de peticiones por usuario
- **Validación de datos**: Schemas Zod para validación type-safe
- **Base de datos edge**: Turso (libSQL) con replicación global
- **Diseño responsive**: Interfaz adaptativa con Tailwind CSS 4
- **Filtrado seguro**: Cada usuario solo accede a sus propias notas
- **Búsqueda en tiempo real**: Filtro de notas con highlighting de coincidencias

## 🛠 Stack Tecnológico

- **Frontend**:  
  ![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)  
  ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)  
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?logo=tailwind-css&logoColor=white)  
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

- **Backend/Database**:  
  ![Turso](https://img.shields.io/badge/Turso-4DB8FF?logo=turso&logoColor=white)  
  ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=black)

- **Autenticación**:  
  ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=white)

- **Rate Limiting**:  
  ![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00E9A3?logo=redis&logoColor=white)

- **Validación**:  
  ![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)

- **Deploy**:  
  ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## 📦 Instalación

### Requisitos Previos

- Node.js (v20+)
- pnpm (v10+)
- Cuenta en [Clerk](https://clerk.com)
- Cuenta en [Turso](https://turso.tech)
- Cuenta en [Upstash](https://upstash.com)

### Pasos para Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Angelbyte96/AppNotas
   cd AppNotas
   ```

2. **Instalar dependencias**:
   ```bash
   cd client
   pnpm install
   ```

3. **Configurar Clerk**:
   - Ve a [Clerk Dashboard](https://dashboard.clerk.com)
   - Crea una nueva aplicación
   - Habilita Google OAuth y Email/Password
   - Copia las claves API

4. **Configurar Turso**:
   ```bash
   # Instalar Turso CLI (si no lo tienes)
   pnpm install -g turso-cli

   # Login
   turso auth login

   # Crear base de datos
   turso db create appnotas

   # Obtener URL
   turso db show appnotas --url

   # Crear token
   turso db tokens create appnotas
   ```

5. **Configurar Upstash Redis**:
   - Ve a [Upstash Console](https://console.upstash.com/redis)
   - Crea una nueva base de datos Redis
   - Selecciona la región más cercana
   - Copia las credenciales REST

6. **Crear archivo `.env` en `client/`**:
   ```env
   # Clerk
   PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx

   # Turso
   TURSO_DATABASE_URL=libsql://appnotas-xxxxx.turso.io
   TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQS...

   # Upstash Redis
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AXxxxxxxxxxxxx
   ```

7. **Inicializar base de datos**:
   ```bash
   # Push del schema a Turso
   pnpm drizzle-kit push
   ```

8. **Levantar servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

   La aplicación estará disponible en `http://localhost:4321`

## 🎮 Uso

1. **Registro/Login**:
   - Accede a la página principal
   - Haz clic en "Sign in" para autenticarte con Google o Email/Password

2. **Dashboard**:
   - Crea nuevas notas con el botón "Nueva nota"
   - Busca notas usando el campo de búsqueda
   - Edita notas haciendo clic en el ícono de edición
   - Elimina notas con el ícono de papelera

3. **Cerrar sesión**:
   - Usa el botón de usuario en la esquina superior

## 🔌 API Endpoints

La aplicación expone los siguientes endpoints protegidos:

| Método | Endpoint | Descripción | Rate Limit |
|--------|----------|-------------|------------|
| `GET` | `/api/notes` | Listar notas del usuario | 30 req/10s |
| `POST` | `/api/notes` | Crear nueva nota | 10 req/10s |
| `PUT` | `/api/notes/[id]` | Actualizar nota | 10 req/10s |
| `DELETE` | `/api/notes/[id]` | Eliminar nota | 10 req/10s |

### Ejemplo de Request

**Crear nota:**
```bash
curl -X POST http://localhost:4321/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi nota",
    "textNote": "Contenido de la nota"
  }'
```

**Respuesta:**
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Mi nota",
    "textNote": "Contenido de la nota",
    "userId": "user_xxxxx",
    "createdAt": "2025-11-30T10:00:00.000Z",
    "updatedAt": "2025-11-30T10:00:00.000Z"
  }
}
```

## 🗄 Estructura del Proyecto

```
AppNotas/
├── client/                     # Aplicación Astro + React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── SendNotes.jsx
│   │   │   ├── ListNotes.jsx
│   │   │   └── NoteArticle.jsx
│   │   ├── hooks/              # Custom hooks
│   │   │   └── useNotesActions.jsx
│   │   ├── pages/              # Rutas Astro
│   │   │   ├── index.astro
│   │   │   ├── dashboard/
│   │   │   └── api/
│   │   │       └── notes/      # API Routes
│   │   │           ├── index.ts
│   │   │           └── [id].ts
│   │   ├── db/                 # Drizzle ORM
│   │   │   ├── schema.ts       # Schema de BD
│   │   │   └── index.ts        # Cliente Turso
│   │   ├── lib/                # Utilidades
│   │   │   ├── ratelimit.ts    # Rate limiting
│   │   │   └── validations.ts  # Schemas Zod
│   │   └── middleware.ts       # Clerk middleware
│   ├── drizzle.config.ts       # Config Drizzle Kit
│   └── astro.config.mjs        # Config Astro
```

## 🔐 Schema de Base de Datos

```typescript
// notes table
{
  id: uuid (primary key),
  title: text (3-100 caracteres),
  textNote: text (3-400 caracteres),
  userId: text (indexed),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🚀 Deploy en Vercel

1. **Importar en Vercel**:
   - Ve a [Vercel Dashboard](https://vercel.com)
   - Importa el repositorio desde GitHub
   - Configura el directorio raíz como `client/`

2. **Configurar variables de entorno**:
   - Agrega todas las variables del `.env` en Settings > Environment Variables:
     - `PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - `TURSO_DATABASE_URL`
     - `TURSO_AUTH_TOKEN`
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`

3. **Deploy**:
   - Vercel desplegará automáticamente

## 🔍 Capturas de Pantalla

![Login](https://res.cloudinary.com/ddinz4ewu/image/upload/v1746399212/Recursos/PadNotes/Login.png)
![Home](https://res.cloudinary.com/ddinz4ewu/image/upload/v1746399417/Recursos/PadNotes/Dashboard.png)
![Lista de Notas](https://res.cloudinary.com/ddinz4ewu/image/upload/v1746399523/Recursos/PadNotes/Lista_de_notas.png)

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

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Hecho con ❤️ por [Angelbyte](https://github.com/Angelbyte96)

## 🙏 Agradecimientos

- [Clerk](https://clerk.com) por la autenticación
- [Turso](https://turso.tech) por la base de datos edge
- [Upstash](https://upstash.com) por el rate limiting
- [Vercel](https://vercel.com) por el hosting
