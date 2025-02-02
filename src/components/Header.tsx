import React from 'react';
import { Sparkles, Github, Linkedin, Command, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <header className="relative py-12 sm:py-16 lg:py-20 mb-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl transform -skew-y-6"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <Command className="w-8 h-8 text-indigo-400 relative" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            AI Creator Pro
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <a
            href="https://github.com/Aayush518"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group hover:scale-105"
          >
            <Github className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
            <span className="text-white/80 group-hover:text-white">GitHub</span>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/60" />
          </a>
          <a
            href="https://linkedin.com/in/Aayush518"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group hover:scale-105"
          >
            <Linkedin className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
            <span className="text-white/80 group-hover:text-white">LinkedIn</span>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/60" />
          </a>
        </motion.div>
      </nav>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-8 hover:border-indigo-500/40 transition-colors"
        >
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <span className="text-white/80">Powered by Google Gemini AI</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tight relative"
        >
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl"></div>
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient">
              Create
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-4 animate-gradient">
              Magic
            </span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your ideas into extraordinary content with the power of artificial intelligence
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <button className="relative group px-8 py-4 rounded-xl font-medium overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 blur-xl transition-all duration-300 group-hover:scale-110"></div>
            <span className="relative text-white">Start Creating</span>
          </button>
        </motion.div>
      </div>
    </header>
  );
};