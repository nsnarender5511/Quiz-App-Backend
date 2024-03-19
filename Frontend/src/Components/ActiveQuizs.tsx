import React from 'react';
import SocketSigleTon from './SocketSingleTon';

interface ActiveQuizsProps {
    quizes: any[];  
}

const ActiveQuizs: React.FC<ActiveQuizsProps> = ({ quizes }) => {
    // Implement your component logic here

    console.log("Quizes in Active Component ", quizes);
  
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Active Quizzes</h1>
            <div className="row">
                {quizes.map((quiz, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Quiz ID: {quiz.roomId}</h5>
                                {/* You can add more details here */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveQuizs;
