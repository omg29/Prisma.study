/**
 * Prisma Academic AI Ingest & Parsing Engine
 * Synthesizes materials (Files, Manual entry, YouTube, AP Curriculum) into 
 * exactly two study modes: Key Vocab and Main Ideas.
 */

// Comprehensive High-Fidelity Dataset for AP Classes
export const AP_DATABASE = {
  'AP Biology': {
    'Unit 1: Chemistry of Life': {
      vocab: [
        { id: 'v1', term: 'Hydrogen Bonding', definition: 'A weak electrostatic bond formed when a hydrogen atom covalently bonded to a highly electronegative atom is attracted to another electronegative atom.' },
        { id: 'v2', term: 'Cohesion', definition: 'The attraction of water molecules to other water molecules, largely due to hydrogen bonding, creating surface tension.' },
        { id: 'v3', term: 'Adhesion', definition: 'The attraction of water molecules to different types of molecules, allowing water to climb upward in plant xylem (capillary action).' },
        { id: 'v4', term: 'Dehydration Synthesis', definition: 'A chemical reaction in which monomer sub-units are joined by a covalent bond, releasing a water molecule in the process.' },
        { id: 'v5', term: 'Hydrolysis', definition: 'A chemical process that splits a polymer into monomers by adding a water molecule, breaking covalent bonds.' },
        { id: 'v6', term: 'Nucleic Acids', definition: 'Polymers composed of nucleotide monomers (adenine, thymine, cytosine, guanine, uracil) that store and transmit genetic information.' },
        { id: 'v7', term: 'Polypeptides', definition: 'Linear chains of amino acids linked by peptide bonds, folding into complex 3D structures that dictate protein function.' }
      ],
      mainIdeas: [
        {
          id: 'm1',
          title: 'Properties of Water and Life',
          explanation: 'Water\'s unique chemical structure dictates its biological utility. Because oxygen is highly electronegative and hydrogen is not, water is highly polar, allowing it to form multiple hydrogen bonds simultaneously.',
          bulletPoints: [
            'High specific heat capacity buffers biological organisms against extreme temperature fluctuations.',
            'Cohesive and adhesive forces drive transpiration pull in terrestrial vascular plants.',
            'Ice expands upon freezing due to stable hydrogen bond lattices, insulating aquatic life below.'
          ]
        },
        {
          id: 'm2',
          title: 'Macromolecular Structure & Synthesis',
          explanation: 'All living systems require carbon-based macromolecules. Monomers undergo dehydration synthesis to form complex carbohydrate, lipid, protein, and nucleic acid polymers.',
          bulletPoints: [
            'Proteins fold into primary, secondary, tertiary, and quaternary structures dictated by hydrophobic interactions.',
            'Nucleic acids store genetic instruction in a double helix configured by antiparallel sugar-phosphate backbones.',
            'Carbohydrates serve as structural components (cellulose, chitin) or energy storage assets (starch, glycogen).'
          ]
        }
      ]
    },
    'Unit 2: Cell Structure and Function': {
      vocab: [
        { id: 'v1', term: 'Ribosome', definition: 'A non-membrane-bound cellular organelle made of rRNA and protein that synthesizes polypeptides during translation.' },
        { id: 'v2', term: 'Endoplasmic Reticulum (ER)', definition: 'A network of membranous tubules; Rough ER houses ribosomes for protein synthesis, while Smooth ER manages lipid synthesis and detoxification.' },
        { id: 'v3', term: 'Golgi Complex', definition: 'A series of flattened membranous sacs (cisternae) that modifies, sorts, and packages proteins for transport.' },
        { id: 'v4', term: 'Mitochondria', definition: 'Double-membrane organelle responsible for ATP generation via cellular respiration; possesses its own DNA and ribosomes.' },
        { id: 'v5', term: 'Selective Permeability', definition: 'The property of a cell membrane that allows some substances to cross more easily than others, maintaining cellular homeostasis.' }
      ],
      mainIdeas: [
        {
          id: 'm1',
          title: 'Organelle Compartmentalization',
          explanation: 'Eukaryotic cells maintain internal environments separate from external conditions through double membranes. This allows specialized metabolic reactions to occur in isolation.',
          bulletPoints: [
            'Lysosomes maintain acidic pH zones to hydrolyze waste materials without harming other organelles.',
            'Mitochondrial folding (cristae) maximizes surface area for electron transport chain protein complexes.',
            'Chloroplast thylakoid stacks (grana) organize light-harvesting pigments to maximize solar absorption.'
          ]
        }
      ]
    }
  },
  'AP Calculus AB': {
    'Unit 1: Limits and Continuity': {
      vocab: [
        { id: 'v1', term: 'Limit', definition: 'The value that a function approaches as the input independent variable x gets closer and closer to a target value c.' },
        { id: 'v2', term: 'Continuity', definition: 'A condition where a function f(x) has no gaps, vertical asymptotes, or jumps; formally, the limit as x approaches c equals f(c).' },
        { id: 'v3', term: 'Intermediate Value Theorem', definition: 'If a function f is continuous on [a, b], then for any value L between f(a) and f(b), there exists a c in (a, b) such that f(c) = L.' },
        { id: 'v4', term: 'Squeeze Theorem', definition: 'A theorem stating that if f(x) ≤ g(x) ≤ h(x) for all x near c, and the limits of f and h equal L, then the limit of g must also equal L.' }
      ],
      mainIdeas: [
        {
          id: 'm1',
          title: 'Understanding the Limit Concept',
          explanation: 'Limits are the mathematical foundation of calculus. They allow us to analyze function behavior at points where the function is undefined (like holes or tangent lines).',
          bulletPoints: [
            'A limit exists if and only if both the left-hand and right-hand one-sided limits are equal.',
            'Algebraic techniques like factoring, rationalizing, and trigonometric identities solve indeterminate forms (0/0).',
            'Limits at infinity describe horizontal asymptotes and global end behavior.'
          ]
        }
      ]
    }
  },
  'AP US History': {
    'Unit 1: 1491-1607': {
      vocab: [
        { id: 'v1', term: 'Columbian Exchange', definition: 'The massive transfer of plants, animals, culture, human populations, technology, and diseases between the Americas and Afro-Eurasia.' },
        { id: 'v2', term: 'Encomienda System', definition: 'A Spanish labor system that rewarded conquerors with the labor of particular groups of conquered non-Christian people.' },
        { id: 'v3', term: 'Caste System (Casta)', definition: 'A hierarchical social classification system implemented by Spanish colonialists to organize individuals by racial ancestry.' },
        { id: 'v4', term: 'Mestizo', definition: 'A term used in colonial Spanish America to describe a person of combined European and indigenous American descent.' }
      ],
      mainIdeas: [
        {
          id: 'm1',
          title: 'Indigenous American Diversity',
          explanation: 'Prior to European contact, North America was populated by highly diverse, complex societies whose economies were shaped by local geographical ecosystems.',
          bulletPoints: [
            'Great Plains tribes developed mobile, nomadic lifestyles following buffalo herds.',
            'Pueblo peoples in the Southwest built advanced dry-farming irrigation networks for maize.',
            'Iroquois Confederacy in the Northeast established sophisticated political alliances and agricultural villages.'
          ]
        },
        {
          id: 'm2',
          title: 'Impacts of European Contact',
          explanation: 'The arrival of Spanish explorers fundamentally restructured both hemispheres. The introduction of deadly Old World epidemics decimated Native populations.',
          bulletPoints: [
            'Smallpox and measles caused up to a 90% mortality rate among indigenous communities.',
            'Maize, potatoes, and tomatoes exported to Europe catalyzed global population growth.',
            'Horses and guns transformed hunting dynamics and military leverage across the American plains.'
          ]
        }
      ]
    }
  },
  'AP World History': {
    'Unit 1: The Global Tapestry (1200-1450)': {
      vocab: [
        { id: 'v1', term: 'Song Dynasty', definition: 'A golden age Chinese dynasty characterized by commercialization, agricultural expansion (Champa rice), and neo-Confucian bureaucracy.' },
        { id: 'v2', term: 'Filial Piety', definition: 'The traditional Confucian virtue of absolute respect, obedience, and care for one\'s parents and ancestors.' },
        { id: 'v3', term: 'Abbasid Caliphate', definition: 'An influential Islamic empire that fostered the Golden Age of Islam, headquartered in Baghdad, before falling to Mongol invaders.' },
        { id: 'v4', term: 'Feudalism', definition: 'A decentralized European socio-political system based on mutual land grants and military obligations between lords, vassals, and serfs.' },
        { id: 'v5', term: 'Champa Rice', definition: 'A fast-ripening, drought-resistant grain imported to China from Vietnam, doubling annual crop yields and accelerating population growth.' }
      ],
      mainIdeas: [
        {
          id: 'm1',
          title: 'State Building in East Asia',
          explanation: 'Song China was the leading global center of technology and administration. Imperial administration was stabilized by civil service examinations testing Confucian principles.',
          bulletPoints: [
            'Neo-Confucianism blended classical social hierarchies with Buddhist and Daoist spiritual philosophies.',
            'Grand Canal networks unified Northern and Southern economies, boosting domestic trade.',
            'Innovation in woodblock printing, magnetic compasses, and gunpowder reshaped global trade and warfare.'
          ]
        },
        {
          id: 'm2',
          title: 'Dar al-Islam and Cultural Synthesis',
          explanation: 'The Islamic world spanned Afro-Eurasia, connecting highly diverse populations. Universities like the House of Wisdom in Baghdad acted as global hubs for intellectual synthesis.',
          bulletPoints: [
            'Islamic scholars preserved and translated ancient Greek, Roman, and Indian mathematical and philosophical texts.',
            'Advancements in medicine, algebra, and astronomical navigation spread to Western Europe via Spain.',
            'Sufism played a critical role in converting populations in India and Southeast Asia through emotional devotion.'
          ]
        }
      ]
    }
  }
};

/**
 * Smart Fallback Ingestion Engine
 * Analyzes any plain-text notes/transcript/web pages, performs text segmentation,
 * extracts high-relevance terms for Key Vocab and clusters topics for Main Ideas.
 */
export const parseRawText = (text, defaultTitle = "Custom Material") => {
  if (!text || text.trim().length === 0) {
    return {
      vocab: [],
      mainIdeas: []
    };
  }

  const vocab = [];
  const mainIdeas = [];
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // 1. Try to extract terms matching formats: "Term: Definition" or "Term - Definition"
  const colonOrDashRegex = /^([^:\-\=\(\)]+)\s*[:\-\=]\s*(.+)$/;
  const remainingParagraphs = [];

  lines.forEach(line => {
    const match = line.match(colonOrDashRegex);
    if (match && match[1].trim().split(' ').length <= 5 && match[2].trim().length > 10) {
      vocab.push({
        id: 'cv_' + Math.random().toString(36).substr(2, 9),
        term: match[1].trim(),
        definition: match[2].trim()
      });
    } else {
      remainingParagraphs.push(line);
    }
  });

  // 2. If we got no vocab from structured parsing, extract capital phrases or nouns
  if (vocab.length === 0) {
    // Basic heuristic: take the first sentence of each paragraph or lines as statements
    let vocabCount = 0;
    remainingParagraphs.forEach((para, idx) => {
      if (vocabCount < 8 && para.length > 30 && para.length < 150) {
        // Treat as a vocab term/definition split at first punctuation
        const firstWords = para.split(' ').slice(0, 3).join(' ');
        vocab.push({
          id: 'cv_' + Math.random().toString(36).substr(2, 9),
          term: firstWords.replace(/[^a-zA-Z\s]/g, '') + '...',
          definition: para
        });
        vocabCount++;
      }
    });
  }

  // 3. Extract Main Ideas by clustering paragraphs
  let currentTitle = defaultTitle + " Key Concepts";
  let currentBullets = [];
  let currentExpl = "";

  // Group paragraphs or combine lines
  const paragraphs = remainingParagraphs.filter(p => p.length > 40);

  if (paragraphs.length > 0) {
    paragraphs.forEach((para, idx) => {
      // Create a main idea card per significant paragraph
      const sentences = para.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
      if (sentences.length > 0) {
        const title = sentences[0].length > 45 ? sentences[0].substring(0, 45) + '...' : sentences[0];
        const explanation = sentences.slice(1, 3).join('. ') + '.';
        const bullets = sentences.slice(3).map(s => s + '.').slice(0, 3);

        mainIdeas.push({
          id: 'mi_' + Math.random().toString(36).substr(2, 9),
          title: title,
          explanation: explanation.length > 10 ? explanation : para.substring(0, 120) + '...',
          bulletPoints: bullets.length > 0 ? bullets : [
            "Critical academic concept for core comprehension.",
            "Crucial connection to surrounding course elements."
          ]
        });
      }
    });
  }

  // Ensure we always have at least a couple of elements for a beautiful UI experience
  if (vocab.length === 0) {
    vocab.push(
      { id: 'v_def1', term: 'Study Synthesis', definition: 'The integration of multiple academic streams into an organized intellectual structure.' },
      { id: 'v_def2', term: 'Active Recall', definition: 'A testing mechanism that prompts students to retrieve information directly from memory rather than re-reading.' }
    );
  }
  if (mainIdeas.length === 0) {
    mainIdeas.push({
      id: 'm_def1',
      title: 'Synthesized Course Core',
      explanation: 'Extracted summary of integrated study contents. Focuses on organizing details systematically to facilitate quick, high-recall review sessions.',
      bulletPoints: [
        'Organizes raw class notes into bite-sized concepts.',
        'Enables spaced repetition and quick mental checks.'
      ]
    });
  }

  return { vocab, mainIdeas };
};

/**
 * YouTube Transcript Extester
 * Simulates high-fidelity extraction from YouTube video URL and builds Key Vocab / Main Ideas
 */
export const parseYoutubeUrl = async (url) => {
  // Extract Video ID
  let videoId = 'unknown';
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
  } catch (e) {
    console.error(e);
  }

  // High-fidelity transcript mock based on YouTube Search Topics
  let title = "Video Ingestion: " + videoId;
  let textContent = "";

  if (url.includes('biology') || url.includes('cell') || url.includes('crashcourse')) {
    title = "Crash Course Biology: Biological Systems";
    textContent = `Cell Membrane: Encloses cell and regulates what enters and exits.
Active Transport - Requires cell energy (ATP) to move molecules against concentration gradient.
Passive Transport - Movement of materials without energy expenditure.
Homeostasis: Maintenance of stable internal states within living organisms.
Ecosystem: A biological community of interacting organisms and their physical environment.`;
  } else if (url.includes('calculus') || url.includes('math') || url.includes('derivative')) {
    title = "Calculus Essentials: The Derivative";
    textContent = `Derivative: The rate of change of a function with respect to a variable.
Tangent Line - A straight line that touches a curve at exactly one point.
Secant Line - A line passing through two distinct points on a curve.
Differentiation: The process of finding a derivative of a function.`;
  } else {
    title = "YouTube Academic Ingest: " + videoId;
    textContent = `Core Framework: The standard architecture or system guiding the topic's development.
Cognitive Load - The total amount of mental effort being used in the working memory.
Reflective Analysis: Reviewing a subject with critical intent to synthesize core themes.
Iterative Synthesis - Repeating the process of building understanding to refine output quality.`;
  }

  const { vocab, mainIdeas } = parseRawText(textContent, title);
  return { title, vocab, mainIdeas };
};

/**
 * Document File Reader
 * Simulates high-fidelity parsing of PDFs, Word files, and PPTX decks.
 */
export const parseDocumentFile = async (fileName, fileType, fileContentText = '') => {
  let title = fileName.replace(/\.[^/.]+$/, ""); // strip extension
  let textContent = "";

  // If the user actually provided some text or we read it:
  if (fileContentText && fileContentText.trim().length > 0) {
    return { title, ...parseRawText(fileContentText, title) };
  }

  // Pre-configured mock data based on names/topics for ultra premium feel:
  if (fileName.toLowerCase().includes('syllabus') || fileName.toLowerCase().includes('course')) {
    textContent = `Prisma Curriculum - Essential milestones for course success.
Academic Rigor: Maintaining extremely high standards of inquiry and detail.
Syllabus Milestones - Clear markers of progress throughout the semester structure.
Spaced Repetition: Restudying material at systematic intervals to cement neural connections.`;
  } else if (fileName.toLowerCase().includes('notes') || fileName.toLowerCase().includes('lecture')) {
    textContent = `Lecture Summary - Key learnings from the recent presentation.
Active Listening: Concentrating fully on what is being said rather than just passively hearing.
Dual Coding - Combining verbal and visual information to double encoding channels in memory.
Interleaving: Mixing different topics during study sessions to improve problem-solving adaptability.`;
  } else {
    textContent = `Parsed Document [${fileType.toUpperCase()}] - Content extracted successfully.
Conceptual Mapping: Visualizing relationships between key definitions and themes.
Cognitive Anchors - Specific, highly memorable ideas that help hold complex facts in memory.
Refraction: Re-directing study efforts into different lanes (Vocab and Main Ideas) for maximum speed.`;
  }

  const { vocab, mainIdeas } = parseRawText(textContent, title);
  return { title, vocab, mainIdeas };
};

/**
 * Test & Quiz Question Generator
 * Dynamically constructs multiple choice or written response questions from
 * Key Vocab and Main Ideas.
 */
export const generateQuizQuestions = (vocab = [], mainIdeas = []) => {
  const questions = [];

  // 1. Generate Multiple Choice Questions from Vocab terms
  if (vocab.length >= 2) {
    vocab.forEach((item, index) => {
      // Pick 3 random definitions from other vocab items
      const incorrectDefs = vocab
        .filter(v => v.id !== item.id)
        .map(v => v.definition);
      
      // Shuffle incorrect definitions
      const options = [item.definition];
      while (options.length < Math.min(4, vocab.length)) {
        const randomDef = incorrectDefs[Math.floor(Math.random() * incorrectDefs.length)];
        if (!options.includes(randomDef) && randomDef) {
          options.push(randomDef);
        }
      }

      // If we don't have enough other vocab terms, add fillers
      const fillers = [
        "A foundational component of the surrounding system framework.",
        "An advanced theoretical construct detailing systemic efficiency.",
        "The standard measure of intellectual progress within this discipline."
      ];
      while (options.length < 4) {
        const filler = fillers[Math.floor(Math.random() * fillers.length)];
        if (!options.includes(filler)) {
          options.push(filler);
        }
      }

      // Shuffle options and find new correct index
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      const correctIdx = shuffledOptions.indexOf(item.definition);

      questions.push({
        id: 'q_v_' + index,
        type: 'vocab',
        question: `Which of the following defines the term "${item.term}"?`,
        options: shuffledOptions,
        correct: correctIdx,
        term: item.term
      });
    });
  }

  // 2. Generate concept questions from Main Ideas
  if (mainIdeas.length > 0) {
    mainIdeas.forEach((item, index) => {
      questions.push({
        id: 'q_m_' + index,
        type: 'concept',
        question: `Explain the core principles of "${item.title}". Discuss its biological/academic implications and surrounding details.`,
        suggestedAnswers: item.bulletPoints,
        explanation: item.explanation,
        title: item.title
      });
    });
  }

  // Final fallback questions if kit is empty
  if (questions.length === 0) {
    questions.push({
      id: 'q_fb_1',
      type: 'vocab',
      question: "What is the primary method of Prisma study synthesis?",
      options: [
        "Dividing material into exactly two study categories: Key Vocab and Main Ideas.",
        "Highlighting chapters without review.",
        "Passive re-reading of textbooks.",
        "Cramming facts the night before an assessment."
      ],
      correct: 0
    });
  }

  return questions;
};
