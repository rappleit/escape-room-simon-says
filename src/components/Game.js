import { useEffect, useState } from "react";

const Game = ({isLoggedIn, setIsLoggedIn, isOnGame, setIsOnGame, isComplete, setIsComplete}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [round, setRound] = useState(1) //1-6
    const [isSimonTurn, setIsSimonTurn] = useState(false)
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    const [playerSequence, setPlayerSequence] = useState([])
    const [currentSimonColour, setCurrentSimonColour] = useState("")
    const [currentSimonColourIndex, setCurrentSimonColourIndex] = useState(0)
    const [currentSimonSequence, setCurrentSimonSequence] = useState([])
    const [playerSuccess, setPlayerSuccess] = useState(false)
    const [failMessage, setFailMessage] = useState("")


    const sequence = ["red", "yellow", "green", "blue", "green", "yellow"]; // can be changed
    
    const flashColour = (colour) => {
        const colors = ["red", "blue", "yellow", "green"];

        colors.forEach(colour1 => {
        document.getElementById(colour1).style.filter=`brightness(1${(colour === colour1 ? ".9" : "")})`;
        })
    }

    //start Simon's Turn
    useEffect(() => {
        if (isSimonTurn) {
            setCurrentSimonColour(sequence[0]) //start with the first colour
        }
    }, [isSimonTurn])

    //when current simon colour changes
    useEffect(() => {
        if (isSimonTurn) {
            flashColour(currentSimonColour);
            if (currentSimonSequence.length < round) {
                setCurrentSimonSequence(sq => [...sq, currentSimonColour])
            }
            let timeout;
            if (currentSimonColourIndex < round && currentSimonColour != "") {
                timeout = setTimeout(() => {
                    setCurrentSimonColourIndex(currentSimonColourIndex + 1)
                }, 500);
            } else {
                //end Simon turn
                setCurrentSimonColour("");
                setCurrentSimonColourIndex(0);
                setIsSimonTurn(false);
                setIsPlayerTurn(true);
                setPlayerSuccess(false);
                console.log(playerSequence)
                document.getElementById("red").style.removeProperty("filter");
                document.getElementById("blue").style.removeProperty("filter");
                document.getElementById("yellow").style.removeProperty("filter");
                document.getElementById("green").style.removeProperty("filter");
            }
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [currentSimonColour])

    //update current simon colour when currentSimonColourIndex changes
    useEffect(() => {
        if (isSimonTurn) {
            setCurrentSimonColour(sequence[currentSimonColourIndex]);
        }
        
    }, [currentSimonColourIndex])

    const handlePlayerInput = (colour) => {
        if (isPlayerTurn) {
            setPlayerSequence(current => [...current, colour])
        }
        
    }

    const loseGame = () => {
        setPlayerSuccess(false);
                setRound(1);
                setIsPlayerTurn(false);
                setIsPlaying(false)
                setCurrentSimonSequence([]);
                setPlayerSequence([]);
                setFailMessage("Game Over. Press 'Start' to play again.")
    }

    //check each input
    useEffect(() => {
        if (playerSequence.length < round) {
            if (playerSequence[playerSequence.length - 1] != currentSimonSequence[playerSequence.length-1]) {
                loseGame();
            }
        } else if (playerSequence.length == round) {
            if (playerSequence[playerSequence.length - 1] != currentSimonSequence[playerSequence.length-1]) {
                loseGame();
            } else {
                //WIN ROUND
                setPlayerSuccess(true);
            }
        }
        
    }, [playerSequence.length])
    

    //check if player succeeds for the round
    useEffect(() => {
        if (playerSuccess) {
            setRound(round+1);
            setCurrentSimonSequence([]);
            setPlayerSequence([]);
        }
    }, [playerSuccess])

    //activate simon's turn if round < 6

    useEffect(() => {
        let timeout1;
        if (round > 1 && round <= 6) {
            timeout1 = setTimeout(() => {
                setIsSimonTurn(true);
            }, 800);
        } else if (round == 7) {
            //WIN GAME
            setIsOnGame(false);
            setIsComplete(true);

            setIsPlayerTurn(false);
            setIsSimonTurn(false)
            setIsPlaying(false);
            setCurrentSimonSequence([]);
            setPlayerSequence([]);
            setRound(1);
            setPlayerSuccess(false);
        }
        return () => {
            clearTimeout(timeout1);
        }
    }, [round])

    return ( 
        <div className="game">
             <div className="sessionContainer">
                <div className="sessionHeader">
                    <p>{'>'} SESSION ID:</p>
                </div>
                <p>{(isLoggedIn) ? "Ae38Nh9kmNibD23" : "####################" }</p>
            </div>
            <div className="gameContainer">
                <h1>Simon Says</h1>
                <p>For every round, the coloured buttons below will flash in an increasingly complex pattern. Click on the coloured buttons in the correct sequence to complete the round. To win, complete 6 successive rounds.</p>
                <div className="simonGame">
                    <div className="greenredRow">
                        <button className="simonGreen simonButton" id="green" disabled={(isSimonTurn) ? true: false} onClick={() => handlePlayerInput("green")}></button>
                        <button className="simonRed simonButton" id="red" disabled={(isSimonTurn) ? true: false} onClick={() => handlePlayerInput("red")}></button>
                    </div>
                    <div className="yellowblueRow">
                        <button className="simonYellow simonButton" id="yellow" disabled={(isSimonTurn) ? true: false} onClick={() => handlePlayerInput("yellow")}></button>
                        <button className="simonBlue simonButton" id="blue" disabled={(isSimonTurn) ? true: false} onClick={() => handlePlayerInput("blue")}></button>
                    </div>
                </div>
                <p className="failMessage">{failMessage}</p>
                {(isPlaying) ? <h2>Round {round}</h2> : <button type="button" className="startButton" onClick={() => 
                    {
                        setIsSimonTurn(true)
                        setIsPlaying(true)
                        setFailMessage("")
                    }}>Start</button>}
            </div>
        </div>
     );
}
 
export default Game;