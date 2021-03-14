import React from 'react';
import TrackUnit from './TrackUnit';
import { random_line_color_pool } from './supplementary-data';

const ItemTrack = ({ measurement_unit, fill_length, item_name }) => {
    return (
        <div className='w-full'>
            <div className='flex relative h-8 items-center'>
                <TrackUnit how_many_times_to_split={measurement_unit} />
                <div
                    style={{
                        width: `${
                            fill_length &&
                            (fill_length.end - fill_length.start) * 100
                        }%`,
                        marginLeft: `${
                            fill_length && fill_length.start * 100
                        }%`,
                    }}
                    className={`absolute h-6 my-1 w-full border-2 rounded text-center overflow-hidden truncate text-sm px-2 font-bold ${
                        random_line_color_pool[
                            Math.floor(
                                Math.random() * random_line_color_pool.length
                            )
                        ]
                    }`}
                >
                    {item_name}
                </div>
            </div>
        </div>
    );
};

export default ItemTrack;
