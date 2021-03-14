import React, { useEffect } from 'react';
import Row from './Row';

const TimelineBody = ({ data_matrix, table_range, track_splits_into }) => {
    const filter_out_data_by_range = (raw_data, range_to_filter) => {
        /* console.log(raw_data);
        console.log(range_to_filter); */
    };

    useEffect(() => {
        filter_out_data_by_range(data_matrix, table_range);
    }, [data_matrix, table_range]);

    return (
        <div>
            {data_matrix &&
                data_matrix.map((item, i) => (
                    <Row
                        key={`${item[0].group}${item[0].name}`}
                        line_data={item}
                        title={item[0].group}
                        track_splits_into={track_splits_into}
                        global_date={table_range}
                    />
                ))}
        </div>
    );
};

export default TimelineBody;
