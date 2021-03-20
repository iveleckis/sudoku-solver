import React from 'react';
import { NavLink } from 'react-router-dom';

const Solved = ({ solved_array, initial_values }) => {
    const SolvedBoard = ({
        solved_board_array,
        initial_values_for_styling,
    }) => {
        const board_to_display = solved_board_array.map((row, i) => (
            <div
                key={row}
                className={`flex ${
                    (Number(i) + 1 === 3 || Number(i) + 1 === 6) &&
                    'border-b-2 border-black'
                }`}
            >
                {row.map((cel, j) => (
                    <div
                        key={'cel' + i + j}
                        className={`w-10 h-10 flex justify-center items-center p-3 border border-black ${
                            (Number(j) + 1 === 3 || Number(j) + 1 === 6) &&
                            'border-r-2 border-black'
                        } ${
                            initial_values_for_styling &&
                            initial_values_for_styling[Number(i) + 1] &&
                            initial_values_for_styling[Number(i) + 1][
                                Number(j) + 1
                            ] &&
                            'bg-gray-200'
                        }`}
                    >
                        {cel}
                    </div>
                ))}
            </div>
        ));
        return board_to_display;
    };
    return (
        <div className='w-full flex flex-col items-center bg-white p-10 shadow-md'>
            <div className='text-3xl pb-4'>SOLVED!</div>
            <div className='border-2 border-black'>
                <SolvedBoard
                    solved_board_array={solved_array}
                    initial_values_for_styling={initial_values}
                />
            </div>
            <NavLink
                className='w-full p-2 mt-2 border block text-center border-gray-400 shadow-md rounded-sm bg-white hover:bg-gray-100 hover:shadow-lg'
                to='/'
            >
                AGAIN!
            </NavLink>
        </div>
    );
};

export default Solved;
