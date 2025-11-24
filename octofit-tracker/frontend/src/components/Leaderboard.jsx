import React, { useEffect, useState } from 'react';

export default function Leaderboard({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = apiBase
    ? `${apiBase}leaderboard/`
    : `http://${window.location.hostname}:8000/api/leaderboard/`;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching Leaderboard from', endpoint);
        const res = await fetch(endpoint);
        const json = await res.json();
        console.log('Leaderboard raw response:', json);
        const data = Array.isArray(json) ? json : json.results ?? json;
        console.log('Leaderboard data used for UI:', data);
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching Leaderboard:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading leaderboard...</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {items.length === 0 && <p>No leaderboard entries found.</p>}
      <ol className="list-group list-group-numbered">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.username ?? it.name ?? JSON.stringify(it)}
          </li>
        ))}
      </ol>
    </div>
  );
}
