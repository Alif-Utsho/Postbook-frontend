import Navbar from '../src/Components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='mt-5 pt-5 d-flex justify-content-center' >
        <i className="fas display-1 fa-link text-center"></i> 
        <div>
          <h1 className='text-black' style={{ fontFamily: "Yeseva One" }}> &nbsp;P o s t b o o k ! !</h1>
          <p>Where you can share your thoughts with friends</p>
        </div>
      </div>
    </div>
  );
}

export default App;
