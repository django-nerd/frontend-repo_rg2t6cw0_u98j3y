export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Plan your study week and share resources</h1>
        <p className="text-blue-200/90">Create a weekly schedule, collect helpful links, and get your questions answered.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-2">Organize your timetable</h3>
          <p className="text-blue-200/80 text-sm">Add subjects with time slots for each day of the week.</p>
        </div>
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-2">Collect resources</h3>
          <p className="text-blue-200/80 text-sm">Save links, notes, and materials by topic.</p>
        </div>
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-2">Ask & answer doubts</h3>
          <p className="text-blue-200/80 text-sm">Students can post questions and get answers.</p>
        </div>
      </div>
    </section>
  )
}
