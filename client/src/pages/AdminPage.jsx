import { useState } from 'react';
import api from '../api/client';

export default function AdminPage(){
  const [count, setCount] = useState(10);
  const generate = async () => { await api.post('/questions/ai-generate', { count }); alert('Generated'); };
  const exportQuestions = async () => { const { data } = await api.get('/questions/export'); const blob = new Blob([JSON.stringify({ questions: data }, null, 2)]); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'questions.json'; a.click(); };
  return <div className='card'><h3>Admin</h3><input type='number' value={count} onChange={e=>setCount(Number(e.target.value))}/><button onClick={generate}>AI Generate Questions</button><button onClick={exportQuestions}>Export JSON</button></div>
}
