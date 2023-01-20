import {View } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import { AppRoutes } from './app.route'

// usamos o index.js pois ele deixa as routes mais faceis de serem importadas de outros arquivos.

export function Routes(){
    return(
        <View className='flex-1 bg-background'>
            <NavigationContainer>
                <AppRoutes/>
            </NavigationContainer>
        </View>
    )
}