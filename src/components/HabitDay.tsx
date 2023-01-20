import { Dimensions, View } from "react-native";
import {TouchableOpacity} from "react-native"

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BEWTWEEN = 8;

export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)


// quadradinho que representa um dia e seus habitos
export function HabitDay(){
    return (
        <TouchableOpacity
            className = "bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            style={{width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.7}
        >

        </TouchableOpacity>

    )
}