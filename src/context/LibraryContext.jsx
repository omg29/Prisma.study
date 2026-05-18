import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { parseRawText, AP_DATABASE } from '../utils/aiEngine';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [kits, setKits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load user-specific data whenever user changes
  useEffect(() => {
    if (user?.id) {
      const storedFolders = localStorage.getItem(`prisma_folders_${user.id}`);
      const storedKits = localStorage.getItem(`prisma_kits_${user.id}`);

      setFolders(storedFolders ? JSON.parse(storedFolders) : []);
      setKits(storedKits ? JSON.parse(storedKits) : []);
    } else {
      setFolders([]);
      setKits([]);
    }
  }, [user?.id]);

  // Persist folders to user-specific storage
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`prisma_folders_${user.id}`, JSON.stringify(folders));
    }
  }, [folders, user?.id]);

  // Persist kits to user-specific storage
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`prisma_kits_${user.id}`, JSON.stringify(kits));
    }
  }, [kits, user?.id]);

  const addFolder = (name) => {
    const newFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      kitIds: []
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  };

  const addKit = (kitData, folderId) => {
    // Process content to extract Key Vocab and Main Ideas
    let vocab = [];
    let mainIdeas = [];
    let isPremade = false;

    const activeSource = kitData.sources?.[0] || 'manual';

    if (activeSource === 'curriculum' && kitData.content?.unitMapping) {
      const { subject, unit } = kitData.content.unitMapping;
      const premadeData = AP_DATABASE[subject]?.[unit];
      if (premadeData) {
        vocab = JSON.parse(JSON.stringify(premadeData.vocab));
        mainIdeas = JSON.parse(JSON.stringify(premadeData.mainIdeas));
        isPremade = true;
      } else {
        // Fallback parsing of curriculum unit text
        const text = kitData.content.textData || '';
        const parsed = parseRawText(text, `${subject}: ${unit}`);
        vocab = parsed.vocab;
        mainIdeas = parsed.mainIdeas;
        isPremade = true;
      }
    } else {
      // Manual entry, YouTube, or File upload
      const text = kitData.content?.textData || '';
      const parsed = parseRawText(text, kitData.title);
      vocab = parsed.vocab;
      mainIdeas = parsed.mainIdeas;
    }

    const newKit = {
      ...kitData,
      id: Math.random().toString(36).substr(2, 9),
      folderId,
      lastAccessed: new Date(),
      progress: 0,
      sources: kitData.sources || [],
      isPremade,
      content: {
        ...kitData.content,
        vocab,
        mainIdeas
      }
    };

    setKits(prev => [newKit, ...prev]);
    setFolders(prev => prev.map(f => f.id === folderId ? { ...f, kitIds: [...f.kitIds, newKit.id] } : f));
    return newKit;
  };

  const addMaterialToKit = (kitId, source, materialData) => {
    setKits(prev => prev.map(k => {
      if (k.id === kitId) {
        // Safeguard: locked premade set check
        if (k.isPremade) return k;

        const newSources = k.sources.includes(source) ? k.sources : [...k.sources, source];
        const newContent = { ...k.content };

        // Parse new material
        let newVocab = [];
        let newMainIdeas = [];

        if (source === 'youtube') {
          newContent.videoUrls = [...(newContent.videoUrls || []), materialData.url];
          const text = materialData.text || `YouTube Video content from ${materialData.url}`;
          const parsed = parseRawText(text, "Added Video Content");
          newVocab = parsed.vocab;
          newMainIdeas = parsed.mainIdeas;
        } else if (source === 'manual') {
          newContent.textData = (newContent.textData || '') + `\n${materialData.text}`;
          const parsed = parseRawText(materialData.text, "Manual Addition");
          newVocab = parsed.vocab;
          newMainIdeas = parsed.mainIdeas;
        } else if (source === 'upload') {
          newContent.textData = (newContent.textData || '') + `\n${materialData.text}`;
          const parsed = parseRawText(materialData.text, materialData.fileName || "Uploaded File");
          newVocab = parsed.vocab;
          newMainIdeas = parsed.mainIdeas;
        } else if (source === 'curriculum') {
          newContent.unitMapping = materialData.unitMapping;
          const text = materialData.text || '';
          const parsed = parseRawText(text, "Curriculum Content");
          newVocab = parsed.vocab;
          newMainIdeas = parsed.mainIdeas;
        }

        // Merge vocab (avoiding exact term duplicates)
        const existingTerms = new Set(newContent.vocab?.map(v => v.term.toLowerCase()) || []);
        const filteredNewVocab = newVocab.filter(v => !existingTerms.has(v.term.toLowerCase()));
        newContent.vocab = [...(newContent.vocab || []), ...filteredNewVocab];

        // Merge main ideas (avoiding exact title duplicates)
        const existingTitles = new Set(newContent.mainIdeas?.map(m => m.title.toLowerCase()) || []);
        const filteredNewMainIdeas = newMainIdeas.filter(m => !existingTitles.has(m.title.toLowerCase()));
        newContent.mainIdeas = [...(newContent.mainIdeas || []), ...filteredNewMainIdeas];

        return {
          ...k,
          sources: newSources,
          content: newContent,
          lastAccessed: new Date()
        };
      }
      return k;
    }));
  };

  const updateKitVocab = (kitId, vocabList) => {
    setKits(prev => prev.map(k => k.id === kitId ? {
      ...k,
      content: { ...k.content, vocab: vocabList },
      lastAccessed: new Date()
    } : k));
  };

  const updateKitMainIdeas = (kitId, mainIdeasList) => {
    setKits(prev => prev.map(k => k.id === kitId ? {
      ...k,
      content: { ...k.content, mainIdeas: mainIdeasList },
      lastAccessed: new Date()
    } : k));
  };

  const updateKitTitle = (kitId, newTitle) => {
    setKits(prev => prev.map(k => k.id === kitId ? {
      ...k,
      title: newTitle,
      lastAccessed: new Date()
    } : k));
  };

  const updateKitProgress = (kitId, progress) => {
    setKits(prev => prev.map(k => k.id === kitId ? {
      ...k,
      progress: progress,
      lastAccessed: new Date()
    } : k));
  };

  const duplicateKit = (kitId) => {
    const original = kits.find(k => k.id === kitId);
    if (!original) return null;

    const duplicated = {
      ...original,
      id: Math.random().toString(36).substr(2, 9),
      title: `${original.title} (Copy)`,
      isPremade: false, // Make fully editable duplicate
      lastAccessed: new Date(),
      progress: 0,
      content: JSON.parse(JSON.stringify(original.content))
    };

    setKits(prev => [duplicated, ...prev]);
    if (original.folderId) {
      setFolders(prev => prev.map(f => f.id === original.folderId ? { ...f, kitIds: [...f.kitIds, duplicated.id] } : f));
    }
    return duplicated;
  };

  const moveKitToFolder = (kitId, newFolderId) => {
    setKits(prev => prev.map(k => k.id === kitId ? { ...k, folderId: newFolderId } : k));
    setFolders(prev => prev.map(f => {
      const removedKit = f.kitIds.filter(id => id !== kitId);
      const addedKit = f.id === newFolderId ? [...f.kitIds, kitId] : f.kitIds;
      return { ...f, kitIds: f.id === newFolderId ? addedKit : removedKit };
    }));
  };

  const deleteKit = (id) => {
    setKits(prev => prev.filter(k => k.id !== id));
    setFolders(prev => prev.map(f => ({ ...f, kitIds: f.kitIds.filter(kid => kid !== id) })));
  };

  const filteredKits = useMemo(() => {
    return kits.filter(kit => {
      const folder = folders.find(f => f.id === kit.folderId);
      const folderName = folder ? folder.name : '';
      const matchesSearch = kit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (kit.content?.unitMapping?.subject?.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    }).sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
  }, [kits, folders, searchQuery]);

  const recentKits = useMemo(() => {
    return [...kits].sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed)).slice(0, 3);
  }, [kits]);

  return (
    <LibraryContext.Provider value={{
      folders,
      kits,
      filteredKits,
      recentKits,
      searchQuery,
      setSearchQuery,
      addFolder,
      addKit,
      addMaterialToKit,
      moveKitToFolder,
      deleteKit,
      updateKitVocab,
      updateKitMainIdeas,
      updateKitTitle,
      updateKitProgress,
      duplicateKit
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
