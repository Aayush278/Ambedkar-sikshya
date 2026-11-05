/* ============================================================
   AMBEDKAR SIKHYA — Form Handler
   Validates forms and sends data via WhatsApp message.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-whatsapp="true"]');
  const defaultWhatsapp = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.whatsappNumber : '919090398780';

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset errors
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      // Validate required fields
      let isValid = true;
      const fields = form.querySelectorAll('[required]');
      fields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          const group = field.closest('.form-group');
          if (group) group.classList.add('error');
        }
      });

      // Validate mobile number (10 digits)
      const mobileField = form.querySelector('[type="tel"]');
      if (mobileField && mobileField.value) {
        const cleanMobile = mobileField.value.replace(/\D/g, '');
        if (cleanMobile.length !== 10) {
          isValid = false;
          const group = mobileField.closest('.form-group');
          if (group) group.classList.add('error');
        }
      }

      if (!isValid) {
        // Focus first invalid field
        const firstError = form.querySelector('.form-group.error .form-control');
        if (firstError) firstError.focus();
        return;
      }

      // Build WhatsApp message
      const purpose = form.dataset.purpose || 'Enquiry';
      let message = `*New ${purpose} from Ambedkar Sikhya*\n\n`;

      const inputs = form.querySelectorAll('input:not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea');
      inputs.forEach(input => {
        const name = input.name || input.id;
        const value = input.value.trim();
        if (name && value) {
          message += `*${name}:* ${value}\n`;
        }
      });

      message += `\n_Sent from ambedkarsikhya.com_`;

      // Determine target WhatsApp number
      const targetPhone = form.dataset.whatsappNumber || defaultWhatsapp;

      // Open WhatsApp with the message
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
      window.open(url, '_blank');

      // Visual success confirmation notice
      let notice = form.querySelector('.form-success-notice');
      if (!notice) {
        notice = document.createElement('div');
        notice.className = 'form-success-notice';
        form.appendChild(notice);
      }
      notice.innerHTML = `
        <div style="background: rgba(37, 211, 102, 0.12); border: 1.5px solid #25D366; color: #166534; padding: 0.85rem 1rem; border-radius: var(--radius-md); margin-top: var(--space-md); display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <div>
            <strong>Opening WhatsApp...</strong>
            <div style="color: var(--color-text-light); font-size: 0.8rem; margin-top: 2px;">Your details are formatted and ready. Please tap <strong>Send</strong> in WhatsApp to chat with our mentor / counselor!</div>
          </div>
        </div>`;
    });

    // Real-time validation: clear error on input and change
    form.querySelectorAll('.form-control').forEach(control => {
      const clearError = () => {
        const group = control.closest('.form-group');
        if (group) group.classList.remove('error');
      };
      control.addEventListener('input', clearError);
      control.addEventListener('change', clearError);
    });
  });
});
