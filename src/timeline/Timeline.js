import React, { useEffect, useState } from 'react';
import TimelineHeader from './TimelineHeader';
import TimelineBody from './TimelineBody';

const Timeline = ({ timeline_data }) => {
    const [matrix, setMatrix] = useState([]);
    const [timelineBodyRange, setTimelineBodyRange] = useState(2021);
    const [howManyTracks, setHowManyTracks] = useState(12);

    //const [currentDate, setCurrentDate] = useState(new Date().getFullYear());

    const create_global_group = (raw_data) => {
        const all_groups = find_different_groups(raw_data);
        const global_group = [];
        for (let i in all_groups) {
            const new_group = create_new_group(all_groups[i], raw_data);
            global_group.push(new_group);
        }
        return global_group;
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

    useEffect(() => {
        const global_group = create_global_group(timeline_data);
        setMatrix(global_group);
        // eslint-disable-next-line
    }, [timeline_data]);

    return (
        <div className='border border-gray-400 shadow-md'>
            <TimelineHeader
                table_range={timelineBodyRange}
                set_range_date={(range) => setTimelineBodyRange(range)}
                set_how_many_tarcks={(track_count) =>
                    setHowManyTracks(track_count)
                }
                //current_date={currentDate}
            />
            <TimelineBody
                data_matrix={matrix}
                table_range={timelineBodyRange}
                track_splits_into={howManyTracks}
            />
        </div>
    );
};

export default Timeline;
