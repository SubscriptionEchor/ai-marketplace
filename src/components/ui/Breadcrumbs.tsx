import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentStep?: number;
  totalSteps?: number;
}

export function Breadcrumbs({ items, currentStep, totalSteps }: BreadcrumbsProps) {
  const location = useLocation();

  return (
    <nav className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white px-4 py-3 rounded-lg border border-[#e1e3e5] shadow-sm" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <div className="mx-2 text-gray-400 hidden sm:block">/</div>
            )}
            {item.href ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.href}
                  className={`text-sm font-medium rounded-md px-2 py-1 transition-colors ${
                    location.pathname === item.href
                      ? 'text-[#0284a5] bg-[#0284a5]/5'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ) : (
              <span className="text-sm font-semibold text-gray-900 px-2 py-1">
                {item.label}
              </span>
            )}
            {index > 0 && index < items.length - 1 && (
              <div className="mx-1 text-gray-400 block sm:hidden">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="sm:ml-auto border-t sm:border-t-0 pt-2 sm:pt-0 mt-2 sm:mt-0">
        <div className="text-xs text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </nav>
  );
}