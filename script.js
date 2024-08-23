const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.note').forEach(note => {
        const text = note.querySelector('textarea').value.toLowerCase();
        note.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.draggable = true;

    const timestamp = new Date().toLocaleString();

    note.innerHTML = `
    <div class="tools">
        <button class="edit" aria-label="Edit note"><i class="fas fa-edit"></i></button>
        <button class="delete" aria-label="Delete note"><i class="fas fa-trash-alt"></i></button>
        <button class="color" aria-label="Change color"><i class="fas fa-palette"></i></button>
        <span class="timestamp">${timestamp}</span>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

    // Append the note to the document
    document.body.appendChild(note);

    // Select newly added elements
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const colorBtn = note.querySelector('.color');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // Set up event listeners
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    colorBtn.addEventListener('click', () => {
        const colors = ['#FFD700', '#FF6347', '#98FB98', '#ADD8E6', '#DDA0DD'];
        const currentColor = note.style.backgroundColor;
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        while (newColor === currentColor) {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        }
        note.style.backgroundColor = newColor;
        updateLS();
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });
}

const toggleThemeBtn = document.getElementById('toggle-theme');
const body = document.body;

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateLS(); // Optional: Save theme preference
});

