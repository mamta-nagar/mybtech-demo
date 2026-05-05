import { useEffect, useState } from 'react';
import api from '../api/client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [attempts, setAttempts] = useState([]); const [analytics, setAnalytics] = useState(null);
  useEffect(() => { (async () => {
    const a = await api.get('/tests/me/attempts'); setAttempts(a.data);
    const b = await api.get('/tests/me/analytics'); setAnalytics(b.data);
  })(); }, []);
  return <div className='grid'>
    <div className='card'><h3>Performance Summary</h3>
      <p>Total Attempts: {attempts.length}</p>
      <p>Average Accuracy: {analytics?.averageAccuracy?.toFixed(2) || 0}%</p>
      <ul>{Object.entries(analytics?.topic || {}).map(([k,v]) => <li key={k}>{k}: {v.attempted} attempts | {v.spent}s spent</li>)}</ul>
    </div>
    <div className='card'><h3>Progress Over Time</h3><div style={{height:250}}><ResponsiveContainer><LineChart data={analytics?.progress || []}><XAxis dataKey='date' hide /><YAxis /><Tooltip /><Line dataKey='accuracy' stroke='#4f46e5' /></LineChart></ResponsiveContainer></div></div>
  </div>;
}
