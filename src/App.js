import logo from './logo.svg';
import './App.css';
import SidePanel from './components/SidePanel';
import Lockscreen from './components/Lockscreen';
import { useEffect, useState } from 'react';
import Game from './components/Game';
import EndScreen from './components/EndScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnGame, setIsOnGame] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setIsLoggedIn(false)
  }, [])

  return (
    <div className="App">
      <SidePanel {...{isLoggedIn, setIsLoggedIn}}/>
      {!isLoggedIn ?  <Lockscreen {...{isLoggedIn, setIsLoggedIn, isOnGame, setIsOnGame, isComplete, setIsComplete}}/> : <></>} 

      {(isLoggedIn && isOnGame) ? <Game {...{isLoggedIn, setIsLoggedIn, isOnGame, setIsOnGame, isComplete, setIsComplete}}/> : <></>}
      {(isLoggedIn && isComplete) ? <EndScreen {...{isLoggedIn, setIsLoggedIn, isOnGame, setIsOnGame, isComplete, setIsComplete}} /> : <></>}
      
    </div>
  );
}

export default App;
