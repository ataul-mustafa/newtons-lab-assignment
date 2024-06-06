import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data } = await axios.get('http://localhost:5000/api/reviews');
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        const { reviewId, responseText } = req.body;
        const { data } = await axios.post('http://localhost:5000/api/reviews/response', { reviewId, responseText });
        res.status(200).json(data);
    }
}
