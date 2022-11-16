import { useState } from "react";

const EndScreen = ({ isLoggedIn, setIsLoggedIn, isOnGame, setIsOnGame, isComplete, setIsComplete }) => {
    const [fileContent, setFileContent] = useState("")

    const chooseMessage = (messageNum) => {
        switch (messageNum) {
            case 1:
                setFileContent("> mission accomplished. diamonds have been taken from agent [REDACTED]. to be sold to [REDACTED]. location of four diamonds are at [REDACTED].")
                break;
            case 2:
                setFileContent("> d0 y0u r3m3mb3r 7h3 c0l0ur5?")
                break;
            case 3:
                setFileContent("> to request for approval of purchase: ice cream stickss")
                break;
            case 4:
                setFileContent("> this game was coded in React.js in 2.5 days :3")
        }
    }

    const replayGame = () => {
        setFileContent("");
        setIsComplete(false);
        setIsOnGame(true);
    }




    return (
        <div className="endScreen">
            <div className="sessionContainer">
                <div className="sessionHeader">
                    <p>{'>'} SESSION ID:</p>
                </div>
                <p>{(isLoggedIn) ? "Ae38Nh9kmNibD23" : "####################"}</p>
            </div>
            <div className="endContainer">
                <div className="endHeader">
                    <h1>You Win</h1>
                    <p>{'>'} agent permissions updated</p>
                    <p>{'>'} access to .\agent900\admin folder granted</p>
                </div>
                <div className="filePanel">
                    <div className="fileList">
                        <div className="fileHeader">
                            <p>.\agent900\admin</p>
                        </div>
                        <button className="fileButton" onClick={() => chooseMessage(1)}>message1.txt</button>
                        <button className="fileButton" onClick={() => chooseMessage(2)}>message2.txt</button>
                        <button className="fileButton" onClick={() => chooseMessage(3)}>message3.txt</button>
                        <button className="fileButton" onClick={() => chooseMessage(4)}>message4.txt</button>

                    </div>
                    <div className="fileReader">
                        <p className="fileContent">{fileContent}</p>
                    </div>
                </div>
                <button className="replayButton" onClick={() => replayGame()}>Replay Game</button>
            </div>

        </div>
    );
}

export default EndScreen;