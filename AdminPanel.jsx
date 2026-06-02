import { useState, useEffect, useRef } from "react";

// ============================================================
// ADMIN PANEL — ניהול מערכת + שדות מותאמים אישית
// להוסיף לאפליקציה הראשית: import AdminPanel from './vaad-bayit-admin'
// ============================================================

const STORAGE_KEY_ADMIN = "vaad_bayit_admin_config";

const defaultAdminConfig = {
  buildingInfo: {
    name: "ועד הבית",
    address: "",
    floors: "",
    apartments: "",
    contact: "",
    driveEmail: "vaadbayit2006@gmail.com",
  },
  customFields: {
    resident: [],
    fault: [],
    expense: [],
    income: [],
    inspection: [],
    protocol: [],
  },
  categories: {
    expense: ["ניקיון", "גינון", "חשמל", "מים", "תחזוקה", "ביטוח", "ספק חיצוני", "אחר"],
    income: ["ועד בית", "שכירות שטחים", "קנסות", "אחר"],
    fault: ["מעלית", "חשמל", "אינסטלציה", "גינה", "גג", "חנייה", "כניסה", "אחר"],
    inspection: ["מעלית", "גז", "חשמל", "אש ופינוי", "מיקלט", "גג", "צנרת", "כיבוי אש", "אחר"],
  },
  announcements: [],
  managers: [],
};

const getAdminConfig = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_ADMIN)) || defaultAdminConfig; }
  catch { return defaultAdminConfig; }
};
const saveAdminConfig = (cfg) => localStorage.setItem(STORAGE_KEY_ADMIN, JSON.stringify(cfg));

// ── Small UI primitives ──────────────────────────────────────────────────────

const Icon = ({ name, size = 18 }) => {
  const icons = {
    plus: "M12 5v14 M5 12h14",
    x: "M18 6L6 18 M6 6l12 12",
    trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
    building: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
    list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
    check: "M20 6L9 17l-5-5",
    chevron: "M6 9l6 6 6-6",
    grip: "M9 3h.01 M15 3h.01 M9 9h.01 M15 9h.01 M9 15h.01 M15 15h.01",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]?.split(" M").map((d, i) => <path key={i} d={i === 0 ? d : "M" + d} />)}
    </svg>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 ${className}`}>{children}</div>
);
const Btn = ({ children, onClick, variant = "primary", size = "md", disabled = false, className = "" }) => {
  const v = { primary: "bg-indigo-600 text-white hover:bg-indigo-700", secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200", danger: "bg-red-50 text-red-600 hover:bg-red-100", success: "bg-emerald-600 text-white hover:bg-emerald-700", ghost: "text-gray-500 hover:bg-gray-100" };
  const s = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
  return <button onClick={onClick} disabled={disabled} className={`${v[variant]} ${s[size]} rounded-xl font-semibold transition-all flex items-center gap-1.5 disabled:opacity-40 ${className}`}>{children}</button>;
};
const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-semibold text-gray-500 block">{label}</label>}
    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" {...props} />
  </div>
);
const Select = ({ label, children, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-semibold text-gray-500 block">{label}</label>}
    <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" {...props}>{children}</select>
  </div>
);

// ── Field type definitions ──────────────────────────────────────────────────
const FIELD_TYPES = [
  { value: "text",     label: "טקסט חופשי", icon: "✏️" },
  { value: "number",   label: "מספר",       icon: "🔢" },
  { value: "date",     label: "תאריך",      icon: "📅" },
  { value: "select",   label: "בחירה מרשימה", icon: "📋" },
  { value: "checkbox", label: "כן / לא",    icon: "☑️" },
  { value: "phone",    label: "טלפון",      icon: "📞" },
  { value: "email",    label: "אימייל",     icon: "📧" },
  { value: "url",      label: "קישור",      icon: "🔗" },
  { value: "textarea", label: "טקסט ארוך",  icon: "📝" },
  { value: "file",     label: "קובץ / תמונה", icon: "📎" },
];

const MODULE_LABELS = {
  resident:   "👤 כרטיס דייר",
  fault:      "🔧 דיווח תקלה",
  expense:    "📤 הוצאה",
  income:     "💰 הכנסה",
  inspection: "🛡️ בדיקת חובה",
  protocol:   "📄 פרוטוקול",
};

// ── Custom Field Editor ─────────────────────────────────────────────────────
const FieldEditor = ({ field, onSave, onCancel }) => {
  const [f, setF] = useState(field || { id: Date.now(), label: "", type: "text", required: false, options: "", placeholder: "", helpText: "", showInList: true });

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
      <div className="grid grid-cols-2 gap-3">
        <Input label="שם השדה *" placeholder="לדוגמה: מספר חניה" value={f.label} onChange={e => setF({ ...f, label: e.target.value })} />
        <Select label="סוג שדה" value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>
          {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
        </Select>
      </div>
      <Input label="טקסט עזרה (placeholder)" placeholder="טקסט שיופיע בתוך השדה" value={f.placeholder} onChange={e => setF({ ...f, placeholder: e.target.value })} />
      <Input label="הסבר / הערה לשדה" placeholder="הסבר קצר שיופיע מתחת לשדה" value={f.helpText} onChange={e => setF({ ...f, helpText: e.target.value })} />
      {f.type === "select" && (
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 block">אפשרויות בחירה (מופרדות בפסיק)</label>
          <textarea
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none"
            rows={2}
            placeholder="אפשרות 1, אפשרות 2, אפשרות 3"
            value={f.options}
            onChange={e => setF({ ...f, options: e.target.value })}
          />
        </div>
      )}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={f.required} onChange={e => setF({ ...f, required: e.target.checked })} className="rounded" />
          שדה חובה
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={f.showInList} onChange={e => setF({ ...f, showInList: e.target.checked })} className="rounded" />
          הצג ברשימה
        </label>
      </div>
      <div className="flex gap-2">
        <Btn onClick={() => f.label && onSave(f)} disabled={!f.label} size="sm">
          <Icon name="save" size={14} /> שמור שדה
        </Btn>
        <Btn onClick={onCancel} variant="ghost" size="sm">ביטול</Btn>
      </div>
    </div>
  );
};

// ── Custom Fields Section ───────────────────────────────────────────────────
const CustomFieldsSection = ({ moduleKey, config, setConfig }) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const fields = config.customFields[moduleKey] || [];

  const saveField = (field) => {
    const existing = fields.find(f => f.id === field.id);
    const updated = existing
      ? fields.map(f => f.id === field.id ? field : f)
      : [...fields, field];
    const newCfg = { ...config, customFields: { ...config.customFields, [moduleKey]: updated } };
    setConfig(newCfg);
    setAdding(false);
    setEditing(null);
  };

  const deleteField = (id) => {
    if (!confirm("למחוק שדה זה?")) return;
    const newCfg = { ...config, customFields: { ...config.customFields, [moduleKey]: fields.filter(f => f.id !== id) } };
    setConfig(newCfg);
  };

  const moveField = (idx, dir) => {
    const arr = [...fields];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setConfig({ ...config, customFields: { ...config.customFields, [moduleKey]: arr } });
  };

  return (
    <div className="space-y-3">
      {fields.length === 0 && !adding && (
        <div className="text-center py-6 text-gray-400 text-sm">
          <p className="text-3xl mb-2">🧩</p>
          אין שדות מותאמים עדיין — הוסף את הראשון!
        </div>
      )}

      {fields.map((field, idx) => {
        const typeInfo = FIELD_TYPES.find(t => t.value === field.type);
        return editing === field.id ? (
          <FieldEditor key={field.id} field={field} onSave={saveField} onCancel={() => setEditing(null)} />
        ) : (
          <div key={field.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveField(idx, -1)} disabled={idx === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 leading-none">▲</button>
              <button onClick={() => moveField(idx, 1)} disabled={idx === fields.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 leading-none">▼</button>
            </div>
            <div className="text-xl">{typeInfo?.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900">{field.label}</span>
                {field.required && <span className="text-xs bg-red-50 text-red-500 px-1.5 py-0.5 rounded">חובה</span>}
                {field.showInList && <span className="text-xs bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded">רשימה</span>}
              </div>
              <span className="text-xs text-gray-400">{typeInfo?.label}{field.options && ` · ${field.options.split(",").length} אפשרויות`}</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(field.id)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                <Icon name="edit" size={15} />
              </button>
              <button onClick={() => deleteField(field.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Icon name="trash" size={15} />
              </button>
            </div>
          </div>
        );
      })}

      {adding ? (
        <FieldEditor onSave={saveField} onCancel={() => setAdding(false)} />
      ) : (
        <Btn onClick={() => setAdding(true)} variant="secondary" size="sm" className="w-full justify-center border-2 border-dashed border-gray-200">
          <Icon name="plus" size={15} /> הוסף שדה חדש
        </Btn>
      )}
    </div>
  );
};

// ── Categories Editor ───────────────────────────────────────────────────────
const CategoriesEditor = ({ categoryKey, label, config, setConfig }) => {
  const [newCat, setNewCat] = useState("");
  const cats = config.categories[categoryKey] || [];

  const add = () => {
    if (!newCat.trim() || cats.includes(newCat.trim())) return;
    setConfig({ ...config, categories: { ...config.categories, [categoryKey]: [...cats, newCat.trim()] } });
    setNewCat("");
  };

  const remove = (cat) => {
    setConfig({ ...config, categories: { ...config.categories, [categoryKey]: cats.filter(c => c !== cat) } });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm"
          placeholder={`קטגוריה חדשה ל${label}`}
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
        />
        <Btn onClick={add} size="sm" disabled={!newCat.trim()}><Icon name="plus" size={14} /></Btn>
      </div>
      <div className="flex flex-wrap gap-2">
        {cats.map(cat => (
          <div key={cat} className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-xl text-sm">
            <span>{cat}</span>
            <button onClick={() => remove(cat)} className="text-gray-400 hover:text-red-500">
              <Icon name="x" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Building Info ───────────────────────────────────────────────────────────
const BuildingInfoEditor = ({ config, setConfig }) => {
  const [info, setInfo] = useState(config.buildingInfo);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setConfig({ ...config, buildingInfo: info });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="שם הבניין / ועד" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} />
        <Input label="כתובת" placeholder="רחוב הרצל 5, תל אביב" value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />
        <Input label="מספר קומות" type="number" value={info.floors} onChange={e => setInfo({ ...info, floors: e.target.value })} />
        <Input label="מספר דירות" type="number" value={info.apartments} onChange={e => setInfo({ ...info, apartments: e.target.value })} />
        <Input label="טלפון ועד" type="tel" value={info.contact} onChange={e => setInfo({ ...info, contact: e.target.value })} />
        <Input label="Google Drive של הועד" value={info.driveEmail} onChange={e => setInfo({ ...info, driveEmail: e.target.value })} />
      </div>
      <Btn onClick={save} variant={saved ? "success" : "primary"}>
        <Icon name={saved ? "check" : "save"} size={15} />
        {saved ? "נשמר!" : "שמור פרטי בניין"}
      </Btn>
    </div>
  );
};

// ── Announcements ───────────────────────────────────────────────────────────
const AnnouncementsEditor = ({ config, setConfig }) => {
  const [form, setForm] = useState({ title: "", body: "", important: false, date: new Date().toISOString().split("T")[0] });
  const list = config.announcements || [];

  const add = () => {
    if (!form.title) return;
    setConfig({ ...config, announcements: [...list, { ...form, id: Date.now() }] });
    setForm({ title: "", body: "", important: false, date: new Date().toISOString().split("T")[0] });
  };

  const remove = (id) => setConfig({ ...config, announcements: list.filter(a => a.id !== id) });

  return (
    <div className="space-y-4">
      <Card className="!bg-blue-50 border-blue-100">
        <div className="space-y-3">
          <Input label="כותרת ההודעה *" placeholder="לדוגמה: ניקוי המיכל ביום חמישי" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 block">תוכן ההודעה</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none bg-white"
              rows={3}
              placeholder="פרטים נוספים..."
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.important} onChange={e => setForm({ ...form, important: e.target.checked })} />
              הודעה דחופה 🔴
            </label>
            <Btn onClick={add} size="sm" disabled={!form.title}>
              <Icon name="bell" size={14} /> פרסם הודעה
            </Btn>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {list.length === 0 && <p className="text-center text-gray-400 text-sm py-4">אין הודעות</p>}
        {list.slice().reverse().map(a => (
          <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl border ${a.important ? "bg-red-50 border-red-100" : "bg-white border-gray-100"}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {a.important && <span className="text-xs font-bold text-red-500">דחוף!</span>}
                <span className="font-semibold text-sm">{a.title}</span>
              </div>
              {a.body && <p className="text-xs text-gray-500 mt-0.5">{a.body}</p>}
              <p className="text-xs text-gray-400 mt-1">{a.date}</p>
            </div>
            <button onClick={() => remove(a.id)} className="text-gray-300 hover:text-red-500">
              <Icon name="trash" size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Manual Resident Add ─────────────────────────────────────────────────────
const ManualResidentAdd = ({ appData, setAppData }) => {
  const [form, setForm] = useState({ name: "", email: "", apartment: "", phone: "", floor: "", role: "resident", notes: "", moveInDate: new Date().toISOString().split("T")[0] });
  const [saved, setSaved] = useState(false);

  const add = () => {
    if (!form.name || !form.apartment) return;
    const resident = { ...form, id: Date.now(), status: "active", joinDate: new Date().toISOString().split("T")[0] };
    const newData = { ...appData, residents: [...(appData?.residents || []), resident] };
    setAppData(newData);
    localStorage.setItem("vaad_bayit_data", JSON.stringify(newData));
    setSaved(true);
    setForm({ name: "", email: "", apartment: "", phone: "", floor: "", role: "resident", notes: "", moveInDate: new Date().toISOString().split("T")[0] });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
        💡 הוספה ידנית מאפשרת לרשום דיירים שאין להם Gmail, או לייבא דיירים קיימים
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="שם מלא *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="מספר דירה *" value={form.apartment} onChange={e => setForm({ ...form, apartment: e.target.value })} />
        <Input label="קומה" type="number" value={form.floor} onChange={e => setForm({ ...form, floor: e.target.value })} />
        <Input label="טלפון" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <Input label="אימייל" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="תאריך כניסה" type="date" value={form.moveInDate} onChange={e => setForm({ ...form, moveInDate: e.target.value })} />
      </div>
      <Select label="תפקיד" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="resident">דייר</option>
        <option value="committee">נציג ועד</option>
        <option value="owner">בעל דירה</option>
        <option value="tenant">שוכר</option>
      </Select>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 block">הערות</label>
        <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none" rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="הערות חופשיות..." />
      </div>
      <Btn onClick={add} disabled={!form.name || !form.apartment} variant={saved ? "success" : "primary"} className="w-full justify-center">
        <Icon name={saved ? "check" : "user"} size={15} />
        {saved ? "✓ דייר נוסף בהצלחה!" : "הוסף דייר ידנית"}
      </Btn>

      {/* Resident list */}
      {(appData?.residents || []).length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-bold text-gray-700">דיירים רשומים ({(appData?.residents || []).length})</h4>
          {(appData?.residents || []).map(r => (
            <div key={r.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 text-xs">
                {r.name.charAt(0)}
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900">{r.name}</span>
                <span className="text-gray-400 text-xs ml-2">דירה {r.apartment}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.role === "committee" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-600"}`}>
                {r.role === "committee" ? "ועד" : r.role === "owner" ? "בעלים" : r.role === "tenant" ? "שוכר" : "דייר"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── MAIN ADMIN PANEL ────────────────────────────────────────────────────────
export default function AdminPanel({ appData, setAppData }) {
  const [config, setConfigState] = useState(getAdminConfig());
  const [activeSection, setActiveSection] = useState("building");
  const [activeModule, setActiveModule] = useState("resident");
  const [saveFlash, setSaveFlash] = useState(false);

  const setConfig = (newCfg) => {
    setConfigState(newCfg);
    saveAdminConfig(newCfg);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  };

  const sections = [
    { id: "building",    icon: "building", label: "פרטי בניין" },
    { id: "fields",      icon: "list",     label: "שדות מותאמים" },
    { id: "categories",  icon: "tag",      label: "קטגוריות" },
    { id: "residents",   icon: "user",     label: "הוספת דיירים" },
    { id: "announce",    icon: "bell",     label: "הודעות" },
  ];

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-gray-900 text-xl flex items-center gap-2">
            <Icon name="settings" size={22} /> ניהול מערכת
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">הגדרות ושדות מותאמים אישית</p>
        </div>
        {saveFlash && (
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl">
            <Icon name="check" size={14} /> נשמר
          </div>
        )}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${activeSection === s.id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            <Icon name={s.icon} size={14} /> {s.label}
          </button>
        ))}
      </div>

      {/* ── Section: Building Info ── */}
      {activeSection === "building" && (
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 text-base">🏢 פרטי הבניין</h3>
          <BuildingInfoEditor config={config} setConfig={setConfig} />
        </Card>
      )}

      {/* ── Section: Custom Fields ── */}
      {activeSection === "fields" && (
        <div className="space-y-4">
          {/* Module picker */}
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(MODULE_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveModule(key)}
                className={`p-3 rounded-2xl text-sm font-semibold text-center transition-all leading-tight ${activeModule === key ? "bg-indigo-600 text-white shadow-md" : "bg-white border border-gray-100 text-gray-600 hover:border-indigo-200"}`}
              >
                {label}
                {(config.customFields[key]?.length || 0) > 0 && (
                  <span className={`ml-1 text-xs ${activeModule === key ? "opacity-80" : "text-indigo-500"}`}>
                    ({config.customFields[key].length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{MODULE_LABELS[activeModule]}</h3>
              <span className="text-xs text-gray-400">
                {config.customFields[activeModule]?.length || 0} שדות מותאמים
              </span>
            </div>
            <CustomFieldsSection moduleKey={activeModule} config={config} setConfig={setConfig} />
          </Card>

          <div className="p-3 bg-indigo-50 rounded-xl text-xs text-indigo-700">
            💡 השדות שתוסיף יופיעו בטפסים המתאימים לצד השדות הקיימים
          </div>
        </div>
      )}

      {/* ── Section: Categories ── */}
      {activeSection === "categories" && (
        <div className="space-y-4">
          {[
            ["expense",    "📤 הוצאות"],
            ["income",     "💰 הכנסות"],
            ["fault",      "🔧 תקלות"],
            ["inspection", "🛡️ בדיקות"],
          ].map(([key, label]) => (
            <Card key={key}>
              <h3 className="font-bold text-gray-900 mb-3 text-sm">{label}</h3>
              <CategoriesEditor categoryKey={key} label={label} config={config} setConfig={setConfig} />
            </Card>
          ))}
        </div>
      )}

      {/* ── Section: Manual Residents ── */}
      {activeSection === "residents" && (
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 text-base">👤 הוספה ידנית של דייר</h3>
          <ManualResidentAdd appData={appData} setAppData={setAppData} />
        </Card>
      )}

      {/* ── Section: Announcements ── */}
      {activeSection === "announce" && (
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 text-base">📢 הודעות לדיירים</h3>
          <AnnouncementsEditor config={config} setConfig={setConfig} />
        </Card>
      )}

      {/* Export config */}
      <Card className="!bg-gray-50">
        <h3 className="font-bold text-gray-700 mb-3 text-sm">⬇️ ייצוא / ייבוא הגדרות</h3>
        <div className="flex gap-2">
          <Btn
            size="sm"
            variant="secondary"
            onClick={() => {
              const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = "vaad-bayit-config.json"; a.click();
            }}
          >
            ייצוא JSON
          </Btn>
          <label className="cursor-pointer">
            <Btn size="sm" variant="secondary" onClick={() => {}}>ייבוא JSON</Btn>
            <input type="file" accept=".json" className="hidden" onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = ev => {
                try { setConfig(JSON.parse(ev.target.result)); } catch { alert("קובץ לא תקין"); }
              };
              reader.readAsText(file);
            }} />
          </label>
        </div>
      </Card>
    </div>
  );
}
