import { Outlet } from 'react-router-dom';
import Navbar from '@/components/organisms/Navbar';
import Sidebar from '@/components/organisms/Sidebar';

/**
 * Layout with a filter Sidebar beside the content.
 * Sidebar state (category/age) is owned by the page and passed in
 * via `sidebarProps`. When no sidebar is needed, pass showSidebar={false}.
 */
export default function DashboardLayout({
  user,
  onLogout,
  sidebarProps = {},
  showSidebar = true,
  children,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cloud">
      <Navbar user={user} onLogout={onLogout} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 md:px-6 lg:flex-row">
        {showSidebar && <Sidebar {...sidebarProps} />}
        <main className="flex-1">{children || <Outlet />}</main>
      </div>
    </div>
  );
}