# 🧪 Pruebas de la API

URL de tu API: **https://mi-microservicio-production.up.railway.app**

## 📋 Probar desde el Navegador

Abre estas URLs directamente en tu navegador:

### 1. Verificar que el servicio funciona
```
https://mi-microservicio-production.up.railway.app/
```
Respuesta esperada:
```json
{
  "mensaje": "Microservicio funcionando correctamente",
  "status": "ok",
  "version": "1.0.0"
}
```

### 2. Verificar salud del servicio
```
https://mi-microservicio-production.up.railway.app/salud
```
Respuesta esperada (después de agregar PostgreSQL):
```json
{
  "status": "saludable",
  "timestamp": "2026-04-25T01:30:00.000Z",
  "database": "conectada"
}
```

### 3. Ver todos los productos
```
https://mi-microservicio-production.up.railway.app/productos
```
Respuesta esperada:
```json
{
  "total": 0,
  "productos": []
}
```

---

## 🔧 Probar con Thunder Client (VS Code)

### Instalar Thunder Client
1. Abre VS Code
2. Ve a Extensiones (Ctrl+Shift+X)
3. Busca "Thunder Client"
4. Instala la extensión

### Crear Peticiones

#### 1️⃣ GET - Obtener todos los productos
```
Método: GET
URL: https://mi-microservicio-production.up.railway.app/productos
```

#### 2️⃣ POST - Crear un producto
```
Método: POST
URL: https://mi-microservicio-production.up.railway.app/productos
Headers:
  Content-Type: application/json

Body (JSON):
{
  "nombre": "Laptop HP",
  "precio": 1500000
}
```

Respuesta esperada:
```json
{
  "mensaje": "Producto creado exitosamente",
  "producto": {
    "id": 1,
    "nombre": "Laptop HP",
    "precio": "1500000.00",
    "created_at": "2026-04-25T01:30:00.000Z"
  }
}
```

#### 3️⃣ POST - Crear más productos
```
Método: POST
URL: https://mi-microservicio-production.up.railway.app/productos

Body:
{
  "nombre": "Mouse Logitech",
  "precio": 45000
}
```

```
Body:
{
  "nombre": "Teclado Mecánico",
  "precio": 120000
}
```

```
Body:
{
  "nombre": "Monitor Samsung 24\"",
  "precio": 450000
}
```

#### 4️⃣ GET - Obtener un producto específico
```
Método: GET
URL: https://mi-microservicio-production.up.railway.app/productos/1
```

#### 5️⃣ PUT - Actualizar un producto
```
Método: PUT
URL: https://mi-microservicio-production.up.railway.app/productos/1

Body:
{
  "nombre": "Laptop HP Pavilion 15",
  "precio": 1600000
}
```

#### 6️⃣ DELETE - Eliminar un producto
```
Método: DELETE
URL: https://mi-microservicio-production.up.railway.app/productos/1
```

---

## 💻 Probar con curl (Terminal)

### Obtener productos
```bash
curl https://mi-microservicio-production.up.railway.app/productos
```

### Crear producto
```bash
curl -X POST https://mi-microservicio-production.up.railway.app/productos \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Laptop Dell\",\"precio\":1800000}"
```

### Obtener producto por ID
```bash
curl https://mi-microservicio-production.up.railway.app/productos/1
```

### Actualizar producto
```bash
curl -X PUT https://mi-microservicio-production.up.railway.app/productos/1 \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Laptop Dell XPS\",\"precio\":2000000}"
```

### Eliminar producto
```bash
curl -X DELETE https://mi-microservicio-production.up.railway.app/productos/1
```

---

## 🎯 Flujo de Prueba Completo

1. **Verificar salud**: GET /salud (debe decir "database": "conectada")
2. **Ver productos vacíos**: GET /productos
3. **Crear 3 productos**: POST /productos (3 veces con diferentes datos)
4. **Ver todos los productos**: GET /productos
5. **Ver un producto específico**: GET /productos/1
6. **Actualizar un producto**: PUT /productos/2
7. **Eliminar un producto**: DELETE /productos/3
8. **Verificar cambios**: GET /productos

---

## ✅ Checklist

- [ ] PostgreSQL agregado en Railway
- [ ] Endpoint /salud muestra "database": "conectada"
- [ ] Puedo crear productos (POST)
- [ ] Puedo ver productos (GET)
- [ ] Puedo actualizar productos (PUT)
- [ ] Puedo eliminar productos (DELETE)

---

## 🐛 Solución de Problemas

### Error: "database": "desconectada"
**Solución**: Agrega PostgreSQL en Railway (+ New → Database → PostgreSQL)

### Error 500 al crear productos
**Solución**: Verifica que PostgreSQL esté agregado y conectado

### No puedo acceder a la URL
**Solución**: Verifica que generaste el dominio en Settings → Networking

---

¡Tu microservicio está listo para producción! 🚀
