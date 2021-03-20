import React, { useRef, useState } from 'react';
import { loop_board } from '../helpers/mainLogic';
import { validate_board } from '../helpers/validateBoard';
import Solved from './Solved';

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
    const [solvedBoard, setSolvedBoard] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const formContainerRef = useRef(null);

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
        const form_values_in_array = generate_board(new_form_values);
        const is_valid = validate_board(form_values_in_array);

        is_valid ? setButtonDisabled(false) : setButtonDisabled(true);

        setFormValues(new_form_values);
    };

    const handle_submit = (e) => {
        e.preventDefault();
        const board_for_solving = generate_board(formValues);
        const solved_board = solve(board_for_solving);
        setSolvedBoard(solved_board);
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
        const solved_board = loop_board(board_for_solving);
        return solved_board;
    };

    const handle_styling = (value, id_to_style) => {
        const item_changing =
            formContainerRef.current.children[id_to_style.split('')[0] - 1]
                .children[id_to_style.split('')[1] - 1];
        if (value > 0) {
            item_changing.classList.add('bg-gray-200');
        } else {
            item_changing.classList.remove('bg-gray-200');
        }
    };

    return (
        <>
            {solvedBoard ? (
                <Solved
                    solved_array={solvedBoard}
                    initial_values={formValues}
                />
            ) : (
                <div className='bg-white p-8 rounded-sm shadow-md'>
                    <div className='text-3xl flex justify-center pb-2'>
                        FILL BOARD WITH VALUES
                    </div>
                    <form
                        onChange={(e) => handle_change(e)}
                        onSubmit={(e) => handle_submit(e)}
                    >
                        <div
                            ref={formContainerRef}
                            className='border-2 border-black shadow-md'
                        >
                            {Object.keys(formValues).map((row) => {
                                return (
                                    <div
                                        className={`flex ${
                                            (row === '3' || row === '6') &&
                                            'border-b-2 border-black'
                                        }`}
                                        key={row + 'row'}
                                    >
                                        {Object.keys(formValues[row]).map(
                                            (cel, i) => {
                                                const id = `${row}${
                                                    Number(i) + 1
                                                }`;
                                                return (
                                                    <input
                                                        key={id}
                                                        className={`w-10 h-10 flex p-3 text-center border border-black ${
                                                            (Number(i) + 1 ===
                                                                3 ||
                                                                Number(i) +
                                                                    1 ===
                                                                    6) &&
                                                            'border-r-2 border-black'
                                                        }`}
                                                        onChange={(e) =>
                                                            handle_styling(
                                                                e.target.value,
                                                                e.target.id
                                                            )
                                                        }
                                                        min='1'
                                                        max='9'
                                                        type='number'
                                                        id={id}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            className='w-full p-2 mt-2 border border-gray-400 shadow-md rounded-sm bg-white hover:bg-gray-100 hover:shadow-lg disabled:text-gray-300'
                            type='submit'
                            disabled={buttonDisabled}
                        >
                            SOLVE!
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default SudokuCreateForm;
