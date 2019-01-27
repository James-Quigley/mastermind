import * as React from 'react';
import { compareGuess, generateCode } from './helpers';

export default () => {

    const [code, setCode] = React.useState<Array<string>>(generateCode());

    const [history, setHistory] = React.useState<Array<{guess: Array<string>, result: { black: number, white: number }}>>([]);

    const [first, setFirst] = React.useState<string>("BLACK");
    const [second, setSecond] = React.useState<string>("BLACK");
    const [third, setThird] = React.useState<string>("BLACK");
    const [fourth, setFourth] = React.useState<string>("BLACK");

    return (
        <div>
            <div>
                <select name="1" id="1" onChange={(e) => setFirst(e.target.value)}>
                  <option value="BLACK">Black</option>
                  <option value="BLUE">Blue</option>
                  <option value="GREEN">Green</option>
                  <option value="RED">Red</option>
                  <option value="WHITE">White</option>
                  <option value="YELLOW">Yellow</option>
                </select>
                <select name="2" id="2" onChange={(e) => setSecond(e.target.value)}>
                  <option value="BLACK">Black</option>
                  <option value="BLUE">Blue</option>
                  <option value="GREEN">Green</option>
                  <option value="RED">Red</option>
                  <option value="WHITE">White</option>
                  <option value="YELLOW">Yellow</option>
                </select>
                <select name="3" id="3" onChange={(e) => setThird(e.target.value)}>
                  <option value="BLACK">Black</option>
                  <option value="BLUE">Blue</option>
                  <option value="GREEN">Green</option>
                  <option value="RED">Red</option>
                  <option value="WHITE">White</option>
                  <option value="YELLOW">Yellow</option>
                </select>
                <select name="4" id="4" onChange={(e) => setFourth(e.target.value)}>
                  <option value="BLACK">Black</option>
                  <option value="BLUE">Blue</option>
                  <option value="GREEN">Green</option>
                  <option value="RED">Red</option>
                  <option value="WHITE">White</option>
                  <option value="YELLOW">Yellow</option>
                </select>
                <button onClick={(e) => {
                    setHistory([{
                        guess: [first, second, third, fourth],
                        result: compareGuess(code, [first, second, third, fourth])
                    }, ...history]);
                }}>Guess</button>
            </div>
            <div>
                {
                    history.map(turn => (
                        <div>
                            <p>{turn.guess.join(" ")}</p>
                            <p>White: {turn.result.white}</p>
                            <p>Black: {turn.result.black}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
