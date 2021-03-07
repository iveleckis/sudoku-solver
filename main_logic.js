let steps_taken = [];
let avoid = [];

const loop_board = () => {
    console.log(board_for_solving);
    for (let i in board_for_solving) {
        let stop;
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
};

const try_numbers = (x, y) => {
    let last_coordinates;
    let at_least_one_valid = false;

    for (let z = 1; z < 10; z++) {
        const is_valid = validate_number(z, x, y);

        const is_in_avoided_list = avoid.find(
            (item) => item.x === x && item.y === y && item.value === z
        );

        if (is_valid && !is_in_avoided_list) {
            last_coordinates = { x, y, value: z };
            at_least_one_valid = true;
            dom_board.children[y].children[x].innerHTML = z;
            board_for_solving[y][x] = z;
            steps_taken.push(last_coordinates);
            break;
        }
    }
    if (!at_least_one_valid) {
        step_back();
        return 'no-match';
    }
};

const step_back = () => {
    // remove last step
    // if step isnt avoided already
    // add last step to be avoided
    // if step is already avoided remove one more step
    // and remove any further avoidance

    const last_step_taken = steps_taken[steps_taken.length - 1];

    const { x, y } = steps_taken.pop();

    if (
        !avoid.find(
            (item) =>
                item.x === last_step_taken.x && item.y === last_step_taken.y
        )
    ) {
        avoid.push(last_step_taken);
        board_for_solving[y][x] = 0;
        dom_board.children[y].children[x].innerHTML = '';
    } else {
        const another = steps_taken.pop();
        avoid.push(another);

        avoid = avoid.filter(
            (item) =>
                item.x !== another.x ||
                item.y !== another.y ||
                (item.x === another.x &&
                    item.y === another.y &&
                    item.value === another.value)
        );
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
    // square
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
