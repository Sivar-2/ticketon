/**
 * BASE DE DATOS DE EMPLEADOS (DIRECTORIO EMPRESARIAL)
 * ====================================================
 * Aquí puedes agregar, editar o pegar la lista de todos tus empleados.
 * Cada empleado tiene:
 *  - id: Código de empleado (ej: 'EMP-101')
 *  - name: Nombre completo
 *  - email: Correo corporativo
 *  - dept: Departamento (ej: 'Tecnología & IT', 'Recursos Humanos', 'Ventas & Marketing', etc.)
 *  - loc: Ubicación de oficina (ej: '2do Piso — Oficinas', '3er Piso — Salas de Juntas', etc.)
 *  - phone: (opcional) Teléfono o extensión interna
 */

const DEFAULT_EMPLOYEES = [
  {
    id: "EMP-001",
    name: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    dept: "Tecnología & IT",
    loc: "2do Piso — Oficinas",
    phone: "Ext. 204"
  },
  {
    id: "EMP-002",
    name: "María González",
    email: "maria@empresa.com",
    dept: "Recursos Humanos",
    loc: "3er Piso — Salas de Juntas",
    phone: "Ext. 312"
  },
  {
    id: "EMP-003",
    name: "Roberto Sánchez",
    email: "roberto@empresa.com",
    dept: "Ventas & Marketing",
    loc: "4to Piso — Ejecutivos",
    phone: "Ext. 405"
  },
  {
    id: "EMP-004",
    name: "Lucía Fernández",
    email: "lucia.fernandez@empresa.com",
    dept: "Finanzas & Contabilidad",
    loc: "1er Piso — Recepción / Admón",
    phone: "Ext. 108"
  },
  {
    id: "EMP-005",
    name: "Alejandro Morales",
    email: "alejandro.morales@empresa.com",
    dept: "Operaciones & Logística",
    loc: "Sótano — Almacén",
    phone: "Ext. 050"
  },
  {
    id: "EMP-006",
    name: "Sofía Herrera",
    email: "sofia.herrera@empresa.com",
    dept: "Diseño & Producto",
    loc: "2do Piso — Oficinas",
    phone: "Ext. 219"
  }
];

// Helper para obtener y guardar empleados en localStorage
function getEmployeesList() {
  const stored = localStorage.getItem('stitch-employees');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing employees", e);
    }
  }
  // Si no hay en storage, inicializar con los por defecto
  localStorage.setItem('stitch-employees', JSON.stringify(DEFAULT_EMPLOYEES));
  return DEFAULT_EMPLOYEES;
}

function saveEmployeesList(list) {
  localStorage.setItem('stitch-employees', JSON.stringify(list));
}

function findEmployeeByIdOrEmail(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  const list = getEmployeesList();
  return list.find(e => 
    e.id.toLowerCase() === q || 
    e.email.toLowerCase() === q ||
    e.name.toLowerCase() === q
  ) || null;
}
