import { useEffect, useState } from 'react'

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

export default function TimetablePage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ day: 'Monday', subject: '', start_time: '', end_time: '', location: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const fetchItems = async () => {
    const res = await fetch(`${baseUrl}/api/timetable`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { fetchItems() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fetch(`${baseUrl}/api/timetable`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ day: 'Monday', subject: '', start_time: '', end_time: '', location: '', notes: '' })
    await fetchItems()
    setLoading(false)
  }

  const onDelete = async (id) => {
    await fetch(`${baseUrl}/api/timetable/${id}`, { method: 'DELETE' })
    await fetchItems()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-6">Weekly Timetable</h2>

      <form onSubmit={onSubmit} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 grid md:grid-cols-6 gap-3 mb-6">
        <select className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" value={form.day} onChange={e=>setForm({...form, day:e.target.value})}>
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} />
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Start HH:MM" value={form.start_time} onChange={e=>setForm({...form, start_time:e.target.value})} />
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="End HH:MM" value={form.end_time} onChange={e=>setForm({...form, end_time:e.target.value})} />
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4">{loading? 'Adding...' : 'Add'}</button>
        <textarea className="md:col-span-6 bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
      </form>

      <div className="grid gap-4">
        {days.map(day => (
          <div key={day} className="bg-slate-800/60 border border-blue-500/20 rounded-xl">
            <div className="px-4 py-2 border-b border-blue-500/10 text-blue-200 font-semibold">{day}</div>
            <div className="p-4 space-y-2">
              {items.filter(i=>i.day===day).map(item => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 rounded p-3 border border-blue-500/10">
                  <div className="text-blue-100">
                    <div className="font-semibold">{item.subject} <span className="text-sm text-blue-300/80">({item.start_time} - {item.end_time})</span></div>
                    <div className="text-sm text-blue-300/80">{item.location || '—'} {item.notes && <span className="ml-2">• {item.notes}</span>}</div>
                  </div>
                  <button onClick={() => onDelete(item.id)} className="text-red-300 hover:text-red-200 text-sm">Delete</button>
                </div>
              ))}
              {items.filter(i=>i.day===day).length===0 && (
                <div className="text-blue-300/70 text-sm">No entries for this day yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
