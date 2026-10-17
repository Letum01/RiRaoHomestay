/* ==========================================================
   BOOKING.JS – Rì Rào Homestay
   3-step booking form with EmailJS integration
   ========================================================== */

// EmailJS config
const EMAILJS_PUBLIC_KEY = 'BlsCnGd5unrvuffdm';
const EMAILJS_SERVICE_ID = 'Rì_Rào_Homestay';
const EMAILJS_TEMPLATE_OWNER = 'template_buz14jo';
const EMAILJS_TEMPLATE_CUSTOMER = 'template_8t8b1ho';

// Email nhận đơn đặt phòng của CHỦ homestay (template owner – "Có đơn đặt phòng mới")
// Template khách dùng guest_email (email khách nhập ở form)
const OWNER_EMAIL = 'thuyntt223@uef.edu.vn';

// Room prices (VND)
const ROOM_PRICES = {
  standard: 400000,
  large: 500000,
  double: 600000
};

let currentStep = 1;
let formData = {};

// Initialize EmailJS
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

/* ── Navigation ───────────────────────────────────────────── */

function goToStep(step) {
  // Validate current step before proceeding
  if (step > currentStep && !validateStep(currentStep)) {
    return;
  }

  // Hide all steps
  document.querySelectorAll('.form-step').forEach(el => {
    el.classList.add('hidden');
  });

  // Show target step
  const targetStep = document.getElementById(`step${step}`);
  if (targetStep) {
    targetStep.classList.remove('hidden');
  }

  // Update step indicators
  updateStepIndicators(step);

  currentStep = step;

  // If going to review step, populate review data
  if (step === 3) {
    populateReview();
  }
}

function updateStepIndicators(activeStep) {
  document.querySelectorAll('.booking-step').forEach((el, idx) => {
    const stepNum = idx + 1;
    el.classList.remove('active', 'done');
    if (stepNum === activeStep) {
      el.classList.add('active');
    } else if (stepNum < activeStep) {
      el.classList.add('done');
    }
  });
}

function nextStep() {
  if (currentStep < 3) {
    goToStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) {
    goToStep(currentStep - 1);
  }
}

/* ── Validation ────────────────────────────────────────────── */

function validateStep(step) {
  let isValid = true;
  const errors = [];

  if (step === 1) {
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const guests = document.getElementById('guests')?.value;
    const room = document.getElementById('roomType')?.value;

    if (!checkIn) {
      showFieldError('checkIn', t('errCheckIn'));
      isValid = false;
    } else {
      clearFieldError('checkIn');
    }

    if (!checkOut) {
      showFieldError('checkOut', t('errCheckOut'));
      isValid = false;
    } else if (checkIn && new Date(checkOut) <= new Date(checkIn)) {
      showFieldError('checkOut', t('errCheckOutBefore'));
      isValid = false;
    } else {
      clearFieldError('checkOut');
    }

    if (!guests) {
      showFieldError('guests', t('errGuests'));
      isValid = false;
    } else {
      clearFieldError('guests');
    }

    if (!room) {
      showFieldError('roomType', t('errRoom'));
      isValid = false;
    } else {
      clearFieldError('roomType');
    }
  }

  if (step === 2) {
    const name = document.getElementById('guestName')?.value.trim();
    const phone = document.getElementById('guestPhone')?.value.trim();
    const email = document.getElementById('guestEmail')?.value.trim();

    if (!name) {
      showFieldError('guestName', t('errName'));
      isValid = false;
    } else {
      clearFieldError('guestName');
    }

    if (!phone || !/^[0-9+\-\s]{9,15}$/.test(phone)) {
      showFieldError('guestPhone', t('errPhone'));
      isValid = false;
    } else {
      clearFieldError('guestPhone');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError('guestEmail', t('errEmail'));
      isValid = false;
    } else {
      clearFieldError('guestEmail');
    }
  }

  if (step === 3) {
    // Checkbox "đồng ý chính sách" nằm ở BƯỚC 3 – chỉ kiểm tra khi XÁC NHẬN đặt phòng.
    // (Từng kiểm tra ở bước 2 gây vòng lặp chết: không sang được bước 3 để tick checkbox.)
    const terms = document.getElementById('agreeTerms')?.checked;
    const agreeError = document.getElementById('agreeError');

    if (!terms) {
      showToast(t('errTerms'));
      if (agreeError) agreeError.textContent = t('errTerms');
      const checkbox = document.getElementById('agreeTerms');
      if (checkbox) {
        checkbox.setAttribute('aria-invalid', 'true');
        checkbox.focus({ preventScroll: true });
        checkbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      isValid = false;
    } else {
      if (agreeError) agreeError.textContent = '';
      document.getElementById('agreeTerms')?.removeAttribute('aria-invalid');
    }
  }

  return isValid;
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
  }

  // Find or create error element
  let errorEl = document.getElementById(`${fieldId}Error`);
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.id = `${fieldId}Error`;
    errorEl.className = 'form-error';
    if (field) {
      field.parentNode.insertBefore(errorEl, field.nextSibling);
    }
  }
  errorEl.textContent = message;
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
  }

  const errorEl = document.getElementById(`${fieldId}Error`);
  if (errorEl) {
    errorEl.textContent = '';
  }
}

/* ── Price Calculation ─────────────────────────────────────── */

function calculatePrice() {
  const roomType = document.getElementById('roomType')?.value;
  const checkIn = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  const addons = Array.from(document.querySelectorAll('.addon-input:checked')).map(cb => cb.value);

  let roomPrice = 0;
  let nights = 0;
  let addonTotal = 0;

  if (roomType && ROOM_PRICES[roomType.toLowerCase()]) {
    roomPrice = ROOM_PRICES[roomType.toLowerCase()];
  }

  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  }

  // Addon prices
  const ADDON_PRICES = {
    sup: 150000,
    fishing: 200000,
    dive: 250000,
    jeep: 300000
  };

  addons.forEach(addon => {
    const key = addon.toLowerCase().replace(/\s+/g, '');
    if (ADDON_PRICES[key]) {
      addonTotal += ADDON_PRICES[key];
    }
  });

  const roomTotal = roomPrice * nights;
  const total = roomTotal + addonTotal;
  const deposit = total * 0.3;

  // Update display (dùng đúng class .price-summary__row của CSS)
  const summaryEl = document.getElementById('priceSummary');
  if (summaryEl) {
    const lang = typeof getLang === 'function' ? getLang() : 'vi';
    const fmt = (v) => v.toLocaleString('vi-VN') + 'đ';
    summaryEl.innerHTML = `
      <div class="price-summary__row">
        <span>${lang === 'vi' ? 'Tiền phòng' : 'Room rate'}</span>
        <span>${roomPrice ? fmt(roomPrice) + ' × ' + nights + (lang === 'vi' ? ' đêm' : ' nights') : '–'}</span>
      </div>
      <div class="price-summary__row">
        <span>${lang === 'vi' ? 'Trải nghiệm cộng thêm' : 'Add-ons'}</span>
        <span>${fmt(addonTotal)}</span>
      </div>
      <div class="price-summary__row price-summary__row--total">
        <strong>${lang === 'vi' ? 'Tổng dự kiến' : 'Total estimate'}</strong>
        <strong class="price-summary__total">${fmt(total)}</strong>
      </div>
      <div class="price-summary__row price-summary__row--deposit">
        <span>${lang === 'vi' ? 'Cọc 30% (tại homestay)' : '30% deposit (at homestay)'}</span>
        <span>${fmt(deposit)}</span>
      </div>
    `;
  }

  return { roomTotal, addonTotal, total, deposit, nights };
}

function updatePriceSummary() {
  calculatePrice();
}

/* ── Review Card ───────────────────────────────────────────── */

function populateReview() {
  const lang = typeof getLang === 'function' ? getLang() : 'vi';

  const checkIn = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  const guests = document.getElementById('guests')?.value;
  const room = document.getElementById('roomType')?.value;
  const name = document.getElementById('guestName')?.value;
  const phone = document.getElementById('guestPhone')?.value;
  const email = document.getElementById('guestEmail')?.value;
  const notes = document.getElementById('specialRequests')?.value;
  const addons = Array.from(document.querySelectorAll('.addon-input:checked')).map(cb => cb.value);

  const price = calculatePrice();

  // Format dates
  const formatDate = (d) => {
    if (!d) return '-';
    const date = new Date(d);
    return date.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US');
  };

  // Get room name
  const roomNames = {
    standard: lang === 'vi' ? 'Standard' : 'Standard',
    large: lang === 'vi' ? 'Large' : 'Large',
    double: lang === 'vi' ? 'Double' : 'Double'
  };

  // Get addon names
  const addonNames = {
    sup: 'SUP',
    fishing: lang === 'vi' ? 'Tour làng chài' : 'Fishing Village',
    dive: lang === 'vi' ? 'Lặn san hô' : 'Snorkeling',
    jeep: 'Jeep Tour'
  };

  const reviewHTML = `
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Họ tên' : 'Full Name'}</span>
      <span class="review-value">${name || '-'}</span>
    </div>
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Điện thoại' : 'Phone'}</span>
      <span class="review-value">${phone || '-'}</span>
    </div>
    <div class="review-row">
      <span class="review-label">Email</span>
      <span class="review-value">${email || '-'}</span>
    </div>
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Nhận phòng' : 'Check-in'}</span>
      <span class="review-value">${formatDate(checkIn)}</span>
    </div>
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Trả phòng' : 'Check-out'}</span>
      <span class="review-value">${formatDate(checkOut)}</span>
    </div>
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Số khách' : 'Guests'}</span>
      <span class="review-value">${guests || '-'}</span>
    </div>
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Phòng' : 'Room'}</span>
      <span class="review-value">${roomNames[room.toLowerCase()] || '-'}</span>
    </div>
    ${addons.length > 0 ? `
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Trải nghiệm' : 'Experiences'}</span>
      <span class="review-value">${addons.map(a => addonNames[a.toLowerCase().replace(/\s+/g, '')]).join(', ')}</span>
    </div>
    ` : ''}
    ${notes ? `
    <div class="review-row">
      <span class="review-label">${lang === 'vi' ? 'Ghi chú' : 'Notes'}</span>
      <span class="review-value">${notes}</span>
    </div>
    ` : ''}
    <div class="review-row" style="border-top: 2px solid var(--border); margin-top: 12px; padding-top: 12px;">
      <span class="review-label" style="font-weight: 600; color: var(--text);">${lang === 'vi' ? 'TỔNG CỘNG' : 'TOTAL'}</span>
      <span class="review-value" style="font-size: 1.2rem; color: var(--teal); font-weight: 700;">${price.total ? price.total.toLocaleString('vi-VN') : '0'}đ</span>
    </div>
  `;

  const container = document.getElementById('reviewCard');
  if (container) {
    container.innerHTML = reviewHTML;
  }
}

/* ── Booking Code & Money Helpers ──────────────────────────── */

function formatVND(v) {
  return (v || 0).toLocaleString('vi-VN') + 'đ';
}

// Mã đặt phòng dạng RR261017-A1B2 (YYMMDD + 4 ký tự ngẫu nhiên)
function generateBookingCode() {
  const d = new Date();
  const ymd = String(d.getFullYear()).slice(2) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RR${ymd}-${rand}`;
}

/* ── Form Submission ───────────────────────────────────────── */

async function submitBooking(e) {
  e.preventDefault();

  // Kiểm tra thông tin liên hệ (bước 2) – nếu thiếu thì quay lại bước 2 để user thấy lỗi
  if (!validateStep(2)) {
    goToStep(2);
    return;
  }
  // Kiểm tra đồng ý chính sách (bước 3)
  if (!validateStep(3)) return;

  const lang = typeof getLang === 'function' ? getLang() : 'vi';
  const submitBtn = document.getElementById('submitBooking');

  // Show loading state
  if (submitBtn) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  }

  // Collect form data
  const formData = {
    to_name: document.getElementById('guestName')?.value,
    guest_email: document.getElementById('guestEmail')?.value,
    guest_phone: document.getElementById('guestPhone')?.value,
    check_in: document.getElementById('checkIn')?.value,
    check_out: document.getElementById('checkOut')?.value,
    room_type: document.getElementById('roomType')?.value,
    guests: document.getElementById('guests')?.value,
    special_requests: document.getElementById('specialRequests')?.value || '',
    addons: Array.from(document.querySelectorAll('.addon-input:checked')).map(cb => cb.value).join(', '),
  };

  // Calculate price + mã phòng + bảng tính đầy đủ
  const price = calculatePrice();
  const bookingCode = generateBookingCode();

  formData.booking_code = bookingCode;
  formData.nights       = price.nights;
  formData.room_total   = formatVND(price.roomTotal);  // TỔNG TẠM TÍNH (tiền phòng)
  formData.addon_total  = formatVND(price.addonTotal);
  formData.total        = formatVND(price.total);      // TỔNG TIỀN
  formData.deposit      = formatVND(price.deposit);    // TIỀN CỌC 30%

  // Alias cùng nghĩa – khớp với mọi cách đặt tên biến trong template EmailJS
  formData.ma_phong       = bookingCode;
  formData.code           = bookingCode;
  formData.so_dem         = price.nights;
  formData.tong_tam_tinh  = formData.room_total;
  formData.tong_tien      = formData.total;
  formData.tien_coc       = formData.deposit;
  formData.total_price    = formData.total;
  formData.deposit_amount = formData.deposit;

  // Khớp chính xác 100% với cả 2 template EmailJS (owner + customer):
  //   {{booking_id}} {{guest_name}} {{guest_phone}} {{guest_email}} {{room}}
  //   {{check_in}} {{check_out}} {{nights}} {{guests}} {{total}} {{deposit}} {{note}}
  formData.booking_id = bookingCode;
  formData.guest_name = formData.to_name || '';            // template owner: Khách
  formData.note       = formData.special_requests || '';   // template owner: Lời nhắn
  const roomLabels = {
    standard: lang === 'vi' ? 'Phòng Standard' : 'Standard Room',
    large:    lang === 'vi' ? 'Phòng Large'    : 'Large Room',
    double:   lang === 'vi' ? 'Phòng Double'   : 'Double Room',
  };
  formData.room = roomLabels[(formData.room_type || '').toLowerCase()] || formData.room_type || '';
  formData.grand_total    = formData.total;   // alias "tổng tiền"
  formData.estimated_total = formData.total;

  // Khối text gộp đủ 4 mục (mã phòng · tạm tính · tổng · cọc) –
  // template EmailJS chỉ cần chèn {{booking_summary}} là hiển thị tất cả
  const lb = (vi, en) => (lang === 'vi' ? vi : en);
  formData.booking_summary =
    `${lb('Mã phòng', 'Booking code')}: ${bookingCode}\n` +
    `${lb('Tổng tạm tính (tiền phòng)', 'Room subtotal')}: ${formData.room_total} × ${price.nights} ${lb('đêm', 'nights')}\n` +
    `${lb('Trải nghiệm cộng thêm', 'Add-ons')}: ${formData.addon_total}\n` +
    `${lb('Tổng tiền', 'Total')}: ${formData.total}\n` +
    `${lb('Tiền cọc 30%', '30% deposit')}: ${formData.deposit}`;

  // EmailJS CDN chưa nạp được (offline / chặn script) – báo ngay thay vì throw im lặng
  if (typeof emailjs === 'undefined') {
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
    showToast(t('errSend'));
    return;
  }

  try {
    // Tách payload cho2 template – fix lỗi EmailJS 422 "The recipients address is empty":
    // template CHỦ (đơn mới) → OWNER_EMAIL; template KHÁCH (xác nhận) → email khách nhập form
    const ownerPayload    = { ...formData, to_email: OWNER_EMAIL,          reply_to: formData.guest_email };
    const customerPayload = { ...formData, to_email: formData.guest_email, reply_to: formData.guest_email };

    // Send both emails in parallel
    const [ownerResponse, customerResponse] = await Promise.all([
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_OWNER, ownerPayload),
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CUSTOMER, customerPayload)
    ]);

    // Hide booking modal, show success
    closeBookingModal();
    showSuccessModal(formData, price);

  } catch (error) {
    console.error('EmailJS Error:', error);
    showToast(t('errSend') || 'Failed to send. Please try again or contact us directly on Zalo.');
  } finally {
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }
}

/* ── Success Modal ─────────────────────────────────────────── */

function showSuccessModal(formData, price) {
  const overlay = document.getElementById('successModalOverlay');
  const modal = document.getElementById('successModal');
  const details = document.getElementById('passDetails');
  const lang = typeof getLang === 'function' ? getLang() : 'vi';

  // Build boarding pass details
  const roomNames = {
    standard: lang === 'vi' ? 'Standard' : 'Standard',
    large: lang === 'vi' ? 'Large' : 'Large',
    double: lang === 'vi' ? 'Double' : 'Double'
  };

  details.innerHTML = `
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Mã phòng' : 'Booking code'}</span>
      <span class="boarding-pass__detail-value" style="font-weight:700;color:var(--teal);">${formData.booking_code || '-'}</span>
    </div>
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Khách hàng' : 'Guest'}</span>
      <span class="boarding-pass__detail-value">${formData.to_name}</span>
    </div>
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Phòng' : 'Room'}</span>
      <span class="boarding-pass__detail-value">${roomNames[(formData.room_type || '').toLowerCase()] || formData.room_type}</span>
    </div>
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">Check-in</span>
      <span class="boarding-pass__detail-value">${formData.check_in}</span>
    </div>
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">Check-out</span>
      <span class="boarding-pass__detail-value">${formData.check_out}</span>
    </div>
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Số khách' : 'Guests'}</span>
      <span class="boarding-pass__detail-value">${formData.guests}</span>
    </div>
    ${formData.addons ? `
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Trải nghiệm' : 'Experiences'}</span>
      <span class="boarding-pass__detail-value">${formData.addons}</span>
    </div>
    ` : ''}
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Tổng tạm tính' : 'Subtotal'}</span>
      <span class="boarding-pass__detail-value">${formData.room_total || '0đ'}${formData.nights ? ` × ${formData.nights} ${lang === 'vi' ? 'đêm' : 'nights'}` : ''}</span>
    </div>
    <div class="boarding-pass__detail-row">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'TỔNG TIỀN' : 'TOTAL'}</span>
      <span class="boarding-pass__detail-value" style="font-size:1.2rem;color:var(--teal);font-weight:700;">${formData.total || formData.total_price || '0đ'}</span>
    </div>
    <div class="boarding-pass__detail-row" style="border-top:2px dashed var(--border);margin-top:4px;padding-top:10px;">
      <span class="boarding-pass__detail-label">${lang === 'vi' ? 'Tiền cọc 30%' : '30% deposit'}</span>
      <span class="boarding-pass__detail-value" style="font-weight:700;color:var(--brown);">${formData.deposit || formData.deposit_amount || '0đ'}</span>
    </div>
  `;

  // Show modal
  if (overlay) {
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
  }
  if (modal) {
    modal.classList.add('show');
  }
}

/* ── Modal Control ─────────────────────────────────────────── */

function openBookingModal(roomType = '') {
  const overlay = document.getElementById('bookingModalOverlay');
  const modal = document.getElementById('bookingModal');

  // Đóng menu drawer (nếu đang mở) trước khi hiện modal đặt phòng
  const mainNav = document.getElementById('mainNav');
  if (mainNav && mainNav.classList.contains('open') && typeof closeMobileNav === 'function') {
    closeMobileNav();
  }

  // Pre-select room if provided
  if (roomType) {
    const roomSelect = document.getElementById('roomType');
    if (roomSelect) {
      roomSelect.value = roomType;
    }
  }

  // Reset form
  resetBookingForm();

  if (overlay) {
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
  }
  if (modal) {
    modal.classList.add('show');
  }

  // Focus first field
  const firstInput = modal.querySelector('input, select');
  if (firstInput) {
    firstInput.focus();
  }
}

function closeBookingModal() {
  const overlay = document.getElementById('bookingModalOverlay');
  const modal = document.getElementById('bookingModal');

  if (overlay) {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (modal) {
    modal.classList.remove('show');
  }
}

function closeSuccessModal() {
  const overlay = document.getElementById('successModalOverlay');
  const modal = document.getElementById('successModal');

  if (overlay) {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (modal) {
    modal.classList.remove('show');
  }
}

function resetBookingForm() {
  const form = document.getElementById('bookingForm');
  if (form) {
    form.reset();
  }

  currentStep = 1;
  goToStep(1);

  // Clear all errors
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

/* ── Toast Notifications ------------------------------------ */

function showToast(message) {
  let toast = document.getElementById('toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ph ph-warning-circle"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ── Event Listeners ---------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.step-next').forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

  document.querySelectorAll('.step-back').forEach(btn => {
    btn.addEventListener('click', prevStep);
  });

  // Submit qua event 'submit' của FORM (bao trùm cả phím Enter) thay vì 'click' của nút
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', submitBooking);
  }

  // Mở modal đặt phòng từ các nút chính trên trang
  ['headerBookBtn', 'heroBtnBook', 'footerBookBtn', 'mobileBookBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => openBookingModal(''));
  });

  // Nút "Đặt phòng này" trên từng thẻ phòng – tự chọn sẵn hạng phòng
  document.querySelectorAll('.room-book-btn').forEach(btn => {
    btn.addEventListener('click', () => openBookingModal(btn.dataset.room || ''));
  });

  // Không cho chọn ngày trong quá khứ; ngày trả phòng phải sau ngày nhận phòng
  const todayStr    = new Date().toISOString().split('T')[0];
  const checkInEl   = document.getElementById('checkIn');
  const checkOutEl  = document.getElementById('checkOut');
  if (checkInEl && checkOutEl) {
    checkInEl.min  = todayStr;
    checkOutEl.min = todayStr;
    checkInEl.addEventListener('change', () => {
      const nextDay = new Date(checkInEl.value);
      nextDay.setDate(nextDay.getDate() + 1);
      const minOut = nextDay.toISOString().split('T')[0];
      checkOutEl.min = minOut;
      if (checkOutEl.value && checkOutEl.value <= checkInEl.value) {
        checkOutEl.value = minOut;
      }
    });
  }

  // Price calculation triggers
  ['checkOut', 'roomType'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', updatePriceSummary);
    }
  });

  document.querySelectorAll('.addon-input').forEach(cb => {
    cb.addEventListener('change', updatePriceSummary);
  });

  // Modal close buttons
  const closeModalBtn = document.getElementById('modalClose') || document.getElementById('closeBookingModal');
  const closeSuccessBtn = document.getElementById('closeSuccess');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBookingModal);
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeSuccessModal);
  }

  // Close on overlay click
  const bookingOverlay = document.getElementById('bookingModalOverlay');
  const successOverlay = document.getElementById('successModalOverlay');

  if (bookingOverlay) {
    bookingOverlay.addEventListener('click', (e) => {
      if (e.target === bookingOverlay) closeBookingModal();
    });
  }

  if (successOverlay) {
    successOverlay.addEventListener('click', (e) => {
      if (e.target === successOverlay) closeSuccessModal();
    });
  }

  // Price calculation triggers
  ['checkIn', 'checkOut', 'roomType'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', updatePriceSummary);
    }
  });

  document.querySelectorAll('.addon-input').forEach(cb => {
    cb.addEventListener('change', updatePriceSummary);
  });

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeSuccessModal();
    }
  });
});

/* ── Exports ------------------------------------------------- */

window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.closeSuccessModal = closeSuccessModal;
window.goToStep = goToStep;
window.nextStep = nextStep;
window.prevStep = prevStep;