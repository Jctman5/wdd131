document.getElementById("year").textContent = new Date().getFullYear();


document.getElementById("lastModified").textContent = document.lastModified;


const button = document.getElementById("hamburger");
const nav = document.getElementById("nav");

button.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  button.textContent = button.textContent === "✖" ? "☰" : "✖";
});
