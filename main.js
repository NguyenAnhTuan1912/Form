const mainContainer = document.querySelector('#main');
const addButton = document.querySelector('#add');
const deleteButton = document.querySelector('#delete');

addButton.addEventListener('click', (e) => {
    addCheckList();
});

deleteButton.addEventListener('click', (e) => {
    deleteCheckList();
});

function deleteCheckList() {
    const lastContainer = document.querySelector('#main section:last-of-type:not(:first-of-type)');
    mainContainer.removeChild(lastContainer);
}

function addCheckList() {
    const section = document.createElement('section');
    const headerComplete = createHeader();
    const articleComplete = createArticle();
    const addOptionButtonComplete = createButton(() => {articleComplete.append(createLabel())}, 'submit', '#add-input', ['fa-solid', 'fa-plus']);
    const acceptOptionButtonComplete = createButton(() => {acceptAllOption(section)}, 'submit', '#accept-input', ['fa-solid', 'fa-check']);

    section.append(headerComplete, articleComplete, addOptionButtonComplete, acceptOptionButtonComplete);
    mainContainer.append(section);
}

function createHeader() {
    const header = document.createElement('header');
    const titleComplete = createTitle();
    const descriptionComplete = createDescription('(Select one or more option)');

    header.append(titleComplete, descriptionComplete);
    return header;
}

function createTitle() {
    const titleTag = document.createElement('h1');
    titleTag.append('CheckBox này');
    titleTag.contentEditable = true;
    return titleTag;
}

function createDescription(data) {
    const descriptionTag = document.createElement('p');
    descriptionTag.append(data);
    return descriptionTag;
}

function createArticle() {
    const article = document.createElement('article');
    const labelArrayComplete = [];
    labelArrayComplete.push(createLabel());
    labelArrayComplete.push(createLabel());
    labelArrayComplete.push(createLabel());

    article.append(labelArrayComplete[0], labelArrayComplete[1], labelArrayComplete[2]);
    return article;
}

function createLabel() {
    const label = document.createElement('label');
    const inputComplete = createInput('text', 'pending-input');
    const rejectButtonComplete = createButton(() => {deleteParentElement(inputComplete)}, 'submit', '.cancel', ['fa-solid', 'fa-xmark']);

    label.append(inputComplete, rejectButtonComplete);
    return label;
}

function createInput(type, className) {
    const inputTag = document.createElement('input');
    inputTag.type = type;
    inputTag.classList.add(className);
    if(type !== 'checkbox' || type !== 'radio')
        inputTag.placeholder = 'Write you option here...';

    return inputTag;
}

function createButton(callBack, type, buttonStyle, classNameIconArray) {
    const buttonTag = document.createElement('button');
    const iconTag = document.createElement('i');
    buttonTag.type = type;
    if(buttonStyle[0] === '.') {
        buttonTag.classList.add(buttonStyle.slice(1));
    } else if(buttonStyle[0] === '#') {
        buttonTag.id = buttonStyle.slice(1);
    }
    
    iconTag.classList.add(classNameIconArray[0], classNameIconArray[1]);
    buttonTag.append(iconTag);
    buttonTag.addEventListener('click', (e) => {
        console.log('Dm sao khong chay!');
        callBack();
    });
    return buttonTag;
}

/*
    <input type="checkbox" name="role" checked />
    <span class="alternative-checkbox"></span>
    <span class="text">Front-End Developer</span>
*/

function acceptAllOption(parent) {
    const h1TagAccepted = parent.querySelector('header h1');
    const buttonAccepted = parent.querySelectorAll('section button');
    const inputTextAccepted = parent.querySelectorAll('input[type="text"]');

    let buttonLength = buttonAccepted.length;
    let inputTextLength = inputTextAccepted.length;

    if(inputTextLength > 1) {
        inputTextAccepted[0].checked = true;
    }

    for(let i = 0; i < buttonLength; i++) {
        deleteElement(buttonAccepted[i]);
    }

    for(let i = 0; i < inputTextLength; i++) {
        inputTextAccepted[i].type = 'checkbox';
        inputTextAccepted[i].name = 'role';
        inputTextAccepted[i].classList.remove('pending-input');
        inputTextAccepted[i].placeholder = '';
        const checkBoxSpanComplete = createSpan('alternative-checkbox');
        const textSpanComplete = createSpan('text', inputTextAccepted[i].value);
        const lableParent = getParent(inputTextAccepted[i]);
        lableParent.append(checkBoxSpanComplete, textSpanComplete);
    }
    console.log(inputTextAccepted);
    h1TagAccepted.removeAttribute('contentEditable');
}

function createSpan(className, data) {
    const spanTag = document.createElement('span');
    spanTag.classList.add(className);
    if(data !== undefined) {
        spanTag.innerHTML = data;
    } else {
        spanTag.innerHTML = '';
    }
    return spanTag;
}

function getParent(child) {
    return child.parentElement;
}

function deleteElement(child) {
    child.parentElement.removeChild(child);
}

function deleteParentElement(child) {
    child.parentElement.parentElement.removeChild(child.parentElement);
}