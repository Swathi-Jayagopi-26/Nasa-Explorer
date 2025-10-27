import React, {useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function NeoChart(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    async function load(){
      setLoading(true);
      const now = new Date();
      const start = new Date(now.getTime() - 6*24*60*60*1000);
      const fmt = d=>d.toISOString().slice(0,10);
      try{
        const res = await fetch(`${BACKEND}/api/neo?start_date=${fmt(start)}&end_date=${fmt(now)}`);
        const json = await res.json();
        const arr = Object.entries(json.near_earth_objects || {}).map(([date, items])=>({ date, count: items.length }));
        arr.sort((a,b)=>a.date.localeCompare(b.date));
        setData(arr);
      }catch(e){ console.error(e); }
      setLoading(false);
    }
    load();
  },[]);

  return (
    <div className="card" style={{marginTop:18}}>
      <h2>Near-Earth Objects (last 7 days)</h2>
      {loading && <p>Loading...</p>}
      {data && (
        <div style={{width:'100%', height:320}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {!data && !loading && <p style={{color:'var(--muted)'}}>No data available.</p>}
    </div>
  );
}
