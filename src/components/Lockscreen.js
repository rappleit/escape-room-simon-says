import { useState } from "react";

const Lockscreen = ({isLoggedIn, setIsLoggedIn, isOnGame, setIsOnGame, isComplete, setIsComplete}) => {
    const passcode = "thinktank23"; //can be changed
    const [userPass, setUserPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleLogin = () => {
        if (userPass == passcode) {
            setErrorMessage("");
            setUserPass("");
            setIsLoggedIn(true);
            setIsOnGame(true);
            document.getElementById('passcodeInput').value = ''
        } else {
            setErrorMessage("Access denied. Passcode is incorrect.");
            setUserPass("");
            setIsLoggedIn(false);
            setIsOnGame(false);
            document.getElementById('passcodeInput').value = ''
        }
        
    }

    return ( 
        <div className="lockscreen">
            <div className="sessionContainer">
                <div className="sessionHeader">
                    <p>{'>'} SESSION ID:</p>
                </div>
                <p>{(isLoggedIn) ? "Ae38Nh9kmNibD23" : "####################" }</p>
            </div>
            <div className="mainLockContainer">
                <img src="lockIcon.svg"/>
                <h1>Enter Passcode</h1>
                <form onSubmit={e => { e.preventDefault(); }} autocomplete="off">
                    <input
                        type="text"
                        id="passcodeInput"
                        onChange={(e) =>{setUserPass(e.target.value)} }
                        />
                    <button type='button' onClick={() => handleLogin()}>LOG IN</button>
                </form>
                <p>{errorMessage}</p>
            </div>
        </div>
     );
}
 
export default Lockscreen;