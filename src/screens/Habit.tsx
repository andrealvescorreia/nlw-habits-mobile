import { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native'
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { Loading } from '../components/Loading';
import { HabitsEmpty } from '../components/HabitsEmpty';
import { api } from '../lib/axios';
import dayjs from "dayjs";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

interface Params {
   date: string
}

interface DayInfoProps {
   completedHabits: string[];
   possibleHabits: {
      id:string;
      title: string;
   }[];
}

export function Habit() {
   const [loading, setLoading] = useState(true)
   const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
   const [completedHabits, setCompletedHabits] = useState([''])
   

   const route = useRoute()
   const { date } = route.params as Params;
   const parsedDate = dayjs(date)
   const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
   const dayOfWeek = parsedDate.format('dddd')// ja vai vir o nome em portugues! pois usamos o locale-pt-br lá em lib/dayjs.ts
   const dayAndMonth = parsedDate.format('DD/MM')// 28/01

   const habitsProgress = dayInfo?.possibleHabits.length 
      ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length ) 
      : 0
   
   async function fetchHabits() {
      try {
         setLoading(true)
         const response = await api.get('/day', { params: {date}})
         setDayInfo(response.data)
         setCompletedHabits(response.data.completedHabits)
      } catch (error) {
         console.log(error)
         Alert.alert('Ops', 'Não foi possivel carregar os hábitos')
      } finally {
         setLoading(false)
      }
   }

   async function handleToggleHabit(habitId: string){
      try {
         await api.patch(`habits/${habitId}/toggle`)// marca/desmarca no backend

         if(completedHabits.includes(habitId)){ // desmarca (muda a tela)
            setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId ))
         }
         else { // marca (muda a tela)
            setCompletedHabits(prevState => [...prevState, habitId])
         }
      } catch (error) {
         return Alert.alert('avemaria')
      }
   }

   useEffect(() => {
      fetchHabits()
   },[])

   if(loading){
      <Loading />
   }

   return (
      <View className="flex-1 bg-background px-8 pt-16">

         <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
         >

            <BackButton />

            <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
               {dayOfWeek}
            </Text>

            <Text className="text-white font-extrabold text-3xl">
               {dayAndMonth}
            </Text>

            <ProgressBar progress={habitsProgress} />

            <View className="mt-6">
               {
                  dayInfo?.possibleHabits ? // tem habitos? Se sim mostra na tela
                  dayInfo?.possibleHabits.map(habit => (

                     <CheckBox
                        key={habit.id}
                        title={habit.title}
                        checked={completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        onPress={() => handleToggleHabit(habit.id)}
                     />
                  ))
                  : 
                  <HabitsEmpty /> // tem habitos? Se não mostra mensagem
               }
            </View>

            {
               isDateInPast && (
                  <Text className="text-white mt-10 text-center">
                     Você não pode editar hábitos de um dia passado.
                  </Text>
               )
            }

         </ScrollView>
      </View>


   )
}