/* ============================================================
   AMBEDKAR SIKHYA — Shared Components Injector
   Dynamically injects full footer and common elements
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ——— Inject Full Footer ———
  const footer = document.querySelector('.footer');
  if (footer) {
    // Only inject if footer has minimal content (no footer-grid)
    const hasFullFooter = footer.querySelector('.footer-grid');
    if (!hasFullFooter) {
      footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                        <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        <span style="font-size: 1.1rem; font-weight: 800; color: #fff;">AMBEDKAR SIKHYA</span>
                    </div>
                    <p style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #78716c; margin-bottom: 1rem;">Learn • Guide • Grow • Succeed</p>
                    <p>Empowering students with quality education, career guidance, and reliable educational updates.</p>
                    <div class="footer-social">
                        <a href="https://www.youtube.com/@AmbedkarSikhsha" target="_blank" rel="noopener" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                        <a href="https://www.instagram.com/ambedkarsikhsha?utm_source=qr&dlrf=MWZpNDZycWNyOHlrbw==" target="_blank" rel="noopener" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                        <a href="https://www.facebook.com/share/1ETxiVoRoM/" target="_blank" rel="noopener" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="https://t.me/ambedkarsikhya" target="_blank" rel="noopener" aria-label="Telegram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h4>Navigation</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="career.html">Career Guidance</a></li>
                        <li><a href="tuition.html">Home Tuition</a></li>
                        <li><a href="youtube.html">YouTube</a></li>
                        <li><a href="updates.html">Updates</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Services</h4>
                    <ul class="footer-links">
                        <li><a href="tuition.html">Home Tuition</a></li>
                        <li><a href="counselling.html">Career Counselling</a></li>
                        <li><a href="index.html#gov-exam-counselling">Govt Exam Counselling</a></li>
                        <li><a href="updates.html">Educational Updates</a></li>
                        <li><a href="courses.html">Study Materials</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <ul class="footer-links">
                        <li>Phone: +91 90903 98780</li>
                        <li>Email: contact@ambedkarsikhya.com</li>
                        <li><a href="https://wa.me/919090398780" target="_blank" rel="noopener">WhatsApp</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Ambedkar Sikhya provides educational information for informational purposes. Verify important dates with official sources. &copy; 2026 Ambedkar Sikhya.</p>
                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms</a>
                    <a href="#">Disclaimer</a>
                    <a href="admin.html">Admin Portal</a>
                </div>
            </div>
        </div>`;
    }
  }

  // ——— Inject favicon if missing ———
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231a2e5a' stroke-width='1.5'%3E%3Cpath d='M22 10v6M2 10l10-5 10 5-10 5z'/%3E%3Cpath d='M6 12v5c3 3 9 3 12 0v-5'/%3E%3C/svg%3E";
    document.head.appendChild(favicon);
  }
});
