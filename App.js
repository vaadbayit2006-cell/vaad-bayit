

// ============================================================
// CONFIGURATION — Google OAuth + Drive
// ============================================================
const GOOGLE_CLIENT_ID = "334222209819-g3chljiu66v4ptj32ehc2jmbg6uidhau.apps.googleusercontent.com";
const VAAD_DRIVE_EMAIL = "vaadbayit2006@gmail.com";
const BUILDING_NAME = "ועד הבית";

// תיקיות Drive — לאחר יצירתן ב-Drive, הכנס כאן את ה-ID של כל תיקייה
// (פתח תיקייה ב-Drive → העתק את הקוד מסוף ה-URL)
const DRIVE_FOLDERS = {
  main:        "1gi-rh22bPN7P5Ga7W0K4YuHJfIJlUHVk",  // ראשית
  vaad:        "1gLcEW02Dbepsa-2J5cCJ_yXnAj1Zv2-z",  // ועד-בית
  receipts:    "1ZAyCpwUsEmCXGhbqZkvjpVS9-nI2_YHI",  // קבלות
  faults:      "1lJLtxlgNnHhe9lzm3MktmoCCrlqYm0WC",  // תקלות
  inspections: "1GE4o7H1PbEX95qZWamMEL6XIlUGeayli",  // בדיקות חובה
  protocols:   "1gLcEW02Dbepsa-2J5cCJ_yXnAj1Zv2-z",  // פרוטוקולים
  residents:   "1bwie8w_EJs8LSFAK_c40jot2P32A_-mN",  // דיירים
};

// ============================================================
// MOCK DATA & STORAGE (Replace with real backend/Firebase)
// ============================================================
const STORAGE_KEY = "vaad_bayit_data";

const defaultData = {
  residents: [],
  committee: [],
  finances: { income: [], expenses: [] },
  faults: [],
  inspections: [],
  protocols: [],
  announcements: [],
};

const getStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData;
  } catch {
    return defaultData;
  }
};

const setStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ============================================================
// ICONS
// ============================================================
const Icon = ({ name, size = 20 }) => {
  const icons = {
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
    wallet: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z M1 10h22",
    alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    plus: "M12 5v14 M5 12h14",
    upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
    camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 13m-4 0a4 4 0 108 0 4 4 0 10-8 0",
    check: "M20 6L9 17l-5-5",
    x: "M18 6L6 18 M6 6l12 12",
    logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
    drive: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    chevron: "M6 9l6 6 6-6",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
    trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
    calendar: "M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18",
    info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8v4 M12 16h.01",
    google: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]?.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
};

// ============================================================
// GOOGLE AUTH — אמיתי עם Google Identity Services
// ============================================================
let _googleAccessToken = null;
const getAccessToken = () => _googleAccessToken;

const realGoogleLogin = () => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      alert("שגיאה: Google Identity Services לא נטען. ודא שהסקריפט נמצא ב-index.html");
      reject(new Error("GIS not loaded"));
      return;
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/drive.file",
      ].join(" "),
      callback: async (tokenResponse) => {
        if (tokenResponse.error) { reject(tokenResponse); return; }
        _googleAccessToken = tokenResponse.access_token;
        try {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: "Bearer " + _googleAccessToken },
          });
          const info = await res.json();
          resolve({
            id: info.sub,
            name: info.name,
            email: info.email,
            photo: info.picture,
            role: "pending",
            accessToken: _googleAccessToken,
          });
        } catch (e) { reject(e); }
      },
    });
    client.requestAccessToken({ prompt: "consent" });
  });
};

// ============================================================
// FILE UPLOAD TO GOOGLE DRIVE — אמיתי
// ============================================================
const uploadToDrive = async (file, folderKey, accessToken) => {
  const token = accessToken || getAccessToken();
  const folderId = DRIVE_FOLDERS[folderKey] || DRIVE_FOLDERS.main || null;

  // אם אין טוקן או folder ID — מחזיר מדומה עם אזהרה
  if (!token) {
    console.warn("אין access token — לא ניתן להעלות ל-Drive");
    return { id: "no_token", name: file.name, url: "#", webViewLink: "#", error: "לא מחובר ל-Google" };
  }

  try {
    const metadata = { name: file.name, ...(folderId ? { parents: [folderId] } : {}) };
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    const res = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
      { method: "POST", headers: { Authorization: "Bearer " + token }, body: form }
    );
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      url: `https://drive.google.com/file/d/${data.id}/view`,
      webViewLink: data.webViewLink,
    };
  } catch (err) {
    console.error("שגיאה בהעלאה ל-Drive:", err);
    return { id: "error", name: file.name, url: "#", webViewLink: "#", error: err.message };
  }
};

// ============================================================
// CLAUDE AI HELPER
// ============================================================
const askClaude = async (prompt) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "שגיאה בקבלת תשובה";
};

// ============================================================
// COMPONENTS
// ============================================================

const Badge = ({ text, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>
      {text}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", size = "md", disabled = false, className = "" }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
};

// ============================================================
// FILE UPLOAD COMPONENT
// ============================================================
const FileUploader = ({ onUpload, label = "העלה קובץ" }) => {
  const fileRef = React.React.useRef();
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    const result = await uploadToDrive(file, "main", null);
    setUploaded(result);
    onUpload(result);
    setUploading(false);
  };

  const handleCamera = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => handleFile(e.target.files[0]);
    input.click();
  };

  return (
    <div className="space-y-2">
      {uploaded ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl text-sm text-emerald-700">
          <Icon name="check" size={16} />
          <span>{uploaded.name}</span>
          <a href={uploaded.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs underline">
            פתח ב-Drive
          </a>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button onClick={() => fileRef.current?.click()} variant="secondary" size="sm" disabled={uploading}>
            <Icon name="upload" size={16} />
            {uploading ? "מעלה..." : label}
          </Button>
          <Button onClick={handleCamera} variant="secondary" size="sm" disabled={uploading}>
            <Icon name="camera" size={16} />
            צלם
          </Button>
        </div>
      )}
      <input ref={fileRef} type="file" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  );
};

// ============================================================
// MODAL
// ============================================================
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

// ============================================================
// LOGIN SCREEN
// ============================================================
const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const user = await realGoogleLogin();
    onLogin(user);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)" }}>
      {/* Building illustration */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center border border-white/20">
          <span className="text-5xl">🏢</span>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      </div>

      <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "serif" }}>ועד הבית</h1>
      <p className="text-indigo-200 text-sm mb-2">מערכת ניהול חכמה לבניין מגורים</p>
      <p className="text-indigo-300 text-xs mb-10 flex items-center gap-1">
        <Icon name="drive" size={14} />
        מסמכים מסונכרנים ל-{VAAD_DRIVE_EMAIL}
      </p>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full max-w-sm border border-white/20">
        <h2 className="text-white font-bold text-xl mb-2 text-center">כניסה למערכת</h2>
        <p className="text-indigo-200 text-sm text-center mb-6">
          היכנסו עם חשבון Google שלכם לקבלת גישה
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-50 transition-all shadow-lg disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? "מתחבר..." : "כניסה עם Google"}
        </button>

        <div className="mt-4 p-3 bg-white/5 rounded-xl">
          <p className="text-indigo-200 text-xs text-center">
            🔒 נדרשת אישור נציג ועד לאחר הרשמה
          </p>
        </div>
      </div>

      <p className="text-indigo-400 text-xs mt-8 text-center">
        לשיתוף הקישור עם דיירים, לחצו על "שיתוף" בתפריט הועד
      </p>
    </div>
  );
};

// ============================================================
// APPROVAL SCREEN (for pending users)
// ============================================================
const PendingScreen = ({ user, onLogout }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-lg">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">⏳</span>
      </div>
      <h2 className="font-bold text-xl text-gray-900 mb-2">ממתין לאישור</h2>
      <p className="text-gray-500 text-sm mb-1">שלום, <strong>{user.name}</strong></p>
      <p className="text-gray-400 text-sm mb-6">
        הרשמתך התקבלה. נציג ועד הבית יאשר את גישתך בקרוב.
      </p>
      <div className="p-3 bg-blue-50 rounded-xl mb-6">
        <p className="text-blue-600 text-xs">📧 {user.email}</p>
      </div>
      <Button onClick={onLogout} variant="secondary" className="w-full justify-center">
        <Icon name="logout" size={16} />
        התנתקות
      </Button>
    </div>
  </div>
);

// ============================================================
// DASHBOARD
// ============================================================
const Dashboard = ({ data, user, isCommittee }) => {
  const totalIncome = data.finances.income.reduce((s, i) => s + Number(i.amount), 0);
  const totalExpenses = data.finances.expenses.reduce((s, i) => s + Number(i.amount), 0);
  const openFaults = data.faults.filter((f) => f.status !== "resolved").length;
  const upcomingInspections = data.inspections.filter((i) => new Date(i.date) > new Date()).length;

  const stats = [
    { label: "יתרה", value: `₪${(totalIncome - totalExpenses).toLocaleString()}`, icon: "wallet", color: "indigo", sub: "נכון להיום" },
    { label: "דיירים", value: data.residents.length, icon: "users", color: "emerald", sub: "רשומים" },
    { label: "תקלות פתוחות", value: openFaults, icon: "alert", color: "amber", sub: "מחכות לטיפול" },
    { label: "בדיקות קרובות", value: upcomingInspections, icon: "shield", color: "purple", sub: "ב-30 ימים הבאים" },
  ];

  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-black text-gray-900 text-xl">שלום, {user.name} 👋</h2>
        <p className="text-gray-400 text-sm">{new Date().toLocaleDateString("he-IL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="!p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colorMap[s.color]}`}>
              <Icon name={s.icon} size={18} />
            </div>
            <div className="text-2xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs font-semibold text-gray-700 mt-0.5">{s.label}</div>
            <div className="text-xs text-gray-400">{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">פעילות אחרונה</h3>
        <div className="space-y-3">
          {[...data.faults.slice(-2), ...data.finances.expenses.slice(-2)].length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">אין פעילות עדיין</p>
          ) : (
            [...data.faults.slice(-2).map(f => ({ type: "fault", text: `תקלה: ${f.description}`, time: f.date, color: "amber" })),
             ...data.finances.expenses.slice(-2).map(e => ({ type: "expense", text: `הוצאה: ${e.description} - ₪${e.amount}`, time: e.date, color: "red" }))
            ].sort((a, b) => new Date(b.time) - new Date(a.time)).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.color === "amber" ? "bg-amber-400" : "bg-red-400"}`} />
                <div>
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Drive Status */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
        <Icon name="drive" size={20} />
        <div>
          <p className="text-sm font-semibold text-blue-800">Google Drive מסונכרן</p>
          <p className="text-xs text-blue-500">{VAAD_DRIVE_EMAIL}</p>
        </div>
        <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full" />
      </div>
    </div>
  );
};

// ============================================================
// FINANCES
// ============================================================
const Finances = ({ data, setData, isCommittee }) => {
  const [tab, setTab] = React.useState("overview");
  const [showModal, setShowModal] = React.useState(false);
  const [type, setType] = React.useState("income");
  const [form, setForm] = React.useState({ description: "", amount: "", date: new Date().toISOString().split("T")[0], category: "", receipt: null });

  const totalIncome = data.finances.income.reduce((s, i) => s + Number(i.amount), 0);
  const totalExpenses = data.finances.expenses.reduce((s, i) => s + Number(i.amount), 0);

  const categories = {
    income: ["ועד בית", "שכירות שטחים", "קנסות", "אחר"],
    expenses: ["ניקיון", "גינון", "חשמל", "מים", "תחזוקה", "ביטוח", "ספק חיצוני", "אחר"],
  };

  const handleAdd = () => {
    const entry = { ...form, id: Date.now(), uploadedBy: "user" };
    const newData = {
      ...data,
      finances: {
        ...data.finances,
        [type]: [...data.finances[type], entry],
      },
    };
    setData(newData);
    setShowModal(false);
    setForm({ description: "", amount: "", date: new Date().toISOString().split("T")[0], category: "", receipt: null });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-gray-900 text-xl">הכנסות והוצאות</h2>
        {isCommittee && (
          <Button onClick={() => setShowModal(true)} size="sm">
            <Icon name="plus" size={16} /> הוספה
          </Button>
        )}
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <div className="text-lg font-black text-emerald-600">₪{totalIncome.toLocaleString()}</div>
          <div className="text-xs text-gray-500">הכנסות</div>
        </Card>
        <Card className="!p-3 text-center">
          <div className="text-lg font-black text-red-500">₪{totalExpenses.toLocaleString()}</div>
          <div className="text-xs text-gray-500">הוצאות</div>
        </Card>
        <Card className={`!p-3 text-center ${totalIncome - totalExpenses >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
          <div className={`text-lg font-black ${totalIncome - totalExpenses >= 0 ? "text-emerald-700" : "text-red-600"}`}>
            ₪{Math.abs(totalIncome - totalExpenses).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">יתרה</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {["income", "expenses"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
          >
            {t === "income" ? "💰 הכנסות" : "📤 הוצאות"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {data.finances[tab].length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">אין רשומות עדיין</p>
        ) : (
          data.finances[tab].map((item) => (
            <Card key={item.id} className="!p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date} · {item.category}</p>
                  {item.receipt && (
                    <a href={item.receipt.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 flex items-center gap-1 mt-1">
                      <Icon name="file" size={12} /> קבלה ב-Drive
                    </a>
                  )}
                </div>
                <span className={`font-bold text-base ${tab === "income" ? "text-emerald-600" : "text-red-500"}`}>
                  {tab === "income" ? "+" : "-"}₪{Number(item.amount).toLocaleString()}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="הוספת רשומה">
        <div className="space-y-4">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {["income", "expenses"].map((t) => (
              <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${type === t ? "bg-white shadow" : "text-gray-500"}`}>
                {t === "income" ? "הכנסה" : "הוצאה"}
              </button>
            ))}
          </div>
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="תיאור" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="סכום ₪" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">בחר קטגוריה</option>
            {categories[type].map((c) => <option key={c}>{c}</option>)}
          </select>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">העלאת קבלה לGoogle Drive</p>
            <FileUploader onUpload={(file) => setForm({ ...form, receipt: file })} label="העלה קבלה" />
          </div>
          <Button onClick={handleAdd} className="w-full justify-center" disabled={!form.description || !form.amount}>
            שמירה
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// FAULTS
// ============================================================
const Faults = ({ data, setData, user, isCommittee }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({ description: "", location: "", priority: "medium", files: [] });
  const [filter, setFilter] = React.useState("all");

  const priorities = { low: { label: "נמוכה", color: "gray" }, medium: { label: "בינונית", color: "yellow" }, high: { label: "גבוהה", color: "red" } };
  const statuses = { open: { label: "פתוחה", color: "red" }, in_progress: { label: "בטיפול", color: "yellow" }, resolved: { label: "נסגרה", color: "green" } };

  const handleAdd = () => {
    const fault = {
      ...form,
      id: Date.now(),
      status: "open",
      date: new Date().toISOString().split("T")[0],
      reportedBy: user.name,
      comments: [],
    };
    setData({ ...data, faults: [...data.faults, fault] });
    setShowModal(false);
    setForm({ description: "", location: "", priority: "medium", files: [] });
  };

  const updateStatus = (id, status) => {
    setData({ ...data, faults: data.faults.map((f) => (f.id === id ? { ...f, status } : f)) });
  };

  const filtered = filter === "all" ? data.faults : data.faults.filter((f) => f.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-gray-900 text-xl">ניהול תקלות</h2>
        <Button onClick={() => setShowModal(true)} size="sm">
          <Icon name="plus" size={16} /> דיווח
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[["all", "הכל"], ["open", "פתוחות"], ["in_progress", "בטיפול"], ["resolved", "נסגרו"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === val ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">אין תקלות {filter !== "all" ? statuses[filter]?.label : ""}</p>
        ) : (
          filtered.map((fault) => (
            <Card key={fault.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 ml-2">
                  <p className="font-semibold text-gray-900 text-sm">{fault.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">📍 {fault.location} · {fault.date} · {fault.reportedBy}</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge text={statuses[fault.status]?.label} color={statuses[fault.status]?.color} />
                  <Badge text={priorities[fault.priority]?.label} color={priorities[fault.priority]?.color} />
                </div>
              </div>
              {fault.files?.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {fault.files.map((f, i) => (
                    <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg flex items-center gap-1">
                      <Icon name="file" size={12} /> {f.name}
                    </a>
                  ))}
                </div>
              )}
              {isCommittee && fault.status !== "resolved" && (
                <div className="flex gap-2">
                  {fault.status === "open" && (
                    <Button onClick={() => updateStatus(fault.id, "in_progress")} variant="secondary" size="sm">
                      קבל לטיפול
                    </Button>
                  )}
                  <Button onClick={() => updateStatus(fault.id, "resolved")} variant="success" size="sm">
                    <Icon name="check" size={14} /> סגור תקלה
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="דיווח תקלה חדשה">
        <div className="space-y-4">
          <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none" rows={3} placeholder="תיאור התקלה" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="מיקום (קומה, אזור...)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">עדיפות</label>
            <div className="flex gap-2">
              {Object.entries(priorities).map(([val, { label, color }]) => (
                <button key={val} onClick={() => setForm({ ...form, priority: val })} className={`flex-1 py-2 text-sm rounded-xl font-semibold border-2 transition-all ${form.priority === val ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">תמונות / מסמכים (יועלו ל-Drive)</p>
            <FileUploader onUpload={(file) => setForm({ ...form, files: [...form.files, file] })} label="הוסף קובץ" />
            {form.files.length > 0 && <p className="text-xs text-emerald-600 mt-1">{form.files.length} קבצים מצורפים</p>}
          </div>
          <Button onClick={handleAdd} className="w-full justify-center" disabled={!form.description}>
            שלח דיווח
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// INSPECTIONS
// ============================================================
const Inspections = ({ data, setData, isCommittee }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", type: "", date: "", nextDate: "", notes: "", files: [] });

  const types = ["מעלית", "גז", "חשמל", "אש ופינוי", "מיקלט", "גג", "צנרת", "מערכת כיבוי אש", "אחר"];

  const getStatus = (nextDate) => {
    if (!nextDate) return { label: "לא נקבע", color: "gray" };
    const days = Math.floor((new Date(nextDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: "פג תוקף!", color: "red" };
    if (days <= 30) return { label: `${days} ימים`, color: "yellow" };
    return { label: `${days} ימים`, color: "green" };
  };

  const handleAdd = () => {
    const inspection = { ...form, id: Date.now() };
    setData({ ...data, inspections: [...data.inspections, inspection] });
    setShowModal(false);
    setForm({ name: "", type: "", date: "", nextDate: "", notes: "", files: [] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-gray-900 text-xl">בדיקות חובה</h2>
        {isCommittee && (
          <Button onClick={() => setShowModal(true)} size="sm">
            <Icon name="plus" size={16} /> הוספה
          </Button>
        )}
      </div>

      <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-700 flex items-start gap-2">
        <Icon name="info" size={14} />
        <span>בדיקות חובה נדרשות על פי תקנות התכנון והבנייה ותקנות המעליות</span>
      </div>

      <div className="space-y-3">
        {data.inspections.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">לא נרשמו בדיקות עדיין</p>
        ) : (
          data.inspections.map((insp) => {
            const status = getStatus(insp.nextDate);
            return (
              <Card key={insp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{insp.name}</span>
                      <Badge text={insp.type} color="purple" />
                    </div>
                    <p className="text-xs text-gray-400">בדיקה אחרונה: {insp.date || "לא ידוע"}</p>
                    <p className="text-xs text-gray-400">בדיקה הבאה: {insp.nextDate || "לא נקבע"}</p>
                    {insp.notes && <p className="text-xs text-gray-500 mt-1">{insp.notes}</p>}
                  </div>
                  <Badge text={status.label} color={status.color} />
                </div>
                {insp.files?.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {insp.files.map((f, i) => (
                      <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                        📄 {f.name}
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="הוספת בדיקת חובה">
        <div className="space-y-4">
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="שם הבדיקה" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="">סוג בדיקה</option>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">תאריך בדיקה אחרונה</label>
            <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">תאריך בדיקה הבאה</label>
            <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} />
          </div>
          <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none" rows={2} placeholder="הערות" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">אישורים ומסמכים (יועלו ל-Drive)</p>
            <FileUploader onUpload={(file) => setForm({ ...form, files: [...form.files, file] })} />
          </div>
          <Button onClick={handleAdd} className="w-full justify-center" disabled={!form.name || !form.type}>
            שמירה
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// PROTOCOLS
// ============================================================
const Protocols = ({ data, setData, isCommittee }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", date: new Date().toISOString().split("T")[0], attendees: "", content: "", files: [] });

  const generateProtocol = async () => {
    setAiLoading(true);
    const text = await askClaude(`כתוב פרוטוקול ועד בית מקצועי בעברית על סמך הנושאים הבאים: "${form.content}". כלול: תאריך, נוכחים, סדר יום, דיון, החלטות, חתימות.`);
    setForm({ ...form, content: text });
    setAiLoading(false);
  };

  const handleAdd = () => {
    const protocol = { ...form, id: Date.now() };
    setData({ ...data, protocols: [...data.protocols, protocol] });
    setShowModal(false);
    setForm({ title: "", date: new Date().toISOString().split("T")[0], attendees: "", content: "", files: [] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-gray-900 text-xl">פרוטוקולים</h2>
        {isCommittee && (
          <Button onClick={() => setShowModal(true)} size="sm">
            <Icon name="plus" size={16} /> חדש
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {data.protocols.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">אין פרוטוקולים עדיין</p>
        ) : (
          data.protocols.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.date}</p>
                  {p.attendees && <p className="text-xs text-gray-400">נוכחים: {p.attendees}</p>}
                </div>
                <Icon name="file" size={16} />
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{p.content}</p>
              {p.files?.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {p.files.map((f, i) => (
                    <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                      📄 {f.name}
                    </a>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="פרוטוקול חדש">
        <div className="space-y-4">
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="כותרת הישיבה" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="נוכחים (שמות)" value={form.attendees} onChange={(e) => setForm({ ...form, attendees: e.target.value })} />
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">תוכן הפרוטוקול</label>
              <Button onClick={generateProtocol} variant="secondary" size="sm" disabled={aiLoading || !form.content}>
                {aiLoading ? "מייצר..." : "✨ Claude יכתוב"}
              </Button>
            </div>
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none" rows={6} placeholder="הזן נושאי דיון או תוכן הפרוטוקול..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">קבצים מצורפים (יועלו ל-Drive)</p>
            <FileUploader onUpload={(file) => setForm({ ...form, files: [...form.files, file] })} />
          </div>
          <Button onClick={handleAdd} className="w-full justify-center" disabled={!form.title}>
            שמירה
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// RESIDENTS
// ============================================================
const Residents = ({ data, setData, user, isCommittee }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showPending, setShowPending] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", apartment: "", phone: "", role: "resident" });

  const pending = data.residents.filter((r) => r.status === "pending");

  const handleAdd = () => {
    const resident = { ...form, id: Date.now(), status: "active", joinDate: new Date().toISOString().split("T")[0] };
    setData({ ...data, residents: [...data.residents, resident] });
    setShowModal(false);
    setForm({ name: "", email: "", apartment: "", phone: "", role: "resident" });
  };

  const approve = (id) => {
    setData({ ...data, residents: data.residents.map((r) => r.id === id ? { ...r, status: "active" } : r) });
  };

  const remove = (id) => {
    if (confirm("האם להסיר דייר זה?")) {
      setData({ ...data, residents: data.residents.filter((r) => r.id !== id) });
    }
  };

  const active = data.residents.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-gray-900 text-xl">דיירים</h2>
        <div className="flex gap-2">
          {pending.length > 0 && isCommittee && (
            <Button onClick={() => setShowPending(true)} variant="secondary" size="sm">
              ⏳ {pending.length} ממתינים
            </Button>
          )}
          {isCommittee && (
            <Button onClick={() => setShowModal(true)} size="sm">
              <Icon name="plus" size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Share link */}
      {isCommittee && (
        <div className="p-4 bg-indigo-50 rounded-2xl">
          <p className="text-sm font-semibold text-indigo-800 mb-1">🔗 קישור הרשמה לדיירים</p>
          <p className="text-xs text-indigo-500 mb-2">שלח קישור זה לדיירים החדשים להרשמה עצמית</p>
          <div className="flex gap-2">
            <input readOnly className="flex-1 bg-white border border-indigo-200 rounded-xl px-3 py-2 text-xs text-indigo-700" value={window.location.href} />
            <Button onClick={() => navigator.share?.({ url: window.location.href, title: "הצטרף לועד הבית" })} size="sm" variant="secondary">
              שתף
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {active.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">אין דיירים רשומים</p>
        ) : (
          active.map((r) => (
            <Card key={r.id} className="!p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-600">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <Badge text={r.role === "committee" ? "ועד" : "דייר"} color={r.role === "committee" ? "purple" : "blue"} />
                  </div>
                  <p className="text-xs text-gray-400">{r.email} · דירה {r.apartment}</p>
                  {r.phone && <p className="text-xs text-gray-400">{r.phone}</p>}
                </div>
                {isCommittee && (
                  <button onClick={() => remove(r.id)} className="p-2 text-gray-300 hover:text-red-500">
                    <Icon name="trash" size={16} />
                  </button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="הוספת דייר">
        <div className="space-y-4">
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="שם מלא" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="אימייל" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="מספר דירה" value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} />
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="טלפון" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="resident">דייר</option>
            <option value="committee">נציג ועד</option>
          </select>
          <Button onClick={handleAdd} className="w-full justify-center" disabled={!form.name}>
            הוספה
          </Button>
        </div>
      </Modal>

      {/* Pending approvals */}
      <Modal open={showPending} onClose={() => setShowPending(false)} title="ממתינים לאישור">
        <div className="space-y-3">
          {pending.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center font-bold text-amber-600 text-sm">
                {r.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                <p className="text-xs text-gray-400">{r.email}</p>
              </div>
              <Button onClick={() => approve(r.id)} variant="success" size="sm">
                אשר
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// TRANSPARENCY (Public data per law)
// ============================================================
const Transparency = ({ data }) => {
  const totalIncome = data.finances.income.reduce((s, i) => s + Number(i.amount), 0);
  const totalExpenses = data.finances.expenses.reduce((s, i) => s + Number(i.amount), 0);

  const expenseByCategory = data.finances.expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-black text-gray-900 text-xl">שקיפות לדיירים</h2>
        <p className="text-xs text-gray-400 mt-1">נתונים על פי חוק</p>
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
        <p className="text-sm font-semibold text-emerald-800 mb-3">📊 סיכום כספי שנתי</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xl font-black text-emerald-700">₪{totalIncome.toLocaleString()}</p>
            <p className="text-xs text-emerald-600">סה״כ הכנסות</p>
          </div>
          <div>
            <p className="text-xl font-black text-red-500">₪{totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-gray-500">סה״כ הוצאות</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-200">
          <p className="text-sm font-bold text-gray-800">יתרה: <span className={totalIncome - totalExpenses >= 0 ? "text-emerald-700" : "text-red-600"}>₪{(totalIncome - totalExpenses).toLocaleString()}</span></p>
        </div>
      </div>

      {Object.keys(expenseByCategory).length > 0 && (
        <Card>
          <h3 className="font-bold text-gray-900 mb-3 text-sm">פירוט הוצאות לפי קטגוריה</h3>
          <div className="space-y-2">
            {Object.entries(expenseByCategory).sort(([, a], [, b]) => b - a).map(([cat, amount]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className="text-sm text-gray-600 w-24 flex-shrink-0">{cat}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.round((amount / totalExpenses) * 100)}%` }} />
                </div>
                <div className="text-sm font-semibold text-gray-800 w-20 text-right">₪{amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="font-bold text-gray-900 mb-3 text-sm">פרוטוקולים אחרונים</h3>
        {data.protocols.length === 0 ? (
          <p className="text-xs text-gray-400">אין פרוטוקולים עדיין</p>
        ) : (
          <div className="space-y-2">
            {data.protocols.slice(-3).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{p.title}</span>
                <span className="text-xs text-gray-400">{p.date}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <h3 className="font-bold text-gray-900 mb-3 text-sm">בדיקות חובה – סטטוס</h3>
        {data.inspections.length === 0 ? (
          <p className="text-xs text-gray-400">לא הוזנו בדיקות</p>
        ) : (
          <div className="space-y-2">
            {data.inspections.map((insp) => {
              const days = insp.nextDate ? Math.floor((new Date(insp.nextDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
              return (
                <div key={insp.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{insp.name}</span>
                  <Badge
                    text={days === null ? "לא נקבע" : days < 0 ? "פג תוקף" : `${days} ימים`}
                    color={days === null ? "gray" : days < 0 ? "red" : days <= 30 ? "yellow" : "green"}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

// ============================================================
// BOTTOM NAVIGATION
// ============================================================
const BottomNav = ({ active, setActive, isCommittee, pendingCount }) => {
  const tabs = [
    { id: "home", icon: "home", label: "בית" },
    { id: "finances", icon: "wallet", label: "כספים" },
    { id: "faults", icon: "alert", label: "תקלות" },
    { id: "residents", icon: "users", label: "דיירים" },
    { id: "more", icon: "file", label: "עוד" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-pb z-40">
      <div className="flex max-w-lg mx-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-all relative ${active === t.id ? "text-indigo-600" : "text-gray-400"}`}
          >
            <Icon name={t.icon} size={22} />
            <span className="text-[10px] font-semibold">{t.label}</span>
            {t.id === "residents" && pendingCount > 0 && (
              <div className="absolute top-2 right-1/2 translate-x-3 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center">
                {pendingCount}
              </div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

// ============================================================
// MORE MENU
// ============================================================
const MoreMenu = ({ setTab, isCommittee, onLogout, user }) => {
  const items = [
    { id: "inspections", icon: "shield", label: "בדיקות חובה", color: "purple" },
    { id: "protocols", icon: "file", label: "פרוטוקולים", color: "blue" },
    { id: "transparency", icon: "trending", label: "שקיפות לדיירים", color: "emerald" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-black text-gray-900 text-xl">תפריט</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)} className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${item.color}-50 text-${item.color}-600`}>
              <Icon name={item.icon} size={20} />
            </div>
            <span className="font-semibold text-gray-800">{item.label}</span>
            <Icon name="chevron" size={16} className="ml-auto text-gray-300 rotate-[-90deg]" />
          </button>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-600">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
            <Badge text={isCommittee ? "נציג ועד" : "דייר"} color={isCommittee ? "purple" : "blue"} />
          </div>
        </div>
        <Button onClick={onLogout} variant="danger" size="sm" className="w-full justify-center">
          <Icon name="logout" size={16} /> התנתקות
        </Button>
      </Card>

      <div className="p-3 bg-gray-50 rounded-xl text-center">
        <p className="text-xs text-gray-400">מסמכים מסונכרנים ל:</p>
        <p className="text-xs font-semibold text-indigo-600">{VAAD_DRIVE_EMAIL}</p>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
function VaadBayitApp() {
  const [user, setUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("home");
  const [data, setDataState] = React.useState(getStorage());

  const setData = (newData) => {
    setDataState(newData);
    setStorage(newData);
  };

  // Check if user is committee member
  const isCommittee = user?.role === "committee" || user?.role === "admin";
  const pendingCount = data.residents.filter((r) => r.status === "pending").length;

  const handleLogin = (u) => {
    // Check if user exists in residents
    const existing = data.residents.find((r) => r.email === u.email);
    if (existing) {
      setUser({ ...u, role: existing.role, status: existing.status });
    } else {
      // Add as pending
      const newResident = { ...u, id: Date.now(), role: "resident", status: "pending", apartment: "", phone: "", joinDate: new Date().toISOString().split("T")[0] };
      const newData = { ...data, residents: [...data.residents, newResident] };
      setData(newData);
      setUser({ ...u, role: "resident", status: "pending" });
    }
  };

  const handleLogout = () => setUser(null);

  if (!user) return <LoginScreen onLogin={handleLogin} />;
  if (user.status === "pending") return <PendingScreen user={user} onLogout={handleLogout} />;

  const renderTab = () => {
    switch (activeTab) {
      case "home": return <Dashboard data={data} user={user} isCommittee={isCommittee} />;
      case "finances": return <Finances data={data} setData={setData} isCommittee={isCommittee} />;
      case "faults": return <Faults data={data} setData={setData} user={user} isCommittee={isCommittee} />;
      case "residents": return <Residents data={data} setData={setData} user={user} isCommittee={isCommittee} />;
      case "inspections": return <Inspections data={data} setData={setData} isCommittee={isCommittee} />;
      case "protocols": return <Protocols data={data} setData={setData} isCommittee={isCommittee} />;
      case "transparency": return <Transparency data={data} />;
      case "more": return <MoreMenu setTab={setActiveTab} isCommittee={isCommittee} onLogout={handleLogout} user={user} />;
      default: return null;
    }
  };

  const mainTabs = ["home", "finances", "faults", "residents", "more"];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!mainTabs.includes(activeTab) && (
              <button onClick={() => setActiveTab("more")} className="p-1.5 hover:bg-gray-100 rounded-xl mr-1">
                <Icon name="chevron" size={18} className="rotate-90" />
              </button>
            )}
            <span className="text-xl">🏢</span>
            <span className="font-black text-gray-900" style={{ fontFamily: "serif" }}>ועד הבית</span>
            {isCommittee && <Badge text="ועד" color="purple" />}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" title="Drive מחובר" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 pt-5 pb-24">
        {renderTab()}
      </main>

      {/* Bottom Nav */}
      <BottomNav
        active={mainTabs.includes(activeTab) ? activeTab : "more"}
        setActive={setActiveTab}
        isCommittee={isCommittee}
        pendingCount={pendingCount}
      />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(VaadBayitApp));
