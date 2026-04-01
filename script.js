let devices = [];

fetch("devices.json")
.then(res => res.json())
.then(data => {

devices = data.map(d => ({
...d,
search: Object.values(d).join(" ").toLowerCase()
}));

});

const search = document.getElementById("search");
const results = document.getElementById("results");
const resultCount = document.getElementById("result-count");
const hint = document.getElementById("hint");

search.addEventListener("input", function(){

let query = this.value.toLowerCase().trim();

results.innerHTML = "";

if(query === ""){
hint.style.display = "block";
resultCount.textContent = "";
return;
}

hint.style.display = "none";

let matches = devices
.filter(d => d.search.includes(query))
.slice(0,50);
resultCount.textContent = matches.length + " results found";

matches.forEach(d => {

let card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<div class="card-title">${d["Name"] || ""}</div>

<div class="device-row"><span>IP:</span>${d["IP"] || ""}</div>
<div class="device-row"><span>S/N:</span>${d["S/N"] || ""}</div>
<div class="device-row"><span>Last Sync:</span>${d["Last sync"] || ""}</div>
<div class="device-row"><span>Device ID:</span>${d["Device ID"] || ""}</div>
<div class="device-row"><span>System:</span>${d["System"] || ""}</div>
`;

results.appendChild(card);

});

});
