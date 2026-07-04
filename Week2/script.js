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


// console.log(taskInput);
// console.log(addBtn);
// console.log(taskList);
// console.log(successMsg);
// console.log(errorMsg);
// console.log(taskCount);
addBtn.addEventListener("click", function () {
      const task = taskInput.value.trim();
        if(task === ""){
            errorMsg.style.display= "flex";
            successMsg.style.display= "none"
       console.log(errorMsg);
    }
    else{
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

console.log(formattedDate);
        newTask.innerHTML = `
    
        <div class="number">
    <h4>${taskNumber}</h4>
</div>

    <div class="tasks">
        <i class="ri-checkbox-circle-fill"></i>
        <p>${task}</p>
    </div>

    <div class="status1">
        <h5>Pending</h5>
    </div>

    <div class="date">
        <i class="ri-calendar-2-line"></i>
        <p>${formattedDate}</p>
    </div>

    <div class="actions">
        <div class="edit editBtn">
            <i class="ri-pencil-fill"></i>
            <p>Edit</p>
        </div>

        <div class="Delete deleteBtn">
            <i class="ri-delete-bin-5-line"></i>
            <p>Delete</p>
        </div>

        <div class="Done doneBtn">
            <i class="ri-check-line"></i>
            <p>Done</p>
        </div>
    </div>
`;
        taskList.appendChild(newTask);  

        updateDashboard();
       
        const deleteBtn = newTask.querySelector(".deleteBtn");
            console.log(deleteBtn);

            deleteBtn.addEventListener("click", function () {
              newTask.remove();
              updateDashboard();
                 taskCount.textContent = taskList.children.length;
}); 
            const doneBtn = newTask.querySelector(".doneBtn");
            doneBtn.addEventListener("click", function(){
                const status = newTask.querySelector(".status1 h5");
                const statusBox = newTask.querySelector(".status1");
            status.textContent = "Completed";

            statusBox.classList.add("completed");

            updateCompletedTasks();
});
            
            const editBtn = newTask.querySelector(".editBtn");
            const taskText = newTask.querySelector(".tasks p");
            editBtn.addEventListener("click", function(){
                 const newName = prompt("Enter new task name");
                     
                        
                     if (newName !== null && newName.trim() !== "") {
                     taskText.textContent = newName.trim();
}
});

        taskCount.textContent = taskNumber;
         taskInput.value = "";

    successMsg.style.display = "flex";
            setTimeout(function () {
             successMsg.style.display = "none";
}, 2000);
    errorMsg.style.display = "none";
            console.log(newTask);
    }
      console.log(task);
});