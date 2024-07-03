import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed
import baseUrl from './baseUrl';
import useLoginUser from './useLoginUser';

export default function useGetHeaderData() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { loginUser } = useLoginUser(); // Import and destructure from useLoginUser

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Clear any previous errors

            try {
                const response = await axios.get(`${baseUrl}/user/get-header-data`, {
                    headers: {
                        Authorization: `Bearer ${loginUser.token}`, // Use token from useLoginUser
                    },
                });
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (loginUser.token) { // Fetch data only if token is available
            fetchData();
        }
    }, [loginUser.token]); // Re-fetch on token change

    return { data, isLoading, error };
}
