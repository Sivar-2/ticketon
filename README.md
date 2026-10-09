# Ticketon — Sistema de Tickets de Soporte IT

> 🎫 Sistema completo de gestión de tickets de soporte técnico con interfaz para empleados y panel administrativo.

---

## 🗂 Estructura de Archivos

```
ticketon/
├── index.html              ← Interfaz del empleado (formulario Poka-Yoke)
├── admin.html              ← Panel de administración completo
├── auth.html               ← Página de login
├── employees.js            ← Shim de compatibilidad (legacy)
├── data/
│   ├── company-data.js     ← ⭐ EDITA AQUÍ: Empresas, sucursales y empleados
│   └── tickets.js          ← Motor CRUD de tickets (localStorage → REST API)
├── Logo.png                ← Logo corporativo (coloca aquí tu logo)
└── README.md
```

---

## ⚙️ Configuración Rápida

### 1. Agregar tu empresa/empleados

Edita [`data/company-data.js`](data/company-data.js) — la estructura es en cascada:

```js
const COMPANY_DATA = [
  {
    id: "MI-EMPRESA",
    name: "Mi Empresa S.A.",
    emoji: "🏢",
    branches: [
      {
        id: "ME-IT",
        name: "Tecnología & IT",
        emoji: "💻",
        employees: [
          { id: "EMP-001", name: "Juan Pérez", email: "juan@miempresa.com", phone: "Ext. 100" },
        ]
      }
    ]
  }
];
```

### 2. Agregar tu logo

Coloca tu archivo de imagen en la raíz con el nombre **`Logo.png`**.

---

## 🚀 Características

### Interfaz del Empleado (`index.html`)
- ✅ **Header 3 columnas**: Marca | Logo | Modo oscuro / Claro
- ✅ **Dropdowns en cascada** Poka-Yoke: Empresa → Área/Sucursal → Empleado
- ✅ **Banner de empleado identificado** con iniciales y datos precargados
- ✅ **Validación en tiempo real** — botón ENVIAR bloqueado hasta completar todo
- ✅ **Campo de descripción** con contador de caracteres (mín. 20)
- ✅ **Drag & Drop** para adjuntar archivos (.png, .jpg, .jpeg, .pdf)
- ✅ **Previsualización** de imágenes y PDFs adjuntos
- ✅ **Selector de prioridad** con animación "urgentPulse"
- ✅ **Pantalla de confirmación** tipo bottom-sheet con ID del ticket
- ✅ **Auto-reset** del formulario tras 4 segundos

### Panel Admin (`admin.html`)
- ✅ **Dashboard en tiempo real** con KPIs, feed de tickets y contadores live
- ✅ **Cajón de detalle** (Drawer) por ticket con notas, estado y acciones
- ✅ **Botón "Agendar en Google Calendar"** con enlace prellenado automático
- ✅ **Historial con filtros** avanzados (búsqueda, empresa, prioridad, estado)
- ✅ **Calendario interactivo** (FullCalendar) con tickets como eventos coloreados
- ✅ **Analítica con gráficas** (Chart.js): semanal, mensual, prioridad, por empresa
- ✅ **Directorio de empleados** con agregar/eliminar y copiar link de acceso
- ✅ **Panel de ajustes** (SLA, notificaciones, integraciones)
- ✅ **Modo oscuro** persistente en todo el sistema

---

## 🔌 Conexión a Backend (Java REST API)

Los archivos de datos en `data/` están diseñados para ser fácilmente reemplazados:

**`data/tickets.js`** — Reemplaza `getTickets()` y `createTicket()`:
```js
// Ejemplo con fetch a tu API Java
async function getTickets() {
  const res = await fetch('https://api.miempresa.com/v1/tickets', {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
  });
  return res.json();
}

async function createTicket(data) {
  const res = await fetch('https://api.miempresa.com/v1/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

---

## 📱 Responsive

| Vista | Dispositivo |
|-------|------------|
| `index.html` | Optimizado para móvil (empleados en campo) |
| `admin.html` | Optimizado para desktop (admins) |
| Ambas | Compatibles con tablets |

---

## 🛠 Tecnologías

- HTML5 + CSS3 + JavaScript ES6+ (sin frameworks, sin build step)
- [Google Fonts — Inter & Plus Jakarta Sans](https://fonts.google.com)
- [Chart.js v4](https://www.chartjs.org/) — Gráficas de analítica
- [FullCalendar v6](https://fullcalendar.io/) — Vista de calendario
- `localStorage` como capa de datos (reemplazable por API REST)

---

## 📄 Licencia

Uso interno corporativo. Todos los derechos reservados.
