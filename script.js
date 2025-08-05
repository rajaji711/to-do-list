document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const titleInput = document.getElementById('taskTitle');
  const detailInput = document.getElementById('taskDetail');
  const dateInput = document.getElementById('taskDate');
  const timeInput = document.getElementById('taskTime');
  const taskList = document.getElementById('taskList');

  detailInput.addEventListener('input', () => {
    detailInput.style.height = 'auto';
    detailInput.style.height = `${detailInput.scrollHeight}px`;
  });

  addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const detail = detailInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (title === '') {
      alert("❗ Please enter a task title.");
      titleInput.focus();
      return;
    }

    if (detail === '') {
      const confirmAdd = confirm("⚠️ Are you sure you want to add a task without a description?");
      if (!confirmAdd) {
        detailInput.focus();
        return;
      }
    }

    let dueDateTime = null;
    if (date && time) {
      dueDateTime = new Date(`${date}T${time}`);
    }

    const creationDateTime = new Date();

    const li = document.createElement('li');
    li.className = 'task-item';

    const header = document.createElement('h3');
    header.className = 'task-header';
    header.textContent = title;

    const paragraph = document.createElement('p');
    paragraph.className = 'task-detail';
    paragraph.textContent = detail;

    const creationInfo = document.createElement('p');
    creationInfo.className = 'creation-time';
    creationInfo.textContent = `Created: ${creationDateTime.toLocaleString()}`;

    const dueInfo = document.createElement('p');
    dueInfo.className = 'due-time';

    if (dueDateTime) {
      dueInfo.textContent = `Due: ${dueDateTime.toLocaleString()}`;
    }

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = 'Done';
    completeBtn.addEventListener('click', () => {
      li.classList.toggle('completed');
      li.classList.remove('missed');
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    actions.appendChild(completeBtn);
    actions.appendChild(removeBtn);

    li.appendChild(header);
    if (detail) li.appendChild(paragraph);
    li.appendChild(creationInfo);
    if (dueDateTime) li.appendChild(dueInfo);
    li.appendChild(actions);
    taskList.appendChild(li);

    // Handle missed task
    if (dueDateTime) {
      const checkDue = () => {
        const now = new Date();
        if (now > dueDateTime && !li.classList.contains('completed')) {
          li.classList.add('missed');
          if (!dueInfo.textContent.includes('Missed')) {
            dueInfo.textContent += ' ⚠️ Missed!';
          }
        }
      };

      checkDue();
      const intervalId = setInterval(() => {
        if (li.parentElement) {
          checkDue();
        } else {
          clearInterval(intervalId);
        }
      }, 60000);
    }

    // Reset form
    titleInput.value = '';
    detailInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    detailInput.style.height = 'auto';
  });

  titleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBtn.click();
    }
  });

  detailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBtn.click();
    }
  });
});
