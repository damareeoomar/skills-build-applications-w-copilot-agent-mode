import React, { useEffect, useState } from 'react';

export default function Activities({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = apiBase
    ? `${apiBase}activities/`
    : `http://${window.location.hostname}:8000/api/activities/`;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching Activities from', endpoint);
        const res = await fetch(endpoint);
        const json = await res.json();
        console.log('Activities raw response:', json);
        const data = Array.isArray(json) ? json : json.results ?? json;
        console.log('Activities data used for UI:', data);
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching Activities:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading activities...</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {items.length === 0 && <p>No activities found.</p>}
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
