import React, {useEffect, useState} from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function APODViewer(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  async function fetchApod(d){
    setLoading(true); setError(null);
    try{
      const q = d ? `?date=${d}` : '';
      const res = await fetch(`${BACKEND}/api/apod${q}`);
      if (!res.ok) throw new Error('Server error');
      const json = await res.json();
      setData(json);
    }catch(e){
      setError(e.message || 'Failed');
    }finally{setLoading(false);}    
  }

  useEffect(()=>{ fetchApod(); }, []);

  return (
    <div className="card" style={{minWidth:360}}>
      <h2>Astronomy Picture of the Day</h2>
      <div className="controls">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <button onClick={()=>fetchApod(date)}>Load</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <article>
          <h3>{data.title}</h3>
          <p style={{color:'var(--muted)'}}>{data.date}</p>
          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} style={{maxWidth:'100%',borderRadius:8,marginTop:8}} />
          ) : (
            <iframe title="apod-video" src={data.url} width="100%" height="340" style={{borderRadius:8}} />
          )}
          <p style={{color:'var(--muted)',marginTop:8}}>{data.explanation}</p>
        </article>
      )}
    </div>
  );
}
