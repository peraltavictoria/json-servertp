export function validarAlumno(datos) {
  if (!datos.nombre.trim()) {
    return "El nombre es obligatorio.";
  }

  if (!datos.apellido.trim()) {
    return "El apellido es obligatorio.";
  }

  if (!datos.email.trim()) {
    return "El email es obligatorio.";
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formatoEmail.test(datos.email)) {
    return "Ingrese un email válido.";
  }

  return null;
}
