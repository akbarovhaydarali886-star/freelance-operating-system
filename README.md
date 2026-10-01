# 🚀 WorkSphere PRO — Freelancer & Agency Operating System (SaaS)

> **All-in-One Freelancer & Digital Agency Operating System**  
> Portfolioga qo'yish uchun xalqaro darajadagi zamonaviy, multi-sahifali, to'liq 3 tilli (O'zbekcha 🇺🇿, Русский 🇷🇺 va English 🇺🇸) hamda Dark/Light rejimli SaaS platformasi.

---

## 🌟 Asosiy Imkoniyatlar (Key Features)

- 🌐 **Full 3-Language i18n (O'zbekcha 🇺🇿, Русский 🇷🇺, English 🇺🇸)**:
  - Barcha sahifalar, jadvallar, formalar va xabarnomalar 3 tilda bir zumda almashtiriladi (LocalStorage xotirasida saqlanadi).
- 🌓 **Dark / Light Mode**:
  - Tailwind v4 custom dark variant asosida tizim bo'ylab 100% sinxronlangan qorong'i va yorug' rejim.
- 🔐 **Kuchli Validatsiyali Auth & 1-Click Instant Demo Login**:
  - Regex orqali email validatsiyasi, kamida 8 ta belgi + raqam + harf talab qiluvchi parol tekshiruvi, jonli Password Strength Bar, parollarni tasdiqlash hamda **Portfolio ko'ruvchilar uchun 1 bosishda Demo hisobga kirish** (Freelancer yoki Agency rahbari profili).
- 📊 **Real-time Dashboard & Analitika**:
  - Oylik daromad dinamikasi grafikasi, faol vazifalar, kutilayotgan invoyslar va samaradorlik ko'rsatkichlari.
- 📋 **Agile Kanban Board**:
  - 4 ta ustun (*Backlog, In Progress, Review, Done*), vazifa qo'shish, tahrirlash, ustuvorlik (*Urgent, High, Medium, Low*), muddatlar va bajarilganda bayramona **Confetti animatsiyasi**!
- 🧾 **Professional Invoices & PDF Print**:
  - UZS (so'm) va USD ($) valyutalarida rasmiy hisob-faktura (Invoice) generatori.
  - Jonli soliq/QQS hisobi, xizmat qatorlari qo'shish, brauzerdan to'g'ridan-to'g'ri **PDF / Print** qilish imkoniyati.
- 👥 **Clients CRM**:
  - Mijozlar kartotekasi, aloqa kontaktlari (Email, Telefon), to'langan summalar va faol buyurtmalar hisobi.
- ⏱️ **Live Billable Time Tracker**:
  - Soatbay ishlovchilar uchun jonli sekundomer va bugungi ishlangan vaqt hisoblagichi.
- 💾 **Local Persistence**:
  - Barcha o'zgarishlar brauzerda saqlanib qoladi. "Reset Demo Data" orqali istalgan paytda boshlang'ich holatga qaytarish mumkin.

---

## 🛠 Ishlatilgan Texnologiyalar (Tech Stack)

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Fonts**: Inter & Plus Jakarta Sans

---

## 🚀 Loyihani Ishga Tushirish (Quick Start)

Loyihani o'z kompyuteringizda ishga tushirish uchun quyidagi buyruqlarni bajaring:

```bash
# 1. Kutubxonalarni o'rnatish
npm install

# 2. Dasturni ishga tushirish
npm run dev
```

Brauzerda oching: **`http://localhost:5173`**

---

## 📁 Loyiha Strukturasi

```
2/
├── index.html                  # HTML shablon va Google shriftlar
├── package.json                # Kutubxonalar va scriptlar
├── vite.config.js              # Vite & Tailwind v4 konfiguratsiyasi
├── src/
│   ├── main.jsx                # React boshlang'ich nuqtasi
│   ├── App.jsx                 # Asosiy router va sahifalar ulanishi
│   ├── index.css               # Tailwind CSS va maxsus print stillari
│   ├── context/
│   │   └── AppContext.jsx      # Global state, i18n, Dark Mode, CRUD va LocalStorage
│   ├── translations/
│   │   └── index.js            # O'zbek va Ingliz tili lug'ati (i18n)
│   ├── data/
│   │   └── initialData.js      # Namunaviy loyihalar, invoyslar va mijozlar ma'lumotlari
│   └── components/
│       ├── common/
│       │   ├── Navbar.jsx          # Til, mavzu, valyuta va taymer boshqaruvi
│       │   ├── Sidebar.jsx         # SaaS menyusi va faol ko'rsatkichlar
│       │   ├── Modal.jsx           # Moslashuvchan oyna komponenti
│       │   └── ToastContainer.jsx  # Bildirishnomalar tizimi
│       ├── landing/
│       │   └── LandingPage.jsx     # Modern SaaS Landing sahifasi (Hero, Bento, Pricing, FAQ)
│       ├── auth/
│       │   └── AuthPage.jsx        # Login, Register va 1-Click Demo kirish
│       ├── dashboard/
│       │   └── DashboardView.jsx   # Analitika, oylik grafik va time tracker
│       ├── projects/
│       │   └── KanbanBoard.jsx     # Kanban doskasi va vazifalar
│       ├── invoices/
│       │   └── InvoicesView.jsx    # Invoyslar jadvali, yaratish va PDF chop etish
│       ├── clients/
│       │   └── ClientsView.jsx     # Mijozlar CRM tizimi
│       ├── analytics/
│       │   └── AnalyticsView.jsx   # Moliyaviy va samaradorlik diagrammalari
│       └── settings/
│           └── SettingsView.jsx    # Profil, til, valyuta va tizim sozlamalari
```

---

## 🏆 Portfolioda Taqdim Qilish Uchun Tavsiyalar

1. **GitHub'ga yuklash**: Loyihani GitHub reponingizga qo'ying va linkini rezyumeingizga joylashtiring.
2. **Jonli demo (Vercel yoki Netlify)**: Loyihani Vercel'ga 1 daqiqada bepul deploy qiling (`npm run build` tayyorlangan).
3. **Intervyuda ko'rsatish**:
   - Tizimning to'liq **O'zbek va Ingliz tili** o'rtasida bir zumda almashishini ko'rsating.
   - **Invoices** bo'limida yangi invoys yaratib, uni **PDF** ko'rinishida chiqarib ko'rsating.
   - **Kanban** doskasida vazifani "Yakunlandi"ga suring va **Confetti** animatsiyasini namoyish eting.
   - **Dark Mode** va **Light Mode** o'tishlarini ko'rsating.
