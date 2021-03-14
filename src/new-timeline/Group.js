import React, { useEffect, useState } from 'react';
import { months } from './CONSTANTS';
import Track from './Track';

const Group = ({
    list_of_group_items,
    global_year,
    global_month,
    children,
}) => {
    const [
        listOfGroupItemsWithIndexes,
        setListOfGroupItemsWithIndexes,
    ] = useState();

    const filter_and_setup_for_rendering = (all_data, year, month) => {
        const all_data_with_indexes = [];
        for (let i in all_data) {
            const item_range_indexes = determine_item_range_by_global_date(
                all_data[i],
                year,
                month
            );
            const item_with_indexes = {
                ...all_data[i],
                start_index: item_range_indexes.start,
                end_index: item_range_indexes.end,
            };
            all_data_with_indexes.push(item_with_indexes);
        }
        setListOfGroupItemsWithIndexes(all_data_with_indexes);
    };

    const determine_item_range_by_global_date = (item, year, month) => {
        const item_range_indexes = { start: 'not_set', end: 'not_set' };
        const item_start_date = item.start_date;
        const item_end_date = item.end_date;
        if (!month) {
            const current_year = String(year);

            const item_start_year = item.start_date
                .split('')
                .splice(0, 4)
                .join('');
            const item_end_year = item.end_date.split('').splice(0, 4).join('');

            if (item_start_year < current_year) {
                item_range_indexes.start = 0;
            }
            if (item_end_year > current_year) {
                item_range_indexes.end = 1;
            }
            if (item_end_year === current_year) {
                const end_index = date_index_in_current_year(
                    current_year,
                    item_end_date
                );
                item_range_indexes.end = end_index;
            }
            if (item_start_year === current_year) {
                const start_index = date_index_in_current_year(
                    current_year,
                    item_start_date
                );
                item_range_indexes.start = start_index;
            }
        } else {
            const current_year_month = `${year}.${month}`;

            const item_start_year_month = item.start_date
                .split('')
                .splice(0, 7)
                .join('');
            const item_end_year_month = item.end_date
                .split('')
                .splice(0, 7)
                .join('');

            if (item_start_year_month < current_year_month) {
                item_range_indexes.start = 0;
            }
            if (item_end_year_month > current_year_month) {
                item_range_indexes.end = 1;
            }
            if (item_end_year_month === current_year_month) {
                const end_index = date_index_in_current_year_month(
                    current_year_month,
                    item_end_date
                );
                item_range_indexes.end = end_index;
            }
            if (item_start_year_month === current_year_month) {
                const start_index = date_index_in_current_year_month(
                    current_year_month,
                    item_start_date
                );
                item_range_indexes.start = start_index;
            }
        }
        return item_range_indexes;
    };

    const date_index_in_current_year = (
        current_date_range,
        date_to_be_indexed
    ) => {
        const current_year_date = new Date(current_date_range);
        const date_to_be_indexed_date = new Date(date_to_be_indexed);
        const how_many_days_passed = Math.ceil(
            (date_to_be_indexed_date - current_year_date) / 86400000
        );
        return Number((how_many_days_passed / 365).toFixed(2));
    };

    const date_index_in_current_year_month = (
        current_date_range,
        date_to_be_indexed
    ) => {
        const current_year_date = new Date(current_date_range);
        const date_to_be_indexed_date = new Date(date_to_be_indexed);
        const how_many_days_passed = Math.ceil(
            (date_to_be_indexed_date - current_year_date) / 86400000
        );

        const current_range_month = current_date_range
            .split('')
            .splice(5, 2)
            .join('');

        const current_month_days = months.find(
            (month) => month.numerical_expression === current_range_month
        ).days;

        return Number((how_many_days_passed / current_month_days).toFixed(2));
    };

    useEffect(() => {
        filter_and_setup_for_rendering(
            list_of_group_items,
            global_year,
            global_month
        );
        // eslint-disable-next-line
    }, [list_of_group_items, global_year, global_month]);

    return (
        <>
            {listOfGroupItemsWithIndexes && (
                <div className='flex w-full'>
                    <div className='flex items-center justify-center w-40 flex-shrink-0 bg-white shadow-r uppercase font-bold text-gray-600'>
                        {listOfGroupItemsWithIndexes[0] &&
                            listOfGroupItemsWithIndexes[0].group}
                    </div>
                    <div className='w-full relative'>
                        {listOfGroupItemsWithIndexes.map((group_item, i) => {
                            const item_start = group_item.start_index * 100;
                            const item_length = (
                                (group_item.end_index -
                                    group_item.start_index) *
                                100
                            ).toFixed(0);

                            return (
                                <Track
                                    key={i}
                                    track_length_by_index={item_length}
                                    track_start_by_index={item_start}
                                    title={group_item.title}
                                    track_styling={
                                        group_item.styling
                                            ? group_item.styling
                                            : ''
                                    }
                                    details={group_item.details}
                                    date={`${group_item.start_date} - ${group_item.end_date}`}
                                />
                            );
                        })}
                        <div className='absolute top-0 left-0 w-full h-full'>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Group;
