import React, { useEffect, useState } from 'react';
import { short_months } from './supplementary-data';

const current_date = new Date().getFullYear();

const TimelineHeader = ({
    set_range_date,
    set_how_many_tarcks,
    table_range,
}) => {
    const MonthDays = () => {
        const days = [];
        const how_many_days =
            typeof table_range === 'string' &&
            short_months.find(
                (month) =>
                    month.numerical_expression ===
                    table_range.split('').splice(5, 2).join('')
            ).days;
        for (let i = 1; i <= how_many_days; i++) {
            days.push(
                <div
                    key={i}
                    className='w-full flex justify-center text-gray-400 border-t text-xs py-1'
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    const [splitInto, setSplitInto] = useState('short_months');
    const [splitIntoCels, setSplitIntoCels] = useState([]);

    const setup_timeline_header = (header_cel_values) => {
        header_cel_values === 'short_months' && setSplitIntoCels(short_months);
    };

    const change_range_year = (current_range) => {
        if (typeof current_range === 'number') {
            current_range === current_date
                ? set_range_date(current_range + 1)
                : set_range_date(table_range - 1);
        } else {
            const extracted_year = current_range
                .split('')
                .splice(0, 4)
                .join('');
            Number(extracted_year) === current_date
                ? set_range_date(Number(extracted_year) + 1)
                : set_range_date(Number(extracted_year));
        }
    };

    const change_range_months = (current_range, month_to_set) => {
        if (typeof current_range === 'number') {
            set_range_date(`${current_range}.${month_to_set}`);
        } else {
            current_range = current_range.split('').splice(0, 4).join('');
            set_range_date(`${current_range}.${month_to_set}`);
        }
    };

    const set_active_month = (selected_month) => {
        if (typeof table_range === 'string') {
            if (
                table_range.split('').splice(5, 2).join('') ===
                selected_month.numerical_expression
            ) {
                return true;
            }
        }
    };

    useEffect(() => {
        setup_timeline_header(splitInto);
        const how_many_days =
            typeof table_range === 'string' &&
            short_months.find(
                (month) =>
                    month.numerical_expression ===
                    table_range.split('').splice(5, 2).join('')
            ).days;
        set_how_many_tarcks(how_many_days ? how_many_days : 12);
        // eslint-disable-next-line
    }, [splitInto, table_range]);

    return (
        <div className='flex border-b border-gray-400 shadow'>
            <div
                className='w-32 flex items-center justify-center bg-white uppercase font-bold text-gray-600 cursor-pointer'
                onClick={() => change_range_year(table_range)}
            >
                {table_range}
            </div>
            <div className='w-full'>
                <div className='flex w-full'>
                    {splitIntoCels.map((splitUnit, i) => (
                        <div
                            className={`w-full flex justify-center p-2 text-gray-600 cursor-pointer hover:bg-gray-50 ${
                                set_active_month(splitUnit) &&
                                'bg-gray-200 hover:bg-gray-100'
                            }`}
                            key={i}
                            onClick={() =>
                                change_range_months(
                                    table_range,
                                    splitUnit.numerical_expression
                                )
                            }
                        >
                            {splitUnit.short_name_letters}
                        </div>
                    ))}
                </div>
                <div className='flex w-full'>
                    <MonthDays />
                </div>
            </div>
        </div>
    );
};

export default TimelineHeader;
