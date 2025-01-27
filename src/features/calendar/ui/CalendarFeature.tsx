'use client'

import React, {FC, useEffect, useState} from 'react';
import {CalendarUi} from "@/src/entities/calendar";

interface CalendarFeatureProps{
  setDay:React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CalendarFeature:FC<CalendarFeatureProps> = ({setDay}) => {
  const [selectDay, setSelectDay] = useState<string | undefined>();

  useEffect(()=>{
    if(selectDay){
      setDay(selectDay)
    }
  },[selectDay])

  return (
    <div className={'px-5 max-w-5xl box-border gap-24 flex'}>
      <div className={'max-w-2xl'}>
        <CalendarUi setSelectDay={setSelectDay}/>
        {/*CalendarComponent*/}
      </div>
    </div>
  );
};

export default CalendarFeature;
