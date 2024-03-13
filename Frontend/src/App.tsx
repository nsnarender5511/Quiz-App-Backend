import LoginSignup from  './Components/LoginSignup/LoginSignup';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Welcome to Quizzzz!!!</h1>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <LoginSignup/>
      </div>
    </div>
  );
}



export default App;
