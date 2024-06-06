"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [response, setResponse] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const { data } = await axios.get('http://localhost:3000/api/reviews');
        setReviews(data.reviews);
    };

    const handleResponse = async (reviewId) => {
        await axios.post('http://localhost:3000/api/reviews/response', { reviewId, responseText: response });
        fetchReviews(); // Refresh reviews
    };

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.map((review) => (
                <div key={review.name}>
                    <h2>{review.reviewer.displayName}</h2>
                    <p>{review.comment}</p>
                    <input
                        type="text"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    />
                    <button onClick={() => handleResponse(review.name)}>Publish</button>
                </div>
            ))}
        </div>
    );
};

export default Review;
