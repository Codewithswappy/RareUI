'use client';

import React, { useState } from 'react';
import { AnimatedTabs } from '@/components/rareui/AnimatedTab';

export const InteractiveAnimatedTabs = () => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];
  const [activeTab, setActiveTab] = useState('home');

  return <AnimatedTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />;
};
