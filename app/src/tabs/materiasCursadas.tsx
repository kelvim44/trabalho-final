import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

const MateriasCursadasScreen = () => {
  const [materiasCursadas, setMateriasCursadas] = useState([]);

  useEffect(() => {
    // Carregar matérias cursadas do banco de dados
    axios.get('http://192.168.0.105:3000/api/materiascursadas')
      .then(response => setMateriasCursadas(response.data))
      .catch(error => console.error(error));
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nomeMaterias}</Text>
      <Text style={styles.cargaHoraria}>Carga Horária: {item.carga_horaria} horas</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplinas Cursadas</Text>
      <FlatList
        data={materiasCursadas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

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
});

export default MateriasCursadasScreen;