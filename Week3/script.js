const taskInput = document.getElementById("taskInput");
const addBtn    = document.getElementById("addBtn");
const taskList  = document.getElementById("taskList");
const successMsg= document.getElementById("taskaddSuccess")
const errorMsg  = document.getElementById("plz");
const taskCount= document.getElementById("taskCount");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks")

function updateTaskNumbers() {
    const tasks = taskList.querySelectorAll(".subjects");
    tasks.forEach(function(task, index) {
        const number = task.querySelector(".number h4");
        number.textContent = index + 1;
    });
}

function updateDashboard(){
    totalTasks.textContent = taskList.children.length;
}

function updateCompletedTasks(){
    const completed = taskList.querySelectorAll(".completed").length;
    completedTasks.textContent = completed;
}

function addTaskToList(taskText) {
    const newTask = document.createElement("div");
    newTask.classList.add("subjects");
    const taskNumber = taskList.children.length + 1;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

    newTask.innerHTML = `
        <div class="number"><h4>${taskNumber}</h4></div>
        <div class="tasks">
            <i class="ri-checkbox-circle-fill"></i>
            <p>${taskText}</p>
        </div>
        <div class="status1"><h5>Pending</h5></div>
        <div class="date">
            <i class="ri-calendar-2-line"></i>
            <p>${formattedDate}</p>
        </div>
        <div class="actions">
            <div class="edit editBtn"><i class="ri-pencil-fill"></i><p>Edit</p></div>
            <div class="Delete deleteBtn"><i class="ri-delete-bin-5-line"></i><p>Delete</p></div>
            <div class="Done doneBtn"><i class="ri-check-line"></i><p>Done</p></div>
        </div>
    `;

    taskList.appendChild(newTask);
    updateDashboard();

    const deleteBtn = newTask.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function () {
        newTask.remove();
        updateDashboard();
        updateTaskNumbers();
        taskCount.textContent = taskList.children.length;
    });

    const doneBtn = newTask.querySelector(".doneBtn");
    doneBtn.addEventListener("click", function () {
        const status = newTask.querySelector(".status1 h5");
        const statusBox = newTask.querySelector(".status1");
        status.textContent = "Completed";
        statusBox.classList.add("completed");
        updateCompletedTasks();
    });

    const editBtn = newTask.querySelector(".editBtn");
    const taskTextEl = newTask.querySelector(".tasks p");
    editBtn.addEventListener("click", function () {
        const newName = prompt("Enter new task name");
        if (newName !== null && newName.trim() !== "") {
            taskTextEl.textContent = newName.trim();
        }
    });

    taskCount.textContent = taskList.children.length;
}

addBtn.addEventListener("click", function () {
    const task = taskInput.value.trim();
    if (task === "") {
        errorMsg.style.display = "flex";
        successMsg.style.display = "none";
    } else {
        addTaskToList(task);
        taskInput.value = "";
        successMsg.style.display = "flex";
        setTimeout(function () {
            successMsg.style.display = "none";
        }, 2000);
        errorMsg.style.display = "none";
    }
});

// Press Enter to add task
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// ================= AI SMART TASK PLANNER =================

const goalInput = document.getElementById("goalInput");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");

// Clear button
clearBtn.addEventListener("click", function () {
    goalInput.value = "";
    result.innerHTML = "";
});

generateBtn.addEventListener("click", async function () {

    const goal = goalInput.value.trim();

    if (goal === "") {
        alert("Please enter a goal!");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    result.innerHTML = `
    <div class="loading">
        <div class="spinner"></div>
        <p>🤖 AI is generating your personalized roadmap...</p>
    </div>
    `;

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                goal: goal
            })
        });

        const data = await response.json();

        result.innerHTML = `
        <h2 class="totalTask">
            ✅ ${data.length} Tasks Generated
        </h2>
        <button id="addAllBtn">➕ Add All Tasks</button>
        `;

        data.forEach(function(item){
            const card = document.createElement("div");
            card.classList.add("aiTask");
            card.innerHTML = `
                <h3>📚 ${item.task}</h3>
                <p>🔥 Priority : ${item.priority}</p>
                <p>⏱ Estimated Time : ${item.time}</p>
            `;
            result.appendChild(card);
        });

        const addAllBtn = document.getElementById("addAllBtn");
        addAllBtn.addEventListener("click", function () {
            data.forEach(function(item) {
                addTaskToList(item.task);
            });
            addAllBtn.textContent = "✅ Added!";
            addAllBtn.disabled = true;
        });

        result.scrollIntoView({
            behavior: "smooth"
        });

    }

    catch(error){
        console.log("FULL ERROR:", error.message);

        result.innerHTML = `
        <h3 style="color:red;">
            ❌ Something went wrong.
        </h3>
        `;
    }

    generateBtn.disabled = false;
    generateBtn.textContent = "✨ Generate Tasks";

});