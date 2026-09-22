import { useState } from 'react'

function Profile() {
  const [profile, setProfile] = useState({
    fullName: 'Prayanshu Chourasia',
    email: 'prayanshu@juet.ac.in',
    university: 'Jaypee University of Engineering & Technology (JUET), Guna',
    academicYear: '2026–2027',
    role: 'Student (B.Tech Minor Project)',
    department: 'Computer Science & Engineering',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [showSavedToast, setShowSavedToast] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 3000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Student Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and academic account details.
        </p>
      </div>

      {/* Toast Notification */}
      {showSavedToast && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs">
          <span>✓ Profile changes updated successfully!</span>
          <button onClick={() => setShowSavedToast(false)}>✕</button>
        </div>
      )}

      {/* Profile Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-8">
        {/* User Identity Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md shadow-blue-500/20">
              P
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {profile.fullName}
              </h2>
              <p className="text-xs text-blue-600 font-semibold">
                {profile.role}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {profile.university}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                disabled={!isEditing}
                value={profile.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                University Email
              </label>
              <input
                type="email"
                name="email"
                disabled={!isEditing}
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                University Name
              </label>
              <input
                type="text"
                name="university"
                disabled={!isEditing}
                value={profile.university}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Department
              </label>
              <input
                type="text"
                name="department"
                disabled={!isEditing}
                value={profile.department}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Academic Year
              </label>
              <input
                type="text"
                name="academicYear"
                disabled={!isEditing}
                value={profile.academicYear}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                System Role
              </label>
              <input
                type="text"
                name="role"
                disabled
                value={profile.role}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-500 outline-none"
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* System info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Project Metadata
        </h3>
        <div className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
          <p>• <strong>Project:</strong> Student Mental Health Early Warning System</p>
          <p>• <strong>Institution:</strong> JUET Guna, Madhya Pradesh</p>
          <p>• <strong>Type:</strong> B.Tech Minor Project Part-I</p>
          <p>• <strong>Architecture:</strong> Model-Agnostic React Client</p>
        </div>
      </div>
    </div>
  )
}

export default Profile