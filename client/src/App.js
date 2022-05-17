import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayAll from "./components/DisplayAll";
import DeckForm from "./components/DeckForm";
import EditDeck from "./components/EditDeck";
import Calculator from "./components/Calculator";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<DisplayAll />}/>
            <Route path="/new" element={<DeckForm />} />
            <Route path="/calculate" element={<Calculator/>}/>
            <Route path="/edit/:id" element={<EditDeck />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
