import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { saveAssessmentResult } from '../services/api'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)

  // Default fallback state if page is navigated directly
  const state = location.state || {
    assessment_type: 'overall',
    title: 'Overall Mental Health Assessment',
    score: 6.2,
    risk_level: 'Moderate',
    contributing_factors: [
      { feature: 'Academic pressure & workload', importance: 0.35 },
      { feature: 'Sleep pattern & fatigue', importance: 0.28 },
      { feature: 'Daily stress management', importance: 0.22 },
      { feature: 'Social interaction & support', importance: 0.15 },
    ],
    recommendations: [
      'Maintain a consistent daily sleep schedule (7-8 hours).',
      'Break academic study sessions into 45-minute focused blocks.',
      'Engage in light daily physical exercise or outdoor campus walks.',
      'Reach out to campus counselors or trusted peers when feeling burdened.',
    ],
    model_version: 'overall-risk-v1.0',
    timestamp: new Date().toISOString(),
  }

  const riskBadgeStyles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-red-50 text-red-700 border-red-200',
  }

  const [formattedTime] = useState(() =>
    new Date(state.timestamp || Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  )

  const handleSaveToHistory = async () => {
    setIsSaving(true)
    const resultToSave = {
      type: state.title || `${state.assessment_type.toUpperCase()} Assessment`,
      assessment_type: state.assessment_type,
      score: state.score,
      risk: state.risk_level,
      date: new Date().toLocaleDateString('en-IN'),
      contributing_factors: state.contributing_factors,
      recommendations: state.recommendations,
      model_version: state.model_version || 'v1.0',
    }

    await saveAssessmentResult(resultToSave)
    setIsSaving(false)
    navigate('/history')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <span>←</span>
        <span>Return to Dashboard</span>
      </button>

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Prediction Result
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {state.title || 'Mental Health Risk Assessment'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Early-warning risk prediction computed by model {state.model_version || 'v1.0'}
        </p>
      </div>

      {/* Primary Score & Risk Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="grid gap-6 sm:grid-cols-3 sm:items-center">
          {/* Score Box */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 border border-slate-100 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Risk Score
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-blue-600">
                {state.score}
              </span>
              <span className="text-lg font-bold text-slate-400">/ 10</span>
            </div>
          </div>

          {/* Risk Level Description */}
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
                  riskBadgeStyles[state.risk_level] || riskBadgeStyles.Moderate
                }`}
              >
                {state.risk_level} Risk Level
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {formattedTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              The model indicates a higher {state.assessment_type || 'mental wellbeing'} risk level.
            </h2>

            <p className="text-sm leading-relaxed text-slate-600">
              This result is an early-warning prediction based on your assessment responses. It highlights potential areas for attention and proactive wellbeing support.
            </p>
          </div>
        </div>
      </div>

      {/* XAI Contributing Factors & Personalized Recommendations */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contributing Factors (XAI) */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 text-lg border border-purple-100">
              ⚡
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">
                Contributing Factors
              </h2>
              <p className="text-xs text-slate-400">
                Factors influencing this model prediction (XAI)
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {state.contributing_factors && state.contributing_factors.length > 0 ? (
              state.contributing_factors.map((item, idx) => {
                const percentage = Math.round((item.importance || 0.25) * 100)
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.feature}</span>
                      <span className="font-mono text-purple-600">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-purple-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-xs text-slate-400">No feature importances returned.</p>
            )}
          </div>
        </section>

        {/* Personalized Recommendations */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-lg border border-blue-100">
              💡
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">
                Personalized Recommendations
              </h2>
              <p className="text-xs text-slate-400">
                Actionable wellbeing guidance
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {state.recommendations && state.recommendations.length > 0 ? (
              state.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl bg-blue-50/60 p-3.5 border border-blue-100 text-xs sm:text-sm font-medium text-blue-900 leading-relaxed"
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{rec}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No recommendations available.</p>
            )}
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={handleSaveToHistory}
          disabled={isSaving}
          className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Result to History'}
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Return to Dashboard
        </button>
      </div>

      {/* Medical Disclaimer Banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Important Medical Disclaimer
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-amber-900">
              This system does not provide a medical diagnosis. The results generated are early-warning predictions intended strictly for informational and self-awareness purposes. If you are experiencing distress, please consult a qualified healthcare professional or campus counselor.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result