import React from "react"; // Importamos la librería React, aunque no se usa en esta función.

export default function validarInput(regex, userInput) { // Declaramos una función llamada validarInput que toma dos parámetros: regex y userInput.
  return regex.test(userInput); // Utilizamos la función test de la expresión regular para verificar si userInput coincide con el patrón de regex y devolvemos true o false.
}
