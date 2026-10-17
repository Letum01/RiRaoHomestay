/* ==========================================================
   I18N.JS – Rì Rào Homestay  |  vi / en
   ========================================================== */

const translations = {
  vi: {
    logoSub:'Homestay', navHome:'Trang chủ', navRooms:'Phòng nghỉ',
    navExp:'Trải nghiệm', navMatch:'Stay Match', navGuide:'Khám phá', navContact:'Liên hệ',
    bookNow:'Đặt phòng ngay',
    heroBadge:'Sơn Hải · Ninh Thuận',
    heroTitle:'Chữa lành cùng thiên nhiên –<br/>Trải nghiệm bản địa đích thực',
    heroSubtitle:'Nơi sóng biển Sơn Hải thì thầm, gió làng chài ru nhẹ và bạn tìm lại chính mình.',
    heroCTA:'Đặt phòng ngay', heroCTA2:'Khám phá phòng',
    statRooms:'Hạng phòng', statExp:'Trải nghiệm', statRate:'Đánh giá',
    roomsTag:'Phòng nghỉ', roomsTitle:'Không gian nghỉ dưỡng',
    roomsDesc:'Mỗi căn phòng hoà quyện với thiên nhiên xanh mát, đón làn gió biển và ánh nắng chan hoà.',
    roomPopular:'Phổ biến', roomBest:'Yêu thích nhất', roomPremium:'Premium',
    roomStandardName:'Phòng Standard',
    roomStandardDesc:'Không gian ấm cúng, đủ tiện nghi cho cặp đôi hoặc khách solo. View sân vườn, gần biển.',
    roomLargeName:'Phòng Large',
    roomLargeDesc:'Rộng rãi hơn, thích hợp gia đình nhỏ hoặc nhóm bạn. Ban công thoáng đãng.',
    roomDoubleName:'Phòng Double',
    roomDoubleDesc:'Tiêu chuẩn cao nhất, giường đôi lớn, decor thiền định. Lý tưởng cho tuần trăng mật.',
    perNight:'/đêm', bookRoom:'Đặt phòng này',
    amenBreakfast:'Bữa sáng', amenWifi:'Wi-Fi tốc độ cao', amenAC:'Máy lạnh',
    amenHotwater:'Nước nóng', amenTowel:'Khăn tắm', amenBalcony:'Ban công', amenBathtub:'Bồn tắm',
    roomsNote:'Giá đã bao gồm bữa sáng. Đặt cọc 30% để giữ phòng. Miễn phí hủy trước 48 giờ.',
    expTag:'Trải nghiệm', expTitle:'Bản địa đích thực',
    expDesc:'Hòa mình vào cuộc sống làng chài Sơn Hải, khám phá thiên nhiên hoang sơ và những khoảnh khắc đáng nhớ.',
    expSUPName:'Chèo SUP',
    expSUPDesc:'Trượt trên mặt biển Sơn Hải trong vắt buổi sáng sớm. Huấn luyện viên bản địa hỗ trợ người mới.',
    expFishingName:'Tour làng chài',
    expFishingDesc:'Theo chân ngư dân ra khơi từ 4 giờ sáng, trải nghiệm cuộc sống đánh cá truyền thống.',
    expDiveName:'Lặn ngắm san hô',
    expDiveDesc:'Khám phá rạn san hô đa sắc màu dưới làn nước biển Ninh Thuận xanh ngăn ngắt.',
    expJeepName:'Tour xe Jeep đồi cát',
    expJeepDesc:'Phi xe Jeep băng qua đồi cát Nam Cương hùng vĩ – cực kỳ thú vị và ngoạn mục.',
    expSunName:'Ngắm bình minh & hoàng hôn',
    expSunDesc:'Những khoảnh khắc vàng trên bãi biển Sơn Hải – hoàn toàn miễn phí cho mọi khách lưu trú.',
    expYogaName:'Yoga bãi biển buổi sáng',
    expYogaDesc:'Khởi đầu ngày mới với thiền định và yoga trên bãi cát, đón bình minh biển.',
    expAdventure:'Phiêu lưu', expCulture:'Văn hoá', expNature:'Thiên nhiên', expFree:'Miễn phí',
    matchTag:'Stay Match', matchTitle:'Tìm hành trình của bạn',
    matchDesc:'Chọn tâm trạng – nhận ngay gợi ý phòng và lịch trình được cá nhân hoá riêng cho bạn.',
    moodHealing:'Healing', moodHealingSub:'Chữa lành & thư giãn',
    moodBonding:'Bonding', moodBondingSub:'Gắn kết gia đình & bạn bè',
    moodWorkation:'Workation', moodWorkationSub:'Làm việc + nghỉ dưỡng',
    guideTag:'Khám phá', guideTitle:'Làng chài Sơn Hải',
    guideDesc:'Một trong những làng chài đẹp nhất miền Trung – nơi cuộc sống ngư dân chưa bị xáo trộn bởi du lịch đại trà.',
    mapLocation:'Sơn Hải, Thuận Nam, Ninh Thuận',
    mapPhanRang:'Cách TP Phan Rang ~40 phút', mapAirport:'Cách sân bay Cam Ranh ~80 phút',
    factWeatherTitle:'Khí hậu', factWeatherDesc:'Nắng đẹp quanh năm. Mùa đẹp nhất: tháng 1–8.',
    factSeafoodTitle:'Hải sản', factSeafoodDesc:'Tôm hùm, cá ngừ từ đất đai đến ngay trước mắt.',
    factNatureTitle:'Thiên nhiên', factNatureDesc:'Đồi cát, vườn nho, rượu tidak, biển xanh – trong bán kính 30km.',
    faqTitle:'Câu hỏi thường gặp',
    faqQ1:'Phương thức thanh toán?',
    faqA1:'Chấp nhận chuyển khoản ngân hàng và tiền mặt. Đặt cọc 30% qua chuyển khoản để giữ phòng.',
    faqQ2:'Chính sách đặt cọc?',
    faqA2:'Đặt cọc 30% tổng giá phòng trong vòng 24 giờ sau khi đặt. Số còn lại thanh toán khi nhận phòng.',
    faqQ3:'Chính sách hủy/đổi lịch?',
    faqA3:'Miễn phí hủy trước 48 giờ, hoàn 100% cọc. Hủy trong 48 giờ mất 50% cọc. Không hoàn nếu hủy trong ngày.',
    faqQ4:'Giờ nhận / trả phòng?',
    faqA4:'Check-in từ 14:00. Check-out trước 12:00. Early/late check-out theo thỏa thuận.',
    faqQ5:'Có đón tại sân bay không?',
    faqA5:'Có dịch vụ đưa đón sân bay Cam Ranh và ga Tháp Chàm theo yêu cầu. Phí thêm, liên hệ để báo giá.',
    faqQ6:'Wi-Fi và dịch vụ ăn uống?',
    faqA6:'Wi-Fi miễn phí toàn khu. Bữa sáng trong giá phòng. Bữa trưa/tối đặt thêm tại homestay.',
    contactTag:'Liên hệ', contactTitle:'Kết nối với chúng tôi',
    contactAddress:'Địa chỉ', contactPhone:'Điện thoại / Zalo',
    ctaTitle:'Sẵn sàng chữa lành?',
    ctaDesc:'Đặt phòng ngay hôm nay và nhận ưu đãi sớm. Số lượng phòng có hạn!',
    ctaNote:'Hoặc nhắn tin trực tiếp qua Zalo / Messenger',
    footerTagline:'Sóng biển thì thầm – Hồn aan bình yên.',
    bookingTitle:'Đặt phòng tại Rì Rào', bookingSubtitle:'Điền thông tin bên dưới – chúng tôi xác nhận qua Email & Zalo.',
    stepDates:'Ngày & Phòng', stepInfo:'Thông tin', stepConfirm:'Xác nhận',
    labelCheckIn:'Ngày nhận phòng *', labelCheckOut:'Ngày trả phòng *',
    labelGuests:'Số khách *', labelRoom:'Hạng phòng *', labelAddons:'Trải nghiệm đi kèm',
    labelName:'Họ và tên *', labelPhone:'Số điện thoại *', labelEmail:'Email *', labelNotes:'Ghi chú đặc biệt',
    selectGuests:'-- Chọn số khách --', selectRoom:'-- Chọn phòng --',
    roomStandardOpt:'Standard – 400.000đ/đêm', roomLargeOpt:'Large – 500.000đ/đêm', roomDoubleOpt:'Double – 600.000đ/đêm',
    addonSUP:'🏄 Chèo SUP', addonFishing:'🎣 Tour làng chài',
    addonDive:'🤿 Lặn san hô', addonJeep:'🚙 Tour Jeep đồi cát',
    priceRoom:'Tiền phòng', priceNights:'Số đêm', priceTotal:'Tổng dự kiến', priceDeposit:'Cọc 30%',
    btnNext:'Tiếp theo →', btnBack:'← Quay lại', btnSubmit:'Xác nhận đặt phòng',
    agreeTerms:'Tôi đồng ý với chính sách đặt phòng và hủy phòng của Rì Rào Homestay.',
    notesPlaceholder:'Yêu cầu đặc biệt, dị ứng thức ăn, giờ dự kiến đến...',
    errCheckIn:'Vui lòng chọn ngày nhận phòng', errCheckOut:'Vui lòng chọn ngày trả phòng',
    errCheckOutBefore:'Ngày trả phòng phải sau ngày nhận phòng',
    errGuests:'Vui lòng chọn số khách', errRoom:'Vui lòng chọn hạng phòng',
    errName:'Vui lòng nhập họ tên', errPhone:'Vui lòng nhập số điện thoại hợp lệ',
    errEmail:'Vui lòng nhập email hợp lệ', errTerms:'Vui lòng đồng ý với chính sách',
    errSend:'Gửi thất bại. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo.',
    passConfirmed:'✓ ĐÃ XÁC NHẬN', passTitle:'Digital Boarding Pass',
    passSubtitle:'Hành trình chữa lành của bạn đã được đặt!',
    passEmailNote:'Email xác nhận đã được gửi đến hộp thư của bạn.',
    passShare:'Chia sẻ hành trình:', passClose:'Hoàn tất – Hẹn gặp tại Sơn Hải! 🌊',
    passLabelName:'Khách hàng', passLabelRoom:'Phòng', passLabelCheckin:'Check-in',
    passLabelCheckout:'Check-out', passLabelGuests:'Số khách',
    passLabelAddons:'Trải nghiệm', passLabelTotal:'Tổng tiền',
    reviewTitle:'Xác nhận thông tin đặt phòng',
  },  en: {
    logoSub:'Homestay', navHome:'Home', navRooms:'Rooms',
    navExp:'Experiences', navMatch:'Stay Match', navGuide:'Explore', navContact:'Contact',
    bookNow:'Book Now', heroBadge:'Son Hai · Ninh Thuan',
    heroTitle:'Heal with Nature –<br/>Authentic Local Experience',
    heroSubtitle:'Where the waves of Son Hai whisper, the sea breeze soothes, and you rediscover yourself.',
    heroCTA:'Book Now', heroCTA2:'Explore Rooms',
    statRooms:'Room Types', statExp:'Experiences', statRate:'Rating',
    roomsTag:'Rooms', roomsTitle:'Restful Spaces',
    roomsDesc:'Each room blends with nature, welcoming the sea breeze and warm sunshine.',
    roomPopular:'Popular', roomBest:'Most Loved', roomPremium:'Premium',
    roomStandardName:'Standard Room',
    roomStandardDesc:'Cozy and comfortable for couples or solo travelers. Garden view, close to the beach.',
    roomLargeName:'Large Room',
    roomLargeDesc:'Spacious and ideal for small families or friend groups. Bright balcony included.',
    roomDoubleName:'Double Room',
    roomDoubleDesc:'Our finest room with a king bed and zen décor. Perfect for honeymoons.',
    perNight:'/night', bookRoom:'Book This Room',
    amenBreakfast:'Breakfast', amenWifi:'High-speed Wi-Fi', amenAC:'Air conditioning',
    amenHotwater:'Hot water', amenTowel:'Towels', amenBalcony:'Balcony', amenBathtub:'Bathtub',
    roomsNote:'Price includes breakfast. 30% deposit required. Free cancellation 48h before check-in.',
    expTag:'Experiences', expTitle:'Authentic Local',
    expDesc:'Immerse yourself in Son Hai fishing village life and create unforgettable memories.',
    expSUPName:'SUP Paddling',
    expSUPDesc:'Glide over the crystal-clear Son Hai waters in the early morning. Local instructor for beginners.',
    expFishingName:'Fishing Village Tour',
    expFishingDesc:'Join local fishermen at 4am and experience authentic traditional fishing life.',
    expDiveName:'Coral Snorkeling',
    expDiveDesc:'Discover colorful coral reefs beneath the pristine blue waters of Ninh Thuan.',
    expJeepName:'Sand Dune Jeep Tour',
    expJeepDesc:'Race through the majestic Nam Cuong sand dunes in a Jeep – incredibly thrilling.',
    expSunName:'Sunrise & Sunset Watching',
    expSunDesc:'Golden moments on Son Hai beach – completely free for all guests.',
    expYogaName:'Morning Beach Yoga',
    expYogaDesc:'Start your day with meditation and yoga on the sand, greeting the sunrise.',
    expAdventure:'Adventure', expCulture:'Culture', expNature:'Nature', expFree:'Free',
    matchTag:'Stay Match', matchTitle:'Find Your Journey',
    matchDesc:'Choose your mood – get personalized room and itinerary suggestions just for you.',
    moodHealing:'Healing', moodHealingSub:'Heal & Relax',
    moodBonding:'Bonding', moodBondingSub:'Family & Friends',
    moodWorkation:'Workation', moodWorkationSub:'Work + Vacation',
    guideTag:'Explore', guideTitle:'Son Hai Fishing Village',
    guideDesc:'One of the most beautiful and unspoiled fishing villages in Central Vietnam.',
    mapLocation:'Son Hai, Thuan Nam, Ninh Thuan',
    mapPhanRang:'~40 min from Phan Rang city', mapAirport:'~80 min from Cam Ranh airport',
    factWeatherTitle:'Weather', factWeatherDesc:'Sunny year-round. Best season: January–August.',
    factSeafoodTitle:'Seafood', factSeafoodDesc:'Fresh lobster and tuna directly from local fishermen.',
    factNatureTitle:'Nature', factNatureDesc:'Sand dunes, vineyards, jujube forests, blue sea – all within 30km.',
    faqTitle:'Frequently Asked Questions',
    faqQ1:'Payment methods?',
    faqA1:'We accept bank transfer and cash. A 30% deposit via bank transfer holds your room.',
    faqQ2:'Deposit policy?',
    faqA2:'30% deposit required within 24 hours of booking. Remaining balance paid at check-in.',
    faqQ3:'Cancellation policy?',
    faqA3:'Free cancellation 48h in advance, full refund. Within 48h: 50% forfeited. Same-day: no refund.',
    faqQ4:'Check-in / Check-out times?',
    faqA4:'Check-in from 2:00 PM. Check-out by 12:00 PM. Early/late by arrangement.',
    faqQ5:'Airport pickup available?',
    faqA5:'Transfers from Cam Ranh Airport and Thap Cham Station on request. Extra fee applies.',
    faqQ6:'Wi-Fi and dining?',
    faqA6:'Free Wi-Fi throughout. Breakfast included. Lunch/dinner available at the homestay.',
    contactTag:'Contact', contactTitle:'Get in Touch',
    contactAddress:'Address', contactPhone:'Phone / Zalo',
    ctaTitle:'Ready to Heal?',
    ctaDesc:'Book today and get early bird pricing. Limited rooms available!',
    ctaNote:'Or message us directly on Zalo / Messenger',
    footerTagline:'Waves whispering – Soul at peace.',
    bookingTitle:'Book at Rì Rào', bookingSubtitle:"Fill in the details below – we'll confirm via Email & Zalo.",
    stepDates:'Dates & Room', stepInfo:'Info', stepConfirm:'Confirm',
    labelCheckIn:'Check-in Date *', labelCheckOut:'Check-out Date *',
    labelGuests:'Number of Guests *', labelRoom:'Room Type *', labelAddons:'Add-on Experiences',
    labelName:'Full Name *', labelPhone:'Phone Number *', labelEmail:'Email *', labelNotes:'Special Requests',
    selectGuests:'-- Select guests --', selectRoom:'-- Select room --',
    roomStandardOpt:'Standard – 400K/night', roomLargeOpt:'Large – 500K/night', roomDoubleOpt:'Double – 600K/night',
    addonSUP:'🏄 SUP Paddling', addonFishing:'🎣 Fishing Village Tour',
    addonDive:'🤿 Coral Snorkeling', addonJeep:'🚙 Sand Dune Jeep Tour',
    priceRoom:'Room rate', priceNights:'Nights', priceTotal:'Total estimate', priceDeposit:'30% Deposit',
    btnNext:'Next →', btnBack:'← Back', btnSubmit:'Confirm Booking',
    agreeTerms:'I agree to the booking and cancellation policy of Rì Rào Homestay.',
    notesPlaceholder:'Special requests, food allergies, estimated arrival time...',
    errCheckIn:'Please select a check-in date', errCheckOut:'Please select a check-out date',
    errCheckOutBefore:'Check-out must be after check-in',
    errGuests:'Please select number of guests', errRoom:'Please select a room type',
    errName:'Please enter your full name', errPhone:'Please enter a valid phone number',
    errEmail:'Please enter a valid email address', errTerms:'Please agree to the policy',
    errSend:'Failed to send. Please try again or contact us directly on Zalo.',
    passConfirmed:'✓ CONFIRMED', passTitle:'Digital Boarding Pass',
    passSubtitle:'Your healing journey has been booked!',
    passEmailNote:'A confirmation email has been sent to your inbox.',
    passShare:'Share your journey:', passClose:'Done – See you at Son Hai! 🌊',
    passLabelName:'Guest', passLabelRoom:'Room', passLabelCheckin:'Check-in',
    passLabelCheckout:'Check-out', passLabelGuests:'Guests',
    passLabelAddons:'Experiences', passLabelTotal:'Total',
    reviewTitle:'Confirm Booking Details',
  },
};

/* ── engine ───────────────────────────────────────────────── */
let _lang = localStorage.getItem('rirao_lang') || 'vi';

function t(key) { return translations[_lang][key] ?? translations.vi[key] ?? key; }
function getLang() { return _lang; }

function applyLang(lang) {
  _lang = lang;
  localStorage.setItem('rirao_lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = translations[lang][el.dataset.i18n];
    if (v == null) return;
    (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? (el.placeholder = v) : (el.innerHTML = v);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = translations[lang][el.dataset.i18nPlaceholder];
    if (v) el.placeholder = v;
  });
  document.querySelectorAll('option[data-i18n]').forEach(opt => {
    const v = translations[lang][opt.dataset.i18n];
    if (v) opt.textContent = v;
  });
  const lbl = document.getElementById('langLabel');
  if (lbl) lbl.textContent = lang === 'vi' ? 'EN' : 'VI';
  if (typeof renderStayMatch === 'function') renderStayMatch();
  if (typeof onLangChange === 'function') onLangChange(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang(_lang);
  const btn = document.getElementById('langToggle');
  if (btn) btn.addEventListener('click', () => applyLang(_lang === 'vi' ? 'en' : 'vi'));
});

window.t = t;
window.getLang = getLang;
window.applyLang = applyLang;