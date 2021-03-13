export const loop_board = (board_for_solving) => {
    const square_1 = () => {
        return [
            board_for_solving[0][0],
            board_for_solving[0][1],
            board_for_solving[0][2],
            board_for_solving[1][0],
            board_for_solving[1][1],
            board_for_solving[1][2],
            board_for_solving[2][0],
            board_for_solving[2][1],
            board_for_solving[2][2],
        ];
    };

    const square_2 = () => {
        return [
            board_for_solving[0][3],
            board_for_solving[0][4],
            board_for_solving[0][5],
            board_for_solving[1][3],
            board_for_solving[1][4],
            board_for_solving[1][5],
            board_for_solving[2][3],
            board_for_solving[2][4],
            board_for_solving[2][5],
        ];
    };
    const square_3 = () => {
        return [
            board_for_solving[0][6],
            board_for_solving[0][7],
            board_for_solving[0][8],
            board_for_solving[1][6],
            board_for_solving[1][7],
            board_for_solving[1][8],
            board_for_solving[2][6],
            board_for_solving[2][7],
            board_for_solving[2][8],
        ];
    };

    const square_4 = () => {
        return [
            board_for_solving[3][0],
            board_for_solving[3][1],
            board_for_solving[3][2],
            board_for_solving[4][0],
            board_for_solving[4][1],
            board_for_solving[4][2],
            board_for_solving[5][0],
            board_for_solving[5][1],
            board_for_solving[5][2],
        ];
    };

    const square_5 = () => {
        return [
            board_for_solving[3][3],
            board_for_solving[3][4],
            board_for_solving[3][5],
            board_for_solving[4][3],
            board_for_solving[4][4],
            board_for_solving[4][5],
            board_for_solving[5][3],
            board_for_solving[5][4],
            board_for_solving[5][5],
        ];
    };
    const square_6 = () => {
        return [
            board_for_solving[3][6],
            board_for_solving[3][7],
            board_for_solving[3][8],
            board_for_solving[4][6],
            board_for_solving[4][7],
            board_for_solving[4][8],
            board_for_solving[5][6],
            board_for_solving[5][7],
            board_for_solving[5][8],
        ];
    };

    const square_7 = () => {
        return [
            board_for_solving[6][0],
            board_for_solving[6][1],
            board_for_solving[6][2],
            board_for_solving[7][0],
            board_for_solving[7][1],
            board_for_solving[7][2],
            board_for_solving[8][0],
            board_for_solving[8][1],
            board_for_solving[8][2],
        ];
    };

    const square_8 = () => {
        return [
            board_for_solving[6][3],
            board_for_solving[6][4],
            board_for_solving[6][5],
            board_for_solving[7][3],
            board_for_solving[7][4],
            board_for_solving[7][5],
            board_for_solving[8][3],
            board_for_solving[8][4],
            board_for_solving[8][5],
        ];
    };
    const square_9 = () => {
        return [
            board_for_solving[6][6],
            board_for_solving[6][7],
            board_for_solving[6][8],
            board_for_solving[7][6],
            board_for_solving[7][7],
            board_for_solving[7][8],
            board_for_solving[8][6],
            board_for_solving[8][7],
            board_for_solving[8][8],
        ];
    };
    let steps_taken = [];
    let avoid = [];
    const try_numbers = (x, y) => {
        let at_least_one_valid = false;
        for (let z = 1; z < 10; z++) {
            const is_valid = validate_number(z, x, y);
            const what_im_looking_for = { x, y, value: z };
            let is_avoided;

            for (let i in avoid) {
                if (
                    avoid[i].x === what_im_looking_for.x &&
                    avoid[i].y === what_im_looking_for.y &&
                    avoid[i].value === what_im_looking_for.value
                ) {
                    is_avoided = true;
                    break;
                }
            }

            if (is_valid && !is_avoided) {
                at_least_one_valid = true;
                board_for_solving[y][x] = z;
                steps_taken.push({ x, y, value: z });
                break;
            }
        }
        if (!at_least_one_valid) {
            step_back();
            return 'no-match';
        }
    };

    const validate_number = (number, x, y) => {
        // checking x axis
        if (board_for_solving[y].includes(number)) {
            return false;
        }
        // y axis
        for (let i in board_for_solving) {
            if (board_for_solving[i][x] === number) {
                return false;
            }
        }
        // squares
        if (x <= 2) {
            if (y <= 2) {
                return !square_1().includes(number);
            }
            if (y > 2 && y <= 5) {
                return !square_4().includes(number);
            }
            if (y > 5) {
                return !square_7().includes(number);
            }
        }
        if (x > 2 && x <= 5) {
            if (y <= 2) {
                return !square_2().includes(number);
            }
            if (y > 2 && y <= 5) {
                return !square_5().includes(number);
            }
            if (y > 5) {
                return !square_8().includes(number);
            }
        }
        if (x > 5) {
            if (y <= 2) {
                return !square_3().includes(number);
            }
            if (y > 2 && y <= 5) {
                return !square_6().includes(number);
            }
            if (y > 5) {
                return !square_9().includes(number);
            }
        }
        return true;
    };

    const step_back = () => {
        const last_step = steps_taken[steps_taken.length - 1];

        steps_taken.pop();

        board_for_solving[last_step.y][last_step.x] = 0;

        avoid.push(last_step);

        avoid = avoid.filter((item) => {
            if (
                item &&
                (item.y < last_step.y ||
                    (item.y === last_step.y && item.x <= last_step.x))
            ) {
                return item;
            } else return null;
        });
    };
    let solved = false;
    while (!solved) {
        let stop;
        for (let i in board_for_solving) {
            for (let j in board_for_solving[i]) {
                if (board_for_solving[i][j] === 0) {
                    const is_there_a_match = try_numbers(j, i);
                    if (is_there_a_match === 'no-match') {
                        stop = true;
                        break;
                    }
                }
            }
            if (stop) {
                break;
            }
        }
        if (!stop) {
            solved = true;
            console.log(board_for_solving);
            return board_for_solving;
        }
    }
};
