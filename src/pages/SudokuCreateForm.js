import React, { useRef, useState } from 'react';
import { loopBoard } from '../helpers/mainLogic';
import { validateBoard } from '../helpers/validateBoard';
import Solved from './Solved';

const setupInitialValues = () => {
    let initialValues = {};
    for (let i = 1; i < 10; i++) {
        initialValues[i] = {};
        for (let j = 1; j < 10; j++) {
            initialValues[i][j] = 0;
        }
    }
    return initialValues;
};

const SudokuCreateForm = () => {
    //const [visualize, setVisualize] = useState(false);

    const [formValues, setFormValues] = useState(() => setupInitialValues());
    const [solvedBoard, setSolvedBoard] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const formContainerRef = useRef(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const rowIndex = String(id).split('')[0];
        const celIndex = String(id).split('')[1];
        const newFormValues = {
            ...formValues,
            [rowIndex]: {
                ...formValues[rowIndex],
                [celIndex]: Number(value),
            },
        };
        const formValuesInArray = generateBoard(newFormValues);
        const isValid = validateBoard(formValuesInArray);

        isValid ? setButtonDisabled(false) : setButtonDisabled(true);

        setFormValues(newFormValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        const boardForSolving = generateBoard(formValues);
        const solvedBoard = solve(boardForSolving);
        setSolvedBoard(solvedBoard);
    };

    const generateBoard = (values) => {
        const generatedBoard = [];
        for (let y in Object.keys(values)) {
            const row = [];
            const rowVals = Object.keys(values[Number(y) + 1]);
            for (let x in rowVals) {
                row.push(values[Number(y) + 1][Number(x) + 1]);
            }
            generatedBoard.push(row);
        }
        return generatedBoard;
    };

    const solve = (boardForSolving) => {
        const solvedBoard = loopBoard(boardForSolving);
        return solvedBoard;
    };

    const handleStyling = (value, idToStyle) => {
        const itemChanging =
            formContainerRef.current.children[idToStyle.split('')[0] - 1]
                .children[idToStyle.split('')[1] - 1];
        if (value > 0) {
            itemChanging.classList.add('bg-gray-200');
        } else {
            itemChanging.classList.remove('bg-gray-200');
        }
    };

    return (
        <>
            {solvedBoard ? (
                <Solved solvedArray={solvedBoard} initialValues={formValues} />
            ) : (
                <div className='bg-white p-10 rounded-sm shadow-md'>
                    <div className='text-3xl flex justify-center pb-4'>
                        FILL BOARD WITH VALUES
                    </div>
                    <form
                        onChange={(e) => handleChange(e)}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div
                            ref={formContainerRef}
                            className='border-2 mb-2 border-black shadow-md'
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
                                                            handleStyling(
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
                        {/* <div className='mb-2 text-xs text-gray-600 flex items-center'>
                            <div
                                onClick={() => setVisualize(!visualize)}
                                className={`flex justify-center items-center transition cursor-pointer mr-1 w-4 h-4 border border-gray-600 rounded ${
                                    visualize ? 'bg-indigo-700' : ''
                                }`}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-4 w-4 text-white'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M5 13l4 4L19 7'
                                    />
                                </svg>
                            </div>
                            <label>VISUALIZE</label>
                        </div> */}
                        <button
                            className='w-full p-2 border border-gray-400 shadow-md rounded-sm bg-white hover:bg-gray-100 hover:shadow-lg disabled:text-gray-300'
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
