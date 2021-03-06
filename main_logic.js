let steps_taken_for_backtracking = [];
let avoid;

const loop_board = () => {
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
        if (stop) break;
    }
};

const try_numbers = (x, y) => {
    let last_coordinates;
    let at_least_one_valid = false;
    for (let z = 1; z < 10; z++) {
        const is_valid = validate_number(z, x, y);
        // we need to skip avoided value (z) if x and y matches avoid.x avoid.y
        if (is_valid) {
            last_coordinates = { x, y, value: z };
            at_least_one_valid = true;
            dom_board.children[y].children[x].innerHTML = z;
            board_for_solving[y][x] = z;
            steps_taken_for_backtracking.push(last_coordinates);
            break;
        }
    }
    if (!at_least_one_valid) {
        step_back(last_coordinates);
        return 'no-match';
    }
};

const step_back = () => {
    const { x, y, value } = steps_taken_for_backtracking.pop();
    board_for_solving[y][x] = 0;
    dom_board.children[y].children[x].innerHTML = '';

    const new_avoidance = { x, y, value };

    avoid = new_avoidance;
    console.log(avoid);
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
