import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

interface Props extends TouchableOpacityProps {
   checked?: boolean; // '?' significa que pode ser nulo
   title: string;
}

// por padrão a checkbox vem desmarcada      |      'resto' dos parametros (pois touchableopacity tem um monte!)
export function CheckBox({ checked = false, title, ...rest }: Props) {
   return (


      <TouchableOpacity
         activeOpacity={0.75}
         className="flex-row mb-2 items-center"
         {...rest}
      >
         {
            checked
               ?// se checked, entao mostra ele verde e com simbolo check
               <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
                  <Feather
                     name="check"
                     size={20}
                     color={colors.white}
                  />
               </View>

               :
               // se nao, botao cinza
               <View className="h-8 w-8 bg-zinc-800 rounded-lg" />
         }

         <Text className="text-white text-base ml-3 font-semibold">
            {title}
         </Text>

      </TouchableOpacity>

   )
}