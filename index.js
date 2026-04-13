const pool = require('./db');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/usuario', (req, res) => {
  const usuario = {
    id: 1,
    nombre: 'Fatima',
    rol: 'Administrador'
  };

  res.json(usuario);
});


pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error de conexión', err);
  });
app.get('/alumnos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});