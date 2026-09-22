import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'

function StudentLayout() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/history', label: 'History' },
    { to: '/profile', label: 'Profile' },
  ]

  const assessmentItems = [
    { to: '/assessment/overall', label: 'Overall Mental Health' },
    { to: '/assessment/depression', label: 'Depression' },
    { to: '/assessment/anxiety', label: 'Anxiety' },
    { to: '/assessment/stress', label: 'Stress' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block z-20">
        <div className="flex h-full flex-col justify-between">
          <div>
            {/* Logo & Header */}
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                  ♥
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-tight text-blue-600">
                    MindCare
                  </h1>
                  <p className="text-[11px] font-medium text-slate-400">
                    JUET Mental Health System
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-6">
              <div>
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Main Navigation
                </p>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Assessments
                </p>
                <div className="space-y-1">
                  {assessmentItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Logout Footer */}
          <div className="border-t border-slate-100 p-4">
            <button
              onClick={() => navigate('/login')}
              className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
            >
              <span>↪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-72 border-r border-slate-200 bg-white p-6 shadow-xl z-50 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-sm">
                  ♥
                </div>
                <span className="font-bold text-blue-600">MindCare JUET</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <nav className="mt-6 space-y-6">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Menu
                </p>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2.5 text-sm font-medium ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assessments
                </p>
                <div className="space-y-1">
                  {assessmentItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2.5 text-sm font-medium ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/login')
                  }}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Layout Body */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 sm:h-20 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                JUET Student Mental Health System
              </p>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Student Portal
              </h2>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 rounded-full border border-slate-100 bg-slate-50 p-1.5 pr-4 hover:bg-slate-100 transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-sm shadow-xs">
              P
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Prayanshu Chourasia
              </p>
              <p className="text-[11px] text-slate-500 leading-tight">
                JUET B.Tech Student
              </p>
            </div>
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout