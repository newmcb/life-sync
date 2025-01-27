'use client'

import React, {useState} from 'react';
import {CalendarFeature, CalendarList, CalendarHeader, CalendarAdd} from "@/src/features/calendar";
import LineChart from "@/src/entities/chart/ui/LineChart";
import BarChart from "@/src/entities/chart/ui/BarChart";

const CalenderView = () => {

  const [day, setDay] = useState<string | undefined>();
  const [type, setType] = useState('list');

    return (
        <div className={'flex w-full mx-auto justify-center'}>
            <CalendarFeature setDay={setDay}/>
          <div className={'flex flex-col gap-2 w-1/2 max-w-full'}>
              <CalendarHeader type={type} setType={setType} day={day}/>
            {type === 'list' && <CalendarList/>}
            {type === 'add' && <CalendarAdd/>}
            {type === 'chart' && <BarChart/>}
          </div>
        </div>
    );
};

export default CalenderView;
