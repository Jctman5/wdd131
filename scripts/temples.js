
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
    dedicated: "2022, May, 22",
    area: 6861,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg"
  },
  {
    name: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/washington-d.c.-temple/washington-d.c.-temple-14992-main.jpg"
  },
  {
    name: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-12721-main.jpg"
  },
  {
    name: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4060-main.jpg"
  },
  {
    name: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    name: "Seattle Washington",
    location: "Bellevue, Washington, United States",
    dedicated: "1980, November, 17",
    area: 110000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/seattle-washington-temple/seattle-washington-temple-55800-main.jpg"
  },
  {
    name: "Richmond Virginia",
    location: "Glen Allen, Virginia, United States",
    dedicated: "2023, May 7",
    area: 39202,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/richmond-virginia-temple/richmond-virginia-temple-32557-main.jpg"
  },
  {
    name: "Oakland California",
    location: "Oakland California",
    dedicated: "1964, November 17",
    area: 80157,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/oakland-california-temple/oakland-california-temple-2654-main.jpg"
  },
  {
    name: "Raleigh North Carolina",
    location: "Raleigh North Carolina",
    dedicated: "1999, December 18",
    area: 12864,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/raleigh-north-carolina-temple/raleigh-north-carolina-temple-6727-main.jpg"
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
