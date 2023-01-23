import { Dimensions } from "react-native";
import {TouchableOpacity, TouchableOpacityProps} from "react-native"
import clsx from "clsx";// usamos para estilização condicional (ex: quadradinho escuro se poucos habitos completos, quadradinho claro se muitos)

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BEWTWEEN = 8;

export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface HabitDayProps extends TouchableOpacityProps {
   amountOfHabits?: number;
   amountCompleted?: number;
   date: Date;
}

// quadradinho que representa um dia e seus habitos
export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest}: HabitDayProps){
   
   const accomplishmentPercentage = generateProgressPercentage(amountOfHabits, amountCompleted)
   
   const today = dayjs().startOf('day').toDate()
   const isCurrentDay = dayjs(date).isSame(today)

   return (
        <TouchableOpacity
            className = {clsx("rounded-lg border-2 m-1", {
               ' bg-zinc-900  border-zinc-800': accomplishmentPercentage === 0,
                ' bg-violet-900  border-violet-700': accomplishmentPercentage > 0 && accomplishmentPercentage < 20,
                ' bg-violet-800  border-violet-600': accomplishmentPercentage >= 20 && accomplishmentPercentage < 40,
                ' bg-violet-700  border-violet-500': accomplishmentPercentage >= 40 && accomplishmentPercentage < 60,
                ' bg-violet-600  border-violet-500': accomplishmentPercentage >= 60 && accomplishmentPercentage < 80,
                ' bg-violet-500  border-violet-400': accomplishmentPercentage >= 80,
                'border-white border-4': isCurrentDay
            })}

            style={{width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.7}
            {...rest}
        >

        </TouchableOpacity>

    )
}