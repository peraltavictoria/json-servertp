const API_URL = "http://localhost:3000/alumnos";

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Error al conectar con la base de datos.");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export async function listarAlumnos() {
  return await request(API_URL);
}

export async function agregarAlumno(alumno) {
  return await request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(alumno)
  });
}

export async function editarAlumno(id, alumnoActualizado) {
  return await request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(alumnoActualizado)
  });
}

export async function borrarAlumno(id) {
  return await request(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
