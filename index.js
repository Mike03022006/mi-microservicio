const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Crear tabla al iniciar (solo si no existe)
pool.query(`
  CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log('✅ Tabla productos verificada/creada');
}).catch(err => {
  console.error('❌ Error al crear tabla:', err);
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Microservicio funcionando correctamente', 
    status: 'ok',
    version: '1.0.1',
    database_configured: !!process.env.DATABASE_URL
  });
});

// Ruta de salud
app.get('/salud', (req, res) => {
  res.json({ 
    status: 'saludable', 
    timestamp: new Date(),
    database: pool.totalCount > 0 ? 'conectada' : 'desconectada'
  });
});

// Insertar producto
app.post('/productos', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    
    if (!nombre || !precio) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: nombre y precio' 
      });
    }

    const result = await pool.query(
      'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    
    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al insertar producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Consultar todos los productos
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json({
      total: result.rows.length,
      productos: result.rows
    });
  } catch (error) {
    console.error('Error al consultar productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Consultar un producto por ID
app.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al consultar producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Actualizar producto
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *',
      [nombre, precio, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({
      mensaje: 'Producto actualizado exitosamente',
      producto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({
      mensaje: 'Producto eliminado exitosamente',
      producto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
