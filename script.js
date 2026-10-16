const form = document.getElementById('form');
const input = document.getElementById('input');
const errorMsg = document.getElementById('error');
const list = document.getElementById('list');
const emptyMsg = document.getElementById('empty'); 
const counter = document.getElementById('counter');
const filterBtns = document.querySelectorAll('.filter');

let currentFilter = 'all';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const text = input.value.trim();
  if (text.length < 3 || text.length > 100) {
    errorMsg.textContent = 'Ціль має містити від 3 до 100 символів!';
    return;
  }
  
  errorMsg.textContent = '';

  const li = document.createElement('li');
  const label = document.createElement('label');
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  
  const span = document.createElement('span');
  span.textContent = text;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Видалити';

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
    updateUI();
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateUI();
  });

  label.append(checkbox, span);
  li.append(label, deleteBtn);
  list.append(li);

  input.value = '';
  input.focus();

  updateUI();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentFilter = btn.dataset.filter;
    updateUI();
  });
});

function updateUI() {
  const items = list.querySelectorAll('li');
  let completedCount = 0;

  items.forEach(li => {
    const isCompleted = li.classList.contains('completed');
    if (isCompleted) completedCount++;

    if (currentFilter === 'all') {
      li.hidden = false;
    } else if (currentFilter === 'active') {
      li.hidden = isCompleted;
    } else if (currentFilter === 'completed') {
      li.hidden = !isCompleted;
    }
  });

  counter.textContent = `Усього: ${items.length}. Виконано: ${completedCount}`;
  
  if (emptyMsg) {
    emptyMsg.hidden = items.length > 0;
  }
}

updateUI();