document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskList = document.querySelector(".task-list ul");
    const dueDateInput = document.getElementById("due-date");
    const currentDateInput = document.getElementById("current-date");
    const today = new Date();
    const formattedCurrentDate = formatDate(today);
    currentDateInput.value = formattedCurrentDate;

    dueDateInput.addEventListener("input", function() {
        this.value = formatDateString(this.value);
    });

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("task-name").value;
        const taskDescription = document.getElementById("task-description").value;
        const priority = document.getElementById("priority").value;
        const label = document.getElementById("label").value;

        const dueDateValue = dueDateInput.value; 
        const currentDate = new Date();

        if (!isValidDateFormat(dueDateValue)) {
            alert("Please enter a valid date in the format dd/mm/yyyy.");
            return;
        }

        const selectedDay = parseInt(dueDateValue.substring(0, 2));
        const selectedMonth = parseInt(dueDateValue.substring(3, 5)) - 1; 
        const selectedYear = parseInt(dueDateValue.substring(6));

        const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

        if (selectedDate <= currentDate) {
            alert("Deadline date must be in the future.");
            return;
        }
      
        const formattedDueDate = `${selectedDay}/${selectedMonth + 1}/${selectedYear}`;

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <div class="task-item">
                <h3>${taskName}</h3>
                <p>Description: ${taskDescription}</p>
                <p>Due Date: ${formattedDueDate}</p>
                <p>Priority: ${priority}</p>
                <p>Label: ${label}</p>
                <button class="delete-button">Delete Task</button>
            </div>
            <div class="countdown">Countdown: <span id="countdown-${taskName}"></span></div>
        `;

    
        const deleteButton = taskItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function() {
            clearInterval(countdownInterval);
            taskList.removeChild(taskItem);
        });

        taskList.appendChild(taskItem);
        taskForm.reset();

        // Start countdown timer
        const countdownElement = document.getElementById(`countdown-${taskName}`);
        const countdownInterval = setInterval(function() {
            const now = new Date();
            const timeDifference = selectedDate - now;

            if (timeDifference <= 0) {
                countdownElement.textContent = "Overdue";
                countdownElement.style.color = "#dc3545";
                clearInterval(countdownInterval);
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    });

    // Function to validate the date format (dd/mm/yyyy)
    function isValidDateFormat(dateString) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(dateString);
    }

    // Function to add slashes automatically to date input
    function formatDateString(value) {
        value = value.replace(/\D/g, "");
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        if (value.length >= 3 && value.length < 5) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        } else if (value.length >= 5) {
            value = value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 8);
        }
        return value;
    }
});

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
