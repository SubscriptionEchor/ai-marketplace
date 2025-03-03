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
    <nav className="flex items-center bg-white px-4 py-3 rounded-lg border border-[#e1e3e5] shadow-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <div className="mx-2 text-gray-400">/</div>
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
          </li>
        ))}
      </ol>
      <div className="ml-auto">
        <div className="text-xs text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </nav>
  );
}