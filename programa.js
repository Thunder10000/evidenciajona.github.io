class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
}

class Nombre extends CustomError {
    constructor(message) {
        super(message, "FALLA GRAVE");
    }
}

class Profesion extends CustomError {
    constructor(message) {
        super(message, "FALLA MALA");
    }
}

class ID extends CustomError {
    constructor(message) {
        super(message, "FALLA HORRIBLE");
    }
}

const Registros = [
    { id: 'a', nombre: "Juan", apellido: "Perez", edad: 66, profecion: "Ing Mecanico" },
    { id: 2, nombre: "Sofía", apellido: "Rodríguez", edad: 22, profecion: "Lic Marketing Digital" },
    { id: 3, nombre: "Mariana", apellido: "García", edad: 33, profecion: "Ing Sistemas Computacionales" },
    { id: 4, nombre: null, apellido: "Martínez", edad: 18, profecion: "Ing Industrial" },
    { id: 5, nombre: "Valentina", apellido: "Gómez", edad: 26, profecion: "Lic Derecho" },
    { id: 6, nombre: "Alejandro", apellido: "Flores", edad: 17 },
];

document.getElementById('searchBtn').addEventListener('click', () => {
    const inputId = document.getElementById('inputId').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    try {
        if (!inputId) throw new ID('se debe ingresar un id valido');

        const record = Registros.find(item => item.id == inputId);
        if (!record) throw new ID('No hay id con ese registro');
        if (typeof record.id !== 'number' && isNaN(Number(record.id))) throw new ID('El ID no es un número');
        if (!record.nombre) throw new Nombre('nombre nulo');
        if (!('profecion' in record)) throw new Profesion('no se definio la profesion');

        resultDiv.innerHTML = `
            <p><strong>ID:</strong> ${record.id}</p>
            <p><strong>Nombre:</strong> ${record.nombre}</p>
            <p><strong>Apellido:</strong> ${record.apellido}</p>
            <p><strong>Edad:</strong> ${record.edad}</p>
            <p><strong>Profeción:</strong> ${record.profecion}</p>
        `;
    } catch (error) {
        if (error instanceof ID || error instanceof Nombre || error instanceof Profesion) {
            errorDiv.textContent = error.message;
        } else {
            errorDiv.textContent = 'EL TRABAJO YA FALLO';
        }
    }
});
