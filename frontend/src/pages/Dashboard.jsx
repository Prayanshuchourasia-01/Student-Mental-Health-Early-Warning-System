import { useState } from 'react'
import { useNavigate } from 'react-router'

const assessments = [
  {
    type: 'overall',
    title: 'Overall Mental Health',
    subtitle: 'Comprehensive Wellbeing Assessment',
    description:
      'Get an overall early-warning assessment of your general mental wellbeing and daily functioning.',
    icon: '📊',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    type: 'depression',
    title: 'Depression Assessment',
    subtitle: 'PHQ-9 Derived Early Warning',
    description:
      'Assess indicators associated with depressive symptoms, mood regulation, and daily energy levels.',
    icon: '💙',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    type: 'anxiety',
    title: 'Anxiety Assessment',
    subtitle: 'GAD-7 Derived Early Warning',
    description:
      'Understand your current level of anxiety-related symptoms, worrying, and stress responsiveness.',
    icon: '🌊',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
  },
  {
    type: 'stress',
    title: 'Stress Assessment',
    subtitle: 'PSS-10 Derived Early Warning',
    description:
      'Evaluate your current perceived academic stress, coping mechanisms, and workload pressures.',
    icon: '⚡',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
]

function Dashboard() {
  const navigate = useNavigate()
  const [stats] = useState(() => {
    const history = JSON.parse(localStorage.getItem('assessmentHistory') || '[]')
    if (history.length > 0) {
      return {
        completedCount: history.length,
        lastType: history[0].type || history[0].title || 'Assessment',
        lastScore: `${history[0].score}/10`,
        lastRisk: history[0].risk || history[0].risk_level || 'Moderate',
      }
    }
    return {
      completedCount: 3,
      lastType: 'Depression',
      lastScore: '6.2/10',
      lastRisk: 'Moderate',
    }
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-10 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur-sm border border-blue-400/20">
            <span>JUET Early Warning Portal</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl tracking-tight text-white">
            Good to see you, Prayanshu.
          </h1>

          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Take a moment to check in with your mental wellbeing. Choose one of the four independent assessments below to receive model-driven risk predictions, contributing factors, and personalized guidance.
          </p>
        </div>

        {/* Subtle decorative background accent */}
        <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
      </section>

      {/* Quick Stats Grid */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Assessments Completed
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.completedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Latest Assessment
          </p>
          <p className="mt-2 text-xl font-bold text-slate-900 truncate">
            {stats.lastType}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Latest Prediction Score
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {stats.lastScore}
            </span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              {stats.lastRisk} Risk
            </span>
          </div>
        </div>
      </section>

      {/* Four Assessment Cards */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Independent Assessment Systems
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Each assessment operates independently with its own questionnaire structure and prediction pipeline.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {assessments.map((item) => (
            <div
              key={item.type}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl border ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    Independent System
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-blue-600 mt-0.5">
                  {item.subtitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate(`/assessment/${item.type}`)}
                  className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-[0.99]"
                >
                  <span>Start Assessment</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-lg">
            🛡️
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-sm">
              Student Privacy Protection Policy
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-blue-800">
              Raw questionnaire answers are processed in-memory to compute risk indicators and XAI factors. Only final prediction metadata and recommendations are retained in history. This system does not provide a medical diagnosis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard