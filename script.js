// NEW TODO FORM ELEMENTS CONSTANTS
const newToDoForm = document.getElementById('newToDoForm');
const toDoSelDrDnList = document.getElementById('toDoSelDrDnList');
const toDoIdInput = document.getElementById('toDoIdInput');
const toDoIdInputInvDiv = document.getElementById('toDoIdInputInvDiv');
const toDoUserIdInput = document.getElementById('toDoUserIdInput');
const toDoUserIdInputInvDiv = document.getElementById('toDoUserIdInputInvDiv');
const toDoTitleInput = document.getElementById('toDoTitleInput');
const toDoTitleInputInvDiv = document.getElementById('toDoTitleInputInvDiv');
const toDoAddNewBtn = document.getElementById('toDoAddNewBtn');
const toDoUpdBtn = document.getElementById('toDoUpdBtn');
const toDoDelBtn = document.getElementById('toDoDelBtn');
const toDoMarkComplChBox = document.getElementById('toDoMarkComplChBox');
const toDoActOptGr = document.getElementById('toDoActOptGr');
const toDoComplOptGr = document.getElementById('toDoComplOptGr');

// TODOS ALL ITEMS LISTS CONTAINER ELEMENT CONSTANT
const toDosStatsContainer = document.getElementById('toDosStatsContainer');

// TODOS ALL ACTIVE LIST ELEMENTS CONSTANTS
const toDosActListPnl = document.getElementById('toDosActListPnl');
const toDosActRstSortBtn = document.getElementById('toDosActRstSortBtn');
const toDosActDelSelBtn = document.getElementById('toDosActDelSelBtn');
const toDosActMoveToComplBtn = document.getElementById('toDosActMoveToComplBtn');
const toDosActSelAllChBoxLbl = document.getElementById('toDosActSelAllChBoxLbl');
const toDosActSelAllChBox = document.getElementById('toDosActSelAllChBox');
const toDosActSortByBtnsLbl = document.getElementById('toDosActSortByBtnsLbl');
const toDosActSortByIdBtn = document.getElementById('toDosActSortByIdBtn');
const toDosActSortByUserIdBtn = document.getElementById('toDosActSortByUserIdBtn');
const toDosActSortByTitleBtn = document.getElementById('toDosActSortByTitleBtn');
const toDosActList = document.getElementById('toDosActList');

// TODOS ALL COMPLETED LIST ELEMENTS CONSTANTS
const toDosComplListPnl = document.getElementById('toDosComplListPnl');
const toDosComplRstSortBtn = document.getElementById('toDosComplRstSortBtn');
const toDosComplDelSelBtn = document.getElementById('toDosComplDelSelBtn');
const toDosComplMoveToActBtn = document.getElementById('toDosComplMoveToActBtn');
const toDosComplSelAllChBoxLbl = document.getElementById('toDosComplSelAllChBoxLbl');
const toDosComplSelAllChBox = document.getElementById('toDosComplSelAllChBox');
const toDosComplSortByBtnsLbl = document.getElementById('toDosComplSortByBtnsLbl');
const toDosComplSortByIdBtn = document.getElementById('toDosComplSortByIdBtn');
const toDosComplSortByUserIdBtn = document.getElementById('toDosComplSortByUserIdBtn');
const toDosComplSortByTitleBtn = document.getElementById('toDosComplSortByTitleBtn');
const toDosComplList = document.getElementById('toDosComplList');

let toDosArray = [];
let toDosArrayCompleted = [];
let toDosArrayActive = [];
let toDosActSelectedArray = [];
let toDosComplSelectedArray = [];
let toDoSelected = '';

////////////////////////////////////
//  TODOS LISTS CONTROL FUNCTIONS //
////////////////////////////////////

// SORTING FUNCTIONS =====>
function toDosSortByDraw(sortBy, completed) {
    completed ? toDosComplList.innerHTML = '' : toDosActList.innerHTML = '';
    completed ? toDoComplOptGr.innerHTML = '' : toDoActOptGr.innerHTML = '';

    let sortListArray = completed ? [...toDosArrayCompleted] : [...toDosArrayActive];
    completed ? sortBtnsReset(true) : sortBtnsReset(false);
    completed ? toDosComplRstSortBtn.hidden = false : toDosActRstSortBtn.hidden = false;

    if (sortBy === 'id') {
        if (!sortListArray.every((b, i, { [i - 1]: a }) => !a || a.id < b.id) && !sortListArray.every((b, i, { [i - 1]: a }) => !a || a.id > b.id)) {            
            sortListArray.sort((a, b) => a.id - b.id);
            completed ? toDosComplSortByIdBtn.innerText = 'ID \u21E3\u21E3\u21E3' : toDosActSortByIdBtn.innerText = 'ID \u21E3\u21E3\u21E3';

            // console.log('SORT BY ID = 1 = DOWN');
        } else if (sortListArray.every((b, i, { [i - 1]: a }) => !a || a.id < b.id) && !sortListArray.every((b, i, { [i - 1]: a }) => !a || a.id > b.id)) {            
            sortListArray.sort((a, b) => b.id - a.id);
            completed ? toDosComplSortByIdBtn.innerText = 'ID \u21E1\u21E1\u21E1' : toDosActSortByIdBtn.innerText = 'ID \u21E1\u21E1\u21E1';
            
            // console.log('SORT BY ID = 2 = UP');
        } else if (!sortListArray.every((b, i, { [i - 1]: a }) => !a || a.id < b.id) && sortListArray.every((b, i, { [i - 1]: a }) => !a || a.id > b.id)) {            
            sortListArray.sort((a, b) => a.id - b.id);
            completed ? toDosComplSortByIdBtn.innerText = 'ID \u21E3\u21E3\u21E3' : toDosActSortByIdBtn.innerText = 'ID \u21E3\u21E3\u21E3';

            // console.log('SORT BY ID = 3 = DOWN');
        }
    } 

    if (sortBy === 'userId') {
        if (!sortListArray.every((a, i) => (i === 0 || a.userId <= sortListArray[i - 1].userId)) && !sortListArray.every((a, i) => (i === 0 || a.userId >= sortListArray[i - 1].userId))) {            
            sortListArray.sort((a, b) => a.userId - b.userId);
            completed ? toDosComplSortByUserIdBtn.innerText = 'User ID \u21E3\u21E3\u21E3' : toDosActSortByUserIdBtn.innerText = 'User ID \u21E3\u21E3\u21E3';

            // console.log('SORT BY USER ID = 1 = DOWN');
        } else if (!sortListArray.every((a, i) => (i === 0 || a.userId <= sortListArray[i - 1].userId)) && sortListArray.every((a, i) => (i === 0 || a.userId >= sortListArray[i - 1].userId))) {            
            sortListArray.sort((a, b) => b.userId - a.userId);
            completed ? toDosComplSortByUserIdBtn.innerText = 'User ID \u21E1\u21E1\u21E1' : toDosActSortByUserIdBtn.innerText = 'User ID \u21E1\u21E1\u21E1';
            
            // console.log('SORT BY USER ID = 2 = UP');
        } else if (sortListArray.every((a, i) => (i === 0 || a.userId <= sortListArray[i - 1].userId)) && !sortListArray.every((a, i) => (i === 0 || a.userId >= sortListArray[i - 1].userId))) {            
            sortListArray.sort((a, b) => a.userId - b.userId);
            completed ? toDosComplSortByUserIdBtn.innerText = 'User ID \u21E3\u21E3\u21E3' : toDosActSortByUserIdBtn.innerText = 'User ID \u21E3\u21E3\u21E3';

            // console.log('SORT BY USER ID = 3 = DOWN');
        }
    } 
    
    if (sortBy === 'title') {
        if (!sortListArray.every((b, i, { [i - 1]: a }) => !a || a.title.trim().toLowerCase() < b.title.trim().toLowerCase()) && !sortListArray.every((b, i, { [i - 1]: a }) => !a || a.title.trim().toLowerCase() > b.title.trim().toLowerCase())) {            
            sortListArray.sort((a, b) => a.title.toLowerCase().trim().localeCompare(b.title.trim().toLowerCase()));
            completed ? toDosComplSortByTitleBtn.innerText = 'Title \u21E3\u21E3\u21E3' : toDosActSortByTitleBtn.innerText = 'Title \u21E3\u21E3\u21E3';

            // console.log('SORT BY TITLE = 1 = DOWN');
        } else if (sortListArray.every((b, i, { [i - 1]: a }) => !a || a.title.trim().toLowerCase() < b.title.trim().toLowerCase()) && !sortListArray.every((b, i, { [i - 1]: a }) => !a || a.title.trim().toLowerCase() > b.title.toLowerCase())) {            
            sortListArray.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.trim().toLowerCase()));
            completed ? toDosComplSortByTitleBtn.innerText = 'Title \u21E1\u21E1\u21E1' : toDosActSortByTitleBtn.innerText = 'Title \u21E1\u21E1\u21E1';

            // console.log('SORT BY TITLE = 2 = UP');
        } else if (!sortListArray.every((b, i, { [i - 1]: a }) => !a || a.title.trim().toLowerCase() < b.title.trim().toLowerCase()) && sortListArray.every((b, i, { [i - 1]: a }) => !a || a.title.trim().toLowerCase() > b.title.trim().toLowerCase())) {            
            sortListArray.sort((a, b) => a.title.trim().toLowerCase().localeCompare(b.title.trim().toLowerCase()));
            completed ? toDosComplSortByTitleBtn.innerText = 'Title \u21E3\u21E3\u21E3' : toDosActSortByTitleBtn.innerText = 'Title \u21E3\u21E3\u21E3';
    
            // console.log('SORT BY TITLE = 3 = DOWN');
        }
    }

    completed ? toDosArrayCompleted = [...sortListArray] : toDosArrayActive = [...sortListArray];
    completed ? addToDosFromArray(toDosArrayCompleted) : addToDosFromArray(toDosArrayActive);

    // toDosConsoleDataPrint();   
}

toDosComplRstSortBtn.onclick = () => {
    toDosArrayCompleted = toDosArray.filter(t => t.completed);

    toDosComplList.innerHTML = '';

    toDoComplOptGr.innerHTML = '';

    addToDosFromArray(toDosArrayCompleted);
    sortBtnsReset(true);
}

toDosActRstSortBtn.onclick = () => {
    toDosArrayActive = toDosArray.filter(t => !t.completed);

    toDosActList.innerHTML = '';

    toDoActOptGr.innerHTML = '';

    addToDosFromArray(toDosArrayActive);
    sortBtnsReset(false);
}

toDosComplSortByIdBtn.onclick = () => {
    toDosSortByDraw('id', true);
}

toDosComplSortByUserIdBtn.onclick = () => {
    toDosSortByDraw('userId', true);
}

toDosComplSortByTitleBtn.onclick = () => {
    toDosSortByDraw('title', true);
}

toDosActSortByIdBtn.onclick = () => {
    toDosSortByDraw('id', false);
}

toDosActSortByUserIdBtn.onclick = () => {
    toDosSortByDraw('userId', false);
}

toDosActSortByTitleBtn.onclick = () => {
    toDosSortByDraw('title', false);
}
// =====> END OF SORTING FUNCTIONS

// DELETE FUNCTIONS =====>
function deleteToDo(id, completed) {
    let indexInSelectedArray = completed ? toDosArrayCompleted.findIndex(toDos => toDos.id === id) :
        toDosArrayActive.findIndex(toDos => toDos.id === id);
    let indexInToDoArray = toDosArray.findIndex(toDoArray => toDoArray.id === id);
    let toDo = toDosArray[indexInToDoArray];
    let divColTodo = document.getElementById(`${id} divColTodo`);
    let optionToDo = document.getElementById(`${id} optionToDo`);

    newToDoFormInputsChange(true, toDo);
    
    divColTodo.remove();
    optionToDo.remove();

    toDosArray.splice(indexInToDoArray, 1);
    completed ? toDosArrayCompleted.splice(indexInSelectedArray, 1) : toDosArrayActive.splice(indexInSelectedArray, 1);
}

toDosComplDelSelBtn.onclick = () => {
    if (confirm('Do you want to delete selected ToDos?')) {
        let idSelected = toDoSelected.id;
        toDosComplSelectedArray.forEach((selected) => {
            deleteToDo(+selected.id.split(' ')[0], true);
        });
        toDosComplSelectedArray = [];

        toDosCtrlPnlVisibility();
    
        toDoSelected = toDosArray[toDosArray.findIndex(t => t.id === idSelected)];
        try {
            newToDoFormInputsChange(false, toDoSelected);    
        } catch (error) {
            
        }
    
        // toDosConsoleDataPrint(); 
    }
}

toDosActDelSelBtn.onclick = () => {
    if (confirm('Do you want to delete selected ToDos?')) {
        let idSelected = toDoSelected.id;
        toDosActSelectedArray.forEach((selected, index) => {
            deleteToDo(+selected.id.split(' ')[0], false);
        });
        toDosActSelectedArray = [];

        toDosCtrlPnlVisibility();
    
        toDoSelected = toDosArray[toDosArray.findIndex(t => t.id === idSelected)];
        try {
            newToDoFormInputsChange(false, toDoSelected);    
        } catch (error) {
            
        }
    
        // toDosConsoleDataPrint(); 
    }
}
// END OF DELETE FUNCTION =====>

// MOVE FUNCTIONS =====>
toDosComplMoveToActBtn.onclick = () => {
    for (let i = toDosComplSelectedArray.length - 1; i >= 0; i--) {
        let indexInToDoArray = toDosArray.findIndex(toDoArray => toDoArray.id === +toDosComplSelectedArray[i].id.split(' ')[0]);
        let toDo = toDosArray[indexInToDoArray];
        let divColTodo = document.getElementById(`${toDo.id} divColTodo`);
        let pToDoCompleted = document.getElementById(`${toDo.id} pToDoCompleted`);
        let chBoxToDoId = document.getElementById(`${toDo.id} chBoxToDoId`);
        let optionToDo = document.getElementById(`${toDo.id} optionToDo`);
        let aToDo = document.getElementById(`${toDo.id} aToDo`);
    
        toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo)

        chBoxToDoId.checked = !chBoxToDoId.checked;
        aToDo.classList.replace('border-primary', 'border-light');

        if (aToDo.classList.contains('active')) newToDoFormInputsChange(false, toDo);   
    }

    toDosComplSelectedArray = [];

    toDosCtrlPnlVisibility();

    sortBtnsReset(false);

    // toDosConsoleDataPrint();
}

toDosActMoveToComplBtn.onclick = () => {
    for (let i = toDosActSelectedArray.length - 1; i >= 0; i--) {
        let indexInToDoArray = toDosArray.findIndex(toDoArray => toDoArray.id === +toDosActSelectedArray[i].id.split(' ')[0]);
        let toDo = toDosArray[indexInToDoArray];
        let divColTodo = document.getElementById(`${toDo.id} divColTodo`);
        let pToDoCompleted = document.getElementById(`${toDo.id} pToDoCompleted`);
        let chBoxToDoId = document.getElementById(`${toDo.id} chBoxToDoId`);
        let optionToDo = document.getElementById(`${toDo.id} optionToDo`);
        let aToDo = document.getElementById(`${toDo.id} aToDo`);
    
        toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo)

        chBoxToDoId.checked = !chBoxToDoId.checked;
        aToDo.classList.replace('border-primary', 'border-light');

        if (aToDo.classList.contains('active')) newToDoFormInputsChange(false, toDo);     
    }

    toDosActSelectedArray = [];

    toDosCtrlPnlVisibility();

    sortBtnsReset(true);

    // toDosConsoleDataPrint();
}
// =====> END OF MOVE FUNCTIONS

// SELECT ALL CHECKBOX FUNCTIONS =====>
toDosComplSelAllChBox.onchange = () => {
    toDosComplSelectedArray = [];

    if (toDosComplSelAllChBox.checked) {
        toDosComplList.querySelectorAll('div>div>a>input').forEach(i => {
            if (i.checked) {
                i.checked = !i.checked;
                i.parentElement.classList.replace('border-primary', 'border-light');
            }
            i.checked = !i.checked;
            i.parentElement.classList.replace('border-light', 'border-primary');
            toDosComplSelectedArray.push(i.parentElement.parentElement.parentElement);
        });
    } else {
        toDosComplList.querySelectorAll('div>div>a>input').forEach(i => {
            if (i.checked) {
                i.checked = !i.checked;
                i.parentElement.classList.replace('border-primary', 'border-light');
            }
        });
    }

    toDosCtrlPnlVisibility();

    // toDosConsoleDataPrint();
}

toDosActSelAllChBox.onclick = () => {
    toDosActSelectedArray = [];

    if (toDosActSelAllChBox.checked) {
        toDosActList.querySelectorAll('div>div>a>input').forEach(i => {
            if (i.checked) {
                i.checked = !i.checked;
                i.parentElement.classList.replace('border-primary', 'border-light');
            }
            i.checked = !i.checked;
            i.parentElement.classList.replace('border-light', 'border-primary');
            toDosActSelectedArray.push(i.parentElement.parentElement.parentElement);
        });
    } else {
        toDosActList.querySelectorAll('div>div>a>input').forEach(i => {
            if (i.checked) {
                i.checked = !i.checked;
                i.parentElement.classList.replace('border-primary', 'border-light');
            }
        });
    }

    toDosCtrlPnlVisibility();

    // toDosConsoleDataPrint();
}
// END OF SELECT ALL CHECKBOX FUNCTIONS =====>

// TODOS LISTS SPECIFIC ELEMENT ONCLICK AND REDRAW LISTS FUNCTIONS =====>

// SUPPLEMENTARY FUNCTION FOR FUNCTION 'addToDosFromArray' THAT DRAWS EACH ELEMENT TO THE LIST OF 
// ACTIVE OR COMPLETED TODO'S FROM THE FETCHED ARRAY.
// IT IS ALSO CALLED INDIVIDUALLY WHEN NEW ELEMENT IS ADDED FROM THE FORM
function toDoDraw(toDo, append) {
    let {userId, id, title, completed} = toDo;

    const divColTodo = document.createElement('div');
    divColTodo.className = 'col-6';
    divColTodo.id = `${id} divColTodo`;

    const divRowToDo = document.createElement('div');
    divRowToDo.className = 'row';
    divRowToDo.id = `${id} divRowToDo`;

    const aToDo = document.createElement('a');
    aToDo.className = 'border border-5 border-light rounded-4 list-group-item list-group-item-action list-group-item-primary itemListElement p-0';
    aToDo.id = `${id} aToDo`;
    aToDo.style.cursor = 'pointer';
    aToDo.onclick = (event) => toDoClick(event, toDo);

    const pToDoUserId = document.createElement('p');
    pToDoUserId.className = 'ps-3 m-0 text-center fw-bold bg-info rounded-top-4 w-100';
    pToDoUserId.id = `${id} pToDoUserId`;
    pToDoUserId.innerText = `ToDo ID: ${id}`;

    const chBoxToDoId = document.createElement('input');
    chBoxToDoId.type = 'checkbox';
    chBoxToDoId.className = 'position-absolute top-0 end-0 me-3 mt-1';        
    chBoxToDoId.id = `${id} chBoxToDoId`;

    const hToDoUserId = document.createElement('h4');
    hToDoUserId.className = 'p-2 m-0 fw-bold text-center';
    hToDoUserId.id = `${id} hToDoUserId`;
    hToDoUserId.innerText = `User ID: ${userId}`;

    const pToDoTitle = document.createElement('p');
    pToDoTitle.className = 'p-3 m-0 border-top border-light';
    pToDoTitle.id = `${id} pToDoTitle`;
    pToDoTitle.innerText = `${title}`;

    const pToDoCompleted = document.createElement('p');
    pToDoCompleted.className = completed ? 'text-center text-white fw-bold bg-success p-0 m-0 rounded-bottom-4 w-100' : 
    'text-center text-white fw-bold bg-primary p-0 m-0 rounded-bottom-4 w-100';
    pToDoCompleted.id = `${id} pToDoCompleted`;
    pToDoCompleted.innerText = completed ? 'Completed' : 'Active';
    pToDoCompleted.onmousemove = () => {
        pToDoCompleted.innerText = completed ? '\u21E6   Move to Activate!' : 'Move to Complete!   \u21E8';

    };
    pToDoCompleted.onmouseleave = () => {
        pToDoCompleted.innerText = completed ? 'Completed' : 'Active';
    }

    aToDo.append(pToDoUserId, chBoxToDoId, hToDoUserId, pToDoTitle, pToDoCompleted);
    divRowToDo.appendChild(aToDo);
    divColTodo.appendChild(divRowToDo);

    const optionToDo = document.createElement('option');
    optionToDo.id = `${id} optionToDo`;
    optionToDo.value = `${id}`;
    optionToDo.innerText = `ID: ${id}, User ID: ${userId}, Title: ${title}`;

    if (!!toDoSelected && toDoSelected.id === id) {
        optionToDo.selected = true;
        aToDo.classList.add('active');
    }

    if (completed) {
        append ? toDosComplList.appendChild(divColTodo) : toDosComplList.prepend(divColTodo);
        append ? toDoComplOptGr.appendChild(optionToDo) : toDoComplOptGr.prepend(optionToDo);
    } else {
        append ? toDoActOptGr.appendChild(optionToDo) : toDoActOptGr.prepend(optionToDo);
        append ? toDosActList.appendChild(divColTodo) : toDosActList.prepend(divColTodo);
    }
}

// FUNCTION THAT CALLS SUPPLEMENTARY DRAW ELEMENT FUNCTION 'toDoDraw' TO ADD TODOS FROM ARRAYS TO THE LISTS.
// IT ALSO REDRAWS EACH ELEMENT AFTER CALL OF SORT FUNCTION
function addToDosFromArray(toDos) {
    toDos.forEach((toDo) => toDoDraw(toDo, true));
    toDosCtrlPnlVisibility();

    // toDosConsoleDataPrint();
};

// SUPPLEMENTARY FUNCTION THAT CHANGES TODOS CONTROL PANEL ELEMENTS BEHAVIOR BASED ON INFORMATION STORED IN ARRAYS OR SELECTED ELEMENTS
function toDosCtrlPnlVisibility() {
    toDosComplSortByBtnsLbl.hidden = toDosArrayCompleted.length > 0 ? false : true;
    toDosActSortByBtnsLbl.hidden = toDosArrayActive.length > 0 ? false : true;

    toDosComplDelSelBtn.hidden = toDosComplSelectedArray.length > 0 ? false : true;
    toDosActDelSelBtn.hidden = toDosActSelectedArray.length > 0 ? false : true;

    toDosComplMoveToActBtn.hidden = toDosComplSelectedArray.length > 0 ? false : true; 
    toDosActMoveToComplBtn.hidden = toDosActSelectedArray.length > 0 ? false : true;     
    
    toDosComplSelAllChBoxLbl.hidden = toDosArrayCompleted.length > 0 ? false : true;
    toDosActSelAllChBoxLbl.hidden = toDosArrayActive.length > 0 ? false : true;  

    toDosComplSelAllChBox.checked = toDosComplSelectedArray.length > 0 ? true : false;
    toDosActSelAllChBox.checked = toDosActSelectedArray.length > 0 ? true : false;
}

// SUPPLEMENTARY FUNCTION THAT RESTORES RESET SETTINGS TO DEFAULT. 
// IT IS USED WHEN TODO ELEMENT IS MOVED BETWEEN THE LISTS OR NEW IS ADDED
function sortBtnsReset(completed) {
    if (completed) {
        toDosComplSortByIdBtn.innerText = 'ID';
        toDosComplSortByUserIdBtn.innerText = 'User ID';
        toDosComplSortByTitleBtn.innerText = 'Title';
        toDosComplRstSortBtn.hidden = true;
    } else {
        toDosActSortByIdBtn.innerText = 'ID';
        toDosActSortByUserIdBtn.innerText = 'User ID';
        toDosActSortByTitleBtn.innerText = 'Title';
        toDosActRstSortBtn.hidden = true;
    }
}

// SUPPLEMENTARY FUNCTION CALLED TO DRAW MOVED TODO BETWEEN LISTS
function toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo) {
    toDo.completed = toDo.completed ? false : true;
    if (toDo.completed) {
        toDosComplList.prepend(divColTodo);
        toDoComplOptGr.prepend(optionToDo);
        let toDosArrayActiveIndex = toDosArrayActive.findIndex(t => t.id === toDo.id); 
        toDosArrayActive.splice(toDosArrayActiveIndex, 1);
        toDosArrayCompleted.unshift(toDo);
    } else {
        toDosActList.prepend(divColTodo);
        toDoActOptGr.prepend(optionToDo);
        let toDosArrayCompletedIndex = toDosArrayCompleted.findIndex(t => t.id === toDo.id); 
        toDosArrayCompleted.splice(toDosArrayCompletedIndex, 1);
        toDosArrayActive.unshift(toDo);
    }
    
    let indexToDo = toDosArray.findIndex((t) => t.id === toDo.id);
    toDosArray.splice(indexToDo, 1);
    let indexFirstCompleted = toDosArray.findIndex((t) => toDo.completed ? t.completed : !t.completed);
    toDosArray.splice(indexFirstCompleted, 0, toDo);    

    pToDoCompleted.className = !toDo.completed ? 'text-center text-white fw-bold bg-primary p-0 m-0 rounded-bottom-4 w-100' :
        'text-center text-white fw-bold bg-success p-0 m-0 rounded-bottom-4 w-100';
    pToDoCompleted.innerText = !toDo.completed ? 'Active' : 'Completed';     
    pToDoCompleted.onmousemove = () => pToDoCompleted.innerText = !toDo.completed ? 'Move to Complete!   \u21E8' : 
        '\u21E6   Move to Activate!';
    pToDoCompleted.onmouseleave = () => pToDoCompleted.innerText = !toDo.completed ? 'Active' : 'Completed';
}


// FUNCTION THAT IS EXECUTED FOR EACH TODO ELEMENT ONCLICK ACTION AND CALLS OTHER 
// FUNCTION BASED TO FIELD CLICKED (MOVE TO COMPLETED, CHECKBOX, ...)
function toDoClick(event, toDo) {
    let divColTodo = document.getElementById(`${toDo.id} divColTodo`);
    let pToDoCompleted = document.getElementById(`${toDo.id} pToDoCompleted`);
    let chBoxToDoId = document.getElementById(`${toDo.id} chBoxToDoId`);
    let optionToDo = document.getElementById(`${toDo.id} optionToDo`);
    let aToDo = document.getElementById(`${toDo.id} aToDo`);

    if (event.target.id.split(' ')[1] === 'pToDoCompleted') {
        
        
        if (chBoxToDoId.checked) chBoxToDoId.checked = false;

        if (toDo.completed) {
            toDosComplSelectedArray = toDosComplSelectedArray.filter(toDosCompl => toDosCompl != divColTodo);
            toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo);
            sortBtnsReset(false);
        } else {
            toDosActSelectedArray = toDosActSelectedArray.filter(toDosCompl => toDosCompl != divColTodo);
            toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo);
            sortBtnsReset(true);
        }

        aToDo.classList.replace('border-primary', 'border-light');
        if (aToDo.classList.contains('active')) newToDoFormInputsChange(false, toDo);

    } else if (event.target.id.split(' ')[1] === 'chBoxToDoId' && event.target.checked) {        
        if (toDo.completed) toDosComplSelectedArray.push(divColTodo);
        else toDosActSelectedArray.push(divColTodo);

        aToDo.classList.replace('border-light', 'border-primary');
    } else if (event.target.id.split(' ')[1] === 'chBoxToDoId' && !event.target.checked) {
        if (toDo.completed) toDosComplSelectedArray = toDosComplSelectedArray.filter(toDosCompl => toDosCompl != divColTodo);
        else toDosActSelectedArray = toDosActSelectedArray.filter(toDosCompl => toDosCompl != divColTodo);

        aToDo.classList.replace('border-primary', 'border-light');

    } else {
        aToDo.classList.contains('active') ? newToDoFormInputsChange(true, toDo) : 
        newToDoFormInputsChange(false, toDo);
    }

    toDosCtrlPnlVisibility();

    // toDosConsoleDataPrint();
}
// END OF TODOS LISTS CONTROL FUNCTIONS =====>

/////////////////////////////////////
//  DATA FETCH AND DRAW  FUNCTIONS //
/////////////////////////////////////

// DATA FETCH FUNCTION TO FETCH TEST DATA FROM THE SERVER AND STORING IT IN LOCAL ARRAY FOR FURTHER PROCESSING
async function fetchToDosFromArray() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        toDosArray = await response.json();
        toDosArray = toDosArray.sort((a, b) => b.id - a.id);

        toDosArrayCompleted = [...toDosArray.filter(t => t.completed)];
        toDosArrayActive = [...toDosArray.filter(t => !t.completed)];

        toDosActList.innerHTML = '';
        toDosComplList.innerHTML = '';
    
        toDoActOptGr.innerHTML = '';
        toDoComplOptGr.innerHTML = '';

        addToDosFromArray(toDosArrayCompleted);
        addToDosFromArray(toDosArrayActive);

        // toDosConsoleDataPrint();
    } catch (error) {
        console.log('Resource is not responding. Error code is: ' + error);
    } 
}

fetchToDosFromArray();

///////////////////////////////////
//    FORM  CONTROL FUNCTIONS    //
///////////////////////////////////

// FUNCTION THAT CALLS UP DELETE FUNCTION FOR CHOSEN TODO
toDoDelBtn.onclick = (event) => {
    if (confirm('Do you want to delete this ToDo?')) {
        deleteToDo(+toDoIdInput.value, toDoSelected.completed);
    }    
}

// FUNCTION TO SELECT AND REFLECT TODO'S DATA OF THE ELEMENT SELECTED FROM DROPDOWN LIST
toDoSelDrDnList.onchange = () => {    
    if (!toDoSelDrDnList.children.item(1).selected) {
        let toDo = toDosArrayActive.find(t => t.id === +toDoSelDrDnList.value);
        newToDoFormInputsChange (false, toDo);
        document.getElementById(`${toDo.id} divColTodo`).scrollIntoView();
    } else if (toDoSelDrDnList.children.item(1).selected) {
        newToDoFormInputsChange (true, toDoSelected);
    }
}

// SUPPLEMENTARY FUNCTION THAT REFLECTS AND STYLES THE DATA AND FROM CHOSEN TODO IN THE TODOS LISTS
function newToDoFormInputsChange(isNewToDo, toDo) {
    let {userId, id, title, completed} = toDo;
    let optionToDo = document.getElementById(`${toDo.id} optionToDo`);
    let aToDo = document.getElementById(`${toDo.id} aToDo`);


    if (isNewToDo) {
        optionToDo.selected = false;
        toDoIdInput.value = '';
        toDoIdInput.disabled = false;
        toDoUserIdInput.value = '';
        toDoUserIdInput.disabled = false;
        toDoTitleInput.value = '';
        toDoAddNewBtn.hidden = false;
        toDoUpdBtn.hidden = true;
        toDoDelBtn.hidden = true;
        toDoMarkComplChBox.checked = false;
        toDoSelDrDnList.firstElementChild.selected = true;
        aToDo.classList.remove('active');
        toDoSelected = '';
    } else {
        optionToDo.selected = true;
        toDoIdInput.value = id;
        toDoIdInput.disabled = true;
        toDoUserIdInput.value = userId;
        toDoUserIdInput.disabled = true;
        toDoTitleInput.value = title;
        toDoAddNewBtn.hidden = true;
        toDoUpdBtn.hidden = false;
        toDoDelBtn.hidden = false;
        toDoMarkComplChBox.checked = completed ? true : false;
        toDosComplList.querySelectorAll('div>div>a').forEach(a => {
            if (a.classList.contains('active')) a.classList.remove('active');
            
        });
        toDosActList.querySelectorAll('div>div>a').forEach(a => {
            if (a.classList.contains('active')) a.classList.remove('active');
            
        });
        aToDo.classList.add('active');
        toDoSelected = {...toDo};
    }    
}

// NEW TODO FORM ONSUBMIT ACTION FUNCTION THAT SUBMITS AND CALLS DATA VERIFICATION FOR NEW OR MODIFIED TODO
newToDoForm.onsubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (checkToDoBadData()) {
        return;
    }
    addUpdateToDo();
}

// SUPPLEMENTARY FUNCTION FOR FUNCTION TO CHANGE TODO'S FORM'S INPUTS VALIDITY CLASSES
function changeClassValidity(element, className1, className2) {
    if (!element.classList.contains(className1) || element.classList.contains(className2)) {
        if (element.classList.contains(className2)) {
            element.classList.replace(className2, className1);
        } else {
            element.classList.add(className1);
        }        
    }
}

// SUPPLEMENTARY FUNCTION THAT VERIFIES TODO'S FORM DATA ENTRY
function checkToDoBadData() {
    let badData = false;
    
    if (!toDoAddNewBtn.hidden) {
        if (!toDoIdInput.value || toDosArray.some(t =>  t.id === +toDoIdInput.value) || +toDoIdInput.value <= 0) {
            changeClassValidity(toDoIdInput, 'is-invalid', 'is-valid');
            toDoIdInputInvDiv.innerText = toDosArray.some(t =>  t.id === +toDoIdInput.value) ? 
            "The record with this ID already exists! Please enter another ID!" : +toDoIdInput.value <= 0 ? "ToDo's ID value must be higher than 0!" : "ToDo's ID field is empty!";
            badData = true;
        } else {
            changeClassValidity(toDoIdInput, 'is-valid', 'is-invalid');
        }  
    
        if (!toDoUserIdInput.value || +toDoUserIdInput.value <= 0) {
            changeClassValidity(toDoUserIdInput, 'is-invalid', 'is-valid');
            toDoUserIdInputInvDiv.innerText = !toDoUserIdInput.value ? "User's ID name field is empty!" : "ToDo's User's ID value must be higher than 0!";
            badData = true;
        } else {
            changeClassValidity(toDoUserIdInput, 'is-valid', 'is-invalid');
        }
    }

    if (!toDoTitleInput.value) {
        changeClassValidity(toDoTitleInput, 'is-invalid', 'is-valid');
        toDoTitleInputInvDiv.innerText = "Title field is empty!";
        badData = true;
    } else {
        changeClassValidity(toDoTitleInput, 'is-valid', 'is-invalid');
    }

    return badData;    
}

// FUNCTION THAT REMOVES VALIDITY CLASS OF TODO'S FORM INPUTS
function itemClassRemoveValid() {
    toDoIdInput.classList.remove('is-valid');
    toDoUserIdInput.classList.remove('is-valid');
    toDoTitleInput.classList.remove('is-valid');   
}

// MAIN FUNCTION TO ADD NEW OR UPDATE EXISTING TODO
function addUpdateToDo() {

    const newToDo = {
        userId: +toDoUserIdInput.value,
        id: +toDoIdInput.value,
        title: toDoTitleInput.value,
        completed: toDoMarkComplChBox.checked ? true : false
    }

    if (!toDosArray.some(t =>  t.id === +newToDo.id)) {
        toDosArray.unshift(newToDo);
        if (newToDo.completed) {
            toDosArrayCompleted.unshift(newToDo);
            sortBtnsReset(true);
        } else {
            toDosArrayActive.unshift(newToDo);
            sortBtnsReset(false);
        }        
        toDoDraw(newToDo, false);
    } else {
        let pToDoTitle = document.getElementById(`${newToDo.id} pToDoTitle`);
        let pToDoCompleted = document.getElementById(`${newToDo.id} pToDoCompleted`);
        let divColTodo = document.getElementById(`${newToDo.id} divColTodo`);
        let chBoxToDoId = document.getElementById(`${newToDo.id} chBoxToDoId`);
        let optionToDo = document.getElementById(`${newToDo.id} optionToDo`);
        let aToDo = document.getElementById(`${newToDo.id} aToDo`);

        let toTosArrayIndex = toDosArray.findIndex(t => t.id === newToDo.id);
        let toDosArrayActiveIndex = toDosArrayActive.findIndex(t => t.id === newToDo.id);   
        let toDosArrayCompletedIndex = toDosArrayCompleted.findIndex(t => t.id === newToDo.id);   
        let toDo = [];
        toDosArray[toTosArrayIndex].title = newToDo.title;
        pToDoTitle.innerText = newToDo.title;
        if (toDosArrayActiveIndex === -1) {
            toDosArrayCompleted[toDosArrayCompletedIndex].title = newToDo.title;
            toDo = toDosArrayCompleted[toDosArrayCompletedIndex];
        } else {
            toDosArrayActive[toDosArrayActiveIndex].title = newToDo.title;
            toDo = toDosArrayActive[toDosArrayActiveIndex];
        }

        if (toDo.completed != newToDo.completed) {
            if (chBoxToDoId.checked) chBoxToDoId.checked = false;

            if (toDo.completed) {
                toDosComplSelectedArray = toDosComplSelectedArray.filter(toDosCompl => toDosCompl != divColTodo);
                toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo);
                sortBtnsReset(false);
            } else {
                toDosActSelectedArray = toDosActSelectedArray.filter(toDosCompl => toDosCompl != divColTodo);
                toDosMoveDraw(divColTodo, optionToDo, pToDoCompleted, toDo);
                sortBtnsReset(true);
            }
    
            if (aToDo.classList.contains('active')) newToDoFormInputsChange(false, toDo);
        }
        
    }
    
    if (!toDoAddNewBtn.hidden) {
        toDoIdInput.value = '';
        toDoUserIdInput.value = '';
        toDoTitleInput.value = '';     
    }

    try {
        itemClassRemoveValid();   
    } catch (error) {

    }

    toDosConsoleDataPrint();
}

// ==========>>>>>>>

// SUPPLEMENTARY FUNCTION TO SHOW DATA FOR BUG FIXING PURPOSE
function toDosConsoleDataPrint() {
    console.log('Main ARRAY:');
    console.log(toDosArray);
    console.log('Active ARRAY:');
    console.log(toDosArrayActive);
    console.log('Completed ARRAY:');
    console.log(toDosArrayCompleted);
    console.log('ARRAY OF ACTIVE CHECKED DIVS');
    console.log(toDosActSelectedArray);
    console.log('ARRAY OF COMPLETED CHECKED DIVS');
    console.log(toDosComplSelectedArray);
    console.log('Selected ToDo:');
    console.log(toDoSelected);    
}