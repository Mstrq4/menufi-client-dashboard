"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import DashboardHome from '../views/DashboardHome';
import MenuManagement from '../views/MenuManagement';
import SettingsPage from '../views/SettingsPage';
import OrdersPage from '../views/OrdersPage';
import SubscriptionsPage from '../views/SubscriptionsPage';
import AccountSettingsModal from '../components/AccountSettingsModal';
import { ThemeMode } from '../lib/types';

export default function DashboardPage() {
    const [theme, setTheme] = useState<ThemeMode>('light');

    // Navigation Sidebar State (Mobile Only)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [activeTab, setActiveTab] = useState('dashboard');

    // Account Settings Modal State
    const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

    // Load theme
    useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as ThemeMode;
            if (savedTheme) {
                setTheme(savedTheme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            }
        }
    }, []);

    // Apply theme
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const html = document.documentElement;
            if (theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    // Router Logic
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardHome />;
            case 'menu':
                return <MenuManagement />;
            case 'settings':
                return <SettingsPage />;
            case 'orders':
                return <OrdersPage />;
            case 'subscriptions':
                return <SubscriptionsPage />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen font-sans transition-colors duration-300 relative bg-[#F3F4F6] dark:bg-[#121010]">

            {/* Sidebar - Fixed on Right */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenAccountSettings={() => setIsAccountSettingsOpen(true)}
            />

            {/* Main Content Area */}
            <div
                className={`transition-all duration-300
        /* Fixed Margin for Floating Sidebar on Desktop (RTL means margin-right) - Adjusted for spacing */
        lg:mr-[290px] 
        flex flex-col min-h-screen`}
            >

                {/* Top Navbar */}
                <TopNav
                    toggleSidebar={toggleSidebar}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1 pb-10">
                    {renderContent()}
                </main>

            </div>

            {/* Global Modals */}
            <AccountSettingsModal
                isOpen={isAccountSettingsOpen}
                onClose={() => setIsAccountSettingsOpen(false)}
            />

        </div>
    );
}
