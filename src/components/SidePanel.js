import { useEffect, useState } from "react";

const SidePanel = ({isLoggedIn, setIsLoggedIn}) => {
    const [date, setDate] = useState(new Date());
    const refreshClock = () => {
        setDate(new Date());
    }
    
    const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    const month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];


    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);

    return ( 
        <div className="sidePanel">
            <div className="panelHeader">
                <p>SYSTEM</p>
                <p>PANEL</p>
            </div>
            <div className="clock">
                <h1>{date.toLocaleTimeString()}</h1>
            </div>
            <div className="dateContainer">
                <div className="day">
                    <h2>{weekday[date.getDay()]}</h2>
                </div>
                <div className="dateMonth">
                    <h2>{date.getDate()} {month[date.getMonth()]}</h2>
                </div>
                <div className="year">
                    <h2>{date.getFullYear()}</h2>
                </div>
            </div>
            <div className="networkStatus">
                <h3>Network Status:</h3>
                <div className="networkStatusContainer">
                    <img src="computerIcon.svg"/>
                    <div className="networkInfo">
                        <div className="connection">
                            <p className="connectionDot">◉</p>
                            <p>Connected</p>
                        </div>
                        <p>Network ID: 5Q83HJ7KX1</p>
                        <p>Ping: 5.8ms</p>
                        <p>Location: thinktank23</p>
                    </div>
                </div>
            </div>
            <div className="authorisation">
                <h3>{isLoggedIn ? "AUTHORISED - ACCESS GRANTED": "UNAUTHORISED - ACCESS FORBIDDEN"}</h3>
                <div className="authorisationInfo">
                    <div className="authorisationInfoLine">
                        <p className="authorisationInfoHead">USER:</p>
                        <p>{ isLoggedIn ? "Agent 900" : "########"}</p>
                    </div>
                    <div className="authorisationInfoLine">
                        <p className="authorisationInfoHead">USER STATUS:</p>
                        <p>{ isLoggedIn ? "Administrator" : "########"}</p>
                    </div>
                    <div className="authorisationInfoLine">
                        <p className="authorisationInfoHead">SESSION ID:</p>
                        <p>{ isLoggedIn ? "Ae38Nh9kmNibD23" : "########"}</p>
                    </div>
                </div>
            </div>
            <div className="securityStatus">
                <h3>Security:</h3>
                <div className="securityInfo">
                    <div className="securityInfoLine">
                        <p className="securityInfoLineHeader">Risk:</p>
                        <p>High</p>
                    </div>
                    <div className="securityInfoLine">
                        <p className="securityInfoLineHeader">Threat level:</p>
                        <p>88%</p>
                    </div>
                    <div className="securityInfoLine">
                        <p className="securityInfoLineHeader">Encryption:</p>
                        <p>Maximum</p>
                    </div>
                </div>
            </div>
            <h2>--------------</h2>
        </div>
     );
}
 
export default SidePanel;