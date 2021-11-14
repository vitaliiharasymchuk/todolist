let mapOfThings = new Map();

let btnAdd = document.getElementById("btnAdd");
let btnDelete = document.getElementById("btnDelete");
let btnModify = document.getElementById("btnModify");
let btnModifyValue = document.getElementById("btnModifyValue");
let btnClear = document.getElementById("btnClear");

let inputAdd = document.getElementById("inputAdd");
let inputDelete = document.getElementById("inputDelete");
let inputModify = document.getElementById("inputModify");
let inputModifyValue = document.getElementById("inputModifyValue");

let fatherDiv = document.getElementById("list");

btnAdd.onclick = addThing;
btnDelete.onclick = deleteThing;
btnModify.onclick = modifyThing;
btnModifyValue.onclick = modifyValue;
btnClear.onclick = clearStorage;

function clearStorage() {
    mapOfThings.clear();
    synchronizationToStorage();
    inputModify.value = "";
    btnAdd.disabled = false;
    btnDelete.disabled = false;
    btnModify.disabled = false;
    inputModify.disabled = false;
    inputAdd.disabled = false;
    inputDelete.disabled = false;
    inputModifyValue.disabled = true;
    btnModifyValue.disabled = true;
}

function synchronizationFromStorage() {
    let syncMap = new Map();
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        syncMap.set(key, localStorage.getItem(key));
    }
    syncMap = sortMap(syncMap);
    return syncMap;
}

function synchronizationToStorage() {

    localStorage.clear();
    for (let key of mapOfThings.keys()) {
        localStorage.setItem(key, mapOfThings.get(key));
    }
    renderThings();
}
function sortMap(thisMap) {
    return thisMap = new Map([...thisMap].sort(function (a, b) {
        return a[0] - b[0];
    }));
}
function addThing() {
    mapOfThings = refreshMap();
    if (inputAdd.value === "") {
        alert("Поле порожнє");
        return;
    }
    let thingToAdd = [mapOfThings.size, inputAdd.value];
    inputAdd.value = "";
    mapOfThings.set(thingToAdd[0], thingToAdd[1]);
    synchronizationToStorage();
}

function deleteThing() {
    mapOfThings = refreshMap();
    if (inputDelete.value === "") {
        alert("Поле порожнє");
        return;
    }
    if (!mapOfThings.delete(parseInt(inputDelete.value - 1))) {
        alert("Нема справи з даним ID");
        inputDelete.value = "";
        return;
    };
    inputDelete.value = "";
    mapOfThings = refreshMap();
    synchronizationToStorage();
}

function modifyThing() {
    mapOfThings = refreshMap();
    if (inputModify.value === "") {
        alert("Поле порожнє");
        return;
    }
    if (mapOfThings.get(parseInt(inputModify.value - 1)) == undefined) {
        alert("Нема справи з даним ID");
        inputModify.value = "";
        return;
    }
    inputModifyValue.value = mapOfThings.get(parseInt(inputModify.value - 1));
    btnAdd.disabled = true;
    btnDelete.disabled = true;
    btnModify.disabled = true;
    inputAdd.disabled = true;
    inputDelete.disabled = true;
    inputModify.disabled = true;
    inputModifyValue.disabled = false;
    btnModifyValue.disabled = false;
}

function modifyValue() {
    inputAdd.disabled = true;
    if (inputModifyValue.value === "") {
        alert("Поле порожнє");
        return;
    }
    let thingToAdd = [parseInt(inputModify.value - 1), inputModifyValue.value];
    mapOfThings.set(thingToAdd[0], thingToAdd[1]);
    inputModifyValue.value = "";
    inputModify.value = "";
    mapOfThings = refreshMap();
    synchronizationToStorage();
    btnAdd.disabled = false;
    btnDelete.disabled = false;
    btnModify.disabled = false;
    inputModify.disabled = false;
    inputAdd.disabled = false;
    inputDelete.disabled = false;
    inputModifyValue.disabled = true;
    btnModifyValue.disabled = true;
}
function refreshMap() {
    let arrOfValues = mapOfThings.values();
    let newMap = new Map();
    for (let i = 0; i < mapOfThings.size; i++) {
        newMap.set(i, arrOfValues.next().value);
    }
    //console.log(newMap);
    return newMap;
}

function renderThings() {
    fatherDiv.innerHTML = "";
    for (let [key, value] of mapOfThings.entries()) {
        fatherDiv.innerHTML += (parseInt(key) + 1) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + value + "<br\>";
    }
}

mapOfThings = synchronizationFromStorage();
renderThings();
