import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    useEffect(() => {
        const ev = new EventSource('/ticker');

        ev.onopen = function () {
            console.log('open this __________________________');

        }
        ev.onmessage = function (ms ) {
            console.log("ms", ms);
        }
// @ts-ignore
        ev.onerror =  function (err) {
            if (err) {
                console.log("err", err)
            }
        }

    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
