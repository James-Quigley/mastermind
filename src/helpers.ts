export const COLORS = {
    WHITE: 'WHITE',
    BLACK: 'BLACK',
    GREEN: 'GREEN',
    BLUE: 'BLUE',
    YELLOW: 'YELLOW',
    RED: "RED"
};

export function generateCode(): Array<string> {
    const keys = Object.keys(COLORS);

    let code = [];

    for (let x = 0; x < 4; x++){
        code.push(keys[Math.floor(Math.random() * (keys.length))])
    }

    return code;
}

export function compareGuess(code: Array<string>, guess: Array<string>): {
    white: number,
    black: number
} {

    const countCodeColors = code.reduce((obj, val) => {
        obj[val]++;
        return obj;
    }, {
        [COLORS.WHITE]: 0,
        [COLORS.BLACK]: 0,
        [COLORS.GREEN]: 0,
        [COLORS.BLUE]: 0,
        [COLORS.YELLOW]: 0,
        [COLORS.RED]: 0,
    });

    const countGuessColors = guess.reduce((obj, val) => {
        obj[val]++;
        return obj;
    }, {
        [COLORS.WHITE]: 0,
        [COLORS.BLACK]: 0,
        [COLORS.GREEN]: 0,
        [COLORS.BLUE]: 0,
        [COLORS.YELLOW]: 0,
        [COLORS.RED]: 0,
    });

    const whitePegs = Object.keys(countGuessColors).reduce((total, key) => {
        return total + Math.min(countCodeColors[key], countGuessColors[key])
    }, 0);

    const blackPegs = code.reduce((total, val, index) => val === guess[index] ? ++total : total, 0);


    return {
        black: blackPegs,
        white: whitePegs - blackPegs
    };
}