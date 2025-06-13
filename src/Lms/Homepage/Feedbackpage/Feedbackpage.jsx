import React, { useState } from 'react';
import './Feedbackpage.css';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function Feedbackpage() {
    const nav = useNavigate();
    const { id } = useParams()
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(null); 
    const [feedback, setFeedback] = useState(''); 
    const [feedbacknew, setFeedbacknew] = useState(''); 
    const [feedbacksupport, setFeedbacksupport] = useState(''); 
    const [showModal, setShowModal] = useState(false); 
    
    

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log({
            rating: rating,
            feedback: feedback,
            feedbacknew: feedbacknew,
            feedbacksupport: feedbacksupport,           
        });
        setShowModal(true); 
    };
    const handleCloseModal = () => {
        setShowModal(false);
        nav(`/user/${id}`); 
    };

    return (
        <div className="container feedbackpage">
            <h2 className="text-center my-3">Feedback Page</h2>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className="card p-4 feedbox mx-0 mx-lg-5 my-3">
                    <form onSubmit={handleSubmit}>
                        {/* Star Rating */}
                        <div className="my-3 text-center">
                            <h4 className="pb-3">Rate Your Experience with Our Website</h4>
                            <div>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                style={{ display: 'none' }}
                                                onClick={() => setRating(ratingValue)}
                                            />
                                            <FaStar
                                                size={40}
                                                color={ratingValue <= (hover || rating) ? '#ffc107' : '#fff'}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                                className="star"
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        {rating > 0 && rating <= 3 && (
                            <>
                                <label className="py-2">What difficulties did you face</label>
                                <br />
                                <textarea
                                    className="responsive-textarea fc1 p-4 w-100"
                                    placeholder="Give your Feedback here"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)} // Update the feedback state
                                    required ></textarea>
                            </>
                        )}
           {rating >3  && rating <= 5 && (
                            <>
                                <label className="py-2">Kindly share any suggestions for improving the website to help us enhance it in the future.</label>
                                <br />
                                <textarea
                                    className="responsive-textarea fc1 p-4 w-100"
                                    placeholder="Give your Feedback here"
                                    value={feedbacknew}
                                    onChange={(e) => setFeedbacknew(e.target.value)} // Update the feedback state
                                    required
                                ></textarea>
                            </>
                        )}

                        <div className="d-flex justify-content-center my-3">
                            <input type="submit" className="updatebtn" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Modal */}
            {showModal && (
                <div className="modal-container">
                    <div className="modal-content bg-light rounded-3">
                        <h4>Thank you for your valuable feedback!</h4>
                        <p>Your response helps us improve and provide a better experience for our users.</p>
                        <button className="close-btn updatebtn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Feedbackpage;
