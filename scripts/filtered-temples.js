
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


const button = document.getElementById("hamburger");
const nav = document.getElementById("nav");

button.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  button.textContent = button.textContent === "✖" ? "☰" : "✖";
});


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-lds-2163877-wallpaper.jpg"
  },
  {
    templeName: "Seattle Washington",
    location: "Bellevue, Washington, United States",
    dedicated: "1980, November, 17",
    area: 110000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/seattle-washington/400x250/seattle-temple-lds-930309-wallpaper.jpg"
  },
  {
    templeName: "Anchorage Alaska",
    location: "Anchorage, Alaska, United States",
    dedicated: "1999, January, 9",
    area: 11937,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/anchorage-alaska/400x250/anchorage-alaska-temple-lds-252018-wallpaper.jpg"
  }
];


function displayTemples(filteredArray) {
  const container = document.getElementById("temple-container");
  container.innerHTML = "";

  filteredArray.forEach(t => {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h3>${t.templeName}</h3>
      <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
    `;

    container.appendChild(card);
  });
}


displayTemples(temples);


document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    const filter = link.textContent.trim();

    if (filter === "Home") {
      displayTemples(temples);
    } else if (filter === "Old") {
      displayTemples(
        temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900)
      );
    } else if (filter === "New") {
      displayTemples(
        temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000)
      );
    } else if (filter === "Large") {
      displayTemples(temples.filter(t => t.area > 90000));
    } else if (filter === "Small") {
      displayTemples(temples.filter(t => t.area < 10000));
    }
  });
});
