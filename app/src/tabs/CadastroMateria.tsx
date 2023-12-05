import React, { useState } from 'react';
import { ScrollView, VStack, Image, Box, Checkbox } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Titulo } from '../componentes/Titulo';
import { EntradaTexto } from '../componentes/EntradaTexto';
import { Botao } from '../componentes/Botao';
import { materias } from '../utils/CadastroMateriaTexto';
import MateriasACursarScreen from './MateriasAcursar';
import Logo from '../assets/livro2.png';

export default function CadastroMateria() { 

  const [numSecao, setNumSecao] = useState(0);
  const navigation = useNavigation();
    
  function avancarSecao() {
    if(numSecao < materias.length - 1){
      setNumSecao(numSecao + 1);
    }
  }  

  function voltarSecao() {
    if(numSecao > 0){
      setNumSecao(numSecao - 1);
    }
  };   
  const [materiaData, setMateriaData] = useState({
    nome: '',
    cargaHoraria: '',
  });
  const [materiasCadastradas, setMateriasCadastradas] = useState([]);

  const confirmarCadastro = async () => {
    try {
      const response = await fetch("http://192.168.0.105:3000/api/cadastromateria", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materiaData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao cadastrar matéria');
      }
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
        // Atualize o estado de matérias cadastradas com os novos dados
        setMateriasCadastradas([...materiasCadastradas, data]);
      console.log('Matéria cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar matéria:', error.message);
      // Lidar com erros de chamada à API, se necessário
    }
  };

  return (
    <ScrollView flex={1} p={5}>
      <VStack flex={1} alignItems="center" p={5}>
        <Image source={Logo} alt="Logo do aplicativo materias" />
        <Titulo>{materias[numSecao].titulo}</Titulo>
        <EntradaTexto
          label="Nome da Matéria"
          placeholder="Digite o nome da matéria"
          value={materiaData.nome}
          onChangeText={(text) => setMateriaData({ ...materiaData, nome: text })}
        />
        <EntradaTexto
          label="Carga Horária"
          placeholder="Digite a carga horária"
          value={materiaData.cargaHoraria}
          onChangeText={(text) => setMateriaData({ ...materiaData, cargaHoraria: text })}
        />
        <Box>
          {materias[numSecao].checkbox.map((checkbox) => (
            <Checkbox key={checkbox.id} value={checkbox.value}>
              {checkbox.value}
            </Checkbox>
          ))}
        </Box>
        {numSecao < materias.length - 1 && (
          <Botao onPress={() => avancarSecao()} mb={10}>
            Avançar
          </Botao>
        )}
        {numSecao > 0 && (
          <Botao onPress={() => voltarSecao()} bgColor="gray.400">
            Voltar
          </Botao>
        )}
        <Botao onPress={() => confirmarCadastro()} bgColor="blue.500" mt={5} color="white">
          Confirmar Cadastro e Avançar
        </Botao>
      </VStack>
    </ScrollView>
  );
}
