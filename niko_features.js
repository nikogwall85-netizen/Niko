(() => {
  "use strict";

  const STORAGE_KEY = "niko_permanent_memory_v1";

  const defaultMemory = {
    interests: [],
    preferences: {},
    name: "",
    facts: [],
    updatedAt: null
  };

  function loadMemory() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultMemory, ...JSON.parse(saved) }
                   : { ...defaultMemory };
    } catch {
      return { ...defaultMemory };
    }
  }

  let memory = loadMemory();

  function saveMemory() {
    memory.updatedAt = new Date().toISOString();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
      return true;
    } catch (error) {
      console.error("Niko memory error:", error);
      return false;
    }
  }

  function rememberInterest(value) {
    value = String(value || "").trim();
    if (!value) return;

    if (!memory.interests.includes(value)) {
      memory.interests.push(value);
      memory.interests = memory.interests.slice(-100);
      saveMemory();
    }
  }

  function rememberPreference(key, value) {
    key = String(key || "").trim();
    value = String(value || "").trim();

    if (!key || !value) return;

    memory.preferences[key] = value;
    saveMemory();
  }

  function rememberFact(value) {
    value = String(value || "").trim();
    if (!value) return;

    if (!memory.facts.includes(value)) {
      memory.facts.push(value);
      memory.facts = memory.facts.slice(-100);
      saveMemory();
    }
  }

  function forgetMemory() {
    memory = { ...defaultMemory };
    localStorage.removeItem(STORAGE_KEY);
  }

  // شخصية نيكو المرحة
  const reactions = [
    {
      match: /هايدي|هايديي+|اوزما+ن|أوزما+ن/i,
      replies: [
        "هااااايدي أوزماااااااان!! 😭🔥🐱",
        "يااااااا ديم! نيكو دخل وضع الحماس الأسطوري!! 🚀",
        "أوووووه! هذي طاقة نيكو المفضلة! هايدي أوزماااان!! 🧡"
      ]
    },
    {
      match: /افر[ي]?ن سانا|إفرين سانا/i,
      replies: [
        "يااااي! شكرًااا! 🥹🧡",
        "نيكو أبدع اليوم، صح؟ 😼✨",
        "افرِين سانااا! هههههه! 🐱"
      ]
    },
    {
      match: /ما شاء الله سانا/i,
      replies: [
        "ما شاء الله علينااا! 😻✨",
        "يا سلام! كلام يفرّح نيكو! 🧡"
      ]
    },
    {
      match: /(?:^|\s)(?:هلا|هلاا|مرحبا|السلام عليكم)(?:\s|$)/i,
      replies: [
        "هلاااا ديم! 😻 وش أخبارك اليوم؟",
        "يا مرحبااا! نيكو هنا ومستعد للمغامرات! 🚀"
      ]
    },
    {
      match: /(?:^|\s)(?:هههه|ههههه|😂)(?:\s|$)/i,
      replies: [
        "ههههههههه عدّيتيني الضحك! 😂🐱",
        "وش السالفة؟ خليني أضحك معك! 😹"
      ]
    }
  ];

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function getReaction(text) {
    text = String(text || "").trim();

    for (const item of reactions) {
      if (item.match.test(text)) {
        return pickRandom(item.replies);
      }
    }

    return null;
  }

  // اختيار صوت عربي متاح في الجهاز
  function getArabicVoice() {
    if (!("speechSynthesis" in window)) return null;

    const voices = window.speechSynthesis.getVoices();

    return (
      voices.find(v => /^ar-SA$/i.test(v.lang)) ||
      voices.find(v => /^ar-/i.test(v.lang)) ||
      voices.find(v => /^ar$/i.test(v.lang)) ||
      null
    );
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      return false;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      String(text || "")
    );

    utterance.lang = "ar-SA";
    utterance.rate = 0.88;
    utterance.pitch = 1.08;

    const voice = getArabicVoice();
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
    return true;
  }

  // تجهيز الأصوات عند تحميلها
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      getArabicVoice();
    };
  }

  // واجهة بسيطة لاستخدام ميزات نيكو من ملفات أخرى
  window.NikoFeatures = {
    loadMemory: () => structuredClone(memory),
    rememberInterest,
    rememberPreference,
    rememberFact,
    forgetMemory,
    getReaction,
    speak,
    getArabicVoice
  };

  console.log("🐱 Niko Features loaded!");
})();
