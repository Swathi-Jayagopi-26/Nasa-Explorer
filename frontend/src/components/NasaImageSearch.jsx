import React, { useEffect, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function NasaImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const topics = [
    'galaxy', 'nebula', 'mars', 'apollo', 'hubble',
    'moon', 'earth', 'satellite', 'supernova', 'asteroid'
  ];

  // Pick random topic
  function getRandomTopic() {
    return topics[Math.floor(Math.random() * topics.length)];
  }

  // Fetch NASA images
  async function fetchImages(search = '', pageNum = 1) {
    setLoading(true);
    setError(null);
    try {
      const term = search || getRandomTopic();
      const res = await fetch(
        `${BACKEND}/api/image?term=${encodeURIComponent(term)}&page=${pageNum}`
      );
      if (!res.ok) throw new Error('Failed to fetch NASA images');
      const json = await res.json();

      const items = (json.collection?.items || [])
        .filter((item) => item.links && item.links[0]?.href)
        .map((item) => ({
          title: item.data[0]?.title || 'Untitled',
          img: item.links[0]?.href,
        }));

      setImages(items);
      setPage(pageNum);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages(query, 1);
  };

  const handleRandom = () => {
    setQuery('');
    fetchImages('', 1);
  };

  const handleNext = () => fetchImages(query, page + 1);
  const handlePrev = () => fetchImages(query, Math.max(page - 1, 1));

  return (
    <div className="card" style={{ minWidth: 400 }}>
      <h2>NASA Image Library — Explore Space!</h2>
      <p style={{ color: 'var(--muted)' }}>
        Search NASA’s public image library or load random cosmic topics.
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="controls" style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Search (e.g. Mars, Moon, Nebula)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleRandom}>🔄 Random</button>
      </form>

      {/* ✅ Pagination moved just below search */}
      <div className="controls" style={{ justifyContent: 'center', marginBottom: 10 }}>
        <button disabled={page <= 1} onClick={handlePrev}>⬅ Prev</button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button onClick={handleNext}>Next ➡</button>
      </div>

      {loading && <p>Loading images...</p>}
      {error && <p className="error">{error}</p>}

      {/* Image Grid */}
      <div className="grid" style={{ maxHeight:730, overflow:'auto' }}>
        {images.length > 0 ? (
          images.map((img, i) => (
            <figure key={i}>
              <img src={img.img} alt={img.title} />
              <figcaption>{img.title}</figcaption>
            </figure>
          ))
        ) : (
          !loading && <p>No images found. Try another search.</p>
        )}
      </div>
    </div>
  );
}
