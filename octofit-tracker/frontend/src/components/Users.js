import React, { useEffect, useState } from 'react';

export default function Users({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = apiBase
    ? `${apiBase}users/`
    : `http://${window.location.hostname}:8000/api/users/`;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching Users from', endpoint);
        const res = await fetch(endpoint);
        const json = await res.json();
        console.log('Users raw response:', json);
        const data = Array.isArray(json) ? json : json.results ?? json;
        console.log('Users data used for UI:', data);
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching Users:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading users...</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {items.length === 0 && <p>No users found.</p>}
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.username ?? it.email ?? JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
