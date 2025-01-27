import React, { FC } from 'react';
import dayjs from 'dayjs';

interface CalendarProps {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  day?: string;
}

const CalendarHeader: FC<CalendarProps> = ({ type, setType, day }) => {
  const handleAdd = () => {
    setType(type === 'add' ? 'list' : 'add');
  };

  const handleChart = ()=>{
    setType(type === 'chart' ? 'list' : 'chart')
  }

  return (
    <div className="relative flex items-center justify-between h-12 px-4 bg-white border-b border-gray-200 shadow-sm">
      {/* 날짜 */}
      <h4 className="font-semibold text-lg text-gray-800">
        {day ? dayjs(day).format('YYYY년 MM월 DD일') : '날짜를 선택하세요'}
      </h4>

      <div className={'flex gap-4'}>
        <button className={'px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'}
                onClick={handleChart}
        >
          {type === 'chart' ? '리스트 보기' : '그래프 보기'}
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            type === 'add'
              ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
          } transition focus:outline-none focus:ring-2`}
          onClick={handleAdd}
        >
          {type === 'add' ? '리스트 보기' : '등록'}
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
