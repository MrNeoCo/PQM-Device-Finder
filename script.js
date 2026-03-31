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
const hint = document.getElementById("hint");

search.addEventListener("input", function(){

let query = this.value.toLowerCase().trim();

results.innerHTML = "";

if(query === ""){
hint.style.display = "block";
return;
}

hint.style.display = "none";

let matches = devices
.filter(d => d.search.includes(query))
.slice(0,50);

matches.forEach(d => {

let card = document.createElement("div");
card.className = "card";

card.innerHTML = `<b>${d["Name"] || ""}</b><br>
IP: ${d["IP"] || ""}<br>
S/N: ${d["S/N"] || ""}<br>
Last Sync: ${d["Last sync"] || ""}<br>
Device ID: ${d["Device ID"] || ""}<br>
System: ${d["System"] || ""}`;

results.appendChild(card);

});

});
