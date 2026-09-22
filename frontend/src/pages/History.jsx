import { useEffect, useState } from 'react'
import { fetchHistory } from '../services/api'

const defaultSampleHistory = [
  {
    type: 'Depression Risk Assessment',
    assessment_type: 'depression',
    score: 6.8,
    risk: 'Moderate',
    date: '22/09/2026',
    contributing_factors: [
      { feature: 'Loss of interest & motivation', importance: 0.38 },
      { feature: 'Sleep disruption & low energy', importance: 0.27 },
      { feature: 'Academic concentration difficulty', importance: 0.21 },
    ],
    recommendations: [
      'Maintain regular daily routines and sleep patterns.',
      'Stay connected with people you trust.',
      'Consider speaking with a qualified professional if difficulties persist.',
    ],
  },
  {
    type: 'Anxiety Risk Assessment',
    assessment_type: 'anxiety',
    score: 4.2,
    risk: 'Moderate',
    date: '18/09/2026',
    contributing_factors: [
      { feature: 'Persistent worrying & nervous energy', importance: 0.40 },
      { feature: 'Inability to relax under pressure', importance: 0.26 },
    ],
    recommendations: [
      'Try structured breathing or relaxation exercises.',
      'Break stressful tasks into smaller steps.',
    ],
  },
  {
    type: 'Stress Assessment',
    assessment_type: 'stress',
    score: 7.1,
    risk: 'High',
    date: '12/09/2026',
    contributing_factors: [
      { feature: 'Perceived lack of control', importance: 0.36 },
      { feature: 'Overwhelming task accumulation', importance: 0.29 },
    ],
    recommendations: [
      'Prioritize important tasks and avoid unnecessary multitasking.',
      'Schedule regular breaks between study sessions.',
    ],
  },
]

function History() {
  const [historyList, setHistoryList] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)

  useEffect(() => {
    async function loadData() {
      const data = await fetchHistory()
      if (data && data.length > 0) {
        setHistoryList(data)
      } else {
        setHistoryList(defaultSampleHistory)
      }
    }
    loadData()
  }, [])

  const getRiskBadgeStyle = (risk) => {
    if (risk === 'High') return 'bg-red-50 text-red-700 border-red-200'
    if (risk === 'Moderate') return 'bg-amber-50 text-amber-700 border-amber-200'
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your saved local assessment history?')) {
      localStorage.removeItem('assessmentHistory')
      setHistoryList([])
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Assessment History & Progress
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your previous risk predictions, model factors, and score trends over time.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            Clear Local History
          </button>
        )}
      </div>

      {/* Progress Chart / Trend Visualizer */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Risk Score Trend over Time
            </h2>
            <p className="text-xs text-slate-400">
              Visual history of your risk scores (Scale 1 - 10)
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {historyList.length} Assessments Logged
          </span>
        </div>

        {/* Visual Bar chart */}
        <div className="mt-6 h-44 rounded-2xl bg-slate-50 p-6 border border-slate-100 flex items-end gap-3 sm:gap-6 overflow-x-auto">
          {historyList.map((item, idx) => {
            const scoreVal = typeof item.score === 'number' ? item.score : parseFloat(item.score) || 5
            const heightPercent = Math.min(100, Math.max(15, (scoreVal / 10) * 100))
            const risk = item.risk || item.risk_level || 'Moderate'

            let barColor = 'bg-emerald-500'
            if (risk === 'High') barColor = 'bg-red-500'
            else if (risk === 'Moderate') barColor = 'bg-amber-500'

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end min-w-[50px]">
                <span className="text-xs font-bold text-slate-700">{scoreVal}</span>
                <div
                  className={`w-full max-w-[36px] rounded-t-xl transition-all duration-500 ${barColor}`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-medium text-slate-400 truncate max-w-[60px]">
                  {item.date || `Entry ${idx + 1}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
        <div className="border-b border-slate-100 p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Saved Assessment Records</h2>
          <span className="text-xs text-slate-400">Privacy: Stored locally</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Assessment System</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Risk Indicator</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {historyList.map((item, index) => {
                const title = item.type || item.title || `${item.assessment_type || 'Overall'} Assessment`
                const risk = item.risk || item.risk_level || 'Moderate'
                const score = item.score ?? 5.0
                const dateStr = item.date || new Date().toLocaleDateString('en-IN')

                return (
                  <tr key={index} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {title}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                      {dateStr}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {score} / 10
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${getRiskBadgeStyle(
                          risk,
                        )}`}
                      >
                        {risk} Risk
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedResult(item)}
                        className="rounded-lg bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Detailed Record
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedResult.type || selectedResult.title || 'Assessment Result'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Prediction Score</p>
                <p className="text-3xl font-extrabold text-blue-600">{selectedResult.score}/10</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Risk Level</p>
                <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold mt-1 ${getRiskBadgeStyle(selectedResult.risk || selectedResult.risk_level)}`}>
                  {selectedResult.risk || selectedResult.risk_level} Risk
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Date</p>
                <p className="text-xs font-bold text-slate-700 mt-1">{selectedResult.date}</p>
              </div>
            </div>

            {selectedResult.contributing_factors && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
                  Contributing Factors (XAI)
                </h4>
                <div className="space-y-2">
                  {selectedResult.contributing_factors.map((f, i) => (
                    <div key={i} className="flex justify-between text-xs font-medium text-slate-700 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                      <span>{f.feature}</span>
                      <span className="font-mono text-purple-600">
                        {Math.round((f.importance || 0.2) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedResult.recommendations && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                  Recommendations
                </h4>
                <div className="space-y-2">
                  {selectedResult.recommendations.map((r, i) => (
                    <div key={i} className="text-xs text-blue-900 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                      • {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedResult(null)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History