import React from 'react';

export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'preparing';
  date: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export type ThemeMode = 'light' | 'dark';

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  id: string;
}

// Menu Management Types
export type DietaryOption = 'None' | 'Vegetarian' | 'Vegan';
export type AllergenOption = 'Nuts' | 'Dairy' | 'Gluten' | 'Eggs' | 'Soy';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  available: boolean;
  dietary: DietaryOption;
  allergens: AllergenOption[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
  isOpen: boolean;
}
