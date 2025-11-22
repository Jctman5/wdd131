const yearEl = document.getElementById("year");
const lastModifiedEl = document.getElementById("lastModified");



const tempValue = parseFloat(document.getElementById("tempValue").textContent);
const windValue = parseFloat(document.getElementById("windValue").textContent);
const windChillEl = document.getElementById("windChill");



yearEl.textContent = new Date().getFullYear();
lastModifiedEl.textContent = document.lastModified;



function calculateWindChill(temp, wind) {
  return (
    13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)
  ).toFixed(1);
}



if (tempValue <= 10 && windValue > 4.8) {
  windChillEl.textContent = calculateWindChill(tempValue, windValue) + " °C";
} else {
  windChillEl.textContent = "N/A";
}
