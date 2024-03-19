import React, { useEffect } from "react";
import SocketSigleTon from "./SocketSingleTon";
import CreateQuizPage from "./CreateQuizPage";
import ActiveQuizs from "./ActiveQuizs";

interface AdminPageProps {
  handleAdminLogin: () => void;
}

const createQuiz = (roomId: string) => {
  SocketSigleTon().emit("createQuiz", roomId);
  console.log("Create Quiz - ", roomId);
};

const AdminPage: React.FC<AdminPageProps> = ({ handleAdminLogin }) => {
  const [roomId, setRoomId] = React.useState("");
  const [quizes, setQuizes] = React.useState<any[]>([]);
  const socket = SocketSigleTon();

  console.log("Quizes after setting - ", quizes);

  useEffect(() => {
    socket.on("admin_Init", (data) => {
      console.log("Allquizes  ", data.quizes);

      //console.log("Admin Init - ", data);
      handleAdminLogin();
      setRoomId(data.roomId);
      setQuizes(data.quizes);
      

    });


  }, []);


useEffect(() => {
  SocketSigleTon().on("Last_Problem_Created", (data) => {
    console.log("Allquizes  ", data.quizes);
    setRoomId(data.roomId);
    setQuizes(data.quizes);

  });
}, []);

  const createQuiz = (roomId: string) => {
    SocketSigleTon().emit("create_Quiz", { roomId: roomId });
    console.log("Create Quiz - ", roomId);
    setRoomId("");
  };

  return (
    <div>
      {roomId != "" && (
        <>
          <h1>Welcome Admin</h1>
          <button
            className="btn btn-primary"
            onClick={() => createQuiz(roomId)}
          >
            Create Quiz
          </button>
          {quizes.length > 0 && <ActiveQuizs quizes={quizes} />}
        </>
      )}

      <CreateQuizPage />
    </div>
  );
};

export default AdminPage;
