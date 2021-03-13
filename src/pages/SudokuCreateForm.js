import React, { useState } from 'react';
import { loop_board } from '../helpers/number_validation';

const setup_initial_values = () => {
    let initial_values = {};
    for (let i = 1; i < 10; i++) {
        initial_values[i] = {};
        for (let j = 1; j < 10; j++) {
            initial_values[i][j] = 0;
        }
    }
    return initial_values;
};

const SudokuCreateForm = () => {
    const [formValues, setFormValues] = useState(() => setup_initial_values());

    const handle_change = (e) => {
        const { id, value } = e.target;
        const row_index = String(id).split('')[0];
        const cel_index = String(id).split('')[1];
        const new_form_values = {
            ...formValues,
            [row_index]: {
                ...formValues[row_index],
                [cel_index]: Number(value),
            },
        };
        setFormValues(new_form_values);
    };

    const handle_submit = (e) => {
        e.preventDefault();
        const board_for_solving = generate_board(formValues);
        const solved_board = solve(board_for_solving);
        console.log(solved_board);
    };

    const generate_board = (values) => {
        const generate_board = [];
        for (let y in Object.keys(values)) {
            const row = [];
            const row_vals = Object.keys(values[Number(y) + 1]);
            for (let x in row_vals) {
                row.push(values[Number(y) + 1][Number(x) + 1]);
            }
            generate_board.push(row);
        }
        return generate_board;
    };

    const solve = (board_for_solving) => {
        loop_board(board_for_solving);
    };

    return (
        <form
            onChange={(e) => handle_change(e)}
            onSubmit={(e) => handle_submit(e)}
        >
            <div className='border-2 border-black shadow-md'>
                {Object.keys(formValues).map((row) => {
                    return (
                        <div
                            className={`flex ${
                                (row === '3' || row === '6') &&
                                'border-b-2 border-black'
                            }`}
                            key={row + 'row'}
                        >
                            {Object.keys(formValues[row]).map((cel, i) => {
                                const id = `${row}${Number(i) + 1}`;
                                return (
                                    <input
                                        key={id}
                                        className={`w-10 h-10 flex p-3 text-center border border-black ${
                                            (Number(i) + 1 === 3 ||
                                                Number(i) + 1 === 6) &&
                                            'border-r-2 border-black'
                                        }`}
                                        min='1'
                                        max='9'
                                        type='number'
                                        id={id}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <button
                className='w-full p-2 mt-2 border border-gray-600 shadow-md rounded-sm'
                type='submit'
            >
                SOLVE!
            </button>
        </form>
    );
};

export default SudokuCreateForm;
