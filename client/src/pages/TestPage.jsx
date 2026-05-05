import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';

export default function TestPage() {
  const [tests, setTests] = useState([]); const [test, setTest] = useState(null);
  const [idx, setIdx] = useState(0); const [left, setLeft] = useState(0); const [answers, setAnswers] = useState({}); const [result, setResult] = useState(null);
  useEffect(() => { api.get('/tests').then(r => setTests(r.data)); }, []);
  useEffect(() => { if (!left) return; const t = setInterval(() => setLeft(v => v - 1), 1000); return () => clearInterval(t); }, [left]);
  useEffect(() => { if (left === 0 && test) submit(); }, [left]);
  const load = async (id) => { const { data } = await api.get(`/tests/${id}`); setTest(data); setLeft(data.durationMinutes * 60); setIdx(0); setAnswers({}); setResult(null); };
  const q = test?.questions[idx];
  const submit = async () => {
    if (!test) return;
    const payload = test.questions.map(qq => ({ question: qq._id, ...answers[qq._id] }));
    const { data } = await api.post('/tests/submit', { testId: test._id, answers: payload }); setResult(data);
  };
  const minutes = useMemo(() => `${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`, [left]);
  if (!test) return <div className='card'><h3>Select Test</h3>{tests.map(t => <button key={t._id} onClick={() => load(t._id)}>{t.title}</button>)}</div>;
  if (result) return <div className='card'><h3>Result</h3><p>Score: {result.score.toFixed(2)} | Correct {result.correct} | Incorrect {result.incorrect} | Skipped {result.skipped}</p>{result.detailed.map((d,i) => <p key={i}>{i+1}. {d.question.questionText} - {d.status} | Solution: {d.question.solution}</p>)}</div>;
  return <div className='exam'><aside>{test.questions.map((x,i)=><button key={x._id} onClick={()=>setIdx(i)}>{i+1}</button>)}</aside>
    <main><h4>Timer: {minutes}</h4><p>{idx+1}. {q.questionText}</p>{q.options.map((opt,op)=><button key={op} onClick={()=>setAnswers({...answers,[q._id]:{...(answers[q._id]||{}),selectedOptionIndex:op}})}>{opt}</button>)}
    <div><button onClick={()=>setAnswers({...answers,[q._id]:{...(answers[q._id]||{}),markedForReview:true}})}>Mark for Review</button>
    <button onClick={()=>setIdx(Math.min(test.questions.length-1,idx+1))}>Save & Next</button><button onClick={submit}>Submit</button></div></main></div>;
}
