/* ============================================================
   AMBEDKAR SIKHYA — Interactive Student MCQ Practice Engine
   Loads from Supabase 'questions' table with offline fallback.
   ============================================================ */

// 1. Built-in Offline Fallback Questions (Ensures immediate usability)
const FALLBACK_QUESTIONS = [
  {
    id: 'fb-1',
    class_level: 'Class 10',
    subject: 'Mathematics',
    topic: 'Real Numbers',
    question_text: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:',
    option_a: 'xy',
    option_b: 'xy²',
    option_c: 'x³y³',
    option_d: 'x²y²',
    correct_option: 'B',
    explanation: 'HCF is the product of the smallest power of each common prime factor involved in the numbers. Common factors are x (smallest power: 1) and y (smallest power: 2). Thus, HCF = xy².'
  },
  {
    id: 'fb-2',
    class_level: 'Class 10',
    subject: 'Science',
    topic: 'Chemical Reactions & Equations',
    question_text: 'Which of the following is an endothermic process?',
    option_a: 'Dilution of sulphuric acid',
    option_b: 'Sublimation of dry ice',
    option_c: 'Condensation of water vapours',
    option_d: 'Respiration in human beings',
    correct_option: 'B',
    explanation: 'Sublimation of dry ice (solid CO₂) requires absorption of thermal energy from the surroundings to change directly into gas, making it an endothermic change.'
  },
  {
    id: 'fb-3',
    class_level: 'Teaching Exams',
    subject: 'Child Development & Pedagogy',
    topic: 'Piaget’s Stages of Cognitive Development',
    question_text: 'According to Jean Piaget, at which stage does an infant develop "Object Permanence"?',
    option_a: 'Sensorimotor Stage (0–2 years)',
    option_b: 'Preoperational Stage (2–7 years)',
    option_c: 'Concrete Operational Stage (7–11 years)',
    option_d: 'Formal Operational Stage (11+ years)',
    correct_option: 'A',
    explanation: 'Object permanence—the understanding that objects continue to exist even when cannot be seen, heard, or touched—typically develops around 8 months of age during the Sensorimotor Stage.'
  },
  {
    id: 'fb-4',
    class_level: 'Teaching Exams',
    subject: 'Child Development & Pedagogy',
    topic: 'Classroom Management & Inclusive Education',
    question_text: 'What is the most effective approach for a teacher to manage a diverse classroom with mixed learning speeds?',
    option_a: 'Teach according to the top 10% students to keep the benchmark high',
    option_b: 'Adopt Differentiated Instruction and flexible group activities',
    option_c: 'Focus exclusively on weak students and ignore the gifted ones',
    option_d: 'Deliver standard lectures without varying teaching aids',
    correct_option: 'B',
    explanation: 'Differentiated instruction tailors content, learning processes, and assessments to accommodate varied learning styles, capabilities, and readiness levels in inclusive classrooms.'
  },
  {
    id: 'fb-5',
    class_level: '+2 Science',
    subject: 'Physics',
    topic: 'Electrostatics',
    question_text: 'Two charges of +1 µC and +5 µC are placed 10 cm apart. The ratio of the electrostatic forces acting on each other is:',
    option_a: '1 : 5',
    option_b: '5 : 1',
    option_c: '1 : 1',
    option_d: '1 : 25',
    correct_option: 'C',
    explanation: 'By Newton’s Third Law and Coulomb’s Law, the electrostatic force exerted by charge 1 on charge 2 is equal in magnitude and opposite in direction to the force exerted by charge 2 on charge 1. Therefore, the ratio is always 1 : 1.'
  },
  {
    id: 'fb-6',
    class_level: 'Odisha General Studies',
    subject: 'Odisha History',
    topic: 'History & Culture of Odisha',
    question_text: 'The famous Sun Temple at Konark was constructed during the reign of which Ganga dynasty ruler?',
    option_a: 'Anantavarman Chodaganga Deva',
    option_b: 'Narasimhadeva I',
    option_c: 'Kapilendra Deva',
    option_d: 'Purushottama Deva',
    correct_option: 'B',
    explanation: 'The Konark Sun Temple was built in the 13th century (around 1250 CE) by King Narasimhadeva I of the Eastern Ganga Dynasty to commemorate his military victories.'
  },
  {
    id: 'fb-7',
    class_level: 'Government & Competitive Exams',
    subject: 'Indian Polity',
    topic: 'Indian Polity & Constitution',
    question_text: 'Which Article of the Indian Constitution is regarded as the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    option_a: 'Article 14 (Right to Equality)',
    option_b: 'Article 19 (Right to Freedom)',
    option_c: 'Article 21 (Right to Life & Liberty)',
    option_d: 'Article 32 (Right to Constitutional Remedies)',
    correct_option: 'D',
    explanation: 'Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution" because it guarantees the right to move the Supreme Court directly for the enforcement of Fundamental Rights through writs.'
  },
  {
    id: 'fb-8',
    class_level: 'Class 10',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    question_text: 'If the roots of the quadratic equation 2x² - 8x + k = 0 are equal, then the value of k is:',
    option_a: '4',
    option_b: '8',
    option_c: '16',
    option_d: '2',
    correct_option: 'B',
    explanation: 'For equal roots, the discriminant D = b² - 4ac must equal 0. Here a = 2, b = -8, c = k. So (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => 8k = 64 => k = 8.'
  },
  {
    id: 'fb-9',
    class_level: 'Government & Competitive Exams',
    subject: 'Ancient Indian History',
    topic: 'Indus Valley Civilization',
    question_text: 'The famous "Great Bath" was discovered at which Indus Valley Civilization site?',
    option_a: 'Harappa',
    option_b: 'Mohenjo-daro',
    option_c: 'Lothal',
    option_d: 'Kalibangan',
    correct_option: 'B',
    explanation: 'The Great Bath, one of the most famous structures of the Indus Valley Civilization, was excavated at Mohenjo-daro in modern-day Pakistan.'
  },
  {
    id: 'fb-10',
    class_level: 'Odisha General Studies',
    subject: 'Odisha Geography',
    topic: 'Lakes & Wetlands of Odisha',
    question_text: 'Which is the largest brackish water lagoon in Asia, situated in Odisha?',
    option_a: 'Ansupa Lake',
    option_b: 'Chilika Lake',
    option_c: 'Kanjia Lake',
    option_d: 'Tampara Lake',
    correct_option: 'B',
    explanation: 'Chilika Lake is Asia\'s largest brackish water lagoon and the second largest coastal lagoon in the world, designated as the first Indian wetland of international importance under the Ramsar Convention in 1981.'
  },
  {
    id: 'fb-11',
    class_level: 'Odisha General Studies',
    subject: 'Odisha Government Schemes',
    topic: 'Welfare & Empowerment Initiatives',
    question_text: 'Under the "SUBHADRA Yojana" launched by the Government of Odisha, what is the annual financial assistance provided to eligible women?',
    option_a: '₹5,000',
    option_b: '₹10,000',
    option_c: '₹15,000',
    option_d: '₹20,000',
    correct_option: 'B',
    explanation: 'Under the flagship SUBHADRA Yojana, eligible women in Odisha receive ₹10,000 per year in two installments of ₹5,000 each over a period of 5 years (totaling ₹50,000).'
  }
];

// State
let rawQuestions = [];
let filteredQuestions = [];
let currentIndex = 0;
let userAnswers = {}; // { [questionId]: { selected: 'A', isCorrect: true } }

// DOM Elements
document.addEventListener('DOMContentLoaded', async () => {
  const classSelect = document.getElementById('practice-class');
  const subjectSelect = document.getElementById('practice-subject');
  const topicSelect = document.getElementById('practice-topic');
  const applyFilterBtn = document.getElementById('apply-filter-btn');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const emptyResetBtn = document.getElementById('empty-reset-btn');

  const questionCard = document.getElementById('question-card');
  const questionStatement = document.getElementById('question-statement');
  const optionsList = document.getElementById('options-list');
  const explanationBox = document.getElementById('explanation-box');
  const explanationContent = document.getElementById('explanation-content');
  const answerHintText = document.getElementById('answer-hint-text');

  const badgeClass = document.getElementById('badge-class');
  const badgeSubject = document.getElementById('badge-subject');
  const badgeTopic = document.getElementById('badge-topic');

  const statQuestionNumber = document.getElementById('stat-question-number');
  const statScore = document.getElementById('stat-score');
  const statAccuracy = document.getElementById('stat-accuracy');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const prevBtn = document.getElementById('prev-question-btn');
  const nextBtn = document.getElementById('next-question-btn');
  const restartBtn = document.getElementById('restart-quiz-btn');

  const activeArea = document.getElementById('quiz-active-area');
  const resultArea = document.getElementById('quiz-result-area');
  const emptyArea = document.getElementById('quiz-empty-area');
  const statsBar = document.getElementById('quiz-stats-bar');

  // Load Questions from Supabase or Fallback
  async function loadQuestions() {
    let loadedFromDb = false;
    if (typeof db !== 'undefined' && db) {
      try {
        const { data, error } = await db
          .from('questions')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          rawQuestions = data;
          loadedFromDb = true;
          console.log(`[Ambedkar Sikhya] Loaded ${data.length} questions from Supabase.`);
        }
      } catch (err) {
        console.warn('[Ambedkar Sikhya] Supabase query failed, falling back to built-in questions:', err);
      }
    }

    if (!loadedFromDb) {
      rawQuestions = [...FALLBACK_QUESTIONS];
      console.log(`[Ambedkar Sikhya] Using ${rawQuestions.length} built-in sample questions.`);
    }

    populateFilterDropdowns();
    applyFilters();
  }

  // Populate Subject & Topic dropdowns based on available questions
  function populateFilterDropdowns() {
    const selectedClass = classSelect.value;
    
    // Filter questions by class to gather applicable subjects
    const relevant = selectedClass === 'all'
      ? rawQuestions
      : rawQuestions.filter(q => q.class_level === selectedClass);

    // Unique Subjects
    const subjects = Array.from(new Set(relevant.map(q => q.subject).filter(Boolean))).sort();
    const currentSubject = subjectSelect.value;
    subjectSelect.innerHTML = '<option value="all">All Subjects</option>';
    subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      if (sub === currentSubject) opt.selected = true;
      subjectSelect.appendChild(opt);
    });

    // Unique Topics
    const selectedSubject = subjectSelect.value;
    const topicRelevant = selectedSubject === 'all'
      ? relevant
      : relevant.filter(q => q.subject === selectedSubject);

    const topics = Array.from(new Set(topicRelevant.map(q => q.topic).filter(Boolean))).sort();
    const currentTopic = topicSelect.value;
    topicSelect.innerHTML = '<option value="all">All Topics</option>';
    topics.forEach(top => {
      const opt = document.createElement('option');
      opt.value = top;
      opt.textContent = top;
      if (top === currentTopic) opt.selected = true;
      topicSelect.appendChild(opt);
    });
  }

  // Handle Class change -> reload subjects & topics
  classSelect.addEventListener('change', () => {
    populateFilterDropdowns();
    applyFilters();
  });

  subjectSelect.addEventListener('change', () => {
    // Refresh topics for chosen subject
    const selectedClass = classSelect.value;
    const selectedSubject = subjectSelect.value;
    const relevant = rawQuestions.filter(q => {
      const matchClass = selectedClass === 'all' || q.class_level === selectedClass;
      const matchSub = selectedSubject === 'all' || q.subject === selectedSubject;
      return matchClass && matchSub;
    });

    const topics = Array.from(new Set(relevant.map(q => q.topic).filter(Boolean))).sort();
    topicSelect.innerHTML = '<option value="all">All Topics</option>';
    topics.forEach(top => {
      const opt = document.createElement('option');
      opt.value = top;
      opt.textContent = top;
      topicSelect.appendChild(opt);
    });

    applyFilters();
  });

  topicSelect.addEventListener('change', () => {
    applyFilters();
  });

  applyFilterBtn.addEventListener('click', applyFilters);

  function resetAllFilters() {
    classSelect.value = 'all';
    populateFilterDropdowns();
    subjectSelect.value = 'all';
    topicSelect.value = 'all';
    applyFilters();
  }

  resetFilterBtn.addEventListener('click', resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

  // Apply Filters to Questions List
  function applyFilters() {
    const selectedClass = classSelect.value;
    const selectedSubject = subjectSelect.value;
    const selectedTopic = topicSelect.value;

    filteredQuestions = rawQuestions.filter(q => {
      const matchClass = selectedClass === 'all' || q.class_level === selectedClass;
      const matchSub = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchTopic = selectedTopic === 'all' || q.topic === selectedTopic;
      return matchClass && matchSub && matchTopic;
    });

    // Reset test state for new filter
    currentIndex = 0;
    userAnswers = {};

    if (filteredQuestions.length === 0) {
      activeArea.style.display = 'none';
      resultArea.style.display = 'none';
      statsBar.style.display = 'none';
      emptyArea.style.display = 'block';
    } else {
      emptyArea.style.display = 'none';
      resultArea.style.display = 'none';
      activeArea.style.display = 'block';
      statsBar.style.display = 'flex';
      renderQuestion(currentIndex);
    }
  }

  // Render a specific question
  function renderQuestion(index) {
    if (index < 0 || index >= filteredQuestions.length) return;

    const q = filteredQuestions[index];
    const total = filteredQuestions.length;

    // Badges & Meta
    badgeClass.textContent = q.class_level || 'General';
    badgeSubject.textContent = q.subject || 'All Subjects';
    badgeTopic.textContent = q.topic || 'General Topic';

    // Question Text
    questionStatement.textContent = `${index + 1}. ${q.question_text}`;

    // Options Rendering
    optionsList.innerHTML = '';
    const options = [
      { key: 'A', text: q.option_a },
      { key: 'B', text: q.option_b },
      { key: 'C', text: q.option_c },
      { key: 'D', text: q.option_d }
    ];

    const currentAnswer = userAnswers[q.id];
    const isAnswered = !!currentAnswer;

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.dataset.key = opt.key;

      let iconHtml = '';
      if (isAnswered) {
        btn.disabled = true;
        if (opt.key === q.correct_option) {
          btn.classList.add('correct');
          iconHtml = `<span class="option-status-icon" style="color:var(--color-success);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </span>`;
        } else if (currentAnswer.selected === opt.key) {
          btn.classList.add('wrong');
          iconHtml = `<span class="option-status-icon" style="color:var(--color-error);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>`;
        }
      }

      btn.innerHTML = `
        <span class="option-letter">${opt.key}</span>
        <span style="flex-grow:1; line-height: 1.45;">${opt.text}</span>
        ${iconHtml}
      `;

      if (!isAnswered) {
        btn.addEventListener('click', () => handleOptionSelect(q, opt.key));
      }

      optionsList.appendChild(btn);
    });

    // Explanation Box
    if (isAnswered) {
      explanationBox.style.display = 'block';
      explanationContent.textContent = q.explanation || `The correct option is ${q.correct_option}.`;
      answerHintText.textContent = currentAnswer.isCorrect ? '✅ Correct Answer!' : '❌ Incorrect Answer.';
      answerHintText.style.color = currentAnswer.isCorrect ? 'var(--color-success)' : 'var(--color-error)';
      answerHintText.style.fontWeight = '700';
    } else {
      explanationBox.style.display = 'none';
      explanationContent.textContent = '';
      answerHintText.textContent = 'Click an option to check your answer';
      answerHintText.style.color = 'var(--color-text-light)';
      answerHintText.style.fontWeight = 'normal';
    }

    // Navigation Buttons State
    prevBtn.disabled = index === 0;
    if (index === total - 1) {
      nextBtn.innerHTML = `Finish & View Score <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
      nextBtn.innerHTML = `Next Question <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>`;
    }

    // Update Stats
    updateStatsBar();
  }

  // Option selection logic
  function handleOptionSelect(q, selectedKey) {
    const isCorrect = selectedKey === q.correct_option;
    userAnswers[q.id] = { selected: selectedKey, isCorrect };

    // Re-render current question with feedback
    renderQuestion(currentIndex);
  }

  // Update Stats Bar
  function updateStatsBar() {
    const total = filteredQuestions.length;
    statQuestionNumber.textContent = `${currentIndex + 1} / ${total}`;

    const answeredKeys = Object.keys(userAnswers);
    const correctCount = answeredKeys.filter(k => userAnswers[k].isCorrect).length;
    const attemptedCount = answeredKeys.length;

    statScore.textContent = `${correctCount} / ${attemptedCount}`;

    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    statAccuracy.textContent = `${accuracy}%`;

    const progressPercent = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
    progressBarFill.style.width = `${progressPercent}%`;
  }

  // Previous Question
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  // Next Question or Finish
  nextBtn.addEventListener('click', () => {
    const total = filteredQuestions.length;
    if (currentIndex < total - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      showResults();
    }
  });

  // Show Final Results
  function showResults() {
    activeArea.style.display = 'none';
    statsBar.style.display = 'none';
    resultArea.style.display = 'block';

    const total = filteredQuestions.length;
    const answeredKeys = Object.keys(userAnswers);
    const correctCount = answeredKeys.filter(k => userAnswers[k].isCorrect).length;
    const wrongCount = answeredKeys.filter(k => !userAnswers[k].isCorrect).length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    document.getElementById('result-score-number').textContent = correctCount;
    document.getElementById('result-score-total').textContent = `out of ${total}`;
    document.getElementById('res-total-count').textContent = total;
    document.getElementById('res-correct-count').textContent = correctCount;
    document.getElementById('res-wrong-count').textContent = wrongCount;

    const headline = document.getElementById('result-headline');
    const subtext = document.getElementById('result-subtext');

    if (percentage >= 80) {
      headline.textContent = 'Outstanding Performance! 🎉';
      headline.style.color = 'var(--color-success)';
      subtext.textContent = `You scored ${percentage}%! You have a solid grasp of these concepts. Keep maintaining this consistency!`;
    } else if (percentage >= 50) {
      headline.textContent = 'Good Effort! Keep It Up 👍';
      headline.style.color = 'var(--color-primary)';
      subtext.textContent = `You scored ${percentage}%. Review the questions you missed and test yourself again to score higher!`;
    } else {
      headline.textContent = 'Keep Practicing! 💪';
      headline.style.color = 'var(--color-accent-dark)';
      subtext.textContent = `You scored ${percentage}%. Take time to read our study notes and chapter summaries, then try this practice test again.`;
    }

    resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Restart Quiz
  restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    userAnswers = {};
    resultArea.style.display = 'none';
    activeArea.style.display = 'block';
    statsBar.style.display = 'flex';
    renderQuestion(currentIndex);
  });

  // Initialize
  loadQuestions();
});

