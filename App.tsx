import './src/lib/dayjs'

import { StatusBar } from 'react-native';
import {
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold,
  Inter_800ExtraBold} from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

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

  return (// "fragment": <> </>
    <>
      <Home />
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
    </>
  );
}

