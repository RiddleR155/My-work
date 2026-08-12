import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, ExternalLink, LogOut } from 'lucide-react';
import { useAuthStore } from '../context/authStore';

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
];

const AdminLayout = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen flex bg-cream-200">
      <aside className="w-64 shrink-0 bg-charcoal-950 text-cream-100 flex flex-col hidden md:flex">
        <Link to="/" className="flex items-center gap-3 px-6 py-5 border-b border-cream-100/10">
          <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-base tracking-widest leading-none">
            LEATHERTIQUE <span className="text-gold-500">IMPEX</span>
          </span>
        </Link>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded text-sm tracking-wide transition-colors ${
                  isActive ? 'bg-gold-500 text-charcoal-950' : 'text-cream-100/80 hover:bg-cream-100/10'
                }`
              }
            >
              <Icon size={17} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-cream-100/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded text-sm text-cream-100/80 hover:bg-cream-100/10"
          >
            <ExternalLink size={17} strokeWidth={1.5} />
            View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm text-cream-100/80 hover:bg-cream-100/10"
          >
            <LogOut size={17} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-charcoal-900/10 px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-lg text-charcoal-900">Admin Dashboard</h1>
          <span className="text-sm text-charcoal-700/70">{user?.name}</span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
