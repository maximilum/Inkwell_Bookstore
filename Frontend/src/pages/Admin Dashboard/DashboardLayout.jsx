import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  ScrollRestoration,
} from "react-router-dom";
import { IoLibraryOutline, IoHomeOutline } from "react-icons/io5";
import { HiOutlinePlusSm } from "react-icons/hi";

const NAV_LINKS = [
  {
    to: "/dashboard",
    icon: IoLibraryOutline,
    label: "Manage Books",
  },
  {
    to: "/dashboard/add-book",
    icon: HiOutlinePlusSm,
    label: "Add Book",
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .dash-root { font-family: 'DM Sans', sans-serif; }
        .dash-serif  { font-family: 'Lora', serif; }

        /* Sidebar tooltip */
        .nav-tip {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: #1c1917;
          color: #e7e5e4;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 120ms ease;
          z-index: 50;
        }
        .nav-tip::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: #1c1917;
        }
        .nav-link:hover .nav-tip,
        .nav-btn:hover  .nav-tip { opacity: 1; }

        /* Active indicator */
        .nav-link-active {
          background: #f59e0b !important;
          color: #1c1917 !important;
        }
      `}</style>

      <section className="dash-root flex min-h-screen bg-stone-50">
        {/* ── Sidebar ── */}
        <aside className="hidden sm:flex flex-col w-[60px] bg-stone-900 fixed top-0 left-0 h-full z-20 shrink-0">
          {/* Logo / Home link */}
          <Link
            to="/"
            className="flex items-center justify-center h-[60px] border-b border-stone-800 hover:bg-stone-800 transition-colors shrink-0"
            title="Go to store"
          >
            <IoHomeOutline className="w-6 h-6 text-stone-300" />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-1 py-4 px-2 flex-1">
            {NAV_LINKS.map(({ to, icon: Icon, label }) => {
              const active =
                to === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname === to ||
                    location.pathname.startsWith(to + "/");
              return (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                    active
                      ? "nav-link-active"
                      : "text-stone-400 hover:bg-stone-800 hover:text-stone-200"
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className="nav-tip">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="flex items-center justify-center pb-4 px-2">
            <button
              onClick={handleLogout}
              className="nav-btn relative flex items-center justify-center w-10 h-10 text-stone-500 hover:bg-stone-800 hover:text-stone-200 rounded-xl transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="nav-tip">Log out</span>
            </button>
          </div>
        </aside>

        {/* ── Content area ── */}
        <div className="flex-1 sm:ml-[60px] flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-[56px] bg-white border-b border-stone-100 flex items-center px-6 sm:px-10 sticky top-0 z-10 shrink-0">
            {/* Mobile menu trigger (sidebar hidden on mobile) */}
            <button className="sm:hidden p-1.5 mr-3 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>

            {/* Brand name */}
            <span className="dash-serif text-[15px] font-semibold text-stone-800 select-none">
              Ink<span className="text-amber-500">Well</span>
            </span>

            {/* Right side: just the admin avatar */}
            <div className="ml-auto flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-[12px] font-semibold select-none">
                A
              </div>
            </div>
          </header>

          {/* Page content via Outlet */}
          <main className="flex-1 min-w-0">
            <Outlet />
            <ScrollRestoration />
          </main>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
