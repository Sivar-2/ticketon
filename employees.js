/**
 * employees.js — Compatibilidad retroactiva (legacy shim)
 * =========================================================
 * Este archivo mantiene compatibilidad con código antiguo.
 * La fuente de verdad ahora está en: data/company-data.js
 *
 * Para agregar empleados o empresas, edita: data/company-data.js
 */

// Este archivo es cargado antes de company-data.js en algunos contextos.
// Las funciones reales están en data/company-data.js
// Si se carga este archivo de forma standalone, se proveen stubs seguros.

if (typeof DEFAULT_EMPLOYEES === 'undefined') {
  var DEFAULT_EMPLOYEES = [];
}
if (typeof getEmployeesList !== 'function') {
  function getEmployeesList() {
    try { return JSON.parse(localStorage.getItem('stitch-employees') || '[]'); } catch(e) { return []; }
  }
}
if (typeof saveEmployeesList !== 'function') {
  function saveEmployeesList(list) {
    localStorage.setItem('stitch-employees', JSON.stringify(list));
  }
}
if (typeof findEmployeeByIdOrEmail !== 'function') {
  function findEmployeeByIdOrEmail(query) { return null; }
}
