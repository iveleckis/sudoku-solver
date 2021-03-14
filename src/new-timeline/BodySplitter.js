import React from 'react';
import { months } from './CONSTANTS';

const BodySplitter = ({ parts_to_split_into }) => {
    const Dividers = () => {
        const dividers = [];
        for (let i = 0; i < parts_to_split_into; i++) {
            if (parts_to_split_into !== 12) {
                dividers.push(
                    <div
                        key={i}
                        style={{ zIndex: '-10' }}
                        className='w-full h-full border-r border-l border-gray-100'
                    />
                );
            } else {
                const month_string = i < 9 ? `0${i + 1}` : `${i + 1}`;
                const current_month = months.find(
                    (month) => month.numerical_expression === month_string
                );
                const divider_width = (
                    (current_month.days / 365) *
                    100
                ).toFixed(3);
                dividers.push(
                    <div
                        key={i}
                        style={{ zIndex: '-10', width: `${divider_width}%` }}
                        className='h-full border-r border-l border-gray-200'
                    />
                );
            }
        }
        return dividers;
    };

    return (
        <div className='w-full h-full flex'>
            <Dividers />
        </div>
    );
};

export default BodySplitter;
