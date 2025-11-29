
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;



const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
  hamburger.textContent = hamburger.textContent === "✖" ? "☰" : "✖";
});



const temples = [
  {
    name: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo-guam-temple.jpg"
  },
  {
    name: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-dc-temple.jpg"
  },
  {
    name: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/lima-peru-temple.jpg"
  },
  {
    name: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/mexico-city-temple.jpg"
  },
  {
    name: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "images/rome-italy-temple.jpg"
  },
  {
    name: "Seattle Washington",
    location: "Bellevue, Washington, United States",
    dedicated: "1980, November, 17",
    area: 110000,
    imageUrl: "images/seattle-washington-temple.jpg"
  }
];



const gallery = document.querySelector(".gallery");

function renderTemples(list) {
  gallery.innerHTML = ""; 

  list.forEach(t => {
    const card = document.createElement("figure");

    card.innerHTML = `
      <img src="${t.imageUrl}" alt="${t.name}">
      <figcaption>
        <h2>${t.name}</h2>
        <p><strong>Location:</strong> ${t.location}</p>
        <p><strong>Dedicated:</strong> ${t.dedicated}</p>
        <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

    gallery.appendChild(card);
  });
}

renderTemples(temples); 



const filters = {
  all: () => renderTemples(temples),
  old: () => renderTemples(temples.filter(t => parseInt(t.dedicated) < 1900)),
  new: () => renderTemples(temples.filter(t => parseInt(t.dedicated) > 2000)),
  large: () => renderTemples(temples.filter(t => t.area > 90000)),
  small: () => renderTemples(temples.filter(t => t.area < 10000))
};

document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;
    filters[type]();
  });
});
