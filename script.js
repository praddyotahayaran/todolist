const formEl = document.querySelector(".form")
const inputEl = document.querySelector(".input")
const ulEl = document.querySelector(".list")
let list = JSON.parse(localStorage.getItem("list"))

list.forEach(task=>{
    todoList(task)
})

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    todoList()
})

function todoList(task) {
    let newTask = inputEl.value
    if (task) {
        newTask = task.name
    }

    
    const liEl = document.createElement("li")
    if (task && task.checked) {
        liEl.classList.add("checked")
    }
    liEl.innerText = newTask;
    ulEl.appendChild(liEl)
    inputEl.value = ""
    const checkBtnEl = document.createElement("div")
    checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check">`
    liEl.appendChild(checkBtnEl);
    const trashBtn = document.createElement("div")
    trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    liEl.appendChild(trashBtn);

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked")
        updateLocalStorage()
    })

    trashBtn.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage()
    })
    updateLocalStorage()
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li")
    let list = []
    liEls.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        })
    })
    localStorage.setItem("list", JSON.stringify(list))
}