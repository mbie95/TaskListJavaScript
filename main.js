//pobieramy elementy
const searcher = document.querySelector(".searcher");
const form = document.querySelector("form");
const countTasks = document.querySelector("h1 span");
const list = document.querySelector("ul");
let doneButtons = document.querySelectorAll("li .done");
const listElements = list.querySelectorAll("li");
countTasks.textContent = list.childElementCount;
let nextIndex = list.childElementCount++;

function addTask(event) {
    event.preventDefault();  //zapobiega odswiezaniu strony
    const title = this.elements["taskName"].value; //pobieramy nazwe zadania
    if (title === '') {  //alert i wychodzenie z funkcji w przypadku nie podania nazwy zadania
        alert("Podaj nazwe zadania!");
        return;
    }
    this.elements["taskName"].value = ""; //zerujemy input formularza
    
    nextIndex++;
    const task = document.createElement("li");
    task.setAttribute("data-key", `${nextIndex}`);
    task.innerHTML = title + ' <button class="done">usuń</button>';
    list.appendChild(task);
    countTasks.textContent = list.childElementCount;
    doneButtons = document.querySelectorAll("li .done");
    doneButtons.forEach(function(button) {
        button.addEventListener("click", removeTask);
    })
}

//usuwamy zadanie
function removeTask() {
    const id = this.parentNode.dataset.key;
    document.querySelector(`li[data-key="${id}"]`).remove();
    countTasks.textContent = list.childElementCount;
}

//wyszukiwarka
searcher.addEventListener("keyup", function() {
    //zamieniamy na tablice liste elementow li
    let elements = [...listElements];
    //filtrujemy te, ktore zawieraja szukana fraze
    elements = elements.filter(element => 
        element.textContent.toLowerCase().includes(searcher.value.toLowerCase()));
    //wyswietlamy szukane
    list.innerHTML = "";
    elements.forEach(li => list.appendChild(li));
})

//klikniecie na przycisk wysyla formularz
form.addEventListener("submit", addTask);

doneButtons.forEach(function(button) {
    button.addEventListener("click", removeTask);
})
