import { CONSOLE_API_META } from "./ConsoleAPI/data";

export const API_GRUPOS = [CONSOLE_API_META];

export const getApiGrupo = (id) =>
  API_GRUPOS.find((grupo) => grupo.id === id) ?? null;
