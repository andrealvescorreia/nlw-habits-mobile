import { useEffect } from "react";
import { View } from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

interface Props {
   progress?: number;
}

//                   por padrão o progresso é 0%. max: 100%
export function ProgressBar({ progress = 0 }: Props) {
   const sharedProgress = useSharedValue(progress)
   
   const style = useAnimatedStyle(()=>{
      return{
         width:  `${sharedProgress.value}%`
      }
   })
   
   useEffect(() => {
      sharedProgress.value = withTiming(progress)
   }, [progress])// sempre que progress atualiza, sharedProgress também irá, e com ele uma animação de transição!

   return (
      <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
         <Animated.View
            className="h-3 rounded-xl bg-violet-600"
            style={style}
         />
      </View>
   )
}