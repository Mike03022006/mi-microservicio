# 📘 Guía Completa de Despliegue en Railway

## Paso 1: Instalar Dependencias

Abre la terminal en la carpeta `mi-microservicio` y ejecuta:

```bash
npm install
```

Esto instalará Express y pg (PostgreSQL client).

## Paso 2: Probar Localmente (Opcional)

Si tienes PostgreSQL instalado localmente:

```bash
# Crea un archivo .env con tu conexión local
echo "DATABASE_URL=postgresql://usuario:password@localhost:5432/tu_db" > .env

# Inicia el servidor
npm start
```

Abre http://localhost:3000 en tu navegador.

## Paso 3: Configurar Git y GitHub

### 3.1 Inicializar Git

```bash
git init
git add .
git commit -m "Primer commit: microservicio completo"
```

### 3.2 Crear Repositorio en GitHub

1. Ve a https://github.com
2. Clic en el botón "+" → "New repository"
3. Nombre: `mi-microservicio`
4. Deja todo por defecto y clic en "Create repository"

### 3.3 Conectar y Subir

```bash
# Reemplaza TU-USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/mi-microservicio.git
git branch -M main
git push -u origin main
```

## Paso 4: Desplegar en Railway

### 4.1 Crear Cuenta en Railway

1. Ve a https://railway.app
2. Clic en "Login" → "Login with GitHub"
3. Autoriza Railway para acceder a tus repositorios

### 4.2 Crear Proyecto

1. Clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Busca y selecciona `mi-microservicio`
4. Railway detectará el Dockerfile automáticamente y comenzará el build

### 4.3 Agregar Base de Datos PostgreSQL

1. En tu proyecto de Railway, clic en "+ New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway crea la base de datos y la conecta automáticamente
4. La variable `DATABASE_URL` se configura automáticamente

### 4.4 Generar Dominio Público

1. Clic en tu servicio (el que tiene el código, no la base de datos)
2. Ve a la pestaña "Settings"
3. Busca la sección "Networking"
4. Clic en "Generate Domain"
5. Railway te dará una URL como: `https://mi-microservicio-production.up.railway.app`

## Paso 5: Probar tu API en Producción

### Opción 1: Desde el Navegador

Abre estas URLs (reemplaza con tu dominio):

- https://tu-dominio.up.railway.app/
- https://tu-dominio.up.railway.app/salud
- https://tu-dominio.up.railway.app/productos

### Opción 2: Con Thunder Client (VS Code)

1. Instala la extensión "Thunder Client" en VS Code
2. Crea una nueva petición:

**GET - Obtener productos:**
```
GET https://tu-dominio.up.railway.app/productos
```

**POST - Crear producto:**
```
POST https://tu-dominio.up.railway.app/productos
Content-Type: application/json

{
  "nombre": "Laptop HP",
  "precio": 1500000
}
```

**PUT - Actualizar producto:**
```
PUT https://tu-dominio.up.railway.app/productos/1
Content-Type: application/json

{
  "nombre": "Laptop HP Actualizada",
  "precio": 1600000
}
```

**DELETE - Eliminar producto:**
```
DELETE https://tu-dominio.up.railway.app/productos/1
```

### Opción 3: Con curl (Terminal)

```bash
# Obtener productos
curl https://tu-dominio.up.railway.app/productos

# Crear producto
curl -X POST https://tu-dominio.up.railway.app/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Mouse Logitech","precio":45000}'

# Obtener un producto específico
curl https://tu-dominio.up.railway.app/productos/1

# Actualizar producto
curl -X PUT https://tu-dominio.up.railway.app/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Mouse Logitech Pro","precio":55000}'

# Eliminar producto
curl -X DELETE https://tu-dominio.up.railway.app/productos/1
```

## Paso 6: Ver Logs en Railway

1. En Railway, clic en tu servicio
2. Ve a la pestaña "Deployments"
3. Clic en el deployment activo
4. Verás los logs en tiempo real

## 🔄 Actualizar tu Aplicación

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Railway detectará los cambios y desplegará automáticamente.

## ⚠️ Solución de Problemas

### El servicio no inicia
- Verifica los logs en Railway
- Asegúrate de que el Dockerfile esté correcto
- Verifica que `DATABASE_URL` esté configurada

### Error de conexión a la base de datos
- Verifica que agregaste PostgreSQL en Railway
- Asegúrate de que ambos servicios estén en el mismo proyecto
- Railway conecta automáticamente la variable `DATABASE_URL`

### Cambios no se reflejan
- Verifica que hiciste `git push`
- Espera a que termine el build en Railway (1-2 minutos)
- Revisa los logs de deployment

## 🎉 ¡Listo!

Tu microservicio está funcionando en producción con:
- ✅ API REST completa
- ✅ Base de datos PostgreSQL
- ✅ Dominio público HTTPS
- ✅ Despliegue automático con Git
