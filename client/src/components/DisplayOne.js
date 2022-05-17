import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar, Card } from "react-bootstrap";

const DisplayOne = () => {
    const {id} = useParams();
    const [deck, setDeck] = useState({});
    const navigate = useNavigate();


    useEffect(()=> {
        axios
        .get(`http://localhost:8000/api/deck/${id}`)
            .then((res)=>{
                const {data} = res;
                setDeck(data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[]);

    const deleteHandler = (id) => {
        axios
        .delete(`http://localhost:8000/api/deck/${id}`)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <Navbar style={{justifyContent:"space-between"}}>
                    <h1>Wizard of Odds</h1>
                    <Link to="/">back to home</Link>
                </Navbar>
                <Navbar style={{justifyContent:"space-between"}}>
                    <h3> Details about: {deck.name}</h3>
                    <button className="btn btn-danger text-white" onClick={()=>deleteHandler(deck._id)}>-Delete {deck.name}</button>
                </Navbar>
                <Card bordered>
                    <div className="row">
                    <div className="col-2">
                    <p><strong>Name:</strong></p>
                    <p><strong>Colors:</strong></p>
                    <p><strong>Wins:</strong></p>
                    <p><strong>Losses:</strong></p>
                    </div>
                    <div className="col-2">
                        <p>{deck.name}</p>
                        <p>{deck.colors}</p>
                        <p>{deck.wins} </p>
                        <p>{deck.losses} </p>
                    </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DisplayOne;