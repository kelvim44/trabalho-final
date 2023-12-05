import {  StyleSheet } from 'react-native';
import {  Text,  Button, VStack, Image} from 'native-base';
import Logo from '../assets/livro2.png';
import { TEMAS } from '../estilos/temas';
//<Image source={Logo} alt="Logo do aplicativo Aquigest" />
export default function Principal({navigation}) {
  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center">
    <Image source={Logo} alt="Logo do aplicativo Aquigest" />
    <Text fontSize="2xl" fontWeight="bold" color="gray.500" textAlign="center" mt={5}>
          Tela Principal
      </Text>
      <Button w="100%" bg={TEMAS.colors.blue[800]} mt={10} borderRadius='lg'
        onPress={()=>navigation.navigate('CadastroMateria')}
      >Cadastro de Materia</Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
