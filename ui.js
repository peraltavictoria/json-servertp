const form = document.getElementById("alumno-form");
const tituloForm = document.getElementById("form-title");

const idAlumno = document.getElementById("alumno-id");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const comision = document.getElementById("comision");
const activo = document.getElementById("activo");

const btnCancelar = document.getElementById("cancel-btn");
const mensaje = document.getElementById("message");
const lista = document.getElementById("alumnos-list");
const total = document.getElementById("total-alumnos");

export function eventoFormulario(callback) {
  form.addEventListener("submit", callback);
}

export function eventoCancelar(callback) {
  btnCancelar.addEventListener("click", callback);
}

export function eventoLista(callback) {
  lista.addEventListener("click", callback);
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
  mensaje.className = "message";
}

export function modoAgregar() {
  form.reset();
  idAlumno.value = "";
  activo.checked = true;
  tituloForm.textContent = "Registrar Alumno";
  btnCancelar.hidden = true;
}

export function modoEditar(alumno) {
  idAlumno.value = alumno.id;
  nombre.value = alumno.nombre;
  apellido.value = alumno.apellido;
  edad.value = alumno.edad;
  email.value = alumno.email;
  comision.value = alumno.comision;
  activo.checked = alumno.activo;

  tituloForm.textContent = "Editar Alumno";
  btnCancelar.hidden = false;
}

export function renderizarAlumnos(alumnos) {
  total.textContent = `Total: ${alumnos.length}`;

  if (alumnos.length === 0) {
    lista.innerHTML = `
      <tr>
        <td colspan="7">No hay alumnos registrados.</td>
      </tr>
    `;
    return;
  }

  lista.innerHTML = alumnos.map(alumno => `
    <tr>
      <td>${alumno.nombre}</td>
      <td>${alumno.apellido}</td>
      <td>${alumno.edad}</td>
      <td>${alumno.email}</td>
      <td>${alumno.comision}</td>
      <td>
        <span class="status ${alumno.activo ? "on" : "off"}">
          ${alumno.activo ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td>
        <div class="action-buttons">
          <button type="button" data-action="edit" data-id="${alumno.id}">
            Editar
          </button>
          <button type="button" class="warn" data-action="delete" data-id="${alumno.id}">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}
