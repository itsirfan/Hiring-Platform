import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Assessments', href: '/assessments', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Users className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  HR Portal
                </span>
              </div>
              <div className="ml-6 flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        location.pathname === item.href
                          ? 'border-b-2 border-indigo-500 text-gray-900'
                          : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}