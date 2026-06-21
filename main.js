const supabaseUrl = 'https://sygrgiapfwaxfhnqzxgn.supabase.co';
const supabaseKey = 'sb_publishable_jP2vJT6ZcYKI5ccoXWtGQQ_ft8H-VXQ';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let fechaReferencia = new Date();
const bloques = ["8-9", "9-10", "10-11", "11-12", "13-14", "14-15", "15-16", "16-17"];

document.addEventListener('DOMContentLoaded', () => {
    renderizarTablero();

    document.getElementById('fecha').addEventListener('change', cargarHorariosDisponibles);
    document.getElementById('form-registro').addEventListener('submit', registrarCita);
    document.getElementById('form-cancelar-cliente').addEventListener('submit', cancelarCliente);

    document.getElementById('prev-week').onclick = () => {
        fechaReferencia.setDate(fechaReferencia.getDate() - 7);
        renderizarTablero();
    };
    document.getElementById('next-week').onclick = () => {
        fechaReferencia.setDate(fechaReferencia.getDate() + 7);
        renderizarTablero();
    };
});

/* ── HU-01: Cargar horarios disponibles al seleccionar fecha ── */
async function cargarHorariosDisponibles(e) {
    const fecha = e.target.value;
    const hoy = new Date().toISOString().split('T')[0];

    if (fecha < hoy) {
        alert("No puedes elegir fechas pasadas");
        e.target.value = "";
        return;
    }

    const { data: ocupados } = await _supabase
        .from('citas')
        .select('horario')
        .eq('fecha', fecha)
        .neq('estado', 'cancelada');

    const listaOcupados = ocupados.map(o => o.horario);

    const select = document.getElementById('horario');
    select.innerHTML = '<option value="">Seleccionar Horario</option>';
    bloques
        .filter(h => !listaOcupados.includes(h))
        .forEach(h => {
            select.innerHTML += `<option value="${h}">${h}</option>`;
        });
}

/* ── HU-01: Registrar cita ── */
async function registrarCita(e) {
    e.preventDefault();

    const nombre  = document.getElementById('nombre').value;
    const carnet  = document.getElementById('carnet').value;
    const fecha   = document.getElementById('fecha').value;
    const horario = document.getElementById('horario').value;
    const celular = document.getElementById('celular').value;
    const email   = document.getElementById('email').value;

    if (!nombre || !carnet || !fecha || !horario || !celular || !email) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevaCita = {
        nombre_completo: nombre,
        carnet:          carnet,
        fecha:           fecha,
        horario:         horario,
        celular:         celular,
        email:           email,
        estado:          'programada'
    };

    const { error } = await _supabase.from('citas').insert([nuevaCita]);

    if (error) {
        alert("Error al registrar: " + error.message);
    } else {
        alert("¡Cita registrada exitosamente!");
        e.target.reset();
        document.getElementById('horario').innerHTML = '<option value="">Seleccionar Horario</option>';
        mostrarSeccion('tablero-section');
    }
}

/* ── HU-02: Renderizar tablero semanal ── */
async function renderizarTablero() {
    const lunes   = getMonday(fechaReferencia);
    const viernes = new Date(lunes);
    viernes.setDate(lunes.getDate() + 4);

    document.getElementById('fecha-actual-rango').innerText =
        `${lunes.toLocaleDateString()} - ${viernes.toLocaleDateString()}`;

    const { data: citas } = await _supabase
        .from('citas')
        .select('*')
        .gte('fecha', lunes.toISOString().split('T')[0])
        .lte('fecha', viernes.toISOString().split('T')[0]);

    const body = document.getElementById('calendario-body');
    body.innerHTML = "";

    bloques.forEach(hora => {
        let fila = `<tr><td>${hora}</td>`;
        for (let i = 0; i < 5; i++) {
            const d    = new Date(lunes);
            d.setDate(lunes.getDate() + i);
            const fStr = d.toISOString().split('T')[0];
            const cita = citas?.find(c => c.fecha === fStr && c.horario === hora);
            fila += `<td>${cita ? generarCitaHTML(cita) : ""}</td>`;
        }
        body.innerHTML += fila + `</tr>`;
    });
}

/* ── HU-02: Generar HTML de una cita en el tablero ── */
function generarCitaHTML(cita) {
    let clases = 'cita-box';
    if (cita.estado === 'cancelada_en_curso') clases += ' cita-en-curso-cancelada';
    if (cita.estado === 'cancelada')          clases += ' cita-cancelada';

    return `
        <div class="${clases}">
            ${cita.nombre_completo}<br>${cita.celular}
            <br>
            <button class="btn-repro"       onclick="reprogramar(${cita.id})">📅</button>
            <button class="btn-cancel-psi"  onclick="cancelarPsi(${cita.id}, '${cita.fecha}', '${cita.horario}')">❌</button>
        </div>
    `;
}

/* ── HU-03: Cancelar cita por cliente ── */
async function cancelarCliente(e) {
    e.preventDefault();

    const carnet  = document.getElementById('cancel-carnet').value;
    const fecha   = document.getElementById('cancel-fecha').value;
    const horario = document.getElementById('cancel-horario').value;
    const hoy     = new Date().toISOString().split('T')[0];

    if (fecha === hoy) {
        alert("No se puede cancelar el mismo día");
        return;
    }

    const { data } = await _supabase
        .from('citas')
        .update({ estado: 'cancelada' })
        .eq('carnet', carnet)
        .eq('fecha', fecha)
        .eq('horario', horario)
        .select();

    if (data && data.length > 0) {
        alert("Cita cancelada exitosamente");
        e.target.reset();
    } else {
        alert("No se encontró la cita");
    }

    renderizarTablero();
}

/* ── HU-04: Reprogramar cita (psicólogo) ── */
async function reprogramar(id) {
    const nf = prompt("Nueva fecha (YYYY-MM-DD):");
    const nh = prompt("Nuevo horario (ej: 9-10):");
    if (nf && nh) {
        await _supabase
            .from('citas')
            .update({ fecha: nf, horario: nh, estado: 'reprogramada' })
            .eq('id', id);
        renderizarTablero();
    }
}

/* ── HU-05: Cancelar cita por psicólogo (detecta si está en curso) ── */
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

/* ── Utilidad: navegación entre secciones ── */
function mostrarSeccion(idSeccion) {
    const secciones = ['registro-section', 'cancelar-cliente-section', 'tablero-section'];
    secciones.forEach(id => {
        document.getElementById(id).style.display = (id === idSeccion) ? 'block' : 'none';
    });
    if (idSeccion === 'tablero-section') {
        renderizarTablero();
    }
}

/* ── Utilidad: obtener el lunes de la semana ── */
function getMonday(d) {
    d = new Date(d);
    const day  = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

/* ── Exponer funciones al scope global (requerido para onclick en HTML) ── */
window.mostrarSeccion = mostrarSeccion;
window.reprogramar    = reprogramar;
window.cancelarPsi    = cancelarPsi;
window._supabase      = _supabase;