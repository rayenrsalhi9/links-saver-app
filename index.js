import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://links-saver-a4953-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const linksRef = ref(database, "links")

onValue(linksRef, function(snapshot) {
    if (snapshot.exists()) {
        const dbValues = Object.values(snapshot.val())
        render(dbValues)
    }
    
})

let links = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(arr) {
    let listItems = ""
    for (let i = 0; i < arr.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${arr[i]}'>
                    ${arr[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(linksRef)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(linksRef, inputEl.value)
    inputEl.value = ""
})