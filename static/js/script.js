function doFiltering() {
	itemsList = new List("items", options);
	const applyFilters = () => {
		itemsList.filter(function(s) {
			let a = $("#categoryFilter")
				.val()
			e = $("#lootableFilter")
				.prop("checked")
			o = s.values()
				.category.toLowerCase();
			return (null === a || "all" === a || o === a) && (!e || !!e && -1 === ["equipment"].indexOf(o))
		})
	};
	applyFilters();
}

// https://stackoverflow.com/questions/29751340/how-to-print-always-4-digits-on-javascript
function padNumber(number) {
	number = number.toString();
	while(number.length < 4) {
		number = "0" + number;
	}
	return number;
}

(() => {
	fetch("/static/js/items.json")
		.then(res => res.json())
		.then((out) => {
			const table = document.getElementById('tbody');
			let index = 0;
			for (const key in out) {
				const item = out[key];
				// only show items that have images
				if (!item.legacy) { continue; }
				const tr = document.createElement('tr');
				tr.id = `item-${index}`;
				// legacy was miscalculated on import. it should really be switched to item IDs for ease of interop
				// whoops.
				tr.innerHTML = `
				<td style=width:150px><img src=/static/img/${padNumber(item.legacy - 1)}.png class=item-icon>
				<td style=width:200px><span style=font-weight:700;color:var(--secondary-color) class=name>${item.name}</span><br><span style=font-size:smaller class=category>${item.sub}</span>
				<td class=price style=color:#ff1900>${item.price} ₽
				<td class=price-per-kg style=color:#ff7f00>${item.price_kg} ₽
				<td class=price-per-slot style=color:#ff1900>${item.price_slot} ₽
				<td class=max-price-per-slot style=color:#ffb200>${item.max_price_slot} ₽
				<td class=max-stack>${item.max_stack}
				<td class=kg>${item.weight}<br>
				<td class=size>${item.size}`;
				table.appendChild(tr);
			}
			doFiltering();
		}).catch(err => console.error(err));
})();

// legacy code vvv
let options = {
	valueNames: ["name", "category", "subcategory", "price", "price-per-kg", "price-per-slot", "max-price-per-slot", "max-stack", "kg", "size"],
	searchColumns: ["name"]
};

const changeArrow = s => {
	let a = $(s)
		.find("i:first-child");
	$("i")
		.not(a)
		.removeClass("fa-sort-up"), $("i")
		.not(a)
		.removeClass("fa-sort-down"), $("i")
		.not(a)
		.addClass("fa-sort"), a.hasClass("fa-sort") ? (a.removeClass("fa-sort"), a.addClass("fa-sort-up")) : a.hasClass("fa-sort-up") ? (a.removeClass("fa-sort-up"), a.addClass("fa-sort-down")) : a.hasClass("fa-sort-down") && (a.removeClass("fa-sort-down"), a.addClass("fa-sort-up"))
};
const copyEmail = () => {
	navigator.clipboard.writeText("zakov-tools.c41ar@simplelogin.com")
};