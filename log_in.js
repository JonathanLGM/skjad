// Tabs con animación
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const forms = document.querySelectorAll(".form-container");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // reset
      tabs.forEach(t => t.classList.remove("active"));
      forms.forEach(f => f.classList.remove("active"));

      // activar el seleccionado
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {

  // LOGIN
  document.querySelector(".btn-signin").addEventListener("click", async () => {
    const correo = document.getElementById("correo").value;
    const clave = document.getElementById("clave").value;

    try {
      const response = await fetch("/login", { // ⚡ Render maneja el puerto
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, clave })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Bienvenido " + data.usuario.nombre);
        // window.location.href = "/dashboard.html";
      } else {
        alert("❌ " + data.mensaje);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectar con el servidor");
    }
  });

  // REGISTRO
  document.querySelector(".btn-signup").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correoRegistro").value;
    const clave = document.getElementById("claveRegistro").value;

    try {
      const response = await fetch("/usuarios", { // ⚡ tu CRUD de usuarios
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, correo, clave })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Usuario registrado con éxito");
      } else {
        alert("❌ " + data.mensaje);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error al conectar con el servidor");
    }
  });

});
