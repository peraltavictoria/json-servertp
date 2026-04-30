const form = document.getElementById("alumno-form");
const idAlumno = document.getElementById("alumno-id");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const comision = document.getElementById("comision");
const activo = document.getElementById("activo");
const mensaje = document.getElementById("message");
const lista = document.getElementById("alumnos-list");
const total = document.getElementById("total-alumnos");
const titulo = document.getElementById("form-title");
const cancelar = document.getElementById("cancel-btn");

export function eventoFormulario(fn) {
  form.addEventListener("submit", fn);
}

export function eventoCancelar(fn) {
  cancelar.addEventListener("click", fn);
}

export function eventoLista(fn) {
  lista.addEventListener("click", fn);
}

export function obtenerDatosFormulario() {
  return {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    edad: Number(edad.value),
    email: email.value.trim(),
    comision: comision.value.trim(),
    activo: activo.checked
  };
}

export function obtenerIdEdicion() {
  return idAlumno.value;
}

export function mostrarMensaje(texto, tipo = "ok") {
  mensaje.textContent = texto;
  mensaje.className = `message ${tipo}`;
}

export function limpiarMensaje() {
  mensaje.textContent = "";
}

export function modoAgregar() {
  form.reset();
  idAlumno.value = "";
  activo.checked = true;
  cancelar.hidden = true;
  titulo.textContent = "Registrar Alumno";
}

export function modoEditar(alumno) {
  idAlumno.value = alumno.id;
  nombre.value = alumno.nombre;
  apellido.value = alumno.apellido;
  edad.value = alumno.edad;
  email.value = alumno.email;
  comision.value = alumno.comision;
  activo.checked = alumno.activo;
  cancelar.hidden = false;
  titulo.textContent = "Editar Alumno";
}

export function renderizarAlumnos(alumnos) {
  total.textContent = alumnos.length;

  lista.innerHTML = alumnos.map(alumno => `
    <tr>
      <td>${alumno.nombre}</td>
      <td>${alumno.apellido}</td>
      <td>${alumno.edad}</td>
      <td>${alumno.email}</td>
      <td>${alumno.comision}</td>
      <td>${alumno.activo ? "Activo" : "Inactivo"}</td>
      <td>
        <button data-action="edit" data-id="${alumno.id}">Editar</button>
        <button data-action="delete" data-id="${alumno.id}" class="warn">Eliminar</button>
      </td>
    </tr>
  `).join("");
}
