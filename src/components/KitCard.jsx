import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreVertical, 
  Clock, 
  Plus, 
  Youtube, 
  BookOpen, 
  Upload, 
  Sparkles,
  Trash2,
  Share2,
  Edit2,
  Folder
} from 'lucide-react';
import GlassCard from './GlassCard';
import { useLibrary } from '../context/LibraryContext';
import CreateKitModal from './CreateKitModal';

const SOURCE_ICONS = {
  youtube: <Youtube size={14} className="text-red-500" />,
  curriculum: <BookOpen size={14} className="text-cyan-bright" />,
  upload: <Upload size={14} className="text-magenta" />,
  manual: <Sparkles size={14} className="text-purple" />,
};

const KitCard = ({ kit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { folders } = useLibrary();

  const folder = folders.find(f => f.id === kit.folderId);
  const folderName = folder ? folder.name : 'Unassigned';

  return (
    <>
      <GlassCard className="p-8 group cursor-pointer hover:border-cyan-bright/40 transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-white/[0.01] to-transparent h-full flex flex-col">
        <div className="flex items-start justify-between mb-8 relative z-20">
          <div className="flex flex-wrap gap-2">
            {kit.sources.map(source => (
               <div key={source} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 shadow-sm">
                  {SOURCE_ICONS[source]}
               </div>
            ))}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-2 -mr-2 -mt-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <MoreVertical size={16} className="text-zinc-500" />
              </button>
              
              <AnimatePresence>
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-8 right-0 w-40 z-50 bg-[#0A0E1A] border border-white/10 rounded-xl p-1.5 shadow-2xl backdrop-blur-3xl"
                    >
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all">
                        <Edit2 size={12} /> Rename
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all">
                        <Share2 size={12} /> Share
                      </button>
                      <div className="h-px bg-white/5 my-1" />
                      <button 
                        onClick={() => onDelete(kit.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-[10px] font-bold uppercase tracking-wider text-red-400 transition-all"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1 h-3 rounded-full bg-cyan-bright" />
            <span className="text-[10px] font-black text-cyan-bright uppercase tracking-[0.2em]">{folderName}</span>
          </div>
          <h3 className="text-xl font-black group-hover:text-white transition-colors tracking-tight line-clamp-2 leading-tight">
            {kit.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <Clock size={12} className="text-zinc-600" />
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            Updated on {new Date(kit.lastAccessed).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Mastery Progress</span>
              <span className="text-2xl font-black text-white tracking-tighter">{kit.progress}%</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-cyan-bright transition-colors group/btn"
            >
              Add Materials <Plus size={14} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
            </button>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${kit.progress}%` }}
              className="h-full bg-gradient-to-r from-[#43C6F1] to-[#E063F1] relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/20 animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </GlassCard>

      <CreateKitModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        kitId={kit.id}
      />
    </>
  );
};

export default KitCard;
