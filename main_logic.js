let steps_taken = [];
let avoid = [];

const loop_board = () => {
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
            console.log('solved!');
        }
    }
};

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
            dom_board.children[y].children[x].innerHTML = z;
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

    dom_board.children[last_step.y].children[last_step.x].innerHTML = '';

    board_for_solving[last_step.y][last_step.x] = 0;

    avoid.push(last_step);

    avoid = avoid.filter((item) => {
        if (
            item &&
            (item.y < last_step.y ||
                (item.y === last_step.y && item.x <= last_step.x))
        ) {
            return item;
        }
    });
};
