import { ScrollView, Text, View } from "react-native";
import {useRoute} from '@react-navigation/native'
import { BackButton } from "../components/BackButton";

import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface Params{
    date: string
}

export function Habit(){
    const route = useRoute()
    const { date } = route.params as Params;
    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')// ja vai vir o nome em portugues! pois usamos o locale-pt-br lá em lib/dayjs.ts
    const dayAndMonth = parsedDate.format('DD/MM')// 28/01


    return (
        <View className="flex-1 bg-background px-8 pt-16">

            <ScrollView
                showsHorizontalScrollIndicator={false}// nao mostra a barrinha de scroll
                contentContainerStyle={{ paddingBottom: 100}}
            >

                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={30}/>

                <View className="mt-6">
                    <CheckBox 
                        title="Beber 2L de água"
                    />

                    <CheckBox 
                        title="Caminhar"
                        checked={true}
                    />

                </View>
                
            </ScrollView>
        </View>

        
    )
}