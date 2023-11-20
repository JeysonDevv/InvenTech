import { database } from '../Capa Datos/data.js';

if (window.location.pathname === "/") {
  window.location.href = "/Capa Presentacion/index.html";
}
// Verifica si el usuario ha iniciado sesión
const loggedInUser = localStorage.getItem("loggedInUser");

// Si el usuario no ha iniciado sesión, redirige a la página de inicio de sesión
if (!loggedInUser) {
  window.location.href = "/Capa Presentacion/index.html";
}

var ipv4_address = $("#red");
ipv4_address.inputmask({
  alias: "ip",
  greedy: false,
});

document.getElementById("otrosSoftware").addEventListener("input", function () {
  // Obtener el valor del textarea
  var textareaValue = document.getElementById("otrosSoftware").value;

  // Actualizar el valor del checkbox
  document.getElementById("chkOtros").value = textareaValue;
});

// Agrega un evento al checkbox "Otros"
document.getElementById("chkOtros").addEventListener("change", function () {
  const otrosContainer = document.getElementById("otrosSoftwareContainer");
  otrosContainer.style.display = this.checked ? "block" : "none";
});

document
  .getElementById("otrosPoliticas")
  .addEventListener("input", function () {
    // Obtener el valor del textarea
    var textareaValue2 = document.getElementById("otrosPoliticas").value;

    // Actualizar el valor del checkbox
    document.getElementById("chkOtros2").value = textareaValue2;
  });

// Agrega un evento al checkbox "Otros"
document.getElementById("chkOtros2").addEventListener("change", function () {
  const otrosContainer2 = document.getElementById("otrosPoliticasContainer");
  otrosContainer2.style.display = this.checked ? "block" : "none";
});

document
  .getElementById("otrosHallazgos")
  .addEventListener("input", function () {
    // Obtener el valor del textarea
    var textareaValue3 = document.getElementById("otrosHallazgos").value;

    // Actualizar el valor del checkbox
    document.getElementById("chkOtros3").value = textareaValue3;
  });

// Agrega un evento al checkbox "Otros"
document.getElementById("chkOtros3").addEventListener("change", function () {
  const otrosContainer3 = document.getElementById("otrosHallazgosContainer");
  otrosContainer3.style.display = this.checked ? "block" : "none";
});

document.getElementById("memoria").addEventListener("input", function () {
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
});

document
  .getElementById("almacenamiento")
  .addEventListener("input", function () {
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
  });

document.getElementById("usuarios").addEventListener("input", function () {
  if (this.value.length > 1) {
    this.value = this.value.slice(0, 1);
  }
});

document.getElementById("total").addEventListener("input", function () {
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
});

document
  .getElementById("btnCerrarSesion")
  .addEventListener("click", function () {
    // Elimina el nombre de usuario del localStorage
    localStorage.removeItem("loggedInUser");
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/Capa Presentacion/index.html";
  });

function inicializarTabla() {
  $("#example").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
    },

    pageLength: 5,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "Todos"],
    ],
    responsive: true,
    dom: '<"top"flB>rt<"bottom"ip>',
    buttons: [
      {
        extend: "pdf",
        split: ["excel"],
        filename: "Reporte_LabA9",
        orientation: "landscape", // Establecer orientación en horizontal
        customize: function (doc) {
          // Verificar si solo se muestra una fila después de aplicar un filtro
          const filteredRowCount = $("#example tbody tr:not(.filtered)").length;

          if (filteredRowCount === 1) {
            // Cambiar el texto del encabezado a "EQUIPO Y EL CODIGO DEL TERMINAL"
            const equipoCodigo = $("#example tbody tr:not(.filtered) td:eq(0)")
              .text()
              .trim();
            doc.content[0].text = `DETALLES DEL EQUIPO: ${equipoCodigo}`;
          } else {
            // Cambiar el texto del encabezado a "EQUIPOS DE LABORATORIO A9"
            doc.content[0].text = "EQUIPOS DE LABORATORIO A9";
          }
          const loggedInUser = localStorage.getItem("loggedInUser");

          // Agregar elementos encima de la tabla
          doc.content.unshift(
            {
              text: "Reporte de hallazgos e inventario del Laboratorio A9",
              fontSize: 24,
              alignment: "center",
              margin: [0, 80],
            },
            {
              
              width: 200,
              alignment: "center",
              margin: [0, 60],
            },
            {
              text: `Fecha de generación: ${new Date().toLocaleDateString()}`,
              alignment: "center",
              fontSize: 20,
              margin: [0, 40],
            },
            {
              text: `Reporte realizado por: ${loggedInUser}`,
              alignment: "center",
              fontSize: 20,
              margin: [0, 100],
            },
            {
              text: `Firma: __________________________`,
              alignment: "center",
              fontSize: 20,
              margin: [0, 10],
            }
          );

          doc["footer"] = function (page, pages) {
            const appInfo = {
              name: "InvenTech",
              version: "1.0",
              description: "Gestión de hardware y generación de reporte",
              authors: "Jeyson Guevara, Ramón González, Ruddy Mendoza",
            };

            const loggedInUser = localStorage.getItem("loggedInUser");

            const customFooter = [
              {
                columns: [
                  {
                    width: "auto",
                    text: `Aplicación: ${appInfo.name}`,
                    alignment: "left",
                    margin: [0, 10],
                  },
                  {
                    width: "*",
                    text: `Versión: ${appInfo.version}`,
                    alignment: "center",
                    margin: [0, 10],
                  },
                  {
                    width: "*",
                    text: `Funcionalidad: ${appInfo.description}`,
                    alignment: "center",
                    margin: [0, 10],
                  },
                  {
                    width: "auto",
                    text: `Autores: ${appInfo.authors}`,
                    alignment: "right",
                    margin: [0, 10],
                  },
                ],
              },
            ];

            // Agrega información del usuario si ha iniciado sesión
            if (loggedInUser) {
              customFooter.push({
                text: `Generado por: ${loggedInUser}`,
                style: "subheader",
              });
            }

            return customFooter;
          };

          doc.pageSize = "A3"; // Establece el tamaño de la página PDF a A3

          if (doc.content[1] && doc.content[1].table) {
            doc.content[1].table.widths = [
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ];
          }

          /// Obtén una referencia a la segunda tabla en el HTML
          const secondTable = document.getElementById("second-table");

          // Obtén los encabezados de la segunda tabla
          const secondTableHeader = [];
          $("#second-table thead th").each(function () {
            secondTableHeader.push($(this).text());
          });

          // Inicializa la estructura de datos para la segunda tabla
          const secondTableData = [secondTableHeader];

          // Itera a través de las filas de la segunda tabla y agrega los datos a la estructura de datos
          $("#second-table tbody tr").each(function () {
            const rowData = [];
            $(this)
              .find("td")
              .each(function () {
                rowData.push($(this).text());
              });
            secondTableData.push(rowData);
          });

          // Verificar si la columna Hallazgo de la primera tabla tiene un valor diferente de "Ninguno"
          const monitorColumnIndex = $(
            "#example th:contains('HALLAZGO')"
          ).index();
          const monitorHasValue =
            $(
              "#example tbody tr:not(.filtered) td:eq(" +
                monitorColumnIndex +
                ")"
            ).filter(function () {
              return $(this).text().trim() !== "Ninguno";
            }).length > 0;

          if (monitorHasValue) {
            // Agregar la segunda tabla al contenido del PDF
            doc.content.push({
              text: "DESCRIPCIÓN DE HALLAZGOS",
              fontSize: "20",
              style: "subheader",
              margin: [0, 20],
            });
            doc.content.push({
              table: {
                headerRows: 1,
                widths: secondTableHeader.map(() => "auto"),
                body: secondTableData.map((row) =>
                  row.map((cell) => (cell === undefined ? "" : cell))
                ),
              },
            });
          } else {
            // Si no hay datos relevantes, proporcionar un mensaje u otra acción apropiada
            doc.content.push({
              text: "No se encontraron hallazgos relevantes",
              fontSize: "20",
              style: "subheader",
              margin: [0, 20],
            });
          }
        },
      },
    ],
  });
}

function inicializarTabla2() {
  $("#second-table").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
    },
    responsive: true,
    lengthMenu: [
      [3, 5, 10, -1],
      [3, 5, 10, "Todos"],
    ],
    pageLength: -1,
    dom: '<"top"flB>rt<"bottom"ip>',
    columnDefs: [
      {
        targets: 0, // Índice de la columna "hallazgo" (ajusta esto según tu estructura de columna)
        responsivePriority: 1, // Asigna la mayor prioridad a "hallazgo"
      },
      {
        targets: 3, // Índices de las otras columnas
        responsivePriority: 2, // Asigna una prioridad menor a las otras columnas
      },
    ],
    buttons: [],
    // Otras opciones y configuraciones específicas de la segunda tabla
  });
}

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
  $("#example").DataTable().destroy();
  inicializarTabla();

  // Destruye la segunda tabla antes de cambiar de pestaña
  $("#second-table").DataTable().destroy();

  inicializarTabla2();
});

// Inicializa la tabla DataTable
$(document).ready(function () {
  inicializarTabla();
  inicializarTabla2();
});

// Obtiene una referencia a la tabla "equipos" en tu base de datos
const tableRef = database.ref("/equipos");

// Obtiene una referencia a la tabla "hallazgos" en tu base de datos
const secondTableRef = database.ref("/hallazgos");

// Escucha los cambios en los datos de la tabla
tableRef.on("value", (snapshot) => {
  $("#example").DataTable().destroy();

  const tableData = snapshot.val();
  const tableBody = document.getElementById("table-body");

  // Limpia el cuerpo de la tabla
  tableBody.innerHTML = "";

  let codeTerminalValue;
  // Itera a través de los datos y agrega filas a la tabla
  for (const key in tableData) {
    //creamos constantes para los iconos editar y borrar
    const rowData = tableData[key];
    const row = document.createElement("tr");

    if (!codeTerminalValue) {
      codeTerminalValue = rowData["codigo"];
    }

    // Agrega celdas para cada campo de datos en el orden deseado
    const order = [
      "codigo",
      "procesador",
      "memoria",
      "almacenamiento",
      "sistema_operativo",
      "actualizacion",
      "usuarios",
      "red",
      "monitor",
      "politicas",
      "software",
    ];
    order.forEach((field) => {
      const cell = document.createElement("td");
      cell.innerText = rowData[field] || "";
      row.appendChild(cell);
    });

    // Agregar una clase CSS condicionalmente si el campo "monitor" es igual a "Si"
    if (rowData["monitor"] !== "Ninguno") {
      row.classList.add("fila-roja");
    }

    // Agrega la fila a la tabla
    tableBody.appendChild(row);
  }

  // Inicializa la tabla DataTable y la hace responsiva
  inicializarTabla();
});

secondTableRef.on("value", (snapshot) => {
  $("#second-table").DataTable().destroy();
  const secondTableData = snapshot.val();
  const secondTableBody = document.getElementById("second-table-body");

  // Limpia el cuerpo de la segunda tabla
  secondTableBody.innerHTML = "";

  let codeTerminalValue;

  // Itera a través de los datos y agrega filas a la segunda tabla
  for (const key in secondTableData) {
    const secondRowData = secondTableData[key];
    const secondRow = document.createElement("tr");

    if (!codeTerminalValue) {
      codeTerminalValue = secondRowData["hallazgo"];
    }

    // Define el orden de las columnas de la segunda tabla
    const order = ["hallazgo", "descripcion", "recursos", "total"]; // Reemplaza estos nombres con los campos correctos de tu segunda tabla
    order.forEach((field) => {
      const cell = document.createElement("td");
      cell.innerText = secondRowData[field] || "";
      secondRow.appendChild(cell);
    });

    // Agrega la fila a la segunda tabla
    secondTableBody.appendChild(secondRow);
  }
  inicializarTabla2();
});
