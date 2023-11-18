import { database } from '../Capa Datos/data.js';

// Agrega un evento de escucha al formulario de inicio de sesión
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario

    // Obtiene los valores ingresados por el usuario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Realiza una consulta a la base de datos para verificar el usuario y la contraseña
    const usersRef = database.ref("usuarios");
    usersRef.child(username).once("value", (snapshot) => {
      const userData = snapshot.val();

      if (userData && userData.password === password) {
        // Inicio de sesión exitoso. Verifica el rol del usuario
        // Almacena el nombre de usuario en localStorage
        localStorage.setItem("loggedInUser", username);
        const role = userData.role;

        if (role === "admin") {
          // Redirige al usuario a la página de administrador
          window.location.href = "/Capa Presentacion/inventario_admin.html";
        } else if (role === "observador") {
          // Redirige al usuario a la página de observador
          window.location.href = "/Capa Presentacion/inventario_observador.html";
        }
      } else {
        // Datos incorrectos. Muestra un mensaje de error
        alert("Usuario o contraseña incorrectos");
      }
    });
  });
