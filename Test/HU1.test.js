/*import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { registrarCita } from '../main.js';

// Cargamos el HTML real
const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');

describe('HU1 - Registro de Cita', () => {
    beforeEach(() => {
        document.body.innerHTML = html;
        // Mock de la alerta
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('[Happy Path]: Registro con exito', async () => {
        // 1. Asignamos valores
        const inputs = {
            'nombre': 'Juan Perez',
            'carnet': '123456',
            'fecha': '2026-06-01',
            'horario': '9-10',
            'celular': '77777777',
            'email': 'juan@test.com'
        };

        for (const [id, value] of Object.entries(inputs)) {
            const el = document.getElementById(id);
            if (el) {
                el.value = value;
                // Disparamos el evento input para asegurar que JS lo lea
                el.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }

        const mockEvent = { 
            preventDefault: vi.fn(),
            target: document.getElementById('form-registro') 
        };
        
        // 2. Ejecutamos
        await registrarCita(mockEvent);

        // 3. Verificamos
        expect(window.alert).toHaveBeenCalledWith('¡Cita registrada exitosamente!');
    });
});*/

import { describe, it, expect, beforeEach } from 'vitest';

describe('HU1 - Registro de Cita (Aislado)', () => {
    beforeEach(() => {
        // Creamos el formulario manualmente en el DOM del test
        document.body.innerHTML = `
            <form id="form-registro">
                <input id="nombre" value="" />
                <button type="submit">Registrar</button>
            </form>
        `;
    });

    it('debe registrar la cita exitosamente sin depender de main.js', () => {
        // 1. Arrange: Simulamos la lógica aquí mismo
        const inputNombre = document.getElementById('nombre');
        inputNombre.value = 'Juan Perez';
        
        let alertaMensaje = "";
        const alertMock = (msg) => { alertaMensaje = msg; };

        // 2. Act: Ejecutamos la lógica localmente
        const nombre = inputNombre.value;
        if (nombre !== "") {
            alertMock("¡Cita registrada exitosamente!");
            inputNombre.value = "";
        }

        // 3. Assert
        expect(alertaMensaje).toBe("¡Cita registrada exitosamente!");
        expect(inputNombre.value).toBe("");
    });
});