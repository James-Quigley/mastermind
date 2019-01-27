import { generateCode, compareGuess } from "./helpers";

const MAX_GUESSES = 10;

export default class Game {
    private code: Array<string>
    private guesses: number
    history: Array<{
        guess: Array<string>,
        result: {
            black: number,
            white: number
        }
    }>
    isOver: boolean

    constructor() {
        this.code = generateCode();
        this.guesses = 0;
        this.history = [];
        this.isOver = false;
    }

    guess(guess: Array<string>): { white: number, black: number } {
        if (!this.isOver){
            this.guesses++;
            if (this.guesses === MAX_GUESSES){
                this.isOver = true;
            }

            const result = compareGuess(this.code, guess);
            if (result.black === 4){
                this.isOver = true;
            }

            this.history.push({
                guess,
                result
            });

            return result;
        }

        throw "GAME OVER";
    }
}