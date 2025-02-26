import { motion } from 'framer-motion';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ show, onClose, title, children }: ModalProps) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-subtitle text-gray-800">{title}</h2>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#6366F1] text-white rounded-md hover:bg-[#5558E6] transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}