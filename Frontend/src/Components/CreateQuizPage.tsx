import React, { useEffect, useState } from 'react';
import SocketSigleTon from './SocketSingleTon';

interface CreateQuizPageProps {}

interface Problem {
    id: string;
    title: string;
    desc: string;
    options: { id: number; title: string }[];
    answer: number;
    islastPrblem: boolean;
}

const CreateQuizPage: React.FC<CreateQuizPageProps> = () => {
    const [roomId, setRoomId] = useState<string>("");
    const [problem, setProblem] = useState<Problem | null>(null);
    const [question, setQuestion] = useState<string>("");
    const [option1, setOption1] = useState<string>("");
    const [option2, setOption2] = useState<string>("");
    const [option3, setOption3] = useState<string>("");
    const [option4, setOption4] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [quetionNo, setQuestionNo] = useState(0);

    useEffect(() => {
        SocketSigleTon().on("quiz_created", (data: { roomId: string }) => {
            console.log("Quiz Created - ", data);
            setRoomId(data.roomId);
            let newQuestionNo = quetionNo+1;
            setQuestionNo(newQuestionNo);
        });

        
    }, []);

    useEffect(() => {
        SocketSigleTon().on("Problem_Created", (data) => {
            console.log("Problem Created - ", data);
            setRoomId(data.roomId);
            
            let newQuestionNo = quetionNo+1;
            setQuestionNo(newQuestionNo);
            
            setProblem(null);
            setQuestion("");
            setOption1("");
            setOption2("");
            setOption3("");
            setOption4("");
            setCorrectAnswer(null);
        
        });
    },[]);

    useEffect(() => {
        SocketSigleTon().on("Last_Problem_Created", (data) => {
            setRoomId("");
        });
    }, []);



    const handleNextButtonClick = () => {
        // Construct the problem object
        const newProblem: Problem = {
            id: "Q"+quetionNo, // You can generate an id here or leave it empty
            title: "Q"+quetionNo,
            desc: question,
            options: [
                { id: 1, title: option1 },
                { id: 2, title: option2 },
                { id: 3, title: option3 },
                { id: 4, title: option4 }
            ],
            answer: correctAnswer || 1, // Defaulting to 1 if no correct answer is selected
            islastPrblem: false
        };

        // Set the problem state
        setProblem(newProblem);

        // Send the problem to the server
        SocketSigleTon().emit("create_Problem", {
            roomId: roomId,
            problem: newProblem
        });
    };

    const handleSubmitButtonClick = () => {
        // Construct the problem object
        const newProblem: Problem = {
            id: "Q"+quetionNo, // You can generate an id here or leave it empty
            title: "Q"+quetionNo,
            desc: question,
            options: [
                { id: 1, title: option1 },
                { id: 2, title: option2 },
                { id: 3, title: option3 },
                { id: 4, title: option4 }
            ],
            answer: correctAnswer || 1, // Defaulting to 1 if no correct answer is selected
            islastPrblem: true
        };

        // Set the problem state
        setProblem(newProblem);

        // Send the problem to the server
        SocketSigleTon().emit("create_Problem", {
            roomId: roomId,
            problem: newProblem
        });
    };

    return (
        <div className="container mt-5">
            {roomId && (
                <div className="card p-4 bg-white rounded shadow">
                    <h1 className="mb-4 text-center">Creating Quiz for QuizID: {roomId}</h1>
                    <form className="space-y-4">
                        <div className="mb-5 bg-light rounded p-4">
                            <label htmlFor="question" className="form-label">Enter Question - {quetionNo}</label>
                            <textarea
                                id="question"
                                className="form-control"
                                placeholder="Your question here"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                rows={1}
                            />
                            {[1, 2, 3, 4].map(index => (
                                <div key={index} className="row mb-1 p-1">
                                    <div className="col-auto">
                                        <label htmlFor={`option${index}`} className="form-label">Option {index}</label>
                                    </div>
                                    <div className="col">
                                        <textarea
                                            id={`option${index}`}
                                            className="form-control"
                                            placeholder={`Option ${index}`}
                                            value={index === 1 ? option1 : index === 2 ? option2 : index === 3 ? option3 : option4}
                                            onChange={(e) => {
                                                if (index === 1) setOption1(e.target.value);
                                                else if (index === 2) setOption2(e.target.value);
                                                else if (index === 3) setOption3(e.target.value);
                                                else setOption4(e.target.value);
                                            }}
                                            rows={1}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mb-5 bg-secondary rounded p-4">
                            <label className="form-label">Correct Answer</label>
                            <div className="d-flex justify-content-center align-items-center bg-success rounded p-3">
                                {[1, 2, 3, 4].map(index => (
                                    <div key={index} className="form-check me-4">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="correctAnswer"
                                            id={`option${index}`}
                                            value={index}
                                            checked={correctAnswer === index}
                                            onChange={() => setCorrectAnswer(index)}
                                        />
                                        <label className="form-check-label" htmlFor={`option${index}`}>Option {index}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary me-2" onClick={handleNextButtonClick}>Next</button>
                            <button type="button" className="btn btn-success" onClick={handleSubmitButtonClick}>Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateQuizPage;
