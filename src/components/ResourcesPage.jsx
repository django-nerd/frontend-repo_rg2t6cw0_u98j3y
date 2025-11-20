import { useEffect, useState } from 'react'

export default function ResourcesPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', url: '', topic: '', description: '' })

  const fetchItems = async () => {
    const res = await fetch(`${baseUrl}/api/resources`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { fetchItems() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/api/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ title: '', url: '', topic: '', description: '' })
    await fetchItems()
  }

  const onDelete = async (id) => {
    await fetch(`${baseUrl}/api/resources/${id}`, { method: 'DELETE' })
    await fetchItems()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-4">Resources</h2>
      <p className="text-blue-200/80 mb-6">Drop your helpful links, notes, and materials here. A themed placeholder below will hold spot content while you build your library.</p>

      <form onSubmit={onSubmit} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 grid md:grid-cols-4 gap-3 mb-6">
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="URL" value={form.url} onChange={e=>setForm({...form, url:e.target.value})} />
        <input className="bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Topic (tag)" value={form.topic} onChange={e=>setForm({...form, topic:e.target.value})} />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4">Add</button>
        <textarea className="md:col-span-4 bg-slate-900 text-blue-100 border border-blue-500/30 rounded p-2" placeholder="Description (optional)" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      </form>

      {/* Placeholder panel */}
      <div className="bg-gradient-to-br from-blue-900/60 via-slate-900/60 to-blue-900/60 border border-blue-500/20 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-2">Starter Placeholder</h3>
        <p className="text-blue-200/80 text-sm">This area keeps your page balanced with the same theme while you curate resources. Replace with featured content later.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
            <div className="flex-1">
              <div className="text-white font-semibold">{item.title}</div>
              {item.url && <a className="text-blue-300 underline text-sm" href={item.url} target="_blank" rel="noreferrer">{item.url}</a>}
              {item.topic && <div className="text-xs text-blue-300/80 mt-1">#{item.topic}</div>}
              {item.description && <div className="text-sm text-blue-200/80 mt-1">{item.description}</div>}
            </div>
            <button onClick={()=>onDelete(item.id)} className="text-red-300 hover:text-red-200 text-sm">Delete</button>
          </div>
        ))}
        {items.length===0 && (
          <div className="text-blue-300/70 text-sm">No resources yet. Add your first above.</div>
        )}
      </div>
    </section>
  )
}
