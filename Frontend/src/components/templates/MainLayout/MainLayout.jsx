import { Outlet } from 'react-router-dom';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';

/**
 * Default layout: Navbar + content + Footer.
 * `user` and `onLogout` are passed down to the Navbar.
 * Works with nested routes (<Outlet />) or direct children.
 */
export default function MainLayout({ user, onLogout, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-cloud">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}