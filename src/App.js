import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Mint from './pages/Mint';
import Gallery from './pages/Gallery';
import MyTokens from './pages/MyTokens';

import Login from './components/Login';

function App() {

	const [web3props, setWeb3Props] = useState({ web3: null, accounts: null, contract: null });

	// Callback function for the Login component to give us access to the web3 instance and contract functions
	const OnLogin = function(param){
		let { web3, accounts, contract } = param;
		if(web3 && accounts && accounts.length && contract){
			setWeb3Props({ web3, accounts, contract });
		}
	}

	// If the wallet is connected, all three values will be set. Use to display the main nav below.
	const contractAvailable = !(!web3props.web3 && !web3props.accounts && !web3props.contract);
	// Grab the connected wallet address, if available, to pass into the Login component
	const walletAddress = web3props.accounts ? web3props.accounts[0] : "";

	return (
		<div className="App">
			<Router>
				<header>
					<Link to="/">
					
					</Link>
					<nav>
						<ul>
								{contractAvailable && <>
							
									<li>
										<Link to="/gallery">Gallery</Link>
									</li>
								
								</>}
								<li>
									<Login callback={OnLogin} connected={contractAvailable} address={walletAddress}></Login>
								</li>
						</ul>
					</nav>
				</header>
				<div className="content">
					<Switch>
				
						<Route path="/gallery">
							<Gallery contract={web3props.contract}></Gallery>
						</Route>
	
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
