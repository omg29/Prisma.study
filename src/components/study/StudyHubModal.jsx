import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Layers,
  CheckCircle,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  Lock,
  Copy,
  Folder,
  Youtube,
  Upload,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import GlassCard from '../GlassCard';
import { LiquidButton } from '../ui/LiquidButton';
import StudyGuideView from './StudyGuideView';
import FlashcardView from './FlashcardView';
import SelfStudyView from './SelfStudyView';
import TestView from './TestView';
import { useLibrary } from '../../context/LibraryContext';
import CreateKitModal from '../CreateKitModal';

const MODES = [
  { id: 'guide', name: 'Study Guide', icon: <BookOpen size={20} />, color: 'text-cyan-bright', bg: 'bg-cyan-bright/10' },
  { id: 'self-study', name: 'Self Study', icon: <CheckCircle size={20} />, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'flashcards', name: 'Flashcards', icon: <Layers size={20} />, color: 'text-purple', bg: 'bg-purple/10' },
  { id: 'test', name: 'Test', icon: <GraduationCap size={20} />, color: 'text-magenta', bg: 'bg-magenta/10' },
];

const SOURCE_ICONS = {
  youtube: <Youtube size={14} className="text-red-500" />,
  curriculum: <BookOpen size={14} className="text-cyan-bright" />,
  upload: <Upload size={14} className="text-magenta" />,
  manual: <Sparkles size={14} className="text-purple" />,
};

const StudyHubModal = ({ isOpen, onClose, kit }) => {
  const { 
    updateKitVocab, 
    updateKitMainIdeas, 
    updateKitTitle, 
    duplicateKit, 
    folders,
    addMaterialToKit
  } = useLibrary();

  const [activeMode, setActiveMode] = useState(null);
  const [activeTab, setActiveTab] = useState('vocab'); // 'vocab' or 'ideas'
  const [isAddMoreOpen, setIsAddMoreOpen] = useState(false);
  
  // Custom copy notification
  const [showDuplicateToast, setShowDuplicateToast] = useState(false);

  // Edit / Add States
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitleVal, setEditingTitleVal] = useState('');
  
  const [editingVocabId, setEditingVocabId] = useState(null);
  const [editingVocabData, setEditingVocabData] = useState({ term: '', definition: '' });
  const [newVocabData, setNewVocabData] = useState({ term: '', definition: '' });
  const [showAddVocabForm, setShowAddVocabForm] = useState(false);

  const [editingIdeaId, setEditingIdeaId] = useState(null);
  const [editingIdeaData, setEditingIdeaData] = useState({ title: '', explanation: '', bulletPoints: '' });
  const [newIdeaData, setNewIdeaData] = useState({ title: '', explanation: '', bulletPoints: '' });
  const [showAddIdeaForm, setShowAddIdeaForm] = useState(false);

  const [expandedIdeaId, setExpandedIdeaId] = useState(null);

  // Flip cards states for preview in vocab
  const [flippedVocabCards, setFlippedVocabCards] = useState({});

  React.useEffect(() => {
    if (!isOpen) {
      setActiveMode(null);
      setIsEditingTitle(false);
      setEditingVocabId(null);
      setEditingIdeaId(null);
      setShowAddVocabForm(false);
      setShowAddIdeaForm(false);
    } else if (kit) {
      setEditingTitleVal(kit.title);
    }
  }, [isOpen, kit]);

  if (!kit) return null;

  const folder = folders.find(f => f.id === kit.folderId);
  const folderName = folder ? folder.name : 'Unassigned';

  const vocabList = kit.content?.vocab || [];
  const mainIdeas = kit.content?.mainIdeas || [];
  const isPremade = kit.isPremade;

  const handleDuplicateAndUnlock = () => {
    const copy = duplicateKit(kit.id);
    if (copy) {
      setShowDuplicateToast(true);
      setTimeout(() => {
        setShowDuplicateToast(false);
        onClose(); // Close existing modal so student can open the duplicated one
      }, 1500);
    }
  };

  const handleSaveTitle = () => {
    if (editingTitleVal.trim()) {
      updateKitTitle(kit.id, editingTitleVal.trim());
      setIsEditingTitle(false);
    }
  };

  // Vocab Actions
  const handleToggleFlip = (id) => {
    setFlippedVocabCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEditVocab = (v) => {
    setEditingVocabId(v.id);
    setEditingVocabData({ term: v.term, definition: v.definition });
  };

  const handleSaveVocab = (id) => {
    const updated = vocabList.map(v => v.id === id ? { ...v, ...editingVocabData } : v);
    updateKitVocab(kit.id, updated);
    setEditingVocabId(null);
  };

  const handleDeleteVocab = (id) => {
    const updated = vocabList.filter(v => v.id !== id);
    updateKitVocab(kit.id, updated);
  };

  const handleAddVocab = () => {
    if (newVocabData.term.trim() && newVocabData.definition.trim()) {
      const newItem = {
        id: 'cv_' + Math.random().toString(36).substr(2, 9),
        term: newVocabData.term.trim(),
        definition: newVocabData.definition.trim()
      };
      updateKitVocab(kit.id, [...vocabList, newItem]);
      setNewVocabData({ term: '', definition: '' });
      setShowAddVocabForm(false);
    }
  };

  // Main Idea Actions
  const handleEditIdea = (idea) => {
    setEditingIdeaId(idea.id);
    setEditingIdeaData({
      title: idea.title,
      explanation: idea.explanation,
      bulletPoints: (idea.bulletPoints || []).join('\n')
    });
  };

  const handleSaveIdea = (id) => {
    const updated = mainIdeas.map(m => m.id === id ? { 
      ...m, 
      title: editingIdeaData.title,
      explanation: editingIdeaData.explanation,
      bulletPoints: editingIdeaData.bulletPoints.split('\n').filter(b => b.trim().length > 0)
    } : m);
    updateKitMainIdeas(kit.id, updated);
    setEditingIdeaId(null);
  };

  const handleDeleteIdea = (id) => {
    const updated = mainIdeas.filter(m => m.id !== id);
    updateKitMainIdeas(kit.id, updated);
  };

  const handleAddIdea = () => {
    if (newIdeaData.title.trim() && newIdeaData.explanation.trim()) {
      const newItem = {
        id: 'mi_' + Math.random().toString(36).substr(2, 9),
        title: newIdeaData.title.trim(),
        explanation: newIdeaData.explanation.trim(),
        bulletPoints: newIdeaData.bulletPoints.split('\n').filter(b => b.trim().length > 0)
      };
      updateKitMainIdeas(kit.id, [...mainIdeas, newItem]);
      setNewIdeaData({ title: '', explanation: '', bulletPoints: '' });
      setShowAddIdeaForm(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={onClose}
            />

            {/* Main Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full h-full max-w-6xl md:h-[92vh] flex flex-col z-10 p-4 md:p-6"
            >
              <GlassCard className="flex-grow flex flex-col border-white/10 overflow-hidden bg-black/60 backdrop-blur-3xl rounded-3xl shadow-2xl relative">
                
                {/* Custom Success Banner */}
                <AnimatePresence>
                  {showDuplicateToast && (
                    <motion.div
                      initial={{ opacity: 0, y: -40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2 z-[130] bg-green-500 text-white font-black py-3 px-8 rounded-full shadow-2xl text-xs uppercase tracking-widest flex items-center gap-3 border border-white/10"
                    >
                      <Check size={16} strokeWidth={3} />
                      Set Duplicated & Unlocked! Loading copy...
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Header */}
                <header className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/[0.01]">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    {activeMode && (
                      <button
                        onClick={() => setActiveMode(null)}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      >
                        <ArrowLeft size={18} />
                      </button>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-cyan-bright uppercase tracking-[0.2em] bg-cyan-bright/5 border border-cyan-bright/10 px-2.5 py-1 rounded-md">
                          <Folder size={10} />
                          {folderName}
                        </div>
                        {isPremade && (
                          <div className="flex items-center gap-1 text-[9px] font-black text-magenta uppercase tracking-widest bg-magenta/5 border border-magenta/10 px-2.5 py-1 rounded-md">
                            <Lock size={10} />
                            Premade Set
                          </div>
                        )}
                      </div>
                      
                      {isEditingTitle && !isPremade ? (
                        <div className="flex items-center gap-3 mt-1.5">
                          <input
                            type="text"
                            value={editingTitleVal}
                            onChange={(e) => setEditingTitleVal(e.target.value)}
                            className="bg-[#1A1A1A] border border-white/20 rounded-xl px-4 py-2 text-xl font-black text-white focus:outline-none focus:border-cyan-bright/50"
                          />
                          <button onClick={handleSaveTitle} className="p-2 bg-cyan-bright/10 text-cyan-bright rounded-xl hover:bg-cyan-bright/20 transition-all">
                            <Check size={16} />
                          </button>
                          <button onClick={() => setIsEditingTitle(false)} className="p-2 bg-white/5 text-zinc-400 rounded-xl hover:bg-white/10 transition-all">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 group mt-1">
                          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{kit.title}</h2>
                          {!isPremade && !activeMode && (
                            <button
                              onClick={() => setIsEditingTitle(true)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-white transition-all cursor-pointer"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto self-end md:self-center">
                    {/* Source materials preview */}
                    <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-white/5">
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sources:</span>
                      <div className="flex gap-1.5">
                        {kit.sources.map(src => (
                          <div key={src} className="p-2 rounded-lg bg-white/[0.03] border border-white/5" title={`Source: ${src}`}>
                            {SOURCE_ICONS[src]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {!isPremade && !activeMode && (
                      <button
                        onClick={() => setIsAddMoreOpen(true)}
                        className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-white/5"
                      >
                        <Plus size={14} strokeWidth={3} />
                        Merge Material
                      </button>
                    )}

                    <button
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all transform hover:rotate-90 cursor-pointer self-end md:self-auto"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto relative flex flex-col md:flex-row min-h-0">
                  {!activeMode ? (
                    <>
                      {/* Left Column: Two study modes content explorer */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/5 min-h-0 overflow-y-auto">
                        
                        {/* Tab Selector */}
                        <div className="flex gap-3 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl mb-8 shrink-0">
                          <button
                            onClick={() => setActiveTab('vocab')}
                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                              activeTab === 'vocab' 
                                ? 'bg-cyan-bright/10 text-cyan-bright border border-cyan-bright/10 shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            ⭐ Key Vocab ({vocabList.length})
                          </button>
                          <button
                            onClick={() => setActiveTab('ideas')}
                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                              activeTab === 'ideas' 
                                ? 'bg-magenta/10 text-magenta border border-magenta/10 shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            🧠 Main Ideas ({mainIdeas.length})
                          </button>
                        </div>

                        {/* Read-only AP syllabus Banner */}
                        {isPremade && (
                          <div className="mb-6 p-4 rounded-2xl bg-magenta/5 border border-magenta/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 animate-in fade-in duration-500">
                            <div className="flex items-start gap-3">
                              <Lock className="text-magenta mt-0.5 shrink-0" size={16} />
                              <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-wider">AP Premium Master Syllabus (Read Only)</h4>
                                <p className="text-[10px] text-zinc-500 font-medium">To modify vocab terms, add notes, or expand this unit, duplicate it to your personal course library.</p>
                              </div>
                            </div>
                            <button
                              onClick={handleDuplicateAndUnlock}
                              className="px-4 py-2.5 rounded-xl bg-magenta/10 hover:bg-magenta/20 text-magenta text-[10px] font-black uppercase tracking-widest border border-magenta/10 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                            >
                              <Copy size={12} />
                              Duplicate & Customize
                            </button>
                          </div>
                        )}

                        {/* Vocab Tab Contents */}
                        <AnimatePresence mode="wait">
                          {activeTab === 'vocab' && (
                            <motion.div
                              key="vocab-tab"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6 flex-1 flex flex-col min-h-0"
                            >
                              {/* Add Vocab Inline Form */}
                              {!isPremade && (
                                <div className="shrink-0">
                                  {showAddVocabForm ? (
                                    <GlassCard className="p-5 border-cyan-bright/20 bg-cyan-bright/[0.01] space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                          type="text"
                                          placeholder="Enter Vocab Term (e.g. Polarity)"
                                          className="bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-cyan-bright/50"
                                          value={newVocabData.term}
                                          onChange={(e) => setNewVocabData({ ...newVocabData, term: e.target.value })}
                                        />
                                        <input
                                          type="text"
                                          placeholder="Enter Definition"
                                          className="bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-cyan-bright/50"
                                          value={newVocabData.definition}
                                          onChange={(e) => setNewVocabData({ ...newVocabData, definition: e.target.value })}
                                        />
                                      </div>
                                      <div className="flex gap-2 justify-end">
                                        <button
                                          onClick={() => setShowAddVocabForm(false)}
                                          className="px-4 py-2 rounded-lg bg-white/5 text-zinc-500 font-bold text-[10px] uppercase hover:bg-white/10"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={handleAddVocab}
                                          className="px-4 py-2 rounded-lg bg-cyan-bright/10 text-cyan-bright border border-cyan-bright/20 font-black text-[10px] uppercase hover:bg-cyan-bright/20"
                                        >
                                          Save Term
                                        </button>
                                      </div>
                                    </GlassCard>
                                  ) : (
                                    <button
                                      onClick={() => setShowAddVocabForm(true)}
                                      className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-cyan-bright hover:border-cyan-bright/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                      <Plus size={14} strokeWidth={3} />
                                      Add Custom Vocab Term
                                    </button>
                                  )}
                                </div>
                              )}

                              {/* Vocab Cards List */}
                              <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[460px]">
                                {vocabList.map((vocab) => {
                                  const isFlipped = !!flippedVocabCards[vocab.id];
                                  const isEditing = editingVocabId === vocab.id;

                                  return (
                                    <GlassCard
                                      key={vocab.id}
                                      className="p-5 border-white/5 hover:border-white/10 transition-all duration-300 relative group overflow-hidden"
                                    >
                                      {isEditing ? (
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                              type="text"
                                              className="bg-[#141414] border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white"
                                              value={editingVocabData.term}
                                              onChange={(e) => setEditingVocabData({ ...editingVocabData, term: e.target.value })}
                                            />
                                            <input
                                              type="text"
                                              className="bg-[#141414] border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white"
                                              value={editingVocabData.definition}
                                              onChange={(e) => setEditingVocabData({ ...editingVocabData, definition: e.target.value })}
                                            />
                                          </div>
                                          <div className="flex gap-2 justify-end">
                                            <button onClick={() => setEditingVocabId(null)} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 font-bold text-[10px] uppercase">
                                              Cancel
                                            </button>
                                            <button onClick={() => handleSaveVocab(vocab.id)} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-bold text-[10px] uppercase">
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                          <div 
                                            onClick={() => handleToggleFlip(vocab.id)} 
                                            className="flex-1 cursor-pointer select-none"
                                          >
                                            {isFlipped ? (
                                              <p className="text-xs font-medium text-zinc-300 leading-relaxed italic animate-in fade-in duration-300">
                                                {vocab.definition}
                                              </p>
                                            ) : (
                                              <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-bright" />
                                                <h4 className="text-sm font-black text-white uppercase tracking-wider">{vocab.term}</h4>
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex items-center gap-3 self-end md:self-auto">
                                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                                              {isFlipped ? 'Answer' : 'Click card to flip'}
                                            </span>
                                            
                                            {!isPremade && (
                                              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-all">
                                                <button
                                                  onClick={() => handleEditVocab(vocab)}
                                                  className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all cursor-pointer"
                                                >
                                                  <Edit2 size={12} />
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteVocab(vocab.id)}
                                                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all cursor-pointer"
                                                >
                                                  <Trash2 size={12} />
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </GlassCard>
                                  );
                                })}

                                {vocabList.length === 0 && (
                                  <div className="py-16 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
                                    No Key Vocab terms found in this set.
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}

                          {activeTab === 'ideas' && (
                            <motion.div
                              key="ideas-tab"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6 flex-1 flex flex-col min-h-0"
                            >
                              {/* Add Concept Inline Form */}
                              {!isPremade && (
                                <div className="shrink-0">
                                  {showAddIdeaForm ? (
                                    <GlassCard className="p-5 border-magenta/20 bg-magenta/[0.01] space-y-4">
                                      <div className="space-y-4">
                                        <input
                                          type="text"
                                          placeholder="Enter Concept Title"
                                          className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-magenta/50"
                                          value={newIdeaData.title}
                                          onChange={(e) => setNewIdeaData({ ...newIdeaData, title: e.target.value })}
                                        />
                                        <textarea
                                          placeholder="Enter General Explanation"
                                          className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-magenta/50 h-20 resize-none"
                                          value={newIdeaData.explanation}
                                          onChange={(e) => setNewIdeaData({ ...newIdeaData, explanation: e.target.value })}
                                        />
                                        <textarea
                                          placeholder="Enter key take-away bullet points (one per line)"
                                          className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-magenta/50 h-20 resize-none"
                                          value={newIdeaData.bulletPoints}
                                          onChange={(e) => setNewIdeaData({ ...newIdeaData, bulletPoints: e.target.value })}
                                        />
                                      </div>
                                      <div className="flex gap-2 justify-end">
                                        <button
                                          onClick={() => setShowAddIdeaForm(false)}
                                          className="px-4 py-2 rounded-lg bg-white/5 text-zinc-500 font-bold text-[10px] uppercase hover:bg-white/10"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={handleAddIdea}
                                          className="px-4 py-2 rounded-lg bg-magenta/10 text-magenta border border-magenta/20 font-black text-[10px] uppercase hover:bg-magenta/20"
                                        >
                                          Save Concept
                                        </button>
                                      </div>
                                    </GlassCard>
                                  ) : (
                                    <button
                                      onClick={() => setShowAddIdeaForm(true)}
                                      className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-magenta hover:border-magenta/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                      <Plus size={14} strokeWidth={3} />
                                      Add Custom Main Concept
                                    </button>
                                  )}
                                </div>
                              )}

                              {/* Main Ideas Accordion List */}
                              <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[460px]">
                                {mainIdeas.map((idea) => {
                                  const isExpanded = expandedIdeaId === idea.id;
                                  const isEditing = editingIdeaId === idea.id;

                                  return (
                                    <GlassCard
                                      key={idea.id}
                                      className="border-white/5 hover:border-white/10 transition-all duration-300 relative group overflow-hidden"
                                    >
                                      {isEditing ? (
                                        <div className="p-5 space-y-4">
                                          <input
                                            type="text"
                                            className="w-full bg-[#141414] border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white"
                                            value={editingIdeaData.title}
                                            onChange={(e) => setEditingIdeaData({ ...editingIdeaData, title: e.target.value })}
                                          />
                                          <textarea
                                            className="w-full bg-[#141414] border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white h-20 resize-none"
                                            value={editingIdeaData.explanation}
                                            onChange={(e) => setEditingIdeaData({ ...editingIdeaData, explanation: e.target.value })}
                                          />
                                          <textarea
                                            className="w-full bg-[#141414] border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white h-20 resize-none"
                                            value={editingIdeaData.bulletPoints}
                                            onChange={(e) => setEditingIdeaData({ ...editingIdeaData, bulletPoints: e.target.value })}
                                          />
                                          <div className="flex gap-2 justify-end">
                                            <button onClick={() => setEditingIdeaId(null)} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 font-bold text-[10px] uppercase">
                                              Cancel
                                            </button>
                                            <button onClick={() => handleSaveIdea(idea.id)} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-bold text-[10px] uppercase">
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-col">
                                          <div
                                            onClick={() => setExpandedIdeaId(isExpanded ? null : idea.id)}
                                            className="p-5 flex justify-between items-center cursor-pointer select-none"
                                          >
                                            <div className="flex items-center gap-3">
                                              <div className="w-1.5 h-1.5 rounded-full bg-magenta" />
                                              <h4 className="text-sm font-black text-white uppercase tracking-wider text-left">{idea.title}</h4>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                              <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                                                {isExpanded ? 'Collapse' : 'Expand'}
                                              </span>
                                              
                                              {!isPremade && (
                                                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-all">
                                                  <button
                                                    onClick={(e) => { e.stopPropagation(); handleEditIdea(idea); }}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all cursor-pointer"
                                                  >
                                                    <Edit2 size={12} />
                                                  </button>
                                                  <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteIdea(idea.id); }}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all cursor-pointer"
                                                  >
                                                    <Trash2 size={12} />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          </div>

                                          <AnimatePresence>
                                            {isExpanded && (
                                              <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden border-t border-white/5 bg-white/[0.005]"
                                              >
                                                <div className="p-6 space-y-4">
                                                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                                                    {idea.explanation}
                                                  </p>
                                                  {idea.bulletPoints && idea.bulletPoints.length > 0 && (
                                                    <ul className="space-y-2 border-l border-magenta/20 pl-4 py-1">
                                                      {idea.bulletPoints.map((bullet, bIdx) => (
                                                        <li key={bIdx} className="text-[11px] text-zinc-400 leading-relaxed flex gap-2">
                                                          <span className="text-magenta">•</span>
                                                          <span>{bullet}</span>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  )}
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      )}
                                    </GlassCard>
                                  );
                                })}

                                {mainIdeas.length === 0 && (
                                  <div className="py-16 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
                                    No Main Ideas added yet in this set.
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Right Column: Interactive Study Modes selector */}
                      <aside className="w-full md:w-80 p-6 md:p-8 flex flex-col shrink-0 overflow-y-auto">
                        <div className="mb-8">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2">Practice Hub</h3>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-relaxed">
                            Pick an optimized strategy to review this set. Modes automatically adapt to your vocab and concepts list.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {MODES.map((mode) => {
                            // Check if there is data to launch study modes
                            const isDisabled = 
                              (mode.id === 'flashcards' && vocabList.length === 0) ||
                              (mode.id === 'guide' && mainIdeas.length === 0);

                            return (
                              <button
                                key={mode.id}
                                disabled={isDisabled}
                                onClick={() => setActiveMode(mode.id)}
                                className={`w-full group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 text-left overflow-hidden cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`${mode.bg} ${mode.color} w-11 h-11 rounded-xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                                    {mode.icon}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-wider">{mode.name}</h4>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                                      {mode.id === 'guide' && 'Main Ideas Review'}
                                      {mode.id === 'flashcards' && 'Key Vocab Drill'}
                                      {mode.id === 'self-study' && 'Active Recall Quiz'}
                                      {mode.id === 'test' && 'Full Exam Mode'}
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                                  <ChevronRight size={14} className={mode.color} strokeWidth={3} />
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Mastery status info */}
                        <div className="mt-auto pt-8 border-t border-white/5">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Unit Mastery</span>
                            <span className="text-xs font-black text-white">{kit.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-bright to-magenta"
                              initial={{ width: 0 }}
                              animate={{ width: `${kit.progress}%` }}
                            />
                          </div>
                        </div>
                      </aside>
                    </>
                  ) : (
                    /* Study mode active */
                    <div className="flex-grow p-6 md:p-12 overflow-y-auto">
                      {activeMode === 'guide' && <StudyGuideView kit={kit} />}
                      {activeMode === 'flashcards' && <FlashcardView kit={kit} />}
                      {activeMode === 'self-study' && <SelfStudyView kit={kit} />}
                      {activeMode === 'test' && <TestView kit={kit} />}
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded CreateKitModal to allow expanding/merging materials into the set */}
      <CreateKitModal
        isOpen={isAddMoreOpen}
        onClose={() => setIsAddMoreOpen(false)}
        kitId={kit.id}
      />
    </>
  );
};

export default StudyHubModal;
