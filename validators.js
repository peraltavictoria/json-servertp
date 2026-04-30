export function validarAlumno(datos) {
  if (!datos.nombre) return "Nombre obligatorio";
  if (!datos.apellido) return "Apellido obligatorio";
  if (!datos.email) return "Email obligatorio";
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(datos.email)) return "Ingrese un email válido.";
  return null;
}
