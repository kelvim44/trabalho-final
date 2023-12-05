  import React, { useEffect, useState } from 'react';
  import { View, Text, StyleSheet, ScrollView } from 'react-native';
  import axios from 'axios';
  import Svg, { Rect, Text as SvgText } from 'react-native-svg';

  const GerarRelatorio = ({ usuarios_id }) => {
    const [materiasCursadas, setMateriasCursadas] = useState([]);
    const [materiasACursar, setMateriasACursar] = useState([]);
    const [materias, setMaterias] = useState([]); // Adicionado estado para materias
    useEffect(() => {
      const obterDadosDoBackend = async () => {
        try {
          const responseCursadas = await axios.get("http://192.168.0.105:3000/api/materiascursadas");
          const responseACursar = await axios.get("http://192.168.0.105:3000/api/materiasacursar");
          //const responseMaterias = await axios.get("http://192.168.0.105:3000/api/materias");
  
          setMateriasCursadas(responseCursadas.data);
          setMateriasACursar(responseACursar.data);
          //setMaterias(responseMaterias.data);
        } catch (error) {
          console.error('Erro ao obter dados do backend:', error.message);
        }
      };
  
      obterDadosDoBackend();
    }, [usuarios_id]);
  
const horas_realizadas = materiasCursadas.reduce((total, materia) => total + materia.carga_horaria, 0);
const horas_a_cumprir = materiasACursar.reduce((total, materia) => total + materia.carga_horaria, 0);
const horas_totais = materias.reduce((total, materia) => total + materia.carga_horaria, 0);
const horas_faltando = Math.max(horas_a_cumprir - horas_realizadas, 0);
  
    // Ajuste a escala para melhor visualização
    const escala = 1;
  
    
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Estatísticas de Disciplinas</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Disciplinas Cursadas</Text>
          {materiasCursadas.map((materias, index) => (
            <View key={index} style={styles.item}>
              <Text>{materias.nomeMaterias}</Text>
              <Text>{materias.carga_horaria} horas</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Disciplinas a Cursar</Text>
          {materiasACursar.map((disciplina, index) => (
            <View key={index} style={styles.item}>
              <Text>{disciplina.nomeMaterias}</Text>
              <Text>{disciplina.carga_horaria} horas</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Gráfico de Horas</Text>
          <Svg width="300" height="200">
            {/* Barra de horas realizadas */}
            <Rect x="10" y="20" width={horas_realizadas * escala} height="40" fill="#3498db" />

            {/* Barra de horas a cumprir */}
            <Rect x="10" y="80" width={horas_a_cumprir * escala} height="40" fill="#e74c3c" />

            {/* Barra de horas faltando */}
            <Rect x="10" y="140" width={horas_faltando * escala} height="40" fill="#2ecc71" />

            {/* Rótulos */}
            <SvgText x="20" y="15" fill="#000" fontSize="12">{horas_realizadas}h horas cumpridas</SvgText>
            <SvgText x="20" y="75" fill="#000" fontSize="12">{horas_a_cumprir}h horas a cumprir</SvgText>
            <SvgText x="20" y="135" fill="#000" fontSize="12">{horas_faltando}h horas faltando</SvgText>
          </Svg>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
  
  export default GerarRelatorio;