// Function to generate random positions for the dots
function generateDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    const dotContainer = document.getElementById('dots-container');
    
    // Set random position for the dot
    const randomX = Math.random() * window.innerWidth;  // Random horizontal position
    const randomY = Math.random() * window.innerHeight;  // Random vertical position

    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;

    dotContainer.appendChild(dot);

    // Remove the dot after its animation is complete
    setTimeout(() => {
        dot.remove();
    }, 15000); // Dots drift for 15 seconds
}

// Function to create multiple dots
function createDots() {
    setInterval(generateDot, 500); // Generate a dot every 500ms
}

// Call the function to start creating dots
createDots();

// Existing Todo List functionality
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const downloadBtn = document.getElementById('download-todo-list');

// Add new todo item
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value;
    if (taskText.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        todoInput.value = '';
        
        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(li);
        });
    }
});

// Download the todo list
downloadBtn.addEventListener('click', () => {
    const todoItems = Array.from(todoList.children);
    const tasks = todoItems.map(item => item.textContent.replace('X', '').trim());
    const blob = new Blob([tasks.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'todo-list.txt';
    link.click();
});
