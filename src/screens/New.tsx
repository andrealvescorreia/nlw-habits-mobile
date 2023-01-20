import { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";

const daysOfTheWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']


// tela de Novo Habito
export function New(){

    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)) {
            // desmarcar (remove de weekDays)
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else{
            // marcar (adiciona a weekDays)
            setWeekDays(prevState => [...prevState, weekDayIndex ])// "spread operator"
        }
    }
    
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                contentContainerStyle={{paddingBottom: 100}}
            >

                <BackButton />

                <Text 
                    className="mt-6 text-white font-extrabold text-3xl" // text-3xl: tamanho grande de texto
                >
                    Criar hábito
                </Text>


                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-500"
                    placeholder="Caminhar, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                />
                

                <Text className="mt-4 text-white font-semibold text-base mb-3">
                    Qual a recorrência?
                </Text>

                {
                    daysOfTheWeek.map((weekDay, index)=>(
                        
                        <CheckBox 
                            key={weekDay} 
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleWeekDay(index)}
                        />
                    ))
                }

                
                <TouchableOpacity 
                    className="mt-6 w-full h-14 bg-green-600 flex-row items-center justify-center rounded-md"
                    activeOpacity={0.7}
                >

                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                        
                    /> 

                    <Text className="text-white font-semibold text-base ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}