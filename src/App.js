import './App.css';
import LogIn from './components/auth/LogIn';
import Navbar from './components/user/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LogIn />
    </div>
  );
}

export default App;
