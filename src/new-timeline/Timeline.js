import React, { useEffect, useState } from 'react';
import Body from './Body';
import Header from './Header';

const TimelineN = ({ timeline_data }) => {
    const [globalYear, setGlobalYear] = useState(new Date().getFullYear());
    const [globalMonth, setGlobalMonth] = useState(null);

    const [possibleYears, setPossibleYears] = useState([]);

    const [groupOfGroups, setGroupOfGroups] = useState([]);

    const create_group_of_groups = (raw_data) => {
        const all_groups = find_different_groups(raw_data);
        const group_of_groups = [];
        for (let i in all_groups) {
            const new_group = create_new_group(all_groups[i], raw_data);
            group_of_groups.push(new_group);
        }
        return group_of_groups;
    };

    const find_different_groups = (array) => {
        const different_group_count = [];
        for (let i in array) {
            if (!different_group_count.includes(array[i].group)) {
                different_group_count.push(array[i].group);
            }
        }
        return different_group_count;
    };

    const create_new_group = (group_name, data_for_extraction) => {
        const new_group = [];
        for (let j in data_for_extraction) {
            if (group_name === data_for_extraction[j].group) {
                new_group.push(data_for_extraction[j]);
            }
        }
        return new_group;
    };

    const setup_possible_years = (data_to_pick_from) => {
        const years = [];
        for (let i in data_to_pick_from) {
            const start = Number(
                data_to_pick_from[i].start_date.split('').splice(0, 4).join('')
            );
            const end = Number(
                data_to_pick_from[i].end_date.split('').splice(0, 4).join('')
            );
            if (!years.includes(start)) {
                years.push(start);
            }
            if (!years.includes(end)) {
                years.push(end);
            }
        }
        years.sort((a, b) => (a < b ? 1 : -1));
        return years;
    };

    useEffect(() => {
        const years = setup_possible_years(timeline_data);
        setPossibleYears(years);
        const group_of_groups = create_group_of_groups(timeline_data);
        setGroupOfGroups(group_of_groups);
        // eslint-disable-next-line
    }, [timeline_data]);

    return (
        <div className='text-gray-700 border-gray-400 border overflow-x-auto'>
            <Header
                global_year={globalYear}
                global_month={globalMonth}
                new_global_year={(new_global_year) =>
                    setGlobalYear(new_global_year)
                }
                new_global_month={(new_global_month) =>
                    setGlobalMonth(new_global_month)
                }
                possible_years={possibleYears}
            />
            <Body
                all_groups={groupOfGroups}
                global_year={globalYear}
                global_month={globalMonth}
            />
        </div>
    );
};

export default TimelineN;
