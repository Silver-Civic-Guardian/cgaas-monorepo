import { useState, useEffect } from 'react';

export const useThreats = () => {
  const [selectedWard, setSelectedWard] = useState('taipei-daan');
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchThreats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/threats/ward/${selectedWard}`);
      if (!response.ok) {
        throw new Error('Failed to fetch threats');
      }
      const data = await response.json();
      setThreats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, [selectedWard]);

  return {
    selectedWard,
    setSelectedWard,
    threats,
    loading,
    error,
    fetchThreats
  };
};
