import { ActivityIndicator, View } from "react-native";

export function Loading(){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#09090A'}}>
            <ActivityIndicator color="#7C3AED" /> 
        </View>
    )
    // o ActivityIndicator é um circulozinho que fica girando, indicando que esta carregando.
}