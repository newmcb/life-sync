import React from 'react';

const CalendarList = () => {
  return (
    <div className={'flex mx-5 my-auto relative flex-col gap-2 w-80 max-w-full'}>
      <div className={'relative flex justify-between h-8'}>
        <h4 className={'leading-8'}>리스트 리스트 </h4>
        <button className={'absolute top-0 right-0 border-solid border-[1px] border-[#f87171] rounded-b-full p-1 bg-transparent'}>
          등록하기
        </button>
      </div>
      <div className={'flex flex-col gap-2'}>
        <div className="flex gap-2.5 text-gray-500 line-through">
          <div>day</div>
          <div>title</div>
          <div>contents</div>
          <div>writer</div>
          <div>addr</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
