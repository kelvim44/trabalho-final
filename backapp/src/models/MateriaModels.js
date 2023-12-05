const connection = require('../db');

// Cadastrar uma nova matéria
exports.cadastrarMateria = (usuarioId, nomeMateria, cargaHoraria) => {
  return new Promise((resolve, reject) => {
    // Inserir a nova matéria na tabela Materias
    connection.query('INSERT INTO Materias (nomeMaterias, carga_horaria) VALUES (?, ?)', [nomeMateria, cargaHoraria], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const materiaId = result.insertId;

        // Inserir a nova matéria na tabela Materiasacursar
        connection.query('INSERT INTO Materiasacursar (usuarios_id, materias_id) VALUES (?, ?)', [usuarioId, materiaId], (error, result) => {
          if (error) {
            reject(error);
          } else {
            // Retornar os dados inseridos na tabela Materiasacursar
            connection.query('SELECT * FROM Materiasacursar WHERE materiasacursar_id = ?', [result.insertId], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result[0]);
              }
            });
          }
        });
      }
    });
  });
};
/*exports.cadastrarMateria = (nomeMateria, carga_horaria) => {
  return new Promise((resolve, reject) => {
    // Inserir a nova matéria planejada na tabela MatériasAcursar
    connection.query('INSERT INTO Materiasacursar (nomeMateria, carga_horaria) VALUES (?, ?)', [nomeMateria, carga_horaria], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // Obter a matéria recém-cadastrada para retornar ao cliente
        connection.query('SELECT * FROM MateriasAcursar WHERE MatériasAcursar_id = ?', [results.insertId], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });
};*/


// Obter matérias a cursar
exports.getMateriasCursadas = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT materiascursadas.*, Materias.nomeMaterias AS nomeMaterias, Materias.carga_horaria FROM Materiascursadas JOIN Materias ON Materiascursadas.materias_id = Materias.materias_id JOIN Usuarios ON Materiascursadas.usuarios_id = Usuarios.usuarios_id;', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


// Obter matérias cursadas
exports.getMateriasACursar = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT materiasacursar.*, Materias.nomeMaterias AS nomeMaterias, Materias.carga_horaria FROM Materiasacursar JOIN Materias ON Materiasacursar.materias_id = Materias.materias_id JOIN Usuarios ON Materiasacursar.usuarios_id = Usuarios.usuarios_id;', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


// Marcar uma matéria como cursada
exports.marcarComoCursada = (id) => {
  return new Promise((resolve, reject) => {
    // Passo 1: Obter informações da matéria a ser marcada como cursada
    connection.query('SELECT * FROM materiasacursar WHERE materiasacursar_id = ?', [id], (error, selectResults) => {
      if (error) {
        reject(error);
        return;
      }

      if (selectResults.length === 0) {
        reject(new Error('Matéria a ser marcada como cursada não encontrada.'));
        return;
      }

      const materia = selectResults[0];

      // Passo 2: Remover a matéria de materiasacursar
      connection.query('DELETE FROM materiasacursar WHERE materiasacursar_id = ?', [id], (error, deleteResults) => {
        if (error) {
          reject(error);
          return;
        }

        // Passo 3: Inserir a matéria em materiascursadas
        connection.query('INSERT INTO materiascursadas (materias_id, nomeMaterias, carga_horaria) VALUES (?, ?, ?)', [materia.materias_id, materia.nomeMaterias, materia.carga_horaria], (error, insertResults) => {
          if (error) {
            reject(error);
          } else {
            resolve(insertResults);
          }
        });
      });
    });
  });
};

/*exports.marcarComoCursada = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE MateriasCursadas SET MateriasCursadas_id = true WHERE MateriasCursadas_id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}; */
