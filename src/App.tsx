import * as React from 'react';
import { compareGuess, COLORS, generateCode } from './helpers';
import './peg.css';

export default () => {

  const [code, setCode] = React.useState<Array<string>>(generateCode());

  const [gameOver, setGameOver] = React.useState(false);

  const [wins, setWins] = React.useState(0);
  const [losses, setLosses] = React.useState(0);

  const [history, setHistory] = React.useState<Array<{ guess: Array<string>, result: { black: number, white: number } }>>([]);

  const [first, setFirst] = React.useState<string>(COLORS.BLACK);
  const [second, setSecond] = React.useState<string>(COLORS.BLACK);
  const [third, setThird] = React.useState<string>(COLORS.BLACK);
  const [fourth, setFourth] = React.useState<string>(COLORS.BLACK);

  const [winClass, setWinClass] = React.useState('');
  const [lossClass, setLossClass] = React.useState('');

  return (
    <div>
      <h1 style={{
        textAlign: 'center'
      }}>Mastermind</h1>
      <div style={{
        width: '25%',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <span style={{ lineHeight: '2em', marginRight: '15px' }}>Wins: <span className={winClass} style={{
          transition: "font-size .75s",
          lineHeight: '2em'
        }}>{wins}</span></span>
        <span style={{ lineHeight: '2em' }}>Losses: <span className={lossClass} style={{
          transition: "font-size .75s",
          lineHeight: '2em'
        }}>{losses}</span></span>
      </div>
      <hr />
      <div style={{
        width: '25%',
        margin: '30px auto',
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto',
        gridTemplateRows: 'auto auto auto'
      }}>
        <select style={{ margin: '10px', gridColumnStart: '1', gridRowStart: '1', placeSelf: 'center' }} name="1" id="1" onChange={(e) => setFirst(e.target.value)}>
          <option value={COLORS.BLACK}>Black</option>
          <option value={COLORS.BLUE}>Blue</option>
          <option value={COLORS.GREEN}>Green</option>
          <option value={COLORS.RED}>Red</option>
          <option value={COLORS.WHITE}>White</option>
          <option value={COLORS.YELLOW}>Yellow</option>
        </select>
        <select style={{ margin: '10px', gridColumnStart: '2', gridRowStart: '1', placeSelf: 'center' }} name="2" id="2" onChange={(e) => setSecond(e.target.value)}>
          <option value={COLORS.BLACK}>Black</option>
          <option value={COLORS.BLUE}>Blue</option>
          <option value={COLORS.GREEN}>Green</option>
          <option value={COLORS.RED}>Red</option>
          <option value={COLORS.WHITE}>White</option>
          <option value={COLORS.YELLOW}>Yellow</option>
        </select>
        <select style={{ margin: '10px', gridColumnStart: '3', gridRowStart: '1', placeSelf: 'center' }} name="3" id="3" onChange={(e) => setThird(e.target.value)}>
          <option value={COLORS.BLACK}>Black</option>
          <option value={COLORS.BLUE}>Blue</option>
          <option value={COLORS.GREEN}>Green</option>
          <option value={COLORS.RED}>Red</option>
          <option value={COLORS.WHITE}>White</option>
          <option value={COLORS.YELLOW}>Yellow</option>
        </select>
        <select style={{ margin: '10px', gridColumnStart: '4', gridRowStart: '1', placeSelf: 'center' }} name="4" id="4" onChange={(e) => setFourth(e.target.value)}>
          <option value={COLORS.BLACK}>Black</option>
          <option value={COLORS.BLUE}>Blue</option>
          <option value={COLORS.GREEN}>Green</option>
          <option value={COLORS.RED}>Red</option>
          <option value={COLORS.WHITE}>White</option>
          <option value={COLORS.YELLOW}>Yellow</option>
        </select>
        <button style={{ gridColumnStart: '5', gridRowStart: '1', placeSelf: 'center' }} disabled={gameOver} onClick={(e) => {
          const result = compareGuess(code, [first, second, third, fourth]);
          setHistory([{
            guess: [first, second, third, fourth],
            result
          }, ...history]);

          if (result.black === 4) {
            setGameOver(true);
            setWinClass('big-text');
            setWins(wins + 1);
            setTimeout(() => {
              setCode(generateCode());
              setHistory([]);
              setGameOver(false);
              setWinClass('');
            }, 2000);
          } else if (history.length >= 9) {
            setGameOver(true);
            setLossClass('big-text');
            setLosses(losses + 1);
            setTimeout(() => {
              setCode(generateCode());
              setHistory([]);
              setGameOver(false);
              setLossClass('');
            }, 2000);
          }
        }}>Guess</button>
        <br />
        <div style={{ gridColumnStart: '1', gridRowStart: '2', placeSelf: 'center' }} className={first + " peg"}></div>
        <div style={{ gridColumnStart: '2', gridRowStart: '2', placeSelf: 'center' }} className={second + " peg"}></div>
        <div style={{ gridColumnStart: '3', gridRowStart: '2', placeSelf: 'center' }} className={third + " peg"}></div>
        <div style={{ gridColumnStart: '4', gridRowStart: '2', placeSelf: 'center' }} className={fourth + " peg"}></div>
        <span style={{ gridColumnStart: '5', gridRowStart: '2', placeSelf: 'center' }}>{10 - history.length} guesses left</span>
      </div>
      <hr />

      <div>
        {
          history.map(turn => (
            <div style={{
              margin: '10px auto',
              border: '2px solid #333',
              width: '66%',
              padding: '10px',
              textAlign: 'center'
            }}>
              {turn.guess.map(peg => (
                <div className={peg + " peg"}></div>
              ))}
              <span style={{ marginRight: '15px' }}>White: {turn.result.white}</span>
              <span>Black: {turn.result.black}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};
