const MateriaModel = require('../Models/MateriaModels');
const connection = require("../db")
// Cadastrar uma nova matéria
exports.cadastrarMateria = async (req, res) => {
    const { nome } = req.body;

  try {
      const novaMateria = await MateriaModel.cadastrarMateria(nome);
      res.json(novaMateria);
  } catch (error) {
      console.error('Erro ao cadastrar matéria:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Obter matérias a cursar
exports.getMateriasACursar = async (req, res) => {
  try {
    const materiasACursar = await MateriaModel.getMateriasACursar();
    res.json(materiasACursar);
  } catch (error) {
    console.error('Erro ao obter matérias a cursar:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Obter matérias cursadas
exports.getMateriasCursadas = async (req, res) => {
  try {
    const materiasCursadas = await MateriaModel.getMateriasCursadas();
    res.json(materiasCursadas);
  } catch (error) {
    console.error('Erro ao obter matérias cursadas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Marcar uma matéria como cursada
exports.marcarComoCursada = async (req, res) => {
  const { id } = req.body;
  try {
    await MateriaModel.marcarComoCursada(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao marcar matéria como cursada:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
