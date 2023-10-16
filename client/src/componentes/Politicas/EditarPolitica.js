document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("editarPoliticaFormulario");

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const periodo = parseFloat(document.getElementById("periodo").value);
        const fecha_inicio = document.getElementById("fecha_inicio").value;
        const fecha_final = document.getElementById("fecha_final").value;
        const inicia_desde_contrato = document.getElementById("inicia_desde_contrato").checked;
        const dias_a_dar = parseFloat(document.getElementById("dias_a_dar").value);
        const incrementativo = document.getElementById("incrementativo").checked;
        const dias_a_incrementar = parseFloat(document.getElementById("dias_a_incrementar").value);
        const acumulativo = document.getElementById("acumulativo").checked;
        const activo = document.getElementById("activo").checked;

        // Envía estos datos al servidor para actualizar la política
        const response = await fetch("/editarPolitica", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                actualizarDatosPolitica: {
                    descripcion,
                    periodo,
                    fecha_inicio,
                    fecha_final,
                    inicia_desde_contrato,
                    dias_a_dar,
                    incrementativo,
                    dias_a_incrementar,
                    acumulativo,
                    activo
                }
            })
        });

        if (response.ok) {
            alert("Política actualizada exitosamente");
        } else {
            alert("Error al actualizar la política");
        }
    });

    document.getElementById("cancelar").addEventListener("click", () => {
        // Redirige o realiza alguna otra acción en caso de cancelación
    });
});
