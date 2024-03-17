import React, { useEffect } from "react";
import SocketSigleTon from "./SocketSingleTon";
import CreateQuizPage from "./CreateQuizPage";

interface AdminPageProps {
  handleAdminLogin: () => void;
}


const createQuiz = ( (roomId:string) => {
    SocketSigleTon().emit("createQuiz", roomId);
    console.log("Create Quiz - ", roomId);
});

const AdminPage: React.FC<AdminPageProps> = ({ handleAdminLogin}) => {
  const [roomId, setRoomId] = React.useState("");
  const socket = SocketSigleTon();

  useEffect(() => {
    socket.on("admin_Init", (data) => {
      console.log("Admin Init - ", data);
      handleAdminLogin();
      setRoomId(data.roomId);
    });

    return () => {
      socket.off("admin_Init");
    };
  }, []);

  const createQuiz = ( (roomId:string) => {
    SocketSigleTon().emit("create_Quiz", {roomId: roomId});
    console.log("Create Quiz - ", roomId);
    setRoomId("");
});

  return (
    <div>
      {roomId!="" && (
        <>
          <h1>Welcome Admin</h1>
          <button className="btn btn-primary" onClick={() => createQuiz(roomId)}>
            Create Quiz
          </button>

          
        </>
      )}

    <CreateQuizPage/>
    </div>
  );
};

export default AdminPage;
