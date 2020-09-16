/*
El problema a resolver consiste en que tenemos un gimnasio y el mismo cuenta con un sistema de entrada, en el que se debe verificar si los miembros están habilitados a ingresar al establecimiento.
Los miembros que ya se encuentran registrados se almacenan en un array de objetos que declaramos como "listaMiembros" y cada uno cuenta con las siguientes propiedades: nombre, dni, email y vencimiento.

CONSIGNAS
1 - Crear la estructura HTML y la funcionalidad en JS necesarias para poder agregar nuevos miembros del gimnasio al listado de miembros.
2 - Crear toda la estructura HTML y la funcionalidad en JS necesarias para ingresar el nombre de un miembro del gimnasio y que muestre en pantalla un mensaje que confirme si está habilitado a ingresar o tiene su suscripción vencida.

PUNTOS EXTRA SI:
1 - Modificar los datos de una persona en la lista de miembros.
2 - Eliminar una persona de la lista de miembros.
3 - Incorporar CSS para mejorar la UI de la app.
*/

let listaMiembros = [{
        "nombre": "Juan Pérez",
        "dni": 12312312,
        "email": "juanperez@gmail.com",
        "vencimiento": "2020-09-10"
    },
    {
        "nombre": "Manjula Pérez",
        "dni": 36936936,
        "email": "manjulaperez@gmail.com",
        "vencimiento": "2020-09-10"
    },
    {
        "nombre": "Pablo Pérez",
        "dni": 45645645,
        "email": "pabloperez@gmail.com",
        "vencimiento": "2020-09-10"
    },
    {
        "nombre": "Cristina Pérez",
        "dni": 789789789,
        "email": "cristinaperez@gmail.com",
        "vencimiento": "2020-09-10"
    },
    {
        "nombre": "María Pérez",
        "dni": 14714714,
        "email": "mariaperez@gmail.com",
        "vencimiento": "2020-09-10"
    }
];



let $formAgregarMiembro = document.querySelector('#agregarMiembro');

$formAgregarMiembro.addEventListener('submit', function (e) {
    e.preventDefault();

    let $campos = document.querySelectorAll('#agregarMiembro input:not([type=submit])');



    let miembro = {
        nombre: $campos[0].value,
        dni: $campos[1].value,
        email: $campos[2].value,
        vencimiento: $campos[3].value
    };

    listaMiembros.push(miembro);

    $msgAgregar = document.querySelector('#mensaje');
    $msgAgregar.innerHTML = 'El miembro se agregó correctamente';
    crearSelect();
    $formAgregarMiembro.reset();

});

$formVerificar = document.querySelector('#verificarMiembro');
$mensajeVerificar = document.querySelector('#mensajeVerificar');

$formVerificar.addEventListener('submit', function (e) {
    e.preventDefault();

    let $dni = document.querySelector('#documento').value;

    let miembro = listaMiembros.find(function (miembro) {
        return $dni == miembro.dni;
    });

    if (miembro == null) {
        $mensajeVerificar.innerHTML = 'El miembro no existe';
        return false;
    }

    let hoy = new Date();
    let fechaVencimiento = new Date(`${miembro.vencimiento} 00:00`);


    if (hoy <= fechaVencimiento) {
        $mensajeVerificar.innerHTML = 'la suscripción está habilitada';
    } else {
        $mensajeVerificar.innerHTML = 'la suscripción está vencida';
    }

})

function crearSelect() {
    let nombresMiembros = listaMiembros.map(function (miembro) {
        return miembro.nombre;
    })

    let $selectNombres = document.querySelector('#selectMiembros');
        $selectNombres.innerHTML = '<option value="">Seleccioná un miembro</option>';
        nombresMiembros.forEach(function (nombre) {
        $option = document.createElement('option');
        $option.value = nombre;
        $option.innerHTML = nombre;

        $selectNombres.appendChild($option);
    })
}

crearSelect();

$formularioModificar = document.querySelector('#modificarMiembro');
$mensajeModicar = document.querySelector('#mensajeModifar');

$formularioModificar.addEventListener('submit', function (event) {
    event.preventDefault();

    let $miembro = document.querySelector('#selectMiembros').value;
    let $nombre = document.querySelector('#modNombre').value;
    let $dni = document.querySelector('#modDni').value;
    let $email = document.querySelector('#modEmail').value;
    let $vencimiento = document.querySelector('#modVencimiento').value;

    let posicionMiembro = listaMiembros.findIndex(function (miembro) {
        return $miembro == miembro.nombre;
    });
    if ($nombre != '') {
        listaMiembros[posicionMiembro].nombre = $nombre;
    }
    if ($dni != '') {
        listaMiembros[posicionMiembro].dni = $dni;
    }

    if ($email != '') {
        listaMiembros[posicionMiembro].email = $email;
    }

    if ($vencimiento != '') {
        listaMiembros[posicionMiembro].vencimiento = $vencimiento;
    }

    console.log(listaMiembros)
    $mensajeModicar.innerHTML = 'Los datos fueron modificados con éxito';
    $formularioModificar.reset();

});