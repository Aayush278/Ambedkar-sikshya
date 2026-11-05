/* ============================================================
   AMBEDKAR SIKHYA — Admin Dashboard Logic (Supabase Backend)
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // Elements
  const loginSection = document.getElementById('admin-login-section');
  const dashboardSection = document.getElementById('admin-dashboard-section');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('login-error');
  const adminUserEmail = document.getElementById('admin-user-email');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // Check if Supabase client is configured
  if (!db) {
    if (loginError) {
      loginError.style.display = 'block';
      loginError.textContent = 'Supabase credentials not configured. Please open supabase-config.js and set your SUPABASE_URL and SUPABASE_ANON_KEY.';
    }
    return;
  }

  // Check authentication session
  async function checkSession() {
    try {
      const { data: { session }, error } = await db.auth.getSession();
      if (session && session.user) {
        showDashboard(session.user);
      } else {
        showLogin();
      }
    } catch (err) {
      console.error('Session check failed:', err);
      showLogin();
    }
  }

  function showLogin() {
    loginSection.style.display = 'flex';
    dashboardSection.style.display = 'none';
  }

  function showDashboard(user) {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    if (adminUserEmail) adminUserEmail.textContent = user.email || 'Admin';
    loadQuestions();
    loadMaterials();
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginError.style.display = 'none';
      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;
      const submitBtn = loginForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';

      try {
        const { data, error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showDashboard(data.user);
      } catch (err) {
        loginError.style.display = 'block';
        loginError.textContent = err.message || 'Login failed. Please check your email and password.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login to Dashboard';
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await db.auth.signOut();
      showLogin();
    });
  }

  // Tab Switching
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabPanes = document.querySelectorAll('.admin-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.target);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  // ==========================================
  // TAB 1: MCQ QUESTIONS MANAGEMENT
  // ==========================================
  const addQuestionForm = document.getElementById('add-question-form');
  const questionStatus = document.getElementById('question-status');
  const questionsList = document.getElementById('questions-list');
  const filterClass = document.getElementById('filter-class');
  const filterSubject = document.getElementById('filter-subject');

  if (addQuestionForm) {
    addQuestionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      questionStatus.style.display = 'none';

      const questionData = {
        class_level: document.getElementById('q-class').value,
        subject: document.getElementById('q-subject').value,
        topic: document.getElementById('q-topic').value.trim(),
        question_text: document.getElementById('q-text').value.trim(),
        option_a: document.getElementById('q-opt-a').value.trim(),
        option_b: document.getElementById('q-opt-b').value.trim(),
        option_c: document.getElementById('q-opt-c').value.trim(),
        option_d: document.getElementById('q-opt-d').value.trim(),
        correct_option: document.getElementById('q-correct').value,
        explanation: document.getElementById('q-explanation').value.trim()
      };

      const submitBtn = addQuestionForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving Question...';

      try {
        const { data, error } = await db.from('questions').insert([questionData]);
        if (error) throw error;

        questionStatus.style.display = 'block';
        questionStatus.className = 'badge badge--success';
        questionStatus.textContent = 'Question saved successfully to Supabase!';

        // Reset question text and options for next entry, keeping Class/Subject for convenience
        document.getElementById('q-text').value = '';
        document.getElementById('q-opt-a').value = '';
        document.getElementById('q-opt-b').value = '';
        document.getElementById('q-opt-c').value = '';
        document.getElementById('q-opt-d').value = '';
        document.getElementById('q-explanation').value = '';

        loadQuestions();
      } catch (err) {
        questionStatus.style.display = 'block';
        questionStatus.className = 'badge';
        questionStatus.style.background = '#fee2e2';
        questionStatus.style.color = '#dc2626';
        questionStatus.textContent = 'Failed to save question: ' + err.message;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Question';
      }
    });
  }

  // Load and Filter Questions
  async function loadQuestions() {
    if (!questionsList) return;
    questionsList.innerHTML = '<p style="color:var(--color-text-light);">Loading questions from Supabase...</p>';

    let query = db.from('questions').select('*').order('created_at', { ascending: false });

    const selectedClass = filterClass ? filterClass.value : '';
    const selectedSubj = filterSubject ? filterSubject.value : '';

    if (selectedClass) query = query.eq('class_level', selectedClass);
    if (selectedSubj) query = query.eq('subject', selectedSubj);

    const { data: questions, error } = await query;

    if (error) {
      questionsList.innerHTML = `<p style="color:var(--color-error);">Error loading questions: ${error.message}</p>`;
      return;
    }

    if (!questions || questions.length === 0) {
      questionsList.innerHTML = '<p style="color:var(--color-text-light); text-align:center; padding: 2rem;">No questions found matching criteria. Add your first question above!</p>';
      return;
    }

    let html = '';
    questions.forEach((q, idx) => {
      html += `
        <div class="q-card" id="q-${q.id}">
          <div class="q-card-meta">
            <span class="badge">${q.class_level}</span>
            <span class="badge badge--accent">${q.subject}</span>
            <span style="font-size: 0.775rem; color: var(--color-text-light); font-weight: 600;">Topic: ${q.topic}</span>
          </div>
          <div class="q-text">Q${idx + 1}. ${escapeHtml(q.question_text)}</div>
          <div class="q-options-display">
            <div class="q-opt-pill ${q.correct_option === 'A' ? 'correct' : ''}"><strong>A.</strong> ${escapeHtml(q.option_a)}</div>
            <div class="q-opt-pill ${q.correct_option === 'B' ? 'correct' : ''}"><strong>B.</strong> ${escapeHtml(q.option_b)}</div>
            <div class="q-opt-pill ${q.correct_option === 'C' ? 'correct' : ''}"><strong>C.</strong> ${escapeHtml(q.option_c)}</div>
            <div class="q-opt-pill ${q.correct_option === 'D' ? 'correct' : ''}"><strong>D.</strong> ${escapeHtml(q.option_d)}</div>
          </div>
          ${q.explanation ? `<div class="q-explanation"><strong>Explanation:</strong> ${escapeHtml(q.explanation)}</div>` : ''}
          <div style="display:flex; justify-content: flex-end;">
            <button type="button" class="btn btn-sm" style="background:#fee2e2; color:#dc2626; border-color:#fca5a5;" onclick="deleteQuestion('${q.id}')">
              Delete Question
            </button>
          </div>
        </div>
      `;
    });
    questionsList.innerHTML = html;
  }

  window.deleteQuestion = async function(id) {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      const { error } = await db.from('questions').delete().eq('id', id);
      if (error) throw error;
      const el = document.getElementById('q-' + id);
      if (el) el.remove();
    } catch (err) {
      alert('Error deleting question: ' + err.message);
    }
  };

  if (filterClass) filterClass.addEventListener('change', loadQuestions);
  if (filterSubject) filterSubject.addEventListener('change', loadQuestions);

  // ==========================================
  // TAB 2: PDF UPLOADS & STUDY MATERIALS
  // ==========================================
  const uploadPdfForm = document.getElementById('upload-pdf-form');
  const uploadStatus = document.getElementById('upload-status');
  const materialsList = document.getElementById('materials-list');

  if (uploadPdfForm) {
    uploadPdfForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      uploadStatus.style.display = 'none';

      const fileInput = document.getElementById('pdf-file');
      const file = fileInput.files[0];
      if (!file) {
        alert('Please select a PDF file to upload.');
        return;
      }

      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Only PDF files are supported.');
        return;
      }

      const title = document.getElementById('pdf-title').value.trim();
      const category = document.getElementById('pdf-category').value;
      const classLevel = document.getElementById('pdf-class').value;
      const subject = document.getElementById('pdf-subject').value.trim();
      const topic = document.getElementById('pdf-topic').value.trim();

      const submitBtn = uploadPdfForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Uploading to Storage...';

      try {
        // Generate a safe unique file path in Supabase Storage
        const fileExt = file.name.split('.').pop();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `${Date.now()}_${safeName}`;

        // 1. Upload to Supabase Storage bucket 'study-materials'
        const { data: uploadData, error: uploadError } = await db.storage
          .from('study-materials')
          .upload(storagePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        // 2. Get Public URL
        const { data: { publicUrl } } = db.storage
          .from('study-materials')
          .getPublicUrl(storagePath);

        // Format file size
        const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

        // 3. Insert record into 'materials' table
        const { data: insertData, error: insertError } = await db.from('materials').insert([{
          title,
          category,
          class_level: classLevel,
          subject,
          topic,
          file_url: publicUrl,
          file_name: file.name,
          file_size: sizeFormatted
        }]);

        if (insertError) throw insertError;

        uploadStatus.style.display = 'block';
        uploadStatus.className = 'badge badge--success';
        uploadStatus.textContent = 'PDF uploaded and published successfully!';

        uploadPdfForm.reset();
        loadMaterials();
      } catch (err) {
        uploadStatus.style.display = 'block';
        uploadStatus.className = 'badge';
        uploadStatus.style.background = '#fee2e2';
        uploadStatus.style.color = '#dc2626';
        uploadStatus.textContent = 'Upload failed: ' + err.message;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Upload PDF Material';
      }
    });
  }

  // Load Materials
  async function loadMaterials() {
    if (!materialsList) return;
    materialsList.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--color-text-light);">Loading materials...</td></tr>';

    const { data: materials, error } = await db.from('materials').select('*').order('created_at', { ascending: false });

    if (error) {
      materialsList.innerHTML = `<tr><td colspan="6" style="color:var(--color-error);">Error: ${error.message}</td></tr>`;
      return;
    }

    if (!materials || materials.length === 0) {
      materialsList.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--color-text-light);padding:2rem;">No PDFs uploaded yet. Upload your first PDF above!</td></tr>';
      return;
    }

    let html = '';
    materials.forEach(m => {
      html += `
        <tr id="mat-${m.id}">
          <td><strong>${escapeHtml(m.title)}</strong></td>
          <td><span class="badge ${m.category === 'Questions' ? 'badge--accent' : ''}">${m.category}</span></td>
          <td>${m.class_level}</td>
          <td>${escapeHtml(m.subject)}</td>
          <td>${m.file_size || 'PDF'}</td>
          <td style="display:flex; gap:0.5rem;">
            <a href="${m.file_url}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">View PDF</a>
            <button type="button" class="btn btn-sm" style="background:#fee2e2; color:#dc2626; border-color:#fca5a5;" onclick="deleteMaterial('${m.id}', '${m.file_url}')">Delete</button>
          </td>
        </tr>
      `;
    });
    materialsList.innerHTML = html;
  }

  window.deleteMaterial = async function(id, fileUrl) {
    if (!confirm('Are you sure you want to delete this study material?')) return;
    try {
      // 1. Delete from storage if possible
      try {
        const parts = fileUrl.split('/study-materials/');
        if (parts.length > 1) {
          const filePath = decodeURIComponent(parts[1]);
          await db.storage.from('study-materials').remove([filePath]);
        }
      } catch (storageErr) {
        console.warn('Could not remove file from storage:', storageErr);
      }

      // 2. Delete database record
      const { error } = await db.from('materials').delete().eq('id', id);
      if (error) throw error;

      const row = document.getElementById('mat-' + id);
      if (row) row.remove();
    } catch (err) {
      alert('Error deleting material: ' + err.message);
    }
  };

  // Helper
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Initial session verification
  checkSession();
});

