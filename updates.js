/* ============================================================
   AMBEDKAR SIKHYA — Educational Updates Loader
   Fetches updates from updates.json with search & filter.
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('updates-container');
  if (!container) return;

  let allUpdates = [];

  const renderUpdates = (updates) => {
    if (updates.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
          <h3>No Updates Found</h3>
          <p>We couldn't find any updates matching your criteria.</p>
          <button class="btn btn-sm btn-secondary" id="clear-filters">Clear Filters</button>
        </div>`;
      const clearBtn = document.getElementById('clear-filters');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          const search = document.getElementById('update-search');
          const cat = document.getElementById('update-category');
          if (search) search.value = '';
          if (cat) cat.value = 'All';
          renderUpdates(allUpdates);
        });
      }
      return;
    }

    let html = '';
    updates.forEach(item => {
      html += `
        <div class="update-card">
          <span class="badge">${item.category}</span>
          <h3 class="card-title mt-md" style="font-size: 1.1rem;">${item.title}</h3>
          <div class="update-card-meta">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>${item.publishedDate}</span>
            ${item.lastVerified ? `<span>• Verified: ${item.lastVerified}</span>` : ''}
          </div>
          ${item.author ? `<p style="font-size:0.75rem;color:var(--color-text-light);margin-top:var(--space-xs);">By ${item.author}</p>` : ''}
          <p class="card-text mt-md" style="font-size: 0.875rem; flex-grow:1;">${item.summary}</p>
          ${item.officialSource && item.officialSource !== 'https://example.gov.in/' ? `<a href="${item.officialSource}" target="_blank" rel="noopener" style="font-size:0.75rem;color:var(--color-secondary);display:inline-flex;align-items:center;gap:4px;margin-top:var(--space-sm);">Official Source <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>` : ''}
          <div style="margin-top: auto; padding-top: var(--space-lg);">
            <a href="#" class="btn btn-sm btn-secondary">Read More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
          </div>
        </div>`;
    });
    container.innerHTML = html;
  };

  try {
    const dataPath = 'updates.json';

    const res = await fetch(dataPath);
    if (res.ok) {
      allUpdates = await res.json();
      allUpdates.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      renderUpdates(allUpdates);

      const searchInput = document.getElementById('update-search');
      const categorySelect = document.getElementById('update-category');

      const filterUpdates = () => {
        const term = (searchInput?.value || '').toLowerCase();
        const cat = categorySelect?.value || 'All';

        const filtered = allUpdates.filter(u => {
          const matchTerm = !term || u.title.toLowerCase().includes(term) || u.summary.toLowerCase().includes(term) || (u.category && u.category.toLowerCase().includes(term));
          const matchCat = cat === 'All' || u.category === cat;
          return matchTerm && matchCat;
        });

        renderUpdates(filtered);
      };

      if (searchInput) searchInput.addEventListener('input', filterUpdates);
      if (categorySelect) categorySelect.addEventListener('change', filterUpdates);
    }
  } catch (e) {
    container.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
        <h3>Failed to Load Updates</h3>
        <p>Please try refreshing the page.</p>
      </div>`;
  }
});
