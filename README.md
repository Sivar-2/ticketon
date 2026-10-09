# 🎫 Ticketón — Sistema Moderno de Gestión de Tickets IT

Ticketón es un sistema ágil, minimalista y funcional para la recepción, priorización y gestión de tickets de soporte técnico e incidencias empresariales.

---

## ✨ Características Principales

- **📱 Formulario de Tickets (`index.html`):**
  - Interfaz moderna, limpia y responsive para móviles y escritorio.
  - Modo Oscuro / Modo Claro instantáneo (🌙 / ☀️).
  - Autocompletado inteligente de empleados según el directorio corporativo.
  - Carga automática con enlaces personalizados (`index.html?emp=EMP-001`).
  - Niveles de prioridad con SLA: Baja (24h), Normal (4h) y Urgente (15min).
  - Carga y previsualización de archivos adjuntos (imágenes y PDFs).

- **👥 Directorio de Empleados (`employees.js`):**
  - Base de datos centralizada de colaboradores con ID, nombre, correo, departamento y ubicación.
  - Generación de links directos para compartir por WhatsApp, Slack o Teams.
  - Importación rápida en formatos JSON o CSV desde Excel.

- **🔒 Panel de Administración y Control (`admin.html`):**
  - Acceso seguro mediante pantalla de autenticación (`auth.html`).
  - Creación manual de tickets por parte del administrador.
  - Reasignación de prioridades en tiempo real.
  - **Calendario Integrado:** Agendado de atención de tickets con notas de seguimiento.
  - **Bitácora Automatizada:** Registro histórico clasificado por día, semana y mes.
  - **Métricas de Rendimiento:** KPIs de tickets resueltos, tiempo de respuesta y distribución.
  - Gestión de usuarios administradores adicionales.

---

## 🚀 Puesta en Marcha Rápida

No requiere instalación de servidores ni bases de datos complejas para funcionar. Solo abre los archivos en tu navegador:

1. **Para usuarios/empleados:** Abre [`index.html`](index.html).
2. **Para administradores:** Abre [`auth.html`](auth.html) o [`admin.html`](admin.html).

### 🔐 Credenciales de Administrador por Defecto

- **Usuario:** `admin`
- **Contraseña:** `Stitch2024!`

*(Puedes cambiarlas en la sección Ajustes del panel).*

---

## 📁 Estructura del Proyecto

```text
ticketon/
├── index.html       # Portal público de envío de tickets
├── employees.js     # Base de datos y directorio de empleados
├── auth.html        # Acceso protegido para administradores
├── admin.html       # Panel de control de tickets, calendario y bitácora
└── README.md        # Documentación del sistema
```

---

## 📄 Licencia

MIT License — Libre para uso corporativo o personal.
