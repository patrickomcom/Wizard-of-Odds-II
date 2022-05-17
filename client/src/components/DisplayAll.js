import {useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Navbar} from 'react-bootstrap';

const DisplayAll = () => {
    const [allDecks, setAllDecks] = useState([]);
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

    const getDecks = () =>{
        axios
        .get("http://localhost:8000/api/deck")
            .then((getDecks)=> {
                setAllDecks(getDecks.data)
            })
    }

    const deleteHandler = (id) => {
        axios
        .delete(`http://localhost:8000/api/deck/${id}`)
            .then((res) => {
                getDecks();
            })
            .catch((err) => {
                console.log(err);
            });
    };




    return (
        <div className="container">
            <div className="row justify-content-center">
            <Navbar style={{justifyContent:"space-evenly"}}>
                <h1>Wizard of Odds</h1>
                <span className="pull-right">
                <Link to="/new">
                    <button className="btn btn-primary">+New Deck</button>
                </Link>
                <Link to ="/calculate">
                    <button className="btn btn-secondary">Calculate Odds!</button>
                </Link>
                </span>
            </Navbar>
                    <h4 className="text-center">Here's the competition!</h4>
                    <table className="table table-bordered table-striped table-hover w-auto">
                        <thead className="text-center table-dark">
                            <tr>
                                <th>Deck Name</th>
                                <th>Colors</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDecks.map((deck, index) => {
                                return (
                                    <tr key={deck._id}>
                                        <td>{deck.name}</td>
                                        <td>{deck.colors}</td>
                                        <td>{deck.wins}</td>
                                        <td>{deck.losses}</td>
                                        <td className="table-dark">
                                        <Link to={`/edit/${deck._id}`}>
                                                <button className="btn btn-success">Edit</button>
                                            </Link>
                                            <button className="btn btn-danger" onClick={()=>deleteHandler(deck._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    );
};

export default DisplayAll;
