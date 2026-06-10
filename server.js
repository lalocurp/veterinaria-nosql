const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const mongoURI = 'mongodb://lalocuro:Candia128proyecto@ac-nypax1c-shard-00-00.f8zkznh.mongodb.net:27017,ac-nypax1c-shard-00-01.f8zkznh.mongodb.net:27017,ac-nypax1c-shard-00-02.f8zkznh.mongodb.net:27017/veterinaria?ssl=true&replicaSet=atlas-iwhx4e-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('🚀 ¡Conectado exitosamente a MongoDB Atlas!'))
  .catch(err => console.error('❌ Error de conexión:', err));

// ==================== MODELOS ====================
const Cliente = mongoose.model('Cliente', new mongoose.Schema({
    nombre: String, dni: String, telefono: String, email: String
}), 'clientes');

const Paciente = mongoose.model('Paciente', new mongoose.Schema({
    nombre: String, especie: String, raza: String, dueno: String
}), 'pacientes');

const Historial = mongoose.model('Historial', new mongoose.Schema({
    mascota: String, fecha: String, motivo: String, diagnostico: String
}), 'historial');

const Vacunacion = mongoose.model('Vacunacion', new mongoose.Schema({
    paciente: String, producto: String, fecha: String
}), 'prevencion');

// ==================== RUTAS CRUD ====================

// --- CLIENTES ---
app.get('/api/clientes', async (req, res) => { res.json(await Cliente.find()); });
app.post('/api/clientes', async (req, res) => { await new Cliente(req.body).save(); res.json({ status: 'ok' }); });
app.put('/api/clientes/:id', async (req, res) => { await Cliente.findByIdAndUpdate(req.params.id, req.body); res.json({ status: 'ok' }); });
app.delete('/api/clientes/:id', async (req, res) => { await Cliente.findByIdAndDelete(req.params.id); res.json({ status: 'ok' }); });

// --- PACIENTES ---
app.get('/api/pacientes', async (req, res) => { res.json(await Paciente.find()); });
app.post('/api/pacientes', async (req, res) => { await new Paciente(req.body).save(); res.json({ status: 'ok' }); });
app.put('/api/pacientes/:id', async (req, res) => { await Paciente.findByIdAndUpdate(req.params.id, req.body); res.json({ status: 'ok' }); });
app.delete('/api/pacientes/:id', async (req, res) => { await Paciente.findByIdAndDelete(req.params.id); res.json({ status: 'ok' }); });

// --- HISTORIAL ---
app.get('/api/historial', async (req, res) => { res.json(await Historial.find()); });
app.post('/api/historial', async (req, res) => { await new Historial(req.body).save(); res.json({ status: 'ok' }); });
app.put('/api/historial/:id', async (req, res) => { await Historial.findByIdAndUpdate(req.params.id, req.body); res.json({ status: 'ok' }); });
app.delete('/api/historial/:id', async (req, res) => { await Historial.findByIdAndDelete(req.params.id); res.json({ status: 'ok' }); });

// --- VACUNACIÓN ---
app.get('/api/vacunacion', async (req, res) => { res.json(await Vacunacion.find()); });
app.post('/api/vacunacion', async (req, res) => { await new Vacunacion(req.body).save(); res.json({ status: 'ok' }); });
app.put('/api/vacunacion/:id', async (req, res) => { await Vacunacion.findByIdAndUpdate(req.params.id, req.body); res.json({ status: 'ok' }); });
app.delete('/api/vacunacion/:id', async (req, res) => { await Vacunacion.findByIdAndDelete(req.params.id); res.json({ status: 'ok' }); });

app.listen(3000, () => { console.log('🌍 Servidor funcionando en: http://localhost:3000'); });
