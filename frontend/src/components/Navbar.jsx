import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Sparkles, LogOut } from 'lucide-react';

const Navbar = ({ setToken }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/add-employee', label: 'Add Employee', icon: UserPlus },
    { path: '/ai-recommendations', label: 'AI Insights', icon: Sparkles },
  ];

  return (
    <nav className="glass-panel mx-4 mt-6 px-6 py-4 flex items-center justify-between mb-8 sticky top-6 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hidden sm:block">
          EvoHR
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white/10 text-indigo-200 shadow-inner shadow-white/5' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="hidden md:block text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => setToken('')}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
      >
        <LogOut size={18} />
        <span className="hidden sm:block text-sm font-medium">Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
