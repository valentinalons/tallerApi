const boton = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

boton.addEventListener("click", () => {
    const busqueda = document.getElementById("inputBuscar").value;

    // Validar si el campo de búsqueda está vacío
    if (busqueda.trim() === "") {
        // Mostrar una alerta al usuario
        alert("Debes escribir el nombre de un personaje");
        return; // Salir de la función sin realizar la solicitud
    }

    // Realizar la solicitud fetch a la API de Rick and Morty
    fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`)
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es exitosa, maneja el error
                if (response.status === 404) {
                    showError("Vuelve a ver la serie, ese personaje NO EXISTE");
                } else {
                    throw new Error(`HTTP error! Código: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                showData(data.results);
            } else {
                showError("Vuelve a ver la serie, es personaje NO EXISTE");
            }
        })
        .catch(error => {
            console.log(error);
        });
});

function showData(results) {
    contenedor.innerHTML = '';
    results.forEach(result => {
        const nombre = result.name;
        const especie = result.species;
        const imagenUrl = result.image; // URL de la imagen del personaje

        contenedor.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${imagenUrl}" alt="${nombre}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">Especie: ${especie}</p>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("inputBuscar").value = ""; // Limpia el campo de búsqueda
}

function showError(errorMessage) {
    contenedor.innerHTML = `
        <div class="col-md-12 text-center">
            <div class="alert alert-danger" role="alert">
                ${errorMessage}
            </div>
        </div>
    `;
}
