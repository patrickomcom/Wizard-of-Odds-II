import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const EditPet = (props) => {
    const { id } = useParams();
    const [name, setName] =useState("");
    const [colors, setColors] = useState("");
    const [wins, setWins] = useState("");
    const [losses, setLosses] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/deck/${id}`)
                .then((res) => {
                    const { data } = res;
                    setName(data.name);
                    setColors(data.colors);
                    setWins(data.wins);
                    setLosses(data.losses);
                })
            .catch((err) => {
                console.log(err.response);
            });
            }, [id]);

    const updateHandler = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:8000/api/deck/${id}`, { name, colors, wins, losses })
                .then((response) => {
                    console.log(response);
                    navigate("/");
                })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
        };


        return (
            <div className="container">
                <div className="row">
                <Navbar style={{justifyContent:"space-between"}}>
                    <h1>Wizard of Odds</h1>
                    <Link to="/">
                        <button className="btn btn-warning">Home</button>
                    </Link>
                </Navbar>
                    <h4>Update {name}</h4>
                    <form onSubmit={updateHandler}>
                    <div className="row">
                        <div className="col-4 border border-dark mt-3">
                        <div className="form-group mt-3">
                        <div className="input-group align-items-center">
                            <label htmlFor="name"><strong>Deck Name:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            {errors.name ? <p className="text-danger">{errors.name.message}</p> : null}
                        </div>
                        </div>
                        <br></br>
                        <div className="form-group">
                        <div className="input-group align-items-center">
                            <label htmlFor="name"><strong>Colors:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setColors(e.target.value)}
                                value={colors}
                            />
                            {errors.colors ? <p className="text-danger">{errors.colors.message}</p> : null}
                        </div>
                        </div>
                        <div>
                        <p className="fs-6 fst-italic">Magic: The Gathering has five colors: White, Blue, Black, Red, and Green. Please enter the colors that make up your deck. If your deck has all five colors, type "All". If your deck has no colors, type "Colorless". To choose multiple colors, separate them with a "/". </p>
                        </div>
                        <div className="input-group align-items-center">
                            <label htmlFor="Wins"><strong>Wins:</strong> </label>
                            <input
                                type="number"
                                className="form-control"
                                onChange={(e)=>setWins(e.target.value)}
                                value={wins}
                            />
                            <div className="input-group-btn">
                            <button className="btn btn-success" onClick={()=>setWins(wins +1)}>Win!</button>
                            </div>
                        </div>
                        <div>
                        <div className="input-group mt-3 align-items-center mb-3">
                            <label htmlFor="Losses"><strong>Losses:</strong></label>
                            <input
                                type="number"
                                className="form-control"
                                onChange={(e)=>setLosses(e.target.value)}
                                value={losses}
                            />
                            <div className="input-group-btn"></div>
                            <button className="btn btn-danger" onClick={()=>setLosses(losses +1)}>Lose...</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div>
                        <br></br>
                    </div>
                    <div className="col-4 text-center">
                        <button className="btn btn-primary" type="submit">
                            Update Deck
                        </button>
                    </div>
                    </form>
                    </div>
                </div>
            
        );
    };
    
    export default EditPet;