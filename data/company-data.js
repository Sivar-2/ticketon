/**
 * TICKETON — ESTRUCTURA DE DATOS CORPORATIVA
 * ==========================================
 * Edita este archivo para agregar empresas, sucursales y empleados.
 * La estructura en cascada: Empresa → Sucursal/Área → Empleado
 */

const COMPANY_DATA = [
  {
    id: "FPC",
    name: "FPC Principal",
    emoji: "🏢",
    branches: [
      {
        id: "FPC-CORP",
        name: "Corporativo Central",
        emoji: "🏛️",
        employees: [
          { id: "EMP-001", name: "Carlos Rodríguez",    email: "carlos.rodriguez@fpc.com",    phone: "Ext. 204" },
          { id: "EMP-002", name: "María González",      email: "maria.gonzalez@fpc.com",      phone: "Ext. 312" },
          { id: "EMP-003", name: "Roberto Sánchez",     email: "roberto.sanchez@fpc.com",     phone: "Ext. 405" },
          { id: "EMP-004", name: "Lucía Fernández",     email: "lucia.fernandez@fpc.com",     phone: "Ext. 108" }
        ]
      },
      {
        id: "FPC-TI",
        name: "Tecnología & IT",
        emoji: "💻",
        employees: [
          { id: "EMP-005", name: "Alejandro Morales",   email: "a.morales@fpc.com",           phone: "Ext. 050" },
          { id: "EMP-006", name: "Sofía Herrera",       email: "sofia.herrera@fpc.com",       phone: "Ext. 219" }
        ]
      },
      {
        id: "FPC-VENTAS",
        name: "Ventas & Marketing",
        emoji: "📈",
        employees: [
          { id: "EMP-007", name: "Diego Ramírez",       email: "diego.ramirez@fpc.com",       phone: "Ext. 320" },
          { id: "EMP-008", name: "Valentina Cruz",      email: "valentina.cruz@fpc.com",      phone: "Ext. 321" }
        ]
      }
    ]
  },
  {
    id: "SUC-NORTE",
    name: "Sucursal Norte",
    emoji: "🏬",
    branches: [
      {
        id: "SN-ADMIN",
        name: "Administración",
        emoji: "📋",
        employees: [
          { id: "EMP-101", name: "Ana Martínez",        email: "ana.martinez@suc-norte.com",  phone: "Ext. 101" },
          { id: "EMP-102", name: "Jorge Pérez",         email: "jorge.perez@suc-norte.com",   phone: "Ext. 102" }
        ]
      },
      {
        id: "SN-OPS",
        name: "Operaciones",
        emoji: "⚙️",
        employees: [
          { id: "EMP-103", name: "Patricia López",      email: "patricia.lopez@suc-norte.com", phone: "Ext. 201" },
          { id: "EMP-104", name: "Miguel Torres",       email: "miguel.torres@suc-norte.com",  phone: "Ext. 202" }
        ]
      }
    ]
  },
  {
    id: "SUC-SUR",
    name: "Sucursal Sur",
    emoji: "🏪",
    branches: [
      {
        id: "SS-VENTAS",
        name: "Ventas",
        emoji: "🛒",
        employees: [
          { id: "EMP-201", name: "Laura Castillo",      email: "laura.castillo@suc-sur.com",  phone: "Ext. 110" },
          { id: "EMP-202", name: "Andrés Vargas",       email: "andres.vargas@suc-sur.com",   phone: "Ext. 111" }
        ]
      },
      {
        id: "SS-SOPORTE",
        name: "Soporte & Servicio",
        emoji: "🔧",
        employees: [
          { id: "EMP-203", name: "Daniela Ruiz",        email: "daniela.ruiz@suc-sur.com",    phone: "Ext. 150" },
          { id: "EMP-204", name: "Fernando Jiménez",    email: "fernando.jimenez@suc-sur.com", phone: "Ext. 151" }
        ]
      }
    ]
  }
];

// ── Helpers globales ─────────────────────────────────────────────────────────

function getAllEmployees() {
  const employees = [];
  COMPANY_DATA.forEach(company => {
    company.branches.forEach(branch => {
      branch.employees.forEach(emp => {
        employees.push({
          ...emp,
          company:    company.name,
          companyId:  company.id,
          branch:     branch.name,
          branchId:   branch.id
        });
      });
    });
  });
  // Merge with any localStorage additions
  const stored = localStorage.getItem('ticketon-employees-extra');
  if (stored) {
    try { employees.push(...JSON.parse(stored)); } catch(e) {}
  }
  return employees;
}

function getEmployeeById(id) {
  return getAllEmployees().find(e => e.id === id) || null;
}

function getEmployeesByBranch(branchId) {
  return getAllEmployees().filter(e => e.branchId === branchId);
}

function getBranchesByCompany(companyId) {
  const company = COMPANY_DATA.find(c => c.id === companyId);
  return company ? company.branches : [];
}

// Legacy compat for existing code
const DEFAULT_EMPLOYEES = getAllEmployees();
function getEmployeesList() { return getAllEmployees(); }
function saveEmployeesList(list) {
  localStorage.setItem('ticketon-employees-extra', JSON.stringify(list));
}
function findEmployeeByIdOrEmail(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  return getAllEmployees().find(e =>
    e.id.toLowerCase() === q ||
    e.email.toLowerCase() === q ||
    e.name.toLowerCase() === q
  ) || null;
}
