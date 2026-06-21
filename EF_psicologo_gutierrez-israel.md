# EF — Reporte de Proyecto
**Estudiante:** Gutierrez Lara Israel
**Proyecto:** Citas Psicológicas
**Repositorio:** [URL del repositorio](https://github.com/Nov-222/Psicologo)
**Fecha de entrega:** 20/06/2026

> **USO DE IA PROHIBIDO.** Cualquier evidencia de uso de IA (ChatGPT, Copilot, Claude, u otras) anula el examen completo — los 3 proyectos reciben nota 0.

> Usar este template una vez por proyecto. Entregar 3 archivos:
> - `EF_psicologia_apellido-nombre.md`

---

## Sección 1 — Deploy

**URL del proyecto:** [URL pública](https://psicologo-yup3.onrender.com)
**Swagger / API:** No aplica

> Captura del proyecto corriendo con datos reales:

![Deploy en producción](capturas/psicologo-deploy.png)

---

## Sección 2 — Pruebas con TDD + cobertura

### Cobertura inicial (0%)

**Herramienta:** [vitest]

> Captura del reporte de cobertura antes de escribir pruebas nuevas:

![Cobertura inicial](capturas/psicologo-cobertura-inicial.png)

---

### Ciclo TDD — Prueba 1
- No se completo

---

### Ciclo TDD — Prueba 2
- No se completo

---

### Ciclo TDD — Prueba 3
- No se completo

---

### Cobertura final

**Cobertura alcanzada:** 0%

> Captura del reporte de cobertura final:

![Cobertura final](capturas/psicologo-cobertura-inicial.png)

> Si la cobertura es <50%, pegar aquí la justificación enviada al docente:

No se ha realizado este trabajo, si pregunta respecto a simular porque no se completo, seria la complejidad del codigo, este ha sido desarrollado tan deficientemente que es dificil de leer, por lo que inicialmente se propuso realizar una refactorizacion total, sin embargo solo se realizo el primer code smell de la Seccion 3.

---

## Sección 3 — Code smells corregidos

Mínimo 3 nuevos (adicionales a los del EC2).

| # | Tipo | Commit | Descripción |
|---|---|---|---|
| 1 | [Codigo Duplicado] | No se completo | [Antes: Codigo Duplicado → Después: Funcion Reutilizable] |
| 2 | [No se completo] | No se completo | [Antes: X → Después: Y] |
| 3 | [No se completo] | No se completo | [Antes: X → Después: Y] |

### Detalle — Smell 1: [Codigo Duplicado]

**Código antes:**
```csharp / typescript
async function cancelarPsi(id, f, h) {
    const ahora  = new Date();
    const hoy    = ahora.toISOString().split('T')[0];
    const hInicio = parseInt(h.split('-')[0]);

    if (f === hoy && ahora.getHours() >= hInicio) {
        alert("La cita está en curso — se marcará con borde rojo.");
        await _supabase //Codigo Duplicado
            .from('citas') //Codigo Duplicado
            .update({ estado: 'cancelada_en_curso' }) //Codigo Duplicado
            .eq('id', id); //Codigo Duplicado
    } else {
        await _supabase //Codigo Duplicado
            .from('citas') //Codigo Duplicado
            .update({ estado: 'cancelada' }) //Codigo Duplicado
            .eq('id', id); //Codigo Duplicado
    }
    renderizarTablero();
}

```

**Código después:**
```csharp / typescript
async function cancelarPsi(id, f, h) {
    const ahora  = new Date();
    const hoy    = ahora.toISOString().split('T')[0];
    const hInicio = parseInt(h.split('-')[0]);

    if (f === hoy && ahora.getHours() >= hInicio) {
        alert("La cita está en curso — se marcará con borde rojo.");
        await ActualizarEstadoCita('cancelada_en_curso', id)
    } else {
        await ActualizarEstadoCita('cancelada', id)
    }
    renderizarTablero();
}

async function ActualizarEstadoCita(estadocita, Idcita){
    await _supabase
            .from('citas')
            .update({ estado: estadocita })
            .eq('id', Idcita);
}
```

---

### Detalle — Smell 2: [Tipo]

- No se completo

---

### Detalle — Smell 3: [Tipo]

- No se completo

---

## Sección 4 — Trazabilidad HU → CA → test

| # | Historia de Usuario | Criterio de Aceptación | Prueba que valida ese CA | Commit |
|---|---|---|---|---|
| 1 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | No se completo |
| 2 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | No se completo |
| 3 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | No se completo |

### Cadena 1 — [Nombre HU]

- No se completo

---

### Cadena 2 — [Nombre HU]

- No se completo

---

### Cadena 3 — [Nombre HU]

- No se completo
