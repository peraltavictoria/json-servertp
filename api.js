const API_URL = "http://localhost:3000/alumnos";

export async function listarAlumnos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function agregarAlumno(alumno) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alumno)
  });
  return await res.json();
}

export async function editarAlumno(id, alumno) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alumno)
  });
  return await res.json();
}

export async function borrarAlumno(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
