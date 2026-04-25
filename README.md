# Microservicio con Node.js, Express y PostgreSQL

Microservicio RESTful para gestión de productos con base de datos PostgreSQL.

## 🚀 Características

- API REST completa (CRUD)
- Conexión a PostgreSQL
- Dockerizado
- Listo para desplegar en Railway

## 📋 Requisitos

- Node.js 18+
- PostgreSQL (o usar Railway)
- Git

## 🔧 Instalación Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🌐 Endpoints

### GET /
Verifica que el servicio está funcionando

### GET /salud
Verifica el estado del servicio y la conexión a la base de datos

### GET /productos
Obtiene todos los productos

### GET /productos/:id
Obtiene un producto específico por ID

### POST /productos
Crea un nuevo producto
```json
{
  "nombre": "Producto ejemplo",
  "precio": 9500
}
```

### PUT /productos/:id
Actualiza un producto existente
```json
{
  "nombre": "Producto actualizado",
  "precio": 12000
}
```

### DELETE /productos/:id
Elimina un producto por ID

## 🐳 Docker

```bash
# Construir imagen
docker build -t mi-microservicio .

# Ejecutar contenedor
docker run -p 3000:3000 -e DATABASE_URL="tu_url_postgresql" mi-microservicio
```

## 🚂 Desplegar en Railway

1. Sube tu código a GitHub
2. Crea un proyecto en [Railway](https://railway.app)
3. Conecta tu repositorio de GitHub
4. Agrega una base de datos PostgreSQL desde Railway
5. Railway detectará el Dockerfile y desplegará automáticamente
6. Genera un dominio público en Settings → Networking

## 🧪 Probar la API

Puedes usar Thunder Client (extensión de VS Code), Postman, o curl:

```bash
# Obtener productos
curl https://tu-dominio.up.railway.app/productos

# Crear producto
curl -X POST https://tu-dominio.up.railway.app/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop","precio":1500000}'
```

## 📝 Variables de Entorno

- `PORT`: Puerto del servidor (default: 3000)
- `DATABASE_URL`: URL de conexión a PostgreSQL (Railway lo configura automáticamente)

## 📄 Licencia

ISC
