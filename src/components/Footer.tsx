import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }}
      className="w-full bg-[#2D2D2D] text-white py-3 sm:py-4 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
    >
      <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
        <img
          src="https://trie.network/images/logo.png"
          alt="TRIE AI"
          className="w-10 h-auto sm:w-12 object-contain"
        />
      </div>
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
        <span className="text-gray-400 mr-2 text-sm sm:text-base">curated by</span>
        <div className="flex items-center bg-[#3D3D3D] rounded-full px-3 sm:px-4 py-1">
          <span className="text-[#6366F1] font-semibold text-sm sm:text-base">AI</span>
          <span className="text-white font-medium ml-1 text-sm sm:text-base">experts</span>
        </div>
      </div>
    </motion.footer>
  );
}