// js/reservations.js
window.initReservations = function() {
  const form = document.getElementById('reservation-form');
  const modal = document.getElementById('booking-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const submitBtn = document.getElementById('res-submit-btn');
  const spinner = submitBtn?.querySelector('.loader-spinner');
  const btnText = submitBtn?.querySelector('.btn-text');

  if (!form) return;

  // Validation rules
  const validators = {
    name: (val) => {
      if (!val || val.trim().length < 2) return "Name must be at least 2 characters.";
      return null;
    },
    email: (val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val || !emailRegex.test(val)) return "Please enter a valid email address.";
      return null;
    },
    phone: (val) => {
      const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
      if (!val || !phoneRegex.test(val)) return "Please enter a valid phone number (10-15 digits).";
      return null;
    },
    guests: (val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) return "Minimum 1 guest.";
      if (num > 20) return "For parties larger than 20, contact us directly.";
      return null;
    },
    date: (val) => {
      if (!val) return "Please choose a reservation date.";
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);
      if (selected < today) return "Reservations must be made for future dates.";
      return null;
    },
    time: (val) => {
      if (!val) return "Please select a dining time.";
      const [hours] = val.split(':').map(Number);
      if (hours < 17 || hours > 23) return "Reservations are accepted between 5:00 PM and 11:00 PM.";
      return null;
    }
  };

  const showFieldError = (fieldId, errorMsg) => {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(`error-${fieldId}`);
    const parent = field.closest('.form-group');

    if (errorMsg) {
      parent.classList.add('invalid');
      if (errorSpan) {
        errorSpan.textContent = errorMsg;
        errorSpan.style.display = 'block';
      }
    } else {
      parent.classList.remove('invalid');
      if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
      }
    }
  };

  const validateField = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return true;

    const fieldName = field.getAttribute('name');
    const validator = validators[fieldName];
    if (!validator) return true;

    const error = validator(field.value);
    showFieldError(fieldId, error);
    return !error;
  };

  // Bind real-time validation on change or blur
  const fields = ['res-name', 'res-email', 'res-phone', 'res-guests', 'res-date', 'res-time'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('change', () => validateField(id));
  });

  // Handle Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Run full validation check
    let isAllValid = true;
    fields.forEach(id => {
      const isValid = validateField(id);
      if (!isValid) isAllValid = false;
    });

    if (!isAllValid) return;

    // Show Loading state
    if (submitBtn) submitBtn.disabled = true;
    spinner?.classList.remove('hidden');
    btnText?.classList.add('hidden');

    try {
      // Simulate API service delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Extract values to confirm modal details
      const nameVal = document.getElementById('res-name').value;
      const guestsVal = document.getElementById('res-guests').value;
      const dateVal = document.getElementById('res-date').value;
      const timeVal = document.getElementById('res-time').value;

      document.getElementById('confirm-name').textContent = nameVal;
      document.getElementById('confirm-guests').textContent = guestsVal;
      
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateVal).toLocaleDateString('en-US', options);
      
      const formattedTime = timeVal.startsWith('12') || timeVal.startsWith('13') || parseInt(timeVal.split(':')[0]) < 12 
        ? `${timeVal} AM` 
        : `${parseInt(timeVal.split(':')[0]) - 12}:${timeVal.split(':')[1]} PM`;

      document.getElementById('confirm-date-time').textContent = `${formattedDate} @ ${formattedTime}`;

      // Open Modal
      modal?.classList.add('open');
      modal?.setAttribute('aria-hidden', 'false');
      
      // Reset form
      form.reset();
      fields.forEach(id => showFieldError(id, null));

    } catch (err) {
      alert("There was a technical error scheduling your reservation. Please try calling directly.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      spinner?.classList.add('hidden');
      btnText?.classList.remove('hidden');
    }
  });

  // Close Confirmation modal
  closeModalBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
};
