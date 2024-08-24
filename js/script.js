const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener("click", eliminarCurso);
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML();
    });
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
        productoAgregado(curso);
    }
}

function productoAgregado(curso) {
    const alert = document.createElement("H4");
    alert.style.cssText = "background-color: #46d510; color: black; text-align: center;";
    alert.style.margin = "0px ";
    alert.textContent = 'Añadido al carrito';
    curso.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();


        errorMessage.textContent = '';
        successMessage.textContent = '';

        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            errorMessage.textContent = 'El campo de correo electrónico no puede estar vacío.';
            return;
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
            return;
        }

        successMessage.textContent = '¡Correo electrónico enviado exitosamente!';

    });
});
