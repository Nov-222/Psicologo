# Psicologo---Taller-de-Software-I

Enlace de Figma: https://www.figma.com/design/yxYu4kVKuvAHhxLMz1CDve/TS?node-id=0-1&t=Ff2IOxHUwUWb7TGz-1

# Planteamiento
# Análisis del Problema de Nuestro Psicólogo de confianza (Kishou Arima)
# Descripción del problema
El señor Arima, un psicólogo que cuenta con su consultorio, está sufriendo de pérdidas de ingreso a través de su sistema de gestión de citas a través de whatsapp, debido a que ser una administración manual, el cliente por el sobreesfuerzo de administrarlo solo, llega a registrar dos de sus clientes en una misma cita, llega a olvidar registrar algunas citas y también de registrar los cambios en caso de que su cliente cancele las citas o cambie la fecha, por ello se requiere un software que mejore la administración de citas en su sistema prediseñado.
 
# Contexto
El software será utilizado por el señor Arima, manteniendo el sistema prediseñado (el señor utiliza un sistema que consiste en whatsapp, el recibe a través de mensaje directo la solicitudes de consultas) y adaptándolo para que este pueda visualizar sus citas de manera coherente y evitar errores de duplicidad de citas, se refiere a que no se puede reservar una cita en el horario de una ya programada, para evitar pérdidas.

# Usuario / Cliente
Administrador: Es el usuario utilizado por el señor Arima, este debe ser capaz de tener todo el control del software al visualizar, editar, crear y eliminar sus citas.
Cliente (personas con necesidad del servicio de el señor Arima): Estos usuarios tendrán la capacidad de registrar o cancelar su cita.

# Objetivo del sistema 
El software debe permitir que se puedan administrar citas de manera más coherente, se refiere a que el sistema debe permitir registrar, cancelar y editar una cita, a la vez que el administrador pueda visualizar todas las citas de manera intuitiva.

Para ello se implementarán las siguientes tecnologías: Supabase como base de datos, el frontend será desarrollado con JS Vanilla, HTML y CSS.

# Alcance del sistema
Incluye:
* Un sistema visual de la semana en cual se visualizan las citas de 8 am a 12 am y de 13 pm a 17 pm.
* Un formulario para registrar una cita con duración de una hora.
* Cancelar una cita a través del sistema visual.
* Cancelar una cita a través del carnet del cliente.
* Editar una cita a través del sistema visual.

No incluye:
* Un chatbot para whatsapp.

# Requerimientos funcionales
* El software registrará una cita con los siguientes campos (nombre, carnet, fecha, horario, número de celular y email).
* El sistema permite editar los siguientes campos de una consulta registrada (fecha, horario) a través del módulo de reprogramación.
* El sistema permite cancelar cualquier consulta siempre y cuando no sea el mismo día por parte del cliente, o con marcas especiales por el psicólogo.
* El sistema se visualizará a través de un calendario de semana con separaciones de una hora y en caso de tener una cita registrada, se visualizará el nombre del cliente y su número de contacto.

# Requerimientos no funcionales
* No se debe poder registrar una cita en la hora de otra cita registrada.
* Se debe respetar el horario de reservas (8-9, 9-10, 10-11, 11-12, 13-14, 14-15, 15-16, 16-17).
* Todos los campos al registrar una cita deben ser obligatorios.

# Supuestos y restricciones
Supuestos:
* Asumimos que los clientes son capaces de llenar un formulario de manera intuitiva.
* Asumimos que el administrador realiza de manera manual el envío de mensajes de registro de citas a sus clientes.
* Asumimos que el administrador siempre estará atento al software en caso de que cancelen o registren una cita.

Restricciones:
* Se debe considerar que el hardware del administrador carece de la potencia para tener una base de datos de manera local.

# Priorización
Se debe priorizar el registro de citas, la visualización de citas y poder cancelar una cita, siguiendo el siguiente flujo: cliente quiere registrar una cita -> cita registrada exitosamente -> cita se puede visualizar en el software -> cliente tiene inconveniente y necesita cancelar la cita -> la cita es cancelada y se visualiza como apagada en el software, una vez finalizado el flujo se procede a los complementarios (editar cita y entre otros).

---

# Especificación de Historias de Usuario (HU)

### HU1: Registro de Cita 
**Como** Cliente del Psicologo  
**Quiero** Registrar una cita seleccionando mis datos personales, fecha y un bloque de horario disponible  
**Para** registar mi cita

* **C.A. 1 (Happy Path):** Dado que el cliente ingresa un nombre válido, carnet, celular, email, una fecha futura y selecciona un horario de la lista de bloques disponibles; cuando presione el botón "Registrar Cita", entonces el sistema insertará el registro en Supabase con el estado `'programada'`, mostrará una alerta de éxito, limpiará el formulario y redireccionará automáticamente a la sección del tablero.
* **C.A. 2 (Caso Borde):** Dado que el cliente llena todos los datos obligatorios y selecciona una fecha válida posterior a la actual; cuando elige el último bloque disponible de la tarde, entonces el sistema debe procesar la inserción de forma correcta en Supabase, permitiendo visualizar la cita en la última fila del tablero semanal sin desbordes estructurales.
* **C.A. 3 (Caso Inválido):** Dado que el cliente deja uno o más campos vacíos del formulario (ej. no ingresa el celular o no selecciona un horario); cuando presione el botón de enviar, entonces el sistema solicitara que se llenen los campos vacios.
* **C.A. 4 (Caso Inválido):** Dado que el cliente interactúa con el selector de fecha del formulario de registro; cuando intente seleccionar o ingresar una fecha cronológicamente anterior al día de hoy, entonces el sistema disparará una alerta informando que no puede elegir una fecha pasada.

### HU2: Visualización del Tablero de Control Semanal 
**Como** Psicólogo e  
**Quiero** Visualizar un calendario organizado por horas y días de la semana (Lunes a Viernes)  
**Para** Conocer la distribución de las citas.  

* **C.A. 1 (Happy Path):** Dado que el usuario accede a la sección del tablero; cuando se renderize la pantalla, entonces el sistema permitira visualizar todas las citas activas.
* **C.A. 2 (Caso Borde):** Dado que el usuario hace uso de los controles de navegación superior (`← Anterior Semana` o `Siguiente Semana →`); cuando se presione el botón correspondiente, entonces el sistema rederizara la semana solicitada.
* **C.A. 3 (Caso Inválido):** Dado que la base de datos Supabase contenga registros de citas agendadas por error en días Sábados o Domingos; cuando el sistema renderize la pantalla, entonces el componente visual omitirá renderizar estas celdas, garantizando que el diseño del tablero mantenga estrictamente el formato laboral de Lunes a Viernes sin alterar la interfaz.
* **C.A. 4 (Caso Inválido):** Dado que no exista registro de alguna cita, cuando el tablero intente renderizarse, entonces el sistema generara el cronograma con las celdas vacias.

### HU3: Cancelación de Cita por el Cliente
**Como** Cliente del consultorio  
**Quiero** Cancelar una cita previamente agendada mediante mi número de carnet, fecha y hora  
**Para** Liberar el bloque horario en caso de un imprevisto personal  

* **C.A. 1 (Happy Path):** Dado que un cliente ingresa su carnet correcto, una fecha válida posterior al día de hoy y el horario exacto de su cita; cuando presione el botón "Cancelar Cita", entonces el sistema eliminara la cita registrada y mostrará una alerta de que fue cancelada exitosamente.
* **C.A. 2 (Caso Borde):** Dado que la cita está programada exactamente para el día de mañana; cuando el cliente intente realizar la cancelación a través del formulario de clientes, entonces el sistema procedera con normalidad.
* **C.A. 3 (Caso Inválido):** Dado que el cliente ingresa una fecha de cancelación que coincide exactamente con la fecha del día de hoy cuando presione enviar, entonces el sistema lanzará una alerta avisando "No se puede cancelar el mismo día".
* **C.A. 4 (Caso Inválido):** Dado que el cliente proporciona un número de carnet erróneo, o una combinación de fecha y hora que no coinciden con ningún registro activo; cuando se ejecute la petición de cancelacion, entonces el sistema indicara que no se encontró la cita.
