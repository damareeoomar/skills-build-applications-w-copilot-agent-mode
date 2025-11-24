import React, { useEffect, useState } from 'react';

export default function Teams({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = apiBase
    ? `${apiBase}teams/`
    : `http://${window.location.hostname}:8000/api/teams/`;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching Teams from', endpoint);
        const res = await fetch(endpoint);
        const json = await res.json();
        console.log('Teams raw response:', json);
        const data = Array.isArray(json) ? json : json.results ?? json;
        console.log('Teams data used for UI:', data);
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching Teams:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading teams...</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {items.length === 0 && <p>No teams found.</p>}
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.name ?? JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
