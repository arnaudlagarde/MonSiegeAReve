import React, { useState, useEffect } from 'react';
import { fetchPurchaseHistory, fetchMovies } from '../api';

const PurchaseHistory = () => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPurchaseHistory = async () => {
            try {
                // Call the API to retrieve the purchase history
                const response = await fetchPurchaseHistory();
                setPurchaseHistory(response);
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            } finally {
                setLoading(false);
            }
        };

        getPurchaseHistory();
    }, []);

    useEffect(() => {
        const fetchMovieData = async () => {
            // Fetch movie data for each purchase history item
            const fetchMovieInfo = async (movieId) => {
                try {
                    const movie = await fetchMovies(); // Fetch all movies
                    const selectedMovie = movie.find((item) => item.id === movieId);
                    return selectedMovie || null;
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                    return null;
                }
            };

            const updatedPurchaseHistory = await Promise.all(
                purchaseHistory.map(async (purchase) => {
                    const movie = await fetchMovieInfo(purchase.session);
                    return { ...purchase, movie };
                })
            );

            setPurchaseHistory(updatedPurchaseHistory);
        };

        if (purchaseHistory.length > 0 && loading === false) {
            fetchMovieData();
        }
    }, [purchaseHistory, loading]);

    return (
        <div>
            <h2>Historique d'achats</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                purchaseHistory.map((purchase) => (
                    <div key={purchase.id}>
                        <p>Date de la session: {purchase.date}</p>
                        <p>Titre du film: {purchase.movie?.title}</p>
                        <p>Prix payé: {purchase.movie?.price}</p>
                        <p>Nombre de places: {purchase.seats}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default PurchaseHistory;
