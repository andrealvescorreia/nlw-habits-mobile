import { View, TouchableOpacity, Text } from "react-native";

import Logo from '../assets/logo.svg'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { useNavigation} from '@react-navigation/native'

export function Header(){
    const {navigate} = useNavigation()


    return (
        <View className="w-full flex-row items-center justify-between">
            <Logo />

            <TouchableOpacity
                // botao de novo habito
                activeOpacity={0.7}
                className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
                onPress={()=> navigate('new')}// quando o botao é apertado, navega para a tela de novo habito
            >
                <Feather 
                    // simbolo de +
                    name="plus"
                    color= {colors.violet[500]}
                    size={20}
                />

                <Text className="text-white">Novo hábito</Text>
            </TouchableOpacity>


        </View>
    )
}