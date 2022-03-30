import React from "react";
import Web3 from "web3";

import ExobitsABI from '../contract/ReExoBits.json';

export default function Login(props) {

	const contractAddress = "0xad9127517Dd42ca14Ea320b1D2d3a2c349cc4110";

	const DoConnect = async () => {

		console.log('Connecting....');
		try {
			// Get network provider and web3 instance.
			const web3 = new Web3(Web3.givenProvider || 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev');
			// Request account access if needed
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get an instance of the contract sop we can call our contract functions
			const instance = new web3.eth.Contract(
				ExobitsABI, 
				contractAddress
			);
			props.callback({ web3, accounts, contract: instance });

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet.", error);
		}
	};

	// If not connected, display the connect button.
	if(!props.connected) return <button className="login" onClick={DoConnect}>Connect Wallet</button>;

	// Display the wallet address. Truncate it to save space.
	return <>[{props.address.slice(0,6)}]</>;
}