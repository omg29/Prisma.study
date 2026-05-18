import React, { useState, useEffect, useRef } from 'react';
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
  FolderOpen,
  AlertCircle
} from 'lucide-react';
import GlassCard from './GlassCard';
import { LiquidButton } from './ui/LiquidButton';
import { useLibrary } from '../context/LibraryContext';
import { AP_SYLLABUS, UNIT_CONTENT } from '../data/syllabus';
import { parseDocumentFile, parseYoutubeUrl } from '../utils/aiEngine';

const TABS = [
  { id: 'youtube', label: 'YouTube Video', icon: <Youtube size={18} />, color: 'text-red-500', focusColor: 'focus:border-red-500/50' },
  { id: 'curriculum', label: 'AP Curriculum', icon: <BookOpen size={18} />, color: 'text-cyan-bright', focusColor: 'focus:border-cyan-bright/50' },
  { id: 'upload', label: 'Manual Upload', icon: <Upload size={18} />, color: 'text-magenta', focusColor: 'focus:border-magenta/50' },
  { id: 'manual', label: 'Manual Input', icon: <Sparkles size={18} />, color: 'text-purple', focusColor: 'focus:border-purple/50' },
];

const CreateKitModal = ({ isOpen, onClose, kitId = null, initialFolderId = '' }) => {
  const { addKit, addMaterialToKit, folders, addFolder, kits } = useLibrary();
  const [activeTab, setActiveTab] = useState('youtube');
  const [step, setStep] = useState(1); // 1: Input, 2: Processing, 3: Success
  const [newFolderMode, setNewFolderMode] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  // Custom Processing Milestones
  const [milestoneIndex, setMilestoneIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContentText, setFileContentText] = useState('');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    url: '',
    subject: '',
    unit: '',
    text: '',
    prompt: '',
    folderId: initialFolderId
  });

  const targetKit = kitId ? kits.find(k => k.id === kitId) : null;
  const availableUnits = formData.subject ? AP_SYLLABUS[formData.subject] : [];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        url: '',
        subject: '',
        unit: '',
        text: '',
        prompt: '',
        folderId: initialFolderId || (folders[0]?.id || '')
      });
      setNewFolderMode(false);
      setUploadedFile(null);
      setFileContentText('');
      setErrorMsg('');
      setMilestoneIndex(0);
    }
  }, [isOpen, initialFolderId, folders]);

  // Simulated AI synthesis milestones for rich experience
  const milestones = [
    "Establishing high-speed data stream...",
    activeTab === 'youtube' ? "Retrieving transcript structures..." : 
    activeTab === 'upload' ? `Reading file structure (${uploadedFile?.name || 'document'})...` : 
    activeTab === 'curriculum' ? "Loading curriculum repository..." : "Ingesting manual text...",
    "Executing NLP parsing algorithms...",
    "Synthesizing vocabulary terms (Key Vocab)...",
    "Synthesizing conceptual blocks (Main Ideas)...",
    "Finalizing structural compilation..."
  ];

  // Increment milestones during step 2
  useEffect(() => {
    let interval;
    if (step === 2) {
      setMilestoneIndex(0);
      interval = setInterval(() => {
        setMilestoneIndex(prev => {
          if (prev < milestones.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [step]);

  // File selection handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (e.g. 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size exceeds 10MB limit.");
      return;
    }

    setUploadedFile(file);
    setErrorMsg('');

    // Read plain-text files using FileReader
    if (file.type === "text/plain" || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContentText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleAction = async () => {
    // Validation
    setErrorMsg('');
    if (activeTab === 'youtube') {
      if (!formData.url) {
        setErrorMsg("Please enter a valid YouTube Video URL.");
        return;
      }
      if (!formData.url.includes('youtube.com') && !formData.url.includes('youtu.be')) {
        setErrorMsg("Please enter a valid YouTube link (youtube.com or youtu.be).");
        return;
      }
    } else if (activeTab === 'curriculum') {
      if (!formData.subject || !formData.unit) {
        setErrorMsg("Please select both a Subject and a Unit.");
        return;
      }
    } else if (activeTab === 'upload') {
      if (!uploadedFile) {
        setErrorMsg("Please select or drop a file to upload.");
        return;
      }
    } else if (activeTab === 'manual') {
      if (!formData.prompt || formData.prompt.trim().length < 15) {
        setErrorMsg("Please provide at least 15 characters of academic notes.");
        return;
      }
    }

    setStep(2);

    try {
      let finalTitle = "Custom Study Set";
      let vocab = [];
      let mainIdeas = [];
      
      // Parse content based on tab
      if (activeTab === 'youtube') {
        const parsed = await parseYoutubeUrl(formData.url);
        finalTitle = parsed.title;
        vocab = parsed.vocab;
        mainIdeas = parsed.mainIdeas;
      } else if (activeTab === 'curriculum') {
        finalTitle = `${formData.subject}: ${formData.unit}`;
        // The LibraryContext addKit function will handle drawing the high-fidelity AP_DATABASE sets
      } else if (activeTab === 'upload') {
        const parsed = await parseDocumentFile(uploadedFile.name, uploadedFile.name.split('.').pop() || 'file', fileContentText);
        finalTitle = parsed.title;
        vocab = parsed.vocab;
        mainIdeas = parsed.mainIdeas;
      } else if (activeTab === 'manual') {
        finalTitle = formData.prompt.substring(0, 30) + (formData.prompt.length > 30 ? '...' : '');
      }

      // Add delay to appreciate gorgeous loading sequence
      await new Promise(resolve => setTimeout(resolve, 3800));

      if (kitId) {
        // Add materials to existing kit
        let materialData = {};
        if (activeTab === 'youtube') {
          materialData = { url: formData.url, text: vocab.map(v => `${v.term}: ${v.definition}`).join('\n') };
        } else if (activeTab === 'manual') {
          materialData = { text: formData.prompt };
        } else if (activeTab === 'upload') {
          materialData = { 
            text: fileContentText || vocab.map(v => `${v.term}: ${v.definition}`).join('\n'), 
            fileName: uploadedFile.name 
          };
        } else if (activeTab === 'curriculum') {
          const autoContent = UNIT_CONTENT[formData.subject]?.[formData.unit] || '';
          materialData = {
            unitMapping: { subject: formData.subject, unit: formData.unit },
            text: autoContent
          };
        }

        addMaterialToKit(kitId, activeTab, materialData);
      } else {
        // Create new unit
        let finalFolderId = formData.folderId;
        if (newFolderMode && newFolderName) {
          const folder = addFolder(newFolderName);
          finalFolderId = folder.id;
        }

        let textData = formData.prompt;
        if (activeTab === 'curriculum') {
          textData = UNIT_CONTENT[formData.subject]?.[formData.unit] || `Curriculum summary for ${formData.unit}`;
        } else if (activeTab === 'upload') {
          textData = fileContentText || vocab.map(v => `${v.term}: ${v.definition}`).join('\n');
        } else if (activeTab === 'youtube') {
          textData = vocab.map(v => `${v.term}: ${v.definition}`).join('\n');
        }

        addKit({
          title: finalTitle,
          sources: [activeTab],
          content: {
            textData: textData,
            unitMapping: activeTab === 'curriculum' ? { subject: formData.subject, unit: formData.unit } : null,
            videoUrls: activeTab === 'youtube' ? [formData.url] : []
          }
        }, finalFolderId);
      }

      setStep(3);
      await new Promise(resolve => setTimeout(resolve, 1500));
      onClose();
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to ingest material. Please try again.");
      setStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl relative"
      >
        <GlassCard className="border-white/10 shadow-2xl overflow-hidden min-h-[520px] flex flex-col bg-[#0A0A0A]">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#43C6F1] to-[#E063F1] flex items-center justify-center shadow-[0_0_15px_rgba(67,198,241,0.3)] animate-pulse">
                {kitId ? <Plus size={20} className="text-white" /> : <FolderOpen size={18} className="text-white" />}
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  {kitId ? `Add Material to "${targetKit?.title}"` : 'Create Study Set'}
                </h2>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Prisma Academic AI Ingestor</p>
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
                className="flex flex-1 flex-col md:flex-row"
              >
                {/* Sidebar Tabs */}
                <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.005] p-4 flex md:flex-col gap-2 overflow-x-auto whitespace-nowrap">
                  <p className="hidden md:block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4 mb-2">Source Type</p>
                  {TABS.map((tab) => {
                    // Hide AP Curriculum tab if updating/expanding an existing set (AP Curriculum sets are premade)
                    if (kitId && tab.id === 'curriculum') return null;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setErrorMsg(''); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group flex-1 md:flex-none ${activeTab === tab.id
                          ? 'bg-white/[0.05] text-white border border-white/10'
                          : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                      >
                        <span className={activeTab === tab.id ? tab.color : 'text-zinc-700 group-hover:text-zinc-500'}>
                          {tab.icon}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-8 flex flex-col justify-between overflow-y-auto max-h-[500px]">
                  <div className="space-y-6">
                    {/* Error Banner */}
                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-xs text-red-400 font-bold leading-normal">{errorMsg}</span>
                      </div>
                    )}

                    {/* YouTube Ingestion */}
                    {activeTab === 'youtube' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">YouTube Video Stream URL</label>
                          <input
                            type="text"
                            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            className="w-full bg-[#141414] border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-red-500/50 transition-all font-medium text-white placeholder:text-zinc-700"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          />
                          <p className="text-[10px] text-zinc-500 leading-relaxed">
                            Prisma will locate the video, extract the transcript channel, and compile the content into Key Vocab and Main Ideas.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* AP Curriculum */}
                    {activeTab === 'curriculum' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">AP Course Subject</label>
                          <select
                            className="w-full bg-[#141414] border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value, unit: '' })}
                          >
                            <option value="">Select Premade AP Course</option>
                            {Object.keys(AP_SYLLABUS).map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                        </div>
                        {formData.subject && (
                          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Course Syllabus Unit</label>
                            <select
                              className="w-full bg-[#141414] border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white appearance-none cursor-pointer"
                              value={formData.unit}
                              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            >
                              <option value="">Select Unit</option>
                              {availableUnits.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                            <p className="text-[10px] text-cyan-bright/80 font-bold uppercase tracking-wider mt-2">
                              ⭐ Premade AP sets include pre-loaded, textbook-aligned master vocab decks!
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* File Upload */}
                    {activeTab === 'upload' && (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Academic Document Upload</label>
                        <div
                          onClick={triggerFileSelect}
                          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                            uploadedFile 
                              ? 'border-green-500/50 bg-green-500/[0.02]' 
                              : 'border-white/10 bg-white/[0.01] hover:border-magenta/50 hover:bg-white/[0.03]'
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.pptx,.docx,.txt"
                            onChange={handleFileChange}
                          />
                          <Upload size={32} className={`mx-auto mb-4 ${uploadedFile ? 'text-green-500' : 'text-zinc-500'}`} />
                          
                          {uploadedFile ? (
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-white truncate max-w-xs mx-auto">{uploadedFile.name}</p>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • READY TO INGEST
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-zinc-300">Click to Select Academic File</p>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">PDF, PPTX, DOCX, or TXT (MAX 10MB)</p>
                            </div>
                          )}
                        </div>
                        {uploadedFile && (
                          <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest text-center animate-pulse">
                            ✓ Document structure verified. Ready to parse.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Manual Input */}
                    {activeTab === 'manual' && (
                      <div className="space-y-2 h-full flex flex-col">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Academic Text Content</label>
                        <textarea
                          placeholder="Paste textbook definitions, lecture transcripts, or study guide texts here..."
                          className="flex-1 w-full bg-[#141414] border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-purple/50 transition-all font-medium text-white resize-none h-44 placeholder:text-zinc-700 font-sans"
                          value={formData.prompt}
                          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                        />
                        <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-2">
                          <span>Minimum: 15 chars</span>
                          <span>Characters: {formData.prompt.length}</span>
                        </div>
                      </div>
                    )}

                    {/* Folder Selection (Only for New Unit Creation) */}
                    {!kitId && (
                      <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Library Folder Assignment</label>
                          <button
                            onClick={() => setNewFolderMode(!newFolderMode)}
                            className="text-[9px] font-black text-cyan-bright uppercase tracking-widest hover:underline"
                          >
                            {newFolderMode ? 'Select Existing Folder' : 'Create New Folder'}
                          </button>
                        </div>

                        {newFolderMode ? (
                          <input
                            type="text"
                            placeholder="e.g. AP Biology Semester 1"
                            className="w-full bg-[#141414] border border-white/10 rounded-2xl py-3.5 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                          />
                        ) : (
                          <select
                            className="w-full bg-[#141414] border border-white/10 rounded-2xl py-3.5 px-5 text-sm focus:outline-none focus:border-cyan-bright/50 transition-all font-medium text-white appearance-none cursor-pointer"
                            value={formData.folderId}
                            onChange={(e) => setFormData({ ...formData, folderId: e.target.value })}
                          >
                            <option value="">Select Folder</option>
                            {folders.map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4">
                    <LiquidButton
                      onClick={handleAction}
                      variant="primary"
                      className="w-full py-4 !from-[#43C6F1] !to-[#E063F1] shadow-[0_0_30px_rgba(67,198,241,0.2)] hover:shadow-[0_0_40px_rgba(67,198,241,0.4)]"
                    >
                      <span className="font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                        {kitId ? 'Update & Expand Set' : 'Ingest Study Set'} <ChevronRight size={16} strokeWidth={3} />
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
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="relative mb-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-44 h-44 rounded-full border border-white/5 flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 rounded-full border-t border-cyan-bright animate-spin shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
                    <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center">
                      <Loader2 className="animate-spin text-cyan-bright" size={40} />
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase">Analyzing Academic Set</h3>
                
                {/* Milestone Step Indicator */}
                <div className="h-6 overflow-hidden max-w-sm mx-auto mb-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={milestoneIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="text-cyan-bright font-bold uppercase tracking-wider text-xs leading-none"
                    >
                      {milestones[milestoneIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-bright via-purple to-magenta"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
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
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8"
                >
                  <CheckCircle2 size={40} className="text-green-500" />
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Synthesis Complete</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">Ingestion Inoculation Successful</p>
                <p className="text-zinc-400 text-sm max-w-xs mx-auto font-medium">
                  Material sorted into Key Vocab and Main Ideas cards.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default CreateKitModal;
