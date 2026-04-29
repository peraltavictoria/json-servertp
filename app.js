import { listarAlumnos, agregarAlumno, editarAlumno, borrarAlumno } from "./api.js";
import {
  eventoFormulario,
  eventoCancelar,
  eventoLista,
  obtenerDatosFormulario,
  obtenerIdEdicion,
  mostrarMensaje,
  limpiarMensaje,
  modoAgregar,
  modoEditar,
  renderizarAlumnos
} from "./ui.js";
import { validarAlumno } from "./validators.js";

let alumnos = [];

async function cargarAlumnos() {
  limpiarMensaje();

  try {
    alumnos = await listarAlumnos();
    renderizarAlumnos(alumnos);
  } catch (error) {
    mostrarMensaje(error.message || "No se pudieron cargar los alumnos.", "error");
  }
}

async function guardarAlumno(event) {
  event.preventDefault();

  const datos = obtenerDatosFormulario();
  const errorValidacion = validarAlumno(datos);

  if (errorValidacion) {
    mostrarMensaje(errorValidacion, "error");
    return;
  }

  const id = obtenerIdEdicion();

  try {
    if (id) {
      await editarAlumno(id, {
        id: Number(id),
        ...datos
      });

      mostrarMensaje("Alumno actualizado correctamente.");
    } else {
      await agregarAlumno(datos);
      mostrarMensaje("Alumno agregado correctamente.");
    }

    modoAgregar();
    await cargarAlumnos();

  } catch (error) {
    mostrarMensaje(error.message || "No se pudo guardar el alumno.", "error");
  }
}

function cancelarEdicion() {
  modoAgregar();
  mostrarMensaje("Edición cancelada.");
}

async function accionesLista(event) {
  const boton = event.target.closest("button");
  if (!boton) return;

  const id = boton.dataset.id;
  const accion = boton.dataset.action;

  if (!id || !accion) return;

  if (accion === "edit") {
    const alumnoSeleccionado = alumnos.find(alumno => String(alumno.id) === String(id));

    if (!alumnoSeleccionado) {
      mostrarMensaje("No se encontró el alumno.", "error");
      return;
    }

    modoEditar(alumnoSeleccionado);
    limpiarMensaje();
    return;
  }

  if (accion === "delete") {
    const confirmar = confirm("¿Desea eliminar este alumno?");
    if (!confirmar) return;

    try {
      await borrarAlumno(id);

      mostrarMensaje("Alumno eliminado correctamente.");

      if (String(obtenerIdEdicion()) === String(id)) {
        modoAgregar();
      }

      await cargarAlumnos();

    } catch (error) {
      mostrarMensaje(error.message || "No se pudo eliminar el alumno.", "error");
    }
  }
}

eventoFormulario(guardarAlumno);
eventoCancelar(cancelarEdicion);
eventoLista(accionesLista);

modoAgregar();
cargarAlumnos();