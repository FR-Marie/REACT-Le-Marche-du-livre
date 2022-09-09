import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/slate/bootstrap.css'
import Livres from "./components/Livres/Livres";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
      <div>

        <div className="">
            <Navbar></Navbar>
        </div>

        <div className="container">
          <div className="row text-center mt-5">
            <h1>Le Marché du Livre</h1>
          </div>
          <div>
            <Livres></Livres>
          </div>

          <div className="">
            <Footer></Footer>
          </div>


        </div>


      </div>
  );
}

export default App;
