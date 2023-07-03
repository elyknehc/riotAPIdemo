import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import axios from "axios";

function App() {
	const [playerInfo, setPlayerInfo] = useState("");
	const [playerData, setPlayerData] = useState([]);
	const API_KEY = process.env.REACT_APP_API_KEY;

	var APICallString =
		"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
		playerInfo +
		"?api_key=" +
		API_KEY;

	function searchForPlayer(event) {
		//Handle API Call

		axios
			.get(APICallString)
			.then(function (response) {
				setPlayerData(response.data);
			})
			.catch(function (error) {});
		//console.log(event);
	}

	return (
		<div className="App">
			<div className="container">
				<h5>League of Legends Tracker</h5>
				<input type="text" onChange={(e) => setPlayerInfo(e.target.value)} />
				<button onClick={(e) => searchForPlayer(e)}> Search for Player </button>
			</div>
			{JSON.stringify(playerData) !== "[]" ? (
				<div>
					<p>{playerData.name} </p>
					<img
						width="100"
						height="100"
						src={
							"http://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/" +
							playerData.profileIconId +
							".png"
						}
					/>
				</div>
			) : (
				<p>No Player Data</p>
			)}
		</div>
	);
}

export default App;
