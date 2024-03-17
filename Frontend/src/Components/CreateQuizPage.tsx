import React, { useEffect, useState } from 'react';
import SocketSigleTon from './SocketSingleTon';

interface CreateQuizPageProps {}

const CreateQuizPage: React.FC<CreateQuizPageProps> = () => {
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        SocketSigleTon().on("quiz_created", (data: { roomId: string }) => {
            console.log("Quiz Created - ", data);
            setRoomId(data.roomId);
        });
    }, []);

    return (
        <div className="items-center h-screen">
            {roomId && (
                <div className="w-full max-w-s p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="">Creating Quiz for QuizID: {roomId}</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="question" className="">Enter Question</label>
                            <input type="text" id="question" className="input-field" placeholder="Your question here" />
                        </div>
                        <div className="">
                            {[1, 2, 3, 4].map(index => (
                                <div key={index}>
                                    <label htmlFor={`option${index}`} className="">Option {index}</label>
                                    <input type="text" id={`option${index}`} className="input-field" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="correctAnswer" className="">Correct Answer</label>
                            <input type="text" id="correctAnswer" className="input-field" />
                        </div>
                        <div className="flex justify-center">
                            <button type="button" className="button button-indigo mr-2">Next</button>
                            <button type="submit" className="button button-green">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateQuizPage;
