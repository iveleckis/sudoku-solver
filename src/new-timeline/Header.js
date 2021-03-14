import React, { useState } from 'react';
import { months } from './CONSTANTS';

const Header = ({
    global_year,
    new_global_year,
    global_month,
    new_global_month,
    possible_years,
}) => {
    const [showYearOptions, setShowYearOptions] = useState(false);
    const MonthDays = () => {
        if (global_month) {
            const days = [];
            const current_month_details = months.find(
                (month) => month.numerical_expression === global_month
            );
            for (let i = 1; i <= current_month_details.days; i++) {
                days.push(
                    <div
                        className='w-full text-xs p-1 flex justify-center items-center'
                        key={i}
                    >
                        {i}
                    </div>
                );
            }
            return days;
        }
    };

    return (
        <div className='flex select-none shadow-md z-50 min-w-max'>
            <div className='relative flex w-full border-b border-gray-400'>
                <div
                    onClick={() => setShowYearOptions(!showYearOptions)}
                    className='w-40 flex-shrink-0 transition duration-100 border-gray-200 flex justify-center items-center font-bold cursor-pointer select-none hover:bg-gray-100'
                >
                    {global_year}
                    {showYearOptions && (
                        <div className='absolute divide-y left-0 top-10 z-50 bg-white border shadow w-40'>
                            {possible_years.map((year) => (
                                <div
                                    key={year}
                                    onClick={() => {
                                        setShowYearOptions(false);
                                        new_global_year(year);
                                    }}
                                    className='flex justify-center items-center p-2 hover:bg-gray-50 cursor-pointer w-full'
                                >
                                    {year}
                                </div>
                            ))}
                            <div className='w-full'></div>
                        </div>
                    )}
                </div>
                <div className='w-full'>
                    <div className='flex border-r w-full'>
                        {months.map((month) => (
                            <div
                                key={month.numerical_expression}
                                className={`w-full transition duration-100 flex justify-center items-center cursor-pointer p-2 border-gray-400 hover:bg-gray-100 ${
                                    global_month ===
                                        month.numerical_expression &&
                                    'hover:bg-none border-l font-bold'
                                } ${
                                    month.numerical_expression !== '12' &&
                                    global_month ===
                                        month.numerical_expression &&
                                    'border-r'
                                } ${
                                    global_month &&
                                    global_month !==
                                        month.numerical_expression &&
                                    'border-b'
                                }`}
                                onClick={() => {
                                    if (
                                        global_month ===
                                        month.numerical_expression
                                    ) {
                                        new_global_month(null);
                                    } else {
                                        new_global_month(
                                            month.numerical_expression
                                        );
                                    }
                                }}
                            >
                                {month.short_name_letters}
                            </div>
                        ))}
                    </div>
                    <div className='flex border-l border-gray-400'>
                        {global_month && <MonthDays />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
