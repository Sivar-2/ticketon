/**
 * TICKETON — GESTOR DE TICKETS (localStorage)
 * ============================================
 * Motor de persistencia de tickets. Fácilmente reemplazable por REST API.
 */

const TICKET_KEY = 'ticketon-tickets';

let _ticketCounter = parseInt(localStorage.getItem('ticketon-counter') || '0', 10);

function _nextId() {
  _ticketCounter++;
  localStorage.setItem('ticketon-counter', String(_ticketCounter));
  return 'TKT-' + String(_ticketCounter).padStart(4, '0');
}

function getTickets() {
  try {
    return JSON.parse(localStorage.getItem(TICKET_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveTickets(tickets) {
  localStorage.setItem(TICKET_KEY, JSON.stringify(tickets));
}

function createTicket(data) {
  const ticket = {
    id:          _nextId(),
    createdAt:   new Date().toISOString(),
    status:      'open',         // open | resolved | cancelled
    priority:    data.priority || 'normal',
    companyId:   data.companyId,
    company:     data.company,
    branchId:    data.branchId,
    branch:      data.branch,
    employeeId:  data.employeeId,
    employee:    data.employee,
    email:       data.email,
    phone:       data.phone,
    subject:     data.subject,
    description: data.description,
    attachments: data.attachments || [],
    notes:       [],
    resolvedAt:  null,
    calendarLink: null,
  };
  const tickets = getTickets();
  tickets.unshift(ticket);
  saveTickets(tickets);
  return ticket;
}

function updateTicket(id, changes) {
  const tickets = getTickets();
  const idx = tickets.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tickets[idx] = { ...tickets[idx], ...changes };
  saveTickets(tickets);
  return tickets[idx];
}

function resolveTicket(id) {
  return updateTicket(id, { status: 'resolved', resolvedAt: new Date().toISOString() });
}

function cancelTicket(id) {
  return updateTicket(id, { status: 'cancelled' });
}

function addNote(id, note) {
  const tickets = getTickets();
  const t = tickets.find(t => t.id === id);
  if (!t) return null;
  t.notes.push({ text: note, at: new Date().toISOString() });
  saveTickets(tickets);
  return t;
}

function getTicketById(id) {
  return getTickets().find(t => t.id === id) || null;
}

// ── Stats helpers ─────────────────────────────────────────────────────────────

function getStats() {
  const all = getTickets();
  return {
    total:    all.length,
    open:     all.filter(t => t.status === 'open').length,
    resolved: all.filter(t => t.status === 'resolved').length,
    cancelled:all.filter(t => t.status === 'cancelled').length,
    high:     all.filter(t => t.priority === 'urgent').length,
    medium:   all.filter(t => t.priority === 'normal').length,
    low:      all.filter(t => t.priority === 'low').length,
  };
}

// ── Seed demo data ─────────────────────────────────────────────────────────────

function seedDemoData() {
  if (getTickets().length > 0) return;
  const now = Date.now();
  const demos = [
    { company:'FPC Principal',   companyId:'FPC',      branch:'Tecnología & IT',  branchId:'FPC-TI',      employee:'Sofía Herrera',    email:'sofia.herrera@fpc.com',       phone:'Ext. 219', subject:'Error al iniciar sesión en ERP',                description:'El sistema de ERP no acepta mis credenciales desde ayer.',         priority:'urgent', status:'open',     createdAt:new Date(now - 15*60000).toISOString(),   resolvedAt:null },
    { company:'Sucursal Norte',  companyId:'SUC-NORTE',branch:'Administración',   branchId:'SN-ADMIN',    employee:'Ana Martínez',     email:'ana.martinez@suc-norte.com',  phone:'Ext. 101', subject:'Impresora sin papel atascado',                 description:'La impresora HP del área admin no imprime, muestra error E-04.',  priority:'normal', status:'open',     createdAt:new Date(now - 2*3600000).toISOString(),  resolvedAt:null },
    { company:'FPC Principal',   companyId:'FPC',      branch:'Ventas & Marketing',branchId:'FPC-VENTAS', employee:'Diego Ramírez',    email:'diego.ramirez@fpc.com',       phone:'Ext. 320', subject:'Solicitud de laptop nueva',                    description:'Mi laptop no enciende, solicito equipo de reemplazo urgente.',    priority:'normal', status:'resolved', createdAt:new Date(now - 1*86400000).toISOString(), resolvedAt:new Date(now - 20*3600000).toISOString() },
    { company:'Sucursal Sur',    companyId:'SUC-SUR',  branch:'Ventas',           branchId:'SS-VENTAS',   employee:'Laura Castillo',   email:'laura.castillo@suc-sur.com',  phone:'Ext. 110', subject:'Sin conexión a internet',                      description:'Toda la sucursal perdió internet desde las 8am.',                priority:'urgent', status:'resolved', createdAt:new Date(now - 2*86400000).toISOString(), resolvedAt:new Date(now - 1.5*86400000).toISOString() },
    { company:'FPC Principal',   companyId:'FPC',      branch:'Corporativo Central',branchId:'FPC-CORP',  employee:'Carlos Rodríguez', email:'carlos.rodriguez@fpc.com',    phone:'Ext. 204', subject:'Actualizar antivirus en estaciones',            description:'Los equipos del área muestran alertas de versión desactualizada.',priority:'low',    status:'open',     createdAt:new Date(now - 3*86400000).toISOString(), resolvedAt:null },
    { company:'Sucursal Norte',  companyId:'SUC-NORTE',branch:'Operaciones',      branchId:'SN-OPS',      employee:'Patricia López',   email:'patricia.lopez@suc-norte.com',phone:'Ext. 201', subject:'Teclado con teclas dañadas',                   description:'Varias teclas no responden, necesito reemplazo.',                priority:'low',    status:'cancelled',createdAt:new Date(now - 4*86400000).toISOString(), resolvedAt:null },
  ];
  let counter = 0;
  const seeds = demos.map(d => ({
    ...d,
    id: 'TKT-' + String(++counter).padStart(4, '0'),
    employeeId: null, attachments: [], notes: [], calendarLink: null,
  }));
  localStorage.setItem(TICKET_KEY, JSON.stringify(seeds));
  localStorage.setItem('ticketon-counter', String(counter));
  _ticketCounter = counter;
}
