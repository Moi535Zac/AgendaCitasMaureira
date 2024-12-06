// Clase Paciente
class Paciente {
    constructor(rutPaciente, nombrePaciente, fechaAtencion, horaAtencion) {
        this.rutPaciente = rutPaciente;
        this.nombrePaciente = nombrePaciente;
        this.fechaAtencion = fechaAtencion;
        this.horaAtencion = horaAtencion;
    }

    // Método para crear una fila de la tabla
    crearFila() {
        const tr = document.createElement("tr");

        // Crear las celdas (td)
        const tdRut = document.createElement("td");
        tdRut.innerText = this.rutPaciente;

        const tdNombre = document.createElement("td");
        tdNombre.innerText = this.nombrePaciente;

        const tdFecha = document.createElement("td");
        tdFecha.innerText = this.fechaAtencion;

        const tdHora = document.createElement("td");
        tdHora.innerText = this.horaAtencion;

        const tdAcciones = document.createElement("td");

        // Crear botón Eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => this.eliminarPaciente());

        // Crear botón Modificar
        const botonModificar = document.createElement("button");
        botonModificar.innerText = "Modificar";
        botonModificar.addEventListener("click", () => this.modificarPaciente());

        // Agregar los botones a la celda de acciones
        tdAcciones.appendChild(botonEliminar);
        tdAcciones.appendChild(botonModificar);

        // Agregar las celdas a la fila (tr)
        tr.append(tdRut, tdNombre, tdFecha, tdHora, tdAcciones);
        return tr;
    }

    // Método para eliminar un paciente
    eliminarPaciente() {
        const index = pacientes.findIndex(p => p.rutPaciente === this.rutPaciente);
        if (index !== -1) {
            pacientes.splice(index, 1); // Eliminar de la lista
            renderizarTabla(); // Volver a renderizar la tabla
        }
    }

    // Método para modificar un paciente
    modificarPaciente() {
        // Llenar los campos del formulario con los datos del paciente
        document.getElementById("nombrePaciente").value = this.nombrePaciente;
        document.getElementById("rutPaciente").value = this.rutPaciente;
        document.getElementById("fechaAtencion").value = this.fechaAtencion;
        document.getElementById("horaAtencion").value = this.horaAtencion;

        // Cambiar el texto del botón a "Guardar cambios"
        document.querySelector("form button").innerText = "Guardar Cambios";

        // Añadir un atributo temporal para saber qué paciente estamos modificando
        document.getElementById("formAgregarCita").dataset.modificarRut = this.rutPaciente;
    }
}

// Arreglo para almacenar los pacientes
let pacientes = [];

// Referencias a los elementos del DOM
const formAgregarCita = document.getElementById("formAgregarCita");
const tablaPacientes = document.getElementById("tablaPacientes");

// Función para agregar o modificar una cita
function agregarOmodificarCita(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombrePaciente = document.getElementById("nombrePaciente").value;
    const rutPaciente = document.getElementById("rutPaciente").value;
    const fechaAtencion = document.getElementById("fechaAtencion").value;
    const horaAtencion = document.getElementById("horaAtencion").value;

    // Comprobar si estamos modificando una cita existente
    const rutModificar = formAgregarCita.dataset.modificarRut;

    if (rutModificar) {
        // Buscar el paciente en la lista
        const pacienteModificado = pacientes.find(p => p.rutPaciente === rutModificar);

        if (pacienteModificado) {
            // Actualizar los datos del paciente
            pacienteModificado.nombrePaciente = nombrePaciente;
            pacienteModificado.fechaAtencion = fechaAtencion;
            pacienteModificado.horaAtencion = horaAtencion;

            // Limpiar el atributo temporal
            delete formAgregarCita.dataset.modificarRut;

            // Cambiar el texto del botón a "Agregar Cita"
            document.querySelector("form button").innerText = "Agregar Cita";
        }
    } else {
        // Crear una nueva cita si no estamos modificando
        const nuevoPaciente = new Paciente(rutPaciente, nombrePaciente, fechaAtencion, horaAtencion);
        pacientes.push(nuevoPaciente);
    }

    // Limpiar el formulario
    formAgregarCita.reset();

    // Renderizar la tabla con los pacientes actualizados
    renderizarTabla();
}

// Función para renderizar la tabla de pacientes
function renderizarTabla() {
    // Limpiar la tabla antes de agregar los nuevos datos
    tablaPacientes.innerHTML = "";

    // Recorrer los pacientes y agregar una fila por cada uno
    pacientes.forEach(paciente => {
        const filaPaciente = paciente.crearFila();
        tablaPacientes.appendChild(filaPaciente);
    });
}

// Evento para manejar el envío del formulario
formAgregarCita.addEventListener("submit", agregarOmodificarCita);

// Inicializar la tabla vacía
renderizarTabla();
