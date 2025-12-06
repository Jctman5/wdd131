
const products = [
{ id: 1, name: "SuperWidget 3000" },
{ id: 2, name: "MegaTool Pro" },
{ id: 3, name: "UltraCleaner Max" },
{ id: 4, name: "SmartGadget X" },
{ id: 5, name: "PowerDrill Supreme" }
];



const productSelect = document.querySelector('#product');


products.forEach(product => {
const option = document.createElement('option');
option.value = product.name;
option.textContent = product.name;
productSelect.appendChild(option);
});
