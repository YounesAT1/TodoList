const addbtn = document.querySelector(".add-btn");
const inputText = document.querySelector(".text-input");
const taskList = document.querySelector(".task-list");
const error = document.querySelector(".error");
window.addEventListener("load", () => {
    inputText.focus();
});
let tasks;

const addTask = () => {
    let task = inputText.value;
    if (!task) {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
    tasks = getItems();
    if (!tasks) tasks = [];
    tasks.push({ task, status: "pending" });
    save(tasks);
    showTasks();
    inputText.value = "";
    inputText.focus();
};

inputText.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addbtn.click();
    }
});

const showTasks = () => {
    tasks = [];
    tasks = getItems();
    taskList.innerHTML = "";
    if (tasks) craetTask(tasks);
};

const craetTask = (tasks) => {
    tasks.forEach((taskInfo, Index) => {
        const { task, status } = taskInfo;
        if (task !== "") {
            let icon = status === "pending" ? "fa-circle" : "fa-circle-check";
            let text = status === "pending" ? "" : "completed";
            let Line = document.createElement("li");
            Line.innerHTML = `
                <li class="task">
                    <span>
                        <i class="fa-regular ${icon}"onclick="toggleIcon(event); updateStatus(${Index})"></i>
                        <span class=" text ${text}">${task}</span>
                    </span>
                    <i class="fa-solid fa-xmark" onclick="removeTask(${Index})"></i>
                </li>
            `;
            taskList.appendChild(Line);
        } else {
            // error.style.display = "block";
        }
    });
};

const toggleIcon = (e) => {
    let classList = e.target.classList;
    let nextElClassList = e.target.nextElementSibling.classList;
    if (classList.contains("fa-circle")) {
        classList.remove("fa-circle");
        classList.add("fa-circle-check");
        nextElClassList.add("completed");
    } else {
        classList.add("fa-circle");
        classList.remove("fa-circle-check");
        nextElClassList.remove("completed");
    }
};

const updateStatus = (Index) => {
    let status = tasks[Index].status;
    status === "pending" ? (status = "complete") : (status = "pending");
    tasks[Index].status = status;
    save(tasks);
};

const removeTask = (Index) => {
    tasks.splice(Index, 1);
    save(tasks);
    showTasks();
};

const getItems = () => JSON.parse(localStorage.getItem("tasks"));
const save = (data) => localStorage.setItem("tasks", JSON.stringify(data));
showTasks();
