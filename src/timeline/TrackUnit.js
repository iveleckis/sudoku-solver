import React from 'react';

const TrackUnit = ({ how_many_times_to_split = 0 }) => {
    const DrawSplits = () => {
        const splits = [];
        for (let i = 0; i < how_many_times_to_split; i++) {
            splits.push(<div key={i} className='w-full h-8 border-l' />);
        }
        return splits;
    };

    return <DrawSplits />;
};

export default TrackUnit;
