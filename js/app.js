//VARIABLES
const carrito = document.getElementById("carrito");
const curso = document.getElementById("lista-cursos");
const listaCurso = document.querySelector('#lista-carrito tbody');
const vaciarVarritoBtn = document.getElementById('vaciar-carrito');
//LISTENERS
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona AGREGAR CARRITO
    curso.addEventListener('click', compraCurso);

    //Cuando se elimina un curso en el carrito

    carrito.addEventListener('click', EliminarCurso);

    //Vaciar Carrito

    vaciarVarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, para mostrar localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);


}


//FUNCIONES

//funcion que agrega al carrito
function compraCurso(e) {

    e.preventDefault();

    //reacciona para agregar al carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

//Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };


    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
               <td>
                    <img src="${curso.imagen}" width=100 >
               </td>

               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td> 
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
     `;
    listaCurso.appendChild(row);
    guardarCursoLocalStorage(curso);

}


//Eliminar el curso del carrito en el DOM
function EliminarCurso(e) {
    e.preventDefault();

    let curso, cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();

        curso = e.target.preventDefault.parentElement.parentElement;

        cursoId = curso.querySelector('a').getAttribute('data-id');

    }
    eliminarCursosLocalStorage(curso);

    //EliminarCursoLocalStorage(curso);
}


//Vaciar Carrito en el DOM

function vaciarCarrito(e) {
    e.preventDefault();
    //forma lenta
    //   listaCurso.innerHTML="";
    //forma rapida
    while (listaCurso.firstChild) {
        listaCurso.removeChild(listaCurso.firstChild);
    }
    return false;

}

//Almacena cursos en el carrito al Local Storage
function guardarCursoLocalStorage(curso) {

    let cursos;

    //toma el valor de un arreglo con datos LS o vacio
    cursos = obtenerCursosLocalStorage();

    //El curso seleccionado se agrega en el arreglo
    cursos.puch(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//Comprueba que halla elementos en localStorage
function obtenerCursosLocalStorage() {
    let cursosLS;
    //Comprobamos si hay datos en el localstorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los cursos de localStorage en el carrito
function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso) {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>
                     <img src="${curso.imagen}" width=100 >
                </td>
 
                <td>${curso.titulo}</td>
                <td>${curso.precio}</td>
                <td> 
                     <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                </td>
           `;
        listaCurso.appendChild(row);

    });
}

//Elimina el curso por el ID en localStorage

function eliminarCursosLocalStorage(curso) {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(cursosLS, index) {
        if (cursosLS == curso) {
            cursosLS.splice(index, 1);
        }

    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}