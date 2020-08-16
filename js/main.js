let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');
// Get DOM Elements
const modal = document.querySelector('#my-modal');
const deleteModal = document.querySelector('#deleteModal');
let closeBtn = document.querySelector('.close');
let dltcloseBtn = document.querySelector('.dltclose');
let saveBtn = document.querySelector('.saveBtn');
let deleteBtn = document.querySelector('.deleteBtn');

let spanNumber = 0;
let eventValue = '';
let li = '';

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);
// edit event
itemList.addEventListener('click', openModal);
// modal event
closeBtn.addEventListener('click', closeModal);
dltcloseBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
// save event
saveBtn.addEventListener('click', editItem);
// delete event
deleteBtn.addEventListener('click', closeModal);

// Add item
function addItem(e) {
  e.preventDefault();

  // Get input value
  let newItem = document.getElementById('item').value;

  // Create new li element
  let li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create del button element
  let deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete ml-2 fa fa-trash-alt p-2';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('delete'));

  // Create edit button element
  let editBtn = document.createElement('button');

  // Add classes to edit button
  editBtn.className = 'btn btn-primary btn-sm float-right edit modal-btn fa fa-marker p-2';

  // Append text node
  editBtn.appendChild(document.createTextNode('edit'));

  // Create span element
  let span = document.createElement('span');

  // Add classes to edit button
  span.className = 'number';

  // Append text node to span
  span.appendChild(document.createTextNode(++spanNumber));

  // Append button to li
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  // Append li to list
  itemList.appendChild(li);

  // making input to display no value
  newItem = document.getElementById('item').value = '';
}

// remove item
function removeItem(e) {
  li = e.target.parentElement;
}
deleteBtn.addEventListener('click', () => {
  li.remove();
});

// Filter Items
function filterItems(e) {
  // convert text to lowercase
  let text = e.target.value.toLowerCase();
  // Get lis
  let items = itemList.getElementsByTagName('li');
  // Convert to an array
  Array.from(items).forEach(function (item) {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
  if (e.target == deleteModal) {
    deleteModal.style.display = 'none';
  }
}

// open modal
function openModal(e) {
  eventValue = e.target.parentNode.childNodes[1].textContent;
  if (e.target.classList.contains('edit')) {
    modal.style.display = 'block';
  }
  if (e.target.classList.contains('delete')) {
    deleteModal.style.display = 'block';
  }
}

// edit function
function editItem() {
  let itemsList = document.querySelectorAll('.list-group-item');
  for (let i = 0; i < itemsList.length; i++) {
    let itemValue = itemsList[i].childNodes[1].textContent;
    let taskText = itemsList[i].childNodes[0];
    if (eventValue == itemValue) {
      taskText.textContent = document.getElementById('editinput').value;
    }
  }
  closeModal();
}

// Close
function closeModal() {
  modal.style.display = 'none';
  deleteModal.style.display = 'none';
  document.getElementById('editinput').value = '';
}