// Frontend API Service for FastAPI integration
// Base URL for FastAPI backend (configurable)
const API_BASE_URL = 'http://localhost:8000/api'



// Check Backend Is Working FIne or not 
export async function checkBackend(){
  const response = await fetch(
    `${API_BASE_URL}/health `
  );
  if(!response.ok){
    throw new Error("Could Not Connect to the Backend");
  }
  return response.json();

}

/**
 * Predict mental health risk for a specific assessment type.
 * Sends questionnaire inputs to FastAPI endpoint or returns local mock calculation.
 */
export async function predictAssessment(type, responses) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.warn(`Backend API unavailable (${error.message}). Using local inference engine.`)
    return generateLocalPrediction(type, responses)
  }
}

/**
 * Fetch saved assessment history.
 */
export async function fetchHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/history`)
    if (!response.ok) throw new Error('Failed to fetch history')
    return await response.json()
  } catch (error) {
    console.debug('Using local history fallback:', error.message)
    const localHistory = JSON.parse(localStorage.getItem('assessmentHistory') || '[]')
    return localHistory
  }
}

/**
 * Save assessment result to history.
 */
export async function saveAssessmentResult(resultData) {
  try {
    const response = await fetch(`${API_BASE_URL}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    })
    if (!response.ok) throw new Error('Failed to save result')
    return await response.json()
  } catch (error) {
    console.debug('Using local save fallback:', error.message)
    const localHistory = JSON.parse(localStorage.getItem('assessmentHistory') || '[]')
    const updated = [resultData, ...localHistory]
    localStorage.setItem('assessmentHistory', JSON.stringify(updated))
    return { status: 'success', data: resultData }
  }
}

/**
 * Model-agnostic local prediction fallback for prototype execution.
 */
function generateLocalPrediction(type, responses) {
  const total = responses.reduce((sum, val) => sum + (val ?? 0), 0)
  const maxPossible = responses.length * 3 // 0 to 3 scale per question
  
  // Score out of 10 rounded to 1 decimal
  const rawScore = (total / maxPossible) * 10
  const score = Math.min(10, Math.max(1, Math.round(rawScore * 10) / 10))

  let risk_level = 'Low'
  if (score >= 7.0) {
    risk_level = 'High'
  } else if (score >= 4.0) {
    risk_level = 'Moderate'
  }

  // Define assessment specific contributing factors and recommendations
  const factorMap = {
    overall: [
      { feature: 'Academic pressure & workload', importance: 0.35 },
      { feature: 'Sleep pattern & fatigue', importance: 0.28 },
      { feature: 'Daily stress management', importance: 0.22 },
      { feature: 'Social interaction & support', importance: 0.15 },
    ],
    depression: [
      { feature: 'Loss of interest & motivation', importance: 0.38 },
      { feature: 'Sleep disruption & low energy', importance: 0.27 },
      { feature: 'Academic concentration difficulty', importance: 0.21 },
      { feature: 'Negative self-perception', importance: 0.14 },
    ],
    anxiety: [
      { feature: 'Persistent worrying & nervous energy', importance: 0.40 },
      { feature: 'Inability to relax under pressure', importance: 0.26 },
      { feature: 'Academic deadlines & exam stress', importance: 0.20 },
      { feature: 'Irritability & overthinking', importance: 0.14 },
    ],
    stress: [
      { feature: 'Perceived lack of control', importance: 0.36 },
      { feature: 'Overwhelming task accumulation', importance: 0.29 },
      { feature: 'Coping confidence deficit', importance: 0.21 },
      { feature: 'Physical exhaustion', importance: 0.14 },
    ],
  }

  const recMap = {
    overall: [
      'Maintain a consistent daily sleep schedule (7-8 hours).',
      'Break academic study sessions into 45-minute focused blocks.',
      'Engage in light daily physical exercise or outdoor campus walks.',
      'Reach out to campus counselors or trusted peers when feeling burdened.',
    ],
    depression: [
      'Establish small daily routine goals to maintain momentum.',
      'Stay connected with friends, roommates, and family members.',
      'Prioritize restorative sleep and balanced nutrition.',
      'Consider scheduling a confidential check-in with a healthcare professional.',
    ],
    anxiety: [
      'Practice 4-7-8 deep breathing exercises during high-stress study moments.',
      'Limit late-night caffeine intake and screen time before sleeping.',
      'Structure weekly assignments into daily actionable checklists.',
      'Utilize university wellness resources for mindfulness and relaxation techniques.',
    ],
    stress: [
      'Identify immediate stressors and delegate or reschedule non-essential tasks.',
      'Take regular study breaks and set clear boundaries between work and rest.',
      'Engage in physical activities like sports, yoga, or gym workouts.',
      'Discuss academic pressure with course mentors or batch advisors.',
    ],
  }

  const titleMap = {
    overall: 'Overall Mental Health Assessment',
    depression: 'Depression Assessment',
    anxiety: 'Anxiety Assessment',
    stress: 'Stress Assessment',
  }

  return {
    assessment_type: type,
    title: titleMap[type] || 'Mental Health Assessment',
    score: score,
    risk_level: risk_level,
    contributing_factors: factorMap[type] || factorMap.overall,
    recommendations: recMap[type] || recMap.overall,
    timestamp: new Date().toISOString(),
    model_version: `${type}-risk-v1.0`,
  }
}
