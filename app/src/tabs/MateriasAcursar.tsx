import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'native-base';
import axios from 'axios';

const MateriasACursarScreen = ({ navigation }) => {
const [materiasACursar, setMateriasACursar] = useState([]);

  useEffect(() => {
    // Carregar matérias a cursar do banco de dados
    axios.get("http://192.168.0.105:3000/api/materiasAcursar") 
    .then(response => {
      console.log('Dados recebidos:', response.data);
      setMateriasACursar(response.data);
    })
    .catch(error => console.error(error));
}, []);
  const marcarComoCursada = (Materias_id) => {
    console.log('Materia ID:', Materias_id);
    // Marcar matéria como cursada no banco de dados
    axios.post("http://192.168.0.105:3000/api/marcarcomocursada", { Materias_id })
    .then(response => {
      // Atualizar a lista de matérias a cursar
      setMateriasACursar(response.data);
    })
    .catch(error => console.error(error));
    
};
  const confirmarCursadas = () => {
    if (Array.isArray(materiasACursar)) {
    const materiasCursadas = materiasACursar.filter(materias => materias.marcada);
    console.log('Materias cursadas:', materiasCursadas);
    if (materiasCursadas.length > 0) {
      axios.post("http://192.168.0.105:3000/api/marcarComoCursada", { materiasCursadas })
        .then(response => {
          setMateriasACursar(response.data);
        })
        .catch(error => console.error('Erro ao marcar como cursada:', error));
    } else {
      console.warn('Nenhuma matéria selecionada para confirmação.');
    }
  }
  };
  
  const renderMateria = (materia) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        key={materia.MateriasAcursar_id}
        style={styles.materiaContainer}
        onPress={() => marcarComoCursada(materia.Materias_id)}
      >
        <Checkbox
            value={materia.marcada}
            _checked={materia.marcada}
             onChange={() => marcarComoCursada(materia.Materias_id)}
              />

      </TouchableOpacity>
      <Text style={styles.itemTitle}>{materia.nomeMaterias}</Text>
      <Text style={styles.cargaHoraria}>Carga Horária: {materia.carga_horaria} horas</Text>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <View>
      <Text style={styles.title}>Disciplinas a Cursar</Text>
      {materiasACursar && Array.isArray(materiasACursar) && materiasACursar.map(renderMateria)}
      </View>
      <TouchableOpacity
        style={styles.confirmarButton}
        onPress={confirmarCursadas}
      >
        <Text style={styles.confirmarButtonText}>Confirmar</Text>
      </TouchableOpacity>
      </ScrollView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 16,
    },
    itemContainer: {
      backgroundColor: '#E0E0E0',
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cargaHoraria: {
      fontSize: 16,
      color: '#888',
    },
    materiaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    confirmarButton: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    confirmarButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default MateriasACursarScreen;