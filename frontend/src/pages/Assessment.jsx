import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { predictAssessment } from '../services/api'

const assessmentConfigs = {
  overall: {
    assessment_id: '101',
    title: 'Overall Mental Health Assessment',
    shortTitle: 'Overall Mental Health',
    description:
      'Evaluate your overall wellbeing, daily coping mechanisms, and academic balance.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    questions: [
      'How often have you felt that your daily activities and studies were difficult to manage?',
      'How often have you experienced difficulty concentrating during lectures or study sessions?',
      'How often have you felt physically tired or lacking energy to complete daily tasks?',
      'How often have you felt worried, overwhelmed, or under academic pressure?',
      'How often have you felt unable to maintain balance between personal life and academic responsibilities?',
    ],
  },

  depression: {
    "assessment_id": "201",
    title: 'Depression Risk Assessment',
    shortTitle: 'Depression',
    description:
      'Evaluate indicators associated with depressive symptoms, mood regulation, and motivation (PHQ-9 derived).',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    questions: [
      'Over the past two weeks, how often have you had little interest or pleasure in doing things?',
      'How often have you felt down, depressed, or hopeless about your academic or personal life?',
      'How often have you had trouble falling asleep, staying asleep, or sleeping too much?',
      'How often have you felt tired, exhausted, or lacking energy throughout the day?',
      'How often have you had trouble concentrating on schoolwork, reading, or daily tasks?',
    ],
  },

  anxiety: {
    "assessment_id": "301",
    title: 'Anxiety Risk Assessment',
    shortTitle: 'Anxiety',
    description:
      'Evaluate indicators associated with anxiety, persistent worrying, and tension (GAD-7 derived).',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    questions: [
      'Over the past two weeks, how often have you felt nervous, anxious, or on edge?',
      'How often have you felt unable to stop or control worrying about exams, grades, or personal matters?',
      'How often have you worried too much about different potential problems?',
      'How often have you had trouble relaxing during your free time?',
      'How often have you felt so restless that it was hard to sit still?',
    ],
  },

  stress: {
    "assessment_id": "401",
    title: 'Perceived Stress Assessment',
    shortTitle: 'Stress',
    description:
      'Evaluate perceived academic stress, coping confidence, and workload pressure (PSS-10 derived).',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    questions: [
      'In the past month, how often have you felt upset because of something that happened unexpectedly?',
      'How often have you felt that you were unable to control the important things in your student life?',
      'How often have you felt nervous and stressed about upcoming assignment deadlines or tests?',
      'How often have you felt that difficulties were piling up so high that you could not overcome them?',
      'How often have you felt unable to handle personal or academic responsibilities effectively?',
    ],
  },
}

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
]

function Assessment() {
  const { type } = useParams()
  const navigate = useNavigate()

  const key = assessmentConfigs[type] ? type : 'overall'
  const config = assessmentConfigs[key]
  const questions = config.questions

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectAnswer = (value) => {
    const updated = [...answers]
    updated[currentQuestion] = value
    setAnswers(updated)
  }

  const handleNext = async () => {
    if (answers[currentQuestion] === null) return

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Final submission
      setIsSubmitting(true)
      try {
        const predictionResult = await predictAssessment(key, answers)
        navigate('/result', {
          state: predictionResult,
        })
      } catch (err) {
        console.error('Prediction failed:', err)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const progressPercentage = Math.round(
    ((currentQuestion + 1) / questions.length) * 100,
  )

  return (
    <div className="mx-auto max-w-3xl">
      {/* Top Bar */}
      <button
        onClick={() => navigate('/dashboard')}
        className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <span>←</span>
        <span>Back to dashboard</span>
      </button>

      {/* Assessment Header */}
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${config.badgeColor}`}
            >
              {config.shortTitle} System
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              {config.title}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              {config.description}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-center shrink-0">
            <span className="text-xs font-medium text-slate-400 block">Question</span>
            <span className="text-lg font-bold text-slate-900">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Box */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Question {currentQuestion + 1}
        </span>
        <h2 className="mt-3 text-xl sm:text-2xl font-bold leading-snug text-slate-900">
          {questions[currentQuestion]}
        </h2>

        {/* Option Buttons */}
        <div className="mt-6 space-y-3">
          {options.map((option) => {
            const isSelected = answers[currentQuestion] === option.value
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option.value)}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm sm:text-base">{option.label}</span>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  Scale: {option.value}
                </span>
              </button>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={answers[currentQuestion] === null || isSubmitting}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? 'Analyzing...'
              : currentQuestion === questions.length - 1
              ? 'Generate Result'
              : 'Next →'}
          </button>
        </div>
      </div>

      {/* Privacy & Medical Notice */}
      <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
        Responses are processed temporarily to compute risk indicators. No medical diagnosis is provided.
      </p>
    </div>
  )
}

export default Assessment