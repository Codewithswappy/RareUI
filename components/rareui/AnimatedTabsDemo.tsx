"use client";
import React, { useState } from 'react';
import { AnimatedTabs } from '@/components/rareui/AnimatedTab';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const AnimatedTabsDemo = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="flex justify-center items-center py-10">
            <AnimatedTabs 
                tabs={TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
            />
        </div>
    );
};
