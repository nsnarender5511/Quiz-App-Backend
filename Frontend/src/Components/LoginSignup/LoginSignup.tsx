import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function LoginSignup() {
    const [action, setAction] = React.useState("user");
    const [userClickCount, setUserClickCount] = React.useState(0);
    const [adminClickCount, setAdminClickCount] = React.useState(0);

    const [formData, setFormData] = useState({
        quizId: "",
        userName: "",
        adminPassword: ""
      });
      

    const handleUserClick = () => {
        console.log("User button clicked!");
        setAction("user");
        setUserClickCount(userClickCount + 1);
        if (userClickCount === 2) {
            setUserClickCount(0);   
            // Perform the additional action here
            console.log("User button clicked twice!");
            // Reset the counter if you only want to detect the second click once
            // setUserClickCount(0);
        }
    };

    const handleAdminClick = () => {
        setAction("admin");
        setAdminClickCount(adminClickCount + 1);
        if(adminClickCount === 2){
            setAdminClickCount(0);
            console.log("Admin button clicked twice!");
        }   
    };

    return (
        <div className='container'>
            <div className='header'>
                
                <div className='inputs'>
                    {action == "user" ? <div className='inputForuser'>
                        <div className='input'>
                            <label>Plese Enter Quiz Id to join</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className='input'>
                            <label>Enter your Name</label>
                            <input type="text" className="form-control" />
                        </div>    
                    </div> : <div></div>}
                    
                    {action == "admin" ? <div className='inputForAdmin'>
                        <div className='input'>
                            <label>Enter Admin Password</label>
                            <input type="password" className="form-control" />
                        </div>
                    </div> : <div></div>}
                    
                </div>

                <div className='submitContainer'>
                    <button className={action == "user" ? "btn btn-primary" : "btn btn-secondary"} style={{ marginRight: '10px' }} onClick={handleUserClick}>Join Quiz</button>
                    <button className={action == "user" ? "btn btn-secondary" : "btn btn-primary"} onClick={handleUserClick}>Login as Admin</button>
                </div>
            </div>
        </div>
                        );
}


export default LoginSignup;