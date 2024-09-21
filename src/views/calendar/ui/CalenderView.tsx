import React from 'react';
import {CalendarFeature, CalendarList} from "@/src/features/calendar";

const CalenderView = () => {
    return (
        <div className={'flex w-full mx-auto justify-center'}>
            <CalendarFeature/>
            <CalendarList/>
        </div>
    );
};

export default CalenderView;