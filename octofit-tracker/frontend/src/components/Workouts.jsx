import React, { useEffect, useState } from 'react';

export default function Workouts({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = apiBase
    ? `${apiBase}workouts/`
    : `http://${window.location.hostname}:8000/api/workouts/`;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching Workouts from', endpoint);
        const res = await fetch(endpoint);
        const json = await res.json();
        console.log('Workouts raw response:', json);
        const data = Array.isArray(json) ? json : json.results ?? json;
        console.log('Workouts data used for UI:', data);
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching Workouts:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading workouts...</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {items.length === 0 && <p>No workouts found.</p>}
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.title ?? it.name ?? JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
