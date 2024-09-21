import React from 'react';
import dayjs from "dayjs";

const TEST_DATA = [
    {'day': '2024-07-01',
        'section1':'식비',
        'section2':'식자재',
        'section3':'이마트',
        'sum':30000,
        'memo':'과일, 채소'
    },
    {'day': '2024-07-01',
        'section1':'식비',
        'section2':'식자재',
        'section3':'이마트',
        'sum':30000,
        'memo':'음료'
    }
]


const CalendarList = () => {
  return (
      <div className={'flex mx-5 relative flex-col gap-2 w-1/2 max-w-full'}>
          <div className={'relative flex justify-between h-8'}>
              <h4 className={'font-bold text-xl'}>{dayjs().format('YYYY년 MM월 DD일')}</h4>
              <button
                  className={'absolute top-0 right-0 border-solid border-[1px] border-[#f87171] px-2 bg-transparent'}>
                  등록
              </button>
          </div>
          <div className="container mx-auto p-4">
              <div className="flex flex-col gap-2">
                  <div className="flex gap-4 text-gray-500 font-bold">
                      <div className="w-1/6">날짜</div>
                      <div className="w-1/6">대분류</div>
                      <div className="w-1/6">중분류</div>
                      <div className="w-1/6">소분류</div>
                      <div className="w-1/6">금액</div>
                      <div className="w-1/6">메모</div>
                  </div>
                  {TEST_DATA.map((item)=>{
                      return (
                          <div className="flex gap-4 text-gray-500">
                              <div className="w-1/6">{item.day}</div>
                              <div className="w-1/6">{item.section1}</div>
                              <div className="w-1/6">{item.section2}</div>
                              <div className="w-1/6">{item.section3}</div>
                              <div className="w-1/6">{item.sum}</div>
                              <div className="w-1/6">{item.memo}</div>
                          </div>
                      )
                  })}
              </div>
          </div>
      </div>
  );
};

export default CalendarList;
