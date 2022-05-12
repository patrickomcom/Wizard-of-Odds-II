import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayAll from "./components/DisplayAll";
import DeckForm from "./components/DeckForm";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<DisplayAll />}/>
            <Route path="/new" element={<DeckForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
