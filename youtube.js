/* ============================================================
   AMBEDKAR SIKHYA — YouTube Video Loader
   Fetches videos from videos.json and renders video cards.
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('youtube-videos-container');
  if (!container) return;

  try {
    // Determine correct path based on page location
    const dataPath = 'videos.json';

    const res = await fetch(dataPath);
    if (res.ok) {
      const videos = await res.json();
      if (videos.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <h3>No Videos Available</h3>
            <p>Visit our YouTube channel directly for the latest content.</p>
            <a href="${typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.youtubeChannelUrl : 'https://www.youtube.com/@AmbedkarSikhsha'}" class="btn btn-sm btn-accent" target="_blank" rel="noopener">Visit YouTube</a>
          </div>`;
        return;
      }

      let html = '';
      videos.forEach(video => {
        html += `
          <div class="video-card">
            <div class="video-card-thumb">
              <iframe 
                src="https://www.youtube.com/embed/${video.id}" 
                title="${video.title}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                loading="lazy">
              </iframe>
            </div>
            <div class="video-card-body">
              <h3>${video.title}</h3>
              <span class="video-card-meta">${video.category} • ${video.date}</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    }
  } catch (e) {
    const channelUrl = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.youtubeChannelUrl : 'https://www.youtube.com/@AmbedkarSikhsha';
    container.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <h3>Failed to Load Videos</h3>
        <p>Please visit our YouTube channel directly.</p>
        <a href="${channelUrl}" class="btn btn-sm btn-accent" target="_blank" rel="noopener">Visit YouTube</a>
      </div>`;
  }
});
