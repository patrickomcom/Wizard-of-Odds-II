import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const DeckForm = () => {
    const [name, setName] = useState("");
    const [colors, setColors] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
            axios
                .post("http://localhost:8000/api/deck", { name, colors })
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
                <h4>Add a new deck!</h4>
                    <form onSubmit={handleSubmit}>
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
                        <p className="fs-6 fst-italic">Magic: The Gathering has five colors: White, Blue, Black, Red, and Green. Please enter the colors that make up your deck. If your deck has all five colors, type "All". If your deck has no colors, type "Colorless". To choose multiple colors, seperate them with a "/". </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-3 text-center">
                        <button className="btn btn-primary" type="submit">
                            +Add Deck
                        </button>
                    </div>
                    </form>
            </div>
        </div>
    );
};

export default DeckForm;