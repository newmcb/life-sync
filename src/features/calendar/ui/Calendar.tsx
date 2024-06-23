'use client'

import React, {useState} from 'react';
import {CalendarUi} from "@/src/entities/calendar";

const CalendarFeature = () => {
  const [selectDay, setSelectDay] = useState<string | undefined>();

  return (
    <div className={'w-full px-5 max-w-5xl mx-auto box-border gap-24 flex'}>
      <div className={'max-w-2xl'}>
        <CalendarUi setSelectDay={setSelectDay}/>
        {/*CalendarComponent*/}
      </div>
    </div>
  );
};

export default CalendarFeature;
