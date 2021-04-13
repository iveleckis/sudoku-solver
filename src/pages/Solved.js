import React from 'react';
import { NavLink } from 'react-router-dom';

const Solved = ({ solvedArray, initialValues }) => {
    const SolvedBoard = ({ solvedBoardArray, initialValuesForStyling }) => {
        const boardToDisplay = solvedBoardArray.map((row, i) => (
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
                            initialValuesForStyling &&
                            initialValuesForStyling[Number(i) + 1] &&
                            initialValuesForStyling[Number(i) + 1][
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
        return boardToDisplay;
    };
    return (
        <div className='w-full flex flex-col items-center bg-white p-10 shadow-md'>
            <div className='text-3xl pb-4'>SOLVED!</div>
            <div className='border-2 border-black'>
                <SolvedBoard
                    solvedBoardArray={solvedArray}
                    initialValuesForStyling={initialValues}
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
