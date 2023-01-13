let options = {
    valueNames: ["name", "category", "subcategory", "price", "price-per-kg", "price-per-slot", "max-price-per-slot", "max-stack", "kg", "size"],
    searchColumns: ["name"]
}
let itemsList = new List("items", options);
const applyFilters = () => {
    itemsList.filter(function (item) {
        let categoryFilter = $("#categoryFilter").val();
        let lootableFilter = $("#lootableFilter").prop("checked");
        let nonLootableCategories = ["equipment"];
        let itemCat = item.values().category.toLowerCase();
        if (((categoryFilter === null) || (categoryFilter === "all") || (itemCat === categoryFilter)) && ((!lootableFilter || (lootableFilter && nonLootableCategories.indexOf(itemCat) === -1)))) {
            return true;
        } else {
            return false;
        }
    });
};
applyFilters();

const changeArrow = (elem) => {
    let iconElem = $(elem).find("i:first-child");
    $("i").not(iconElem).removeClass("fa-sort-up");
    $("i").not(iconElem).removeClass("fa-sort-down");
    $("i").not(iconElem).addClass("fa-sort");
    if (iconElem.hasClass("fa-sort")) {
        iconElem.removeClass("fa-sort");
        iconElem.addClass("fa-sort-up");
    } else if (iconElem.hasClass("fa-sort-up")) {
        iconElem.removeClass("fa-sort-up");
        iconElem.addClass("fa-sort-down");
    } else if (iconElem.hasClass("fa-sort-down")) {
        iconElem.removeClass("fa-sort-down");
        iconElem.addClass("fa-sort-up");
    }
};

const copyEmail = () => {
    navigator.clipboard.writeText("zakov-to" + "ols.c41" + "ar@simp" + "lelogi" + "n.com")
};