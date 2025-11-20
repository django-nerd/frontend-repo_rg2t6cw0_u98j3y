import { useEffect, useState } from 'react'

export default function DoubtsPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [questions, setQuestions] = useState([])
  const [form, setForm] = useState({ question: '', student_name: '' })
  const [answerForm, setAnswerForm] = useState({})

  const fetchQuestions = async () => {
    const res = await fetch(`${baseUrl}/api/doubts`)
    const data = await res.json()
    setQuestions(data)
  }

  useEffect(() => { fetchQuestions() }, [])

  const onAsk = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/api/doubts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ question: '', student_name: '' })
    await fetchQuestions()
  }

  const onAnswer = async (id) => {
    const payload = { answer: answerForm[id]?.answer || '', answered_by: answerForm[id]?.answered_by || '' }
    if (!payload.answer) return
    await fetch(`${baseUrl}/api/doubts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setAnswerForm({ ...answerForm, [id]: { answer: '', answered_by: '' } })
    await fetchQuestions()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-4">Doubts</h2>
      <p className="text-blue-200/80 mb-6">Students can ask questions here and see responses when they are answered.</p>

      <form onSubmit={onAsk} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 grid md:grid-cols-3 gap-3 mb-6">
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Your name (optional)" value={form.student_name} onChange={e=>setForm({...form, student_name:e.target.value})} />
        <input className="md:col-span-2 bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Type your question" value={form.question} onChange={e=>setForm({...form, question:e.target.value})} />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4">Ask</button>
      </form>

      <div className="space-y-3">
        {questions.map(q => (
          <div key={q.id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-white font-semibold">{q.student_name || 'Student'}</div>
                <div className="text-blue-200/90">{q.question}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${q.status==='answered' ? 'bg-green-600/30 text-green-200' : 'bg-yellow-600/30 text-yellow-200'}`}>{q.status}</span>
            </div>

            {q.answer ? (
              <div className="mt-3 text-sm text-blue-200/80">
                <div className="font-semibold text-white">Answer{q.answered_by ? ` by ${q.answered_by}` : ''}:</div>
                <div>{q.answer}</div>
              </div>
            ) : (
              <div className="mt-3 grid md:grid-cols-3 gap-2">
                <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Your name" value={answerForm[q.id]?.answered_by || ''} onChange={e=>setAnswerForm({...answerForm, [q.id]: { ...(answerForm[q.id]||{}), answered_by: e.target.value }})} />
                <input className="md:col-span-2 bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Type your answer" value={answerForm[q.id]?.answer || ''} onChange={e=>setAnswerForm({...answerForm, [q.id]: { ...(answerForm[q.id]||{}), answer: e.target.value }})} />
                <button onClick={()=>onAnswer(q.id)} className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4">Submit Answer</button>
              </div>
            )}
          </div>
        ))}
        {questions.length===0 && <div className="text-blue-300/70 text-sm">No questions yet. Ask the first one above.</div>}
      </div>
    </section>
  )
}
