import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <div className="h-screen h-[100dvh] bg-background flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col overflow-hidden min-h-0">
        <Outlet />
      </main>
    </div>
  );
};
