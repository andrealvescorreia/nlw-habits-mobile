import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimunSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimunSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = Array<{
   id: string;
   date: string;
   amount: number;
   completed: number;
}>

export function Home() {
   const [loading, setLoading] = useState(true)// valor padrão: true (esta carragando)
   const [summary, setSummary] = useState<SummaryProps | null>(null)
   const { navigate } = useNavigation()


   async function fetchData() {
      try {
         setLoading(false)
         const response = await api.get('/summary')
         console.log(response.data)
         setSummary(response.data)
      } catch (error) {
         console.log(error)
         Alert.alert('Ops', 'Não foi possível carregar o resumo de hábitos')
      } finally {
         setLoading(false)// nao esta mais carregando (independente se deu certo ou errado)
      }
   }


   // o useFocusEffect serve para essa tela atualizar (fetch dos dados) quando for o foco. Ou seja, se o usuario estava na tela de Habit e voltou para essa tela Home, ela será atualizada
   useFocusEffect(useCallback(() => {// o useCallBack é uma recomendação para maior performance
      fetchData()
   }, []));

   if(loading){
      return (
         <Loading />
      )
   }

   return (
      <View className="flex-1 bg-background px-8 pt-16">
         <Header />
         <View className="flex-row mt-6 mb-2">
            {
               weekDays.map((weekDay, i) => (
                  <Text
                     key={`${weekDay}-${i}`}
                     style={{ width: DAY_SIZE }}
                     className="text-zinc-400 text-xl font-bold text-center mx-1"
                  >
                     {weekDay}
                  </Text>
               ))
            }
         </View>
         <ScrollView
            showsHorizontalScrollIndicator={false}// nao mostra a barrinha de scroll
            contentContainerStyle={{ paddingBottom: 100 }}
         >
            {
               
               summary &&
               // caso summary seja nulo, essa parte de baixo nao acontece
               <View className="flex-row flex-wrap">
                  {
                     datesFromYearStart.map(date => {// quadradinhos que representam dias
                        const dayWithHabits = summary.find(day => {
                           return dayjs(date).isSame(day.date, 'day')
                        })
                        
                        return (
                           <HabitDay
                              key={date.toISOString()}
                              date={date}
                              amountOfHabits = {dayWithHabits?.amount}
                              amountCompleted = {dayWithHabits?.completed}
                              onPress={() => navigate('habit', { date: date.toISOString() })}
                           />
                        )
                        })
                  }
                  {
                     amountOfDaysToFill > 0 && Array
                        .from({ length: amountOfDaysToFill })
                        .map((_, i) => (// quadradinhos placholders (nao interagiveis)
                           <View
                              key={i}
                              className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                              style={{ width: DAY_SIZE, height: DAY_SIZE }}
                           />
                        ))
                  }
               </View>
            }
         </ScrollView>
      </View>
   )
}

// flex-1: ocupa toda a tela
// pt: padding top