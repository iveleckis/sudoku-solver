import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='text-3xl p-4'>SUDOKU SOLVER</div>
            <div className='w-full'>
                <NavLink
                    className='border px-4 py-1 w-full shadow rounded-sm block text-center'
                    to='/create'
                >
                    CREATE BOARD
                </NavLink>
            </div>
        </div>
    );
};

export default Landing;
