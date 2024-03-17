import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputBox from "./Fragments/InputBox";
import SocketSigleTon from "../SocketSingleTon";
import {useNavigate} from 'react-router-dom';
import AdminPage from "../AdminPage";

interface LoginSignupProps {
  roomId: string;
}



function LoginSignup (data: LoginSignupProps) {
  const [userType, setuserType] = React.useState("user");
  const [userClickCount, setUserClickCount] = React.useState(1);
  const [adminClickCount, setAdminClickCount] = React.useState(1);

  const socket = SocketSigleTon();


  // useEffect(() => {
  //   socket.on("admin_Init", (data) => {
  //     console.log("Admin Init - ", data);
  //     setuserType("AdminLoggedIn");
  //   })

  //   socket.off("admin_Init");
  // },[] );

  const [formData, setFormData] = useState({
    quizId: "",
    userName: "",
    adminPassword: "",
  });

  const handleUserClick = () => {
    console.log("User button clicked -- ", userClickCount);
    setuserType("user");
    setUserClickCount(userClickCount + 1);
    if (userClickCount === 2) {
      setUserClickCount(1);

      console.log("User button clicked twice!");
      // Perform the additional action here
      console.log("quizId - ", formData.quizId);
      console.log("userName - ", formData.userName);

      setUserClickCount(1);

      // Reset the counter if you only want to detect the second click once
      // setUserClickCount(0);
    }
  };

  const handleAdminLogin = () => { 
    setuserType("AdminLoggedIn");
  };

  const handleAdminClick = () => {
    console.log("User button clicked -- ", userClickCount);
    setuserType("admin");
    setAdminClickCount(adminClickCount + 1);
    if (adminClickCount === 2) {
      setAdminClickCount(1);

      console.log("Admin button clicked twice!");
      console.log("Password - ", formData.adminPassword);
      
      // Perform the additional action here
      socket.emit("join_admin", formData.adminPassword);
  }};
  

  // const handleInputChange = (e:any) => {
  //     console.log("handleInputChange");
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //     });
  // }

  // const handleInputChange = (e:any) => {
  //     console.log('Input changed:', e.target.value);
  //     console.log("handleInputChange");
  //     const { name, value } = e.target;

  //     setFormData(prevState => ({
  //         ...prevState,
  //         [name]: value
  //     }));
  // };

  const update = (prevState: any, e: any) => {
    if (e.target.name === "quizIdInput") {
      prevState.quizId = e.target.value;
    } else if (e.target.name === "userNameInput") {
      prevState.userName = e.target.value;
    } else if (e.target.name === "adminPassword") {
      prevState.adminPassword = e.target.value;
    }

    return prevState;
  };

  const handleInputChange = (e: any) => {
    console.log("Input changed:");
    //setFormData({userName: e.target.value, quizId: e.target.value, adminPassword: e.target.value});

    // setFormData(prevState => ({
    //     ...prevState,
    //     [prevState.quizId]: e.target.value
    // }));

    setFormData(update(formData, e));
  };

  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData(prevState => ({
  //         ...prevState,
  //         [name]: value
  //     }));
  // };

  return (
    <div className="container">
      <div className="header">
        <div className="inputs">
          
          
          {userType == "user" && (
            <div className="inputForuser">
              {/* <div className='input'>
                                    <label>text</label>
                                    <input type="text"   className="form-control" />
                                </div> */}

              <InputBox
                label="Plese Enter Quiz Id to join"
                name="quizIdInput"
                type="text"
                data={formData}
                onTypeHandle={handleInputChange}
              />
              <InputBox
                label="Enter your Name"
                type="text"
                name="userNameInput"
                onTypeHandle={handleInputChange}
                data={formData}
              />
            </div>
          )}

          {userType == "admin" && (
            <div className="inputForAdmin">
              <InputBox
                label="Enter Admin Password"
                name="adminPassword"
                type="password"
                onTypeHandle={handleInputChange}
                data={formData}
              />
            </div>
          )}
        </div>

        {(userType == 'user' || userType == 'admin') && <div className="submitContainer">
          <button
            className={
              userType == "user" ? "btn btn-primary" : "btn btn-secondary"
            }
            style={{ marginRight: "10px" }}
            onClick={handleUserClick}
          >
            Join Quiz
          </button>
          <button
            className={
              userType == "user" ? "btn btn-secondary" : "btn btn-primary"
            }
            onClick={handleAdminClick}
          >
            Login as Admin
          </button>
          </div>}
          <AdminPage handleAdminLogin={handleAdminLogin}/>

        </div>
      </div>);

      

}

export default LoginSignup;
