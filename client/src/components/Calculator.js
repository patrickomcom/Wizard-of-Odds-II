import {useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Card } from "react-bootstrap";


const Calculator = () => {
    const [allDecks, setAllDecks] = useState([]);
    const [deck1, setDeck1] = useState([]);
    const [deck2, setDeck2] = useState([]);
    useEffect(()=> {
        axios
        .get("http://localhost:8000/api/deck")
            .then((res)=> {
                console.log(res.data);
                setAllDecks(res.data);
            })
            .catch((err)=> {
                console.log(err);
            });
    }, []);

    const calculate = (e) => {
        var deck1 = document.getElementById("deck1").value;
        var deck2 = document.getElementById("deck2").value;
        console.log(deck1);
        console.log(deck2);
        Promise.all([
            fetch(`http://localhost:8000/api/deck/${deck1}`),
            fetch(`http://localhost:8000/api/deck/${deck2}`)
        ])
        .then(async([result1, result2])=>{
            const a = await result1.json();
            const b = await result2.json();
            var totalGames1 = (a.wins+a.losses);
            var totalGames2 = (b.wins+b.losses);
            var winChance1 = Math.round((a.wins/totalGames1)*100);
            var winChance2 = Math.round((b.wins/totalGames2)*100);
            var fullWinChance1 = (winChance2/winChance1);
            var fullWinChance2 = (winChance1/winChance2);
            var expectedPayout1 = (fullWinChance1+0.00000005).toFixed(2);
            var expectedPayout2 = (fullWinChance2+0.00000005).toFixed(2);
            var fullPayout1 = (1+fullWinChance1);
            var fullPayout2 = (1+fullWinChance2);
            var payoutAmount1 = fullPayout1.toFixed(2);
            var payoutAmount2 = fullPayout2.toFixed(2);
            var winningState = "The odds for this match are " + winChance1 + ":" + winChance2 + ".";
            var bettingResults1 = "If you bet $1 on Player 1, your expected payout is $" + expectedPayout1 + ", for a total of $"+payoutAmount1+".";
            var bettingResults2 = "If you bet $1 on Player 1, your expected payout is $" + expectedPayout2 + ", for a total of $"+payoutAmount2+".";

            document.getElementById("output").innerHTML = winningState;
            document.getElementById("output2").innerHTML = bettingResults1;
            document.getElementById("output3").innerHTML = bettingResults2;

            console.log(a.wins+a.losses);
            console.log(b.wins+b.losses);
        })
        .catch((err)=>{
            console.log(err);
        })
            
        }
    


    return (
        <div className="container">
            <div className="row">
            <Navbar style={{justifyContent:"space-between"}}>
                    <h1>Wizard of Odds</h1>
                    <Link to="/">
                        <button className="btn btn-warning">Home</button>
                    </Link>
            </Navbar>
            <div className="inline-block mt-3 text-center">
        <label htmlFor="deck1">Choose <strong>Player 1's</strong> Deck: </label>
        <select onChange={(e) => setDeck1(e.target.value)} name="deck1" id="deck1">
            {allDecks.map((deck, index)=>{
                return (
                    <option value={deck._id} key={deck._id}>{deck.name}: {deck.wins}-{deck.losses}</option>
                    )
            })}
        </select>
        <br></br>
        <div className="mt-3">
        <label htmlFor="deck2">Choose <strong>Player 2's</strong> Deck:</label>
        <select name="deck2" id="deck2">
            {allDecks.map((deck, index)=>{
                return (
                    <option value={deck._id} key={deck._id}>{deck.name}: {deck.wins}-{deck.losses}</option>
                )
            })}
        </select>
        </div>
        </div>
        <br></br>
        <Card className="text-center mt-5 w-auto mx-auto">
            <h5>Results</h5>
        <p id="output"></p>
        <p id="output2"></p>
        <p id="output3"></p>
        </Card>
        </div>
        <div className="col text-center mt-3">
        <button className="btn btn-primary" onClick={()=>calculate()}>
                            Calculate!
        </button>
        </div>
        </div>
    );
};

export default Calculator;