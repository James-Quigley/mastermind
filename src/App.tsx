import * as React from 'react';
import { compareGuess, generateCode } from './helpers';
import './peg.css';

export default () => {

    const [code, setCode] = React.useState<Array<string>>(generateCode());

    const [gameOver, setGameOver] = React.useState(false);

    const [wins, setWins] = React.useState(0);
    const [losses, setLosses] = React.useState(0);

    const [history, setHistory] = React.useState<Array<{guess: Array<string>, result: { black: number, white: number }}>>([]);

    const [first, setFirst] = React.useState<string>("BLACK");
    const [second, setSecond] = React.useState<string>("BLACK");
    const [third, setThird] = React.useState<string>("BLACK");
    const [fourth, setFourth] = React.useState<string>("BLACK");

    return (
        <div>
          <div>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
          </div>
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
                <button disabled={gameOver} onClick={(e) => {
                    const result = compareGuess(code, [first, second, third, fourth]);
                    setHistory([{
                        guess: [first, second, third, fourth],
                        result
                    }, ...history]);

                    if (result.black === 4){
                      setGameOver(true);
                      setWins(wins + 1);
                      setTimeout(() => {
                        setCode(generateCode());
                        setHistory([]);
                        setGameOver(false);
                      }, 2000);
                    } else if (history.length >= 9){
                      setGameOver(true);
                      setLosses(losses + 1);
                      setTimeout(() => {
                        setCode(generateCode());
                        setHistory([]);
                        setGameOver(false);
                      }, 2000);
                    }
                }}>Guess</button>
                <br />
                <div className={first + " peg"}></div>
                <div className={second + " peg"}></div>
                <div className={third + " peg"}></div>
                <div className={fourth + " peg"}></div>
            </div>
            <hr/>
            <div>
                {
                    history.map(turn => (
                        <div>
                            {turn.guess.map(peg => (
                              <div className={peg + " peg"}></div>
                            ))}
                            <span style={{marginRight: '15px'}}>White: {turn.result.white}</span>
                            <span>Black: {turn.result.black}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
