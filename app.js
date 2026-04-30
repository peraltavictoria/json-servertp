console.log("APP CARGADA");


import { listarAlumnos, agregarAlumno, editarAlumno, borrarAlumno } from "../js/api.js";
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
} from "../js/ui.js";
import { validarAlumno } from "../js/validators.js";

let alumnos = [];

async function cargarAlumnos() {
  try {
    alumnos = await listarAlumnos();
    renderizarAlumnos(alumnos);
  } catch (error) {
    mostrarMensaje("Error al cargar alumnos", "error");
  }
}

async function guardarAlumno(e) {
  e.preventDefault();

  const datos = obtenerDatosFormulario();
  const error = validarAlumno(datos);

  if (error) {
    mostrarMensaje(error, "error");
    return;
  }

  const id = obtenerIdEdicion();

  try {
    if (id) {
      await editarAlumno(id, { ...datos, id });
      mostrarMensaje("Alumno actualizado ✓", "ok");
    } else {
      await agregarAlumno(datos);
      mostrarMensaje("Alumno agregado ✓", "ok");
    }

    modoAgregar();
    await cargarAlumnos();

  } catch (err) {
    console.error("Error al guardar:", err);
    mostrarMensaje("Error al guardar. ¿Está corriendo json-server?", "error");
  }
}

async function accionesLista(e) {
  const boton = e.target.closest("button");
  if (!boton) return;

  const id = boton.dataset.id;
  const accion = boton.dataset.action;

  if (accion === "edit") {
    const alumno = alumnos.find(a => String(a.id) === String(id));
    if (alumno) modoEditar(alumno);
  }

  if (accion === "delete") {
    if (!confirm("¿Eliminar alumno?")) return;

    try {
      await borrarAlumno(id);
      mostrarMensaje("Alumno eliminado ✓", "ok");
      modoAgregar();
      await cargarAlumnos();
    } catch (err) {
      console.error("Error al eliminar:", err);
      mostrarMensaje("Error al eliminar", "error");
    }
  }
}

eventoFormulario(guardarAlumno);
eventoCancelar(modoAgregar);
eventoLista(accionesLista);

modoAgregar();
cargarAlumnos();
