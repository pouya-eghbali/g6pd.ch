fetch("data.json")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach(item => {            
            let riskClass = "risk-" + item.risk.toLowerCase();
            let sources = item.sources.map(source => {
                return `<a href="${source.url}"> ${source.name} </a>`
            }).join("");
            let children = [];
            children.push(`<h3> ${item.name} </h3>`);
            if (item.type) {
                children.push(`<div class="type"> ${item.type} </div>`);
            }
            children.push(`<div class="risk"> ${item.risk} </div>`);
            if (item.notes) {
                children.push(`<div class="notes"> ${item.notes} </div>`)
            }
            if (item.otherNames) {
                children.push(`<div class="other-names"> ${item.otherNames} </div>`)
            }
            children.push(`<div class="sources"> ${sources} </div>`)
            let innerHTML = children.join('\n')
            let element = document.createElement("div");
            element.classList.add("search-item");
            element.classList.add(riskClass);
            element.innerHTML = innerHTML;
            let parent = document.getElementById("results");
            parent.appendChild(element);
            item.element = element;
        });
        window.G6PDData = data;
        document.getElementById("item-count").innerText = window.G6PDData.length;
    })

const searcher = document.getElementById("searcher");
searcher.addEventListener("keyup", function (event) {
    let pattern = new RegExp(searcher.value || ".*", "i");
    window.G6PDData.forEach(item => {
        if (item.name.match(pattern)) {
            return item.element.style.display = "block";
        }
        if (item.otherNames.match(pattern)) {
            return item.element.style.display = "block";
        }
        if (item.type.match(pattern)) {
            return item.element.style.display = "block";
        }
        if (item.risk.match(pattern)) {
            return item.element.style.display = "block";
        }
        if (item.notes.match(pattern)) {
            return item.element.style.display = "block";
        }
        return item.element.style.display = "none";
    })
})