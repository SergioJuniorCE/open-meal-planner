import { Home, Utensils } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      isActive: location.pathname === '/',
    },
    {
      href: '/meals',
      label: 'Meals',
      icon: Utensils,
      isActive: location.pathname === '/meals',
    },
  ];

  useEffect(() => {
    if (!mounted) return;

    // Create or update the navbar element
    let navbarElement = document.getElementById('mobile-bottom-nav-portal');
    
    if (!navbarElement) {
      navbarElement = document.createElement('div');
      navbarElement.id = 'mobile-bottom-nav-portal';
      document.body.appendChild(navbarElement);
    }

    // Set the navbar HTML
    navbarElement.innerHTML = `
      <div 
        style="
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background-color: #ef4444;
          border-top: 2px solid #3b82f6;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          transform: translateZ(0);
          will-change: transform;
        "
        class="md:hidden"
      >
        ${navItems.map((item) => `
          <a 
            href="${item.href}"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 12px 16px;
              min-width: 0;
              flex: 1;
              text-decoration: none;
              color: white;
              transition: background-color 0.2s;
              background-color: ${item.isActive ? '#2563eb' : 'transparent'};
            "
          >
            <svg style="width: 20px; height: 20px; margin-bottom: 4px;" fill="currentColor" viewBox="0 0 20 20">
              ${item.icon === Home ? 
                '<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>' :
                '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
              }
            </svg>
            <span style="font-size: 12px; font-weight: 500;">${item.label}</span>
          </a>
        `).join('')}
      </div>
    `;

    // Add click handlers for navigation
    const links = navbarElement.querySelectorAll('a');
    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      });
    });

    // Cleanup function
    return () => {
      const element = document.getElementById('mobile-bottom-nav-portal');
      if (element) {
        element.remove();
      }
    };
  }, [mounted, location.pathname, navItems]);

  // Don't render anything in the React tree
  return null;
} 