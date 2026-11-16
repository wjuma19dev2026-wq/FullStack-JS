# Reglas del Proyecto

## Registro Automático de Consultas (`agy_logs.md`)

- En **cada interacción o consulta** que realice el usuario, el asistente debe actualizar automáticamente el archivo `agy_logs.md` ubicado en la raíz del proyecto antes de finalizar la respuesta.
- Cada entrada debe agregarse al final del archivo con el siguiente formato:
  - `## Consulta #N` (con numeración incremental correlativa).
  - Fecha y hora de la consulta (`- **Fecha/Hora:** ...`).
  - Consulta original del usuario (`- **Consulta:** > ...`).
  - Sección `### Diagnóstico y Resultado:` detallando las acciones realizadas, archivos modificados y el resultado proporcionado.
- No sobreescribir las consultas anteriores; siempre añadir al final manteniendo el separador horizontal `---`.
