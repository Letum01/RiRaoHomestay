/* ==========================================================
   STAY-MATCH.JS – Rì Rào Homestay
   Mood selector → personalised room + itinerary card
   ========================================================== */

const moodData = {
  healing: {
    icon: '🌊',
    roomKey: 'double',
    roomImg: 'room-card__img--double',
    schedule: [
      { icon: 'ph-sun',          vi: '6:00 – Yoga bãi biển & đón bình minh',      en: '6:00 – Beach yoga & sunrise watching' },
      { icon: 'ph-fork-knife',   vi: '8:00 – Bữa sáng healthy tại homestay',      en: '8:00 – Healthy breakfast at homestay' },
      { icon: 'ph-waves',        vi: '10:00 – Thiền định, đọc sách bên biển',     en: '10:00 – Meditation & reading by the sea' },
      { icon: 'ph-tree',         vi: '14:00 – Tắm biển & thả lỏng',              en: '14:00 – Sea swimming & relaxation' },
      { icon: 'ph-moon-stars',   vi: '19:00 – Ngắm hoàng hôn, bữa tối hải sản', en: '19:00 – Sunset & fresh seafood dinner' },
    ],
  },
  bonding: {
    icon: '👨‍👩‍👧',
    roomKey: 'large',
    roomImg: 'room-card__img--large',
    schedule: [
      { icon: 'ph-boat',         vi: '5:00 – Tour làng chài cùng ngư dân',       en: '5:00 – Fishing village tour with locals' },
      { icon: 'ph-fork-knife',   vi: '8:30 – Bữa sáng gia đình ngoài trời',     en: '8:30 – Family breakfast outdoors' },
      { icon: 'ph-parachute',    vi: '10:00 – Tour Jeep đồi cát Nam Cương',      en: '10:00 – Nam Cuong sand dune Jeep tour' },
      { icon: 'ph-swimming-pool',vi: '14:00 – Chèo SUP cùng nhau',              en: '14:00 – SUP paddling together' },
      { icon: 'ph-campfire',     vi: '19:00 – Tiệc nướng BBQ bãi biển',         en: '19:00 – BBQ beach party' },
    ],
  },
  workation: {
    icon: '💻',
    roomKey: 'standard',
    roomImg: 'room-card__img--standard',
    schedule: [
      { icon: 'ph-coffee',       vi: '7:00 – Cà phê bình minh & bắt đầu làm việc', en: '7:00 – Sunrise coffee & work session' },
      { icon: 'ph-laptop',       vi: '9:00–12:00 – Deep work (Wi-Fi tốc độ cao)',  en: '9:00–12:00 – Deep work (high-speed Wi-Fi)' },
      { icon: 'ph-waves',        vi: '12:30 – Bơi biển & nạp năng lượng',         en: '12:30 – Sea swim & recharge' },
      { icon: 'ph-laptop',       vi: '14:00–17:00 – Work session 2',              en: '14:00–17:00 – Work session 2' },
      { icon: 'ph-sun-horizon',  vi: '17:30 – Yoga hoàng hôn & thư giãn',        en: '17:30 – Sunset yoga & wind down' },
    ],
  },
};

const roomNames = {
  vi: { standard: 'Phòng Standard', large: 'Phòng Large', double: 'Phòng Double' },
  en: { standard: 'Standard Room',  large: 'Large Room',  double: 'Double Room'  },
};
const roomPrices = { standard: '400,000đ', large: '500,000đ', double: '600,000đ' };
const roomDescs  = {
  vi: {
    standard: 'Kết nối, làm việc với Wi-Fi mạnh và không gian yên tĩnh.',
    large:    'Rộng rãi, thoải mái cho cả gia đình hoặc nhóm bạn.',
    double:   'Sang trọng, yên tĩnh – lý tưởng để chữa lành sâu nhất.',
  },
  en: {
    standard: 'Stay connected with fast Wi-Fi and a quiet workspace.',
    large:    'Spacious and comfortable for the whole family or group.',
    double:   'Luxurious and tranquil – ideal for deep healing and rest.',
  },
};

let _activeMood = null;

function renderStayMatch() {
  const lang = (typeof getLang === 'function') ? getLang() : 'vi';
  const container = document.getElementById('matchResult');
  if (!container) return;

  if (!_activeMood) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
        <div style="font-size:2.5rem;margin-bottom:12px;">✨</div>
        <p>${lang === 'vi' ? 'Chọn tâm trạng của bạn để xem gợi ý cá nhân hoá.' : 'Select your mood above to see personalised suggestions.'}</p>
      </div>`;
    return;
  }

  const data     = moodData[_activeMood];
  const roomKey  = data.roomKey;
  const name     = roomNames[lang][roomKey];
  const desc     = roomDescs[lang][roomKey];
  const price    = roomPrices[roomKey];
  const schedHd  = lang === 'vi' ? 'Lịch trình gợi ý' : 'Suggested Itinerary';
  const bookLbl  = lang === 'vi' ? 'Đặt phòng này' : 'Book This Room';

  const schedItems = data.schedule.map(s => `
    <li>
      <i class="ph ${s.icon}"></i>
      <span>${s[lang]}</span>
    </li>`).join('');

  container.innerHTML = `
    <div class="match-result__header">
      <div class="match-result__title">${data.icon} ${lang === 'vi' ? 'Gợi ý cho bạn' : 'Recommended for You'}</div>
      <div class="match-result__desc">${lang === 'vi' ? 'Dựa trên tâm trạng bạn chọn, đây là phòng và lịch trình phù hợp nhất.' : 'Based on your mood, here is the best matching room and itinerary.'}</div>
    </div>
    <div class="match-result__body">
      <div class="match-result__room">
        <div class="match-result__room-img ${data.roomImg}"></div>
        <div>
          <h4>${name}</h4>
          <p>${desc}</p>
          <p style="color:var(--teal);font-weight:600;font-size:.85rem;margin-top:6px;">${price}<span style="font-weight:400;color:var(--text-muted);"> /${lang === 'vi' ? 'đêm' : 'night'}</span></p>
        </div>
      </div>
      <div class="match-result__schedule">
        <h5>${schedHd}</h5>
        <ul>${schedItems}</ul>
      </div>
    </div>
    <div class="match-result__cta">
      <button class="btn btn--primary btn--sm" onclick="openBookingModal('${roomKey}')">${bookLbl} →</button>
    </div>`;
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _activeMood = btn.dataset.mood;
      renderStayMatch();
    });
  });

  renderStayMatch();
});

window.renderStayMatch = renderStayMatch;
