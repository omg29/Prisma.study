import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Youtube,
  BookOpen,
  Upload,
  Sparkles,
  ChevronRight,
  FileText,
  CheckCircle2,
  Loader2,
  Plus,
  FolderOpen
} from 'lucide-react';
import GlassCard from './GlassCard';
import { LiquidButton } from './ui/LiquidButton';
import { useLibrary } from '../context/LibraryContext';
import { AP_SYLLABUS, UNIT_CONTENT } from '../data/syllabus';

const TABS = [
  { id: 'youtube', label: 'YouTube Video', icon: <Youtube size={18} />, color: 'text-red-500' },
  { id: 'curriculum', label: 'AP Curriculum', icon: <BookOpen size={18} />, color: 'text-cyan-bright' },
  { id: 'upload', label: 'Manual Upload', icon: <Upload size={18} />, color: 'text-magenta' },
  { id: 'manual', label: 'Manual Input', icon: <Sparkles size={18} />, color: 'text-purple' },
];

const CreateKitModal = ({ isOpen, onClose, kitId = null, initialFolderId = '' }) => {
  const { addKit, addMaterialToKit, folders, addFolder } = useLibrary();
  const [activeTab, setActiveTab] = useState('youtube');
  const [step, setStep] = useState(1); // 1: Input, 2: Processing, 3: Filing/Success
  const [newFolderMode, setNewFolderMode] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [formData, setFormData] = useState({
    url: '',
    subject: '',
    unit: '',
    text: '',
    prompt: '',
    folderId: initialFolderId
  });

  const availableUnits = formData.subject ? AP_SYLLABUS[formData.subject] : [];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ url: '', subject: '', unit: '', text: '', prompt: '', folderId: initialFolderId });
      setNewFolderMode(false);
    }
  }, [isOpen, initialFolderId]);

  const handleAction = async () => {
    setStep(2);
    // Simulate high-fidelity ingestion
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (kitId) {
      // Add materials to existing kit
      let materialData = {};
      if (activeTab === 'youtube') materialData = { url: formData.url };
      if (activeTab === 'manual') materialData = { text: formData.prompt };
      if (activeTab === 'curriculum') {
        const autoContent = UNIT_CONTENT[formData.subject]?.[formData.unit] || '';
        materialData = {
          unitMapping: { subject: formData.subject, unit: formData.unit },
          text: autoContent
        };
      }

      addMaterialToKit(kitId, activeTab, materialData);
      setStep(3);
    } else {
      // Create new unit
      let finalFolderId = formData.folderId;
      if (newFolderMode && newFolderName) {
        const folder = addFolder(newFolderName);
        finalFolderId = folder.id;
      }

      let title = "New Course Unit";
      let textData = formData.prompt;

      if (activeTab === 'youtube') title = "Video Analysis: " + (formData.url.substring(0, 15));
      if (activeTab === 'curriculum') {
        title = `${formData.subject}: ${formData.unit || 'Topic Study'}`;
        textData = UNIT_CONTENT[formData.subject]?.[formData.unit] || `Curriculum summary for ${formData.unit}`;
      }
      if (activeTab === 'manual') title = formData.prompt.substring(0, 30);

      addKit({
        title,
        sources: [activeTab],
        content: {
          textData: textData,
          unitMapping: activeTab === 'curriculum' ? { subject: formData.subject, unit: formData.unit } : null,
          videoUrls: activeTab === 'youtube' ? [formData.url] : []
        }
      }, finalFolderId);

      setStep(3);
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl relative"
      >
        <GlassCard className="border-white/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col bg-[#0A0A0A]">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#43C6F1] to-[#E063F1] flex items-center justify-center shadow-[0_0_15px_rgba(67,198,241,0.3)]">
                <Plus size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  {kitId ? 'Update Unit Content' : 'Create Course Unit'}
                </h2>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Prisma Academic Unit Ingestion</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X size={20} className="text-zinc-500" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-1"
              >
                {/* Sidebar Tabs */}
                <div className="w-52 border-r border-white/5 bg-white/[0.01] p-4 flex flex-col gap-2">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4 mb-2">Source Type</p>
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${activeTab === tab.id
                        ? 'bg-white/[0.05] text-white border border-white/10'
                        : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                      <span className={activeTab === tab.id ? tab.color : 'text-zinc-700 group-hover:text-zinc-500'}>
                        {tab.icon}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-8 flex flex-col overflow-y-auto">
                  {/* Inputs based on Active Tab */}
                  <div className="flex-1 space-y-6">
                    {activeTab === 'youtube' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Video Stream URL</label>
                          <input
                            type="text"
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white placeholder:text-zinc-700"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'curriculum' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">AP Subject Selection</label>
                          <select
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value, unit: '' })}
                          >
                            <option value="" className="bg-[#1A1A1A]">Select AP Subject</option>
                            {Object.keys(AP_SYLLABUS).map(sub => (
                              <option key={sub} value={sub} className="bg-[#1A1A1A]">{sub}</option>
                            ))}
                          </select>
                        </div>
                        {formData.subject && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Master Syllabus Unit</label>
                            <select
                              className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white appearance-none cursor-pointer"
                              value={formData.unit}
                              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            >
                              <option value="" className="bg-[#1A1A1A]">Select Master Unit</option>
                              {availableUnits.map(unit => (
                                <option key={unit} value={unit} className="bg-[#1A1A1A]">{unit}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'manual' && (
                      <div className="space-y-2 h-full flex flex-col">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Academic Content Input</label>
                        <textarea
                          placeholder="Paste your study notes or type academic content here..."
                          className="flex-1 w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-5 px-5 text-sm focus:outline-none focus:border-purple/50 transition-all font-medium text-white resize-none h-48 placeholder:text-zinc-700"
                          value={formData.prompt}
                          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Folder Selection (Only for New Unit) */}
                    {!kitId && (
                      <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Course Selection</label>
                          <button
                            onClick={() => setNewFolderMode(!newFolderMode)}
                            className="text-[9px] font-black text-cyan-bright uppercase tracking-widest hover:underline"
                          >
                            {newFolderMode ? 'Select Existing' : 'Create New Course'}
                          </button>
                        </div>

                        {newFolderMode ? (
                          <input
                            type="text"
                            placeholder="e.g. AP World History"
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                          />
                        ) : (
                          <select
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white appearance-none cursor-pointer"
                            value={formData.folderId}
                            onChange={(e) => setFormData({ ...formData, folderId: e.target.value })}
                          >
                            <option value="">Select Course</option>
                            {folders.map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <LiquidButton
                      onClick={handleAction}
                      variant="primary"
                      className="w-full py-4 !from-[#43C6F1] !to-[#E063F1] shadow-[0_0_30px_rgba(67,198,241,0.2)]"
                    >
                      <span className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                        {kitId ? 'Update Unit Metadata' : 'Integrate Course Unit'} <ChevronRight size={16} strokeWidth={3} />
                      </span>
                    </LiquidButton>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="relative mb-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-44 h-44 rounded-full border border-white/5 flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 rounded-full border-t border-cyan-bright animate-spin shadow-[0_0_20px_rgba(34,211,238,0.2)]" />
                    <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center">
                      <Loader2 className="animate-spin text-cyan-bright" size={40} />
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Analyzing Academic Unit</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Updating Course Library...</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8"
                >
                  <CheckCircle2 size={40} className="text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Course Updated</h3>
                <p className="text-zinc-500 font-medium">Unit successfully integrated into your repository.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default CreateKitModal;
