export function buildSearchIndex(
  carreras,
  {
    metodos = [],
    docIds = new Set(),
    metodosCareerId = "programacion",
    metodosCourseId = "lenguajes",
  } = {},
) {
  const index = [];

  for (const carrera of carreras) {
    index.push({
      id: `carrera:${carrera.id}`,
      type: "carrera",
      careerId: carrera.id,
      title: carrera.nombre,
      subtitle: `${carrera.cursos.length} temas`,
      icon: carrera.emoji,
      keywords: `${carrera.categoria} ${carrera.tags?.join(" ") || ""}`,
    });

    for (const curso of carrera.cursos) {
      index.push({
        id: `curso:${carrera.id}:${curso.id}`,
        type: "curso",
        careerId: carrera.id,
        courseId: curso.id,
        title: curso.nombre,
        subtitle: carrera.nombre,
        icon: curso.icon || "📄",
        keywords: `${carrera.nombre} ${curso.nivel || ""}`,
      });
    }
  }

  for (const grupo of metodos) {
    for (const metodo of grupo.metodos) {
      index.push({
        id: `metodo:${metodo.id}`,
        type: "metodo",
        careerId: metodosCareerId,
        courseId: metodosCourseId,
        methodId: metodo.id,
        title: metodo.nombre,
        subtitle: `${grupo.seccion} · Lenguajes de Programación`,
        icon: metodo.icon,
        keywords: `${metodo.firma} ${grupo.seccion} array arreglo metodo metodos method methods javascript js`,
        hasDoc: docIds.has(metodo.id),
      });
    }
  }

  return index;
}
