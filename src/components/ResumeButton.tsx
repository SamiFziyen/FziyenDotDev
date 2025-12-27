import React from "react";
import { FileDown } from "lucide-react";
import { motion } from "framer-motion";

export const ResumeButton: React.FC = () => {
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 hidden md:block z-40"
    >
      <motion.a
        href="https://drive.google.com/file/d/1ETpDejYzQ7wS29E_cWG_9asMIZ3PyLDm/view?usp=sharing"
        download="Public_CV.pdf"
        whileHover={{ x: -8 }}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-l-lg shadow-lg hover:bg-purple-700 transition-colors"
      >
        <FileDown className="w-5 h-5" />
        <span className="font-medium">Resume</span>
      </motion.a>
    </motion.div>
  );
};
