
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold,
  Inter_800ExtraBold} from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading';

export default function App() {
  //
  const [fontesCarregaram] = useFonts({// "hooker" começa com "use"
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold,
    Inter_800ExtraBold
  })

  // garante que a aplicacao so carregue quando as fontes ja carregaram.
  if(!fontesCarregaram)
    return (
      <Loading />
    )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
    </View>
  );
}


// no react native, o display flex é ativo por padrão
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'white',
    fontFamily: 'Inter_700Bold'
  }
});
