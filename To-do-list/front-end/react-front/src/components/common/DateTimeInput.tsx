import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface DateTimeInputProps {
  value: { date: string; time: string };
  onChange: Dispatch<SetStateAction<{ date: string; time: string }>>;
  className?: string; 
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ value, onChange, className }) => {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    onChange({ date: newDate, time: value.time });
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    onChange({ date: value.date, time: newTime });
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <input
        type="date"
        value={value.date}
        onChange={handleDateChange}
        className="py-2 px-3 border border-gray-500 rounded-md shadow-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:w-auto md:w-64"
      />
      <input
        type="time"
        value={value.time}
        onChange={handleTimeChange}
        className="py-2 px-3 border border-gray-500 rounded-md shadow-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:w-auto md:w-64"
      />
    </div>
  );
};

export default DateTimeInput;
