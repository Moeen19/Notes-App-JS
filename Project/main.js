const homepage = document.querySelector('.homepage');
const notemain = document.querySelector('.notemain')
const button = document.querySelector('button');
const btn = document.querySelector('.AddRem');
const home = document.querySelector('a');
const remove = document.querySelector('.rem');
const add = document.querySelector('.add');
let ncr = document.querySelector('.ncr');
let title1 = document.querySelector('.title');
let note1 = document.querySelector('.note');
const update = document.querySelector('.update');
const searchInp = document.querySelector('#search');
const timeStamp = () => Date.now();
let array = [];
// let t = moment().fromNow();
// console.log(t)
// let timeText = document.createTextNode(`LastEdited: ${moment(timeStamp).fromNow()}`);
let localNotes = localStorage.getItem('my-notes');
let activeItem;
let updateItem;

// function to getItems
const notes = (b) => {
    if (b) {
        array = [...JSON.parse(b)];
    }
    ncr.innerHTML = null;
    array.forEach((item) => {
        const li = document.createElement('li');
        // const liT = document.createTextNode(item.title);
        // li.appendChild(liT);
        li.style.cursor = 'pointer';
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = '250px';
        li.style.width = '100%';
        div3.classList.add('hidden');
        // let n = document.createTextNode(showTime(item.Edited));
        li.innerHTML = `<p>${item.title}</p><span>LastEdited: ${showTime(item.Edited)}</span>`;
        // li.append(n);
        li.addEventListener('click', () => {
            document.querySelector('#span').classList.remove('hidden')
            document.querySelector('#span').innerText = `Edited: ${showTime(item.Edited)}`
            updateItem = item.id;
            add.classList.add('hidden');
            update.classList.remove('hidden');
            notemain.classList.remove('hidden');
            homepage.classList.add('hidden');
            ncr.classList.add('hidden');
            let activeItem = { ...item };
            title1.value = activeItem.title;
            note1.value = activeItem.description;
        });
        ncr.appendChild(li);
    });
};

// Update Button
update.addEventListener('click', (e) => {
    let updArr = array.map((item) => {
        if (item.id === updateItem) {
            let a = Date.now();
            id = item.id;
            item.title = title1.value;
            item.description = note1.value;
            item.Edited = a;
        };
        return item;
    });
    notes(JSON.stringify(updArr)); 
    homepage.classList.remove('hidden');
    notemain.classList.add('hidden');
    ncr.classList.remove('hidden')
    location.reload();
    localStorage.setItem('my-notes', JSON.stringify(updArr));
});

const showTime = (Edited) => {
    const difference = Date.now() - Edited;
    const sec = difference / 1000;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;

    if (sec < 60) {
        return `a few secs ago`;
    } else if (min < 2) {
        return `a min ago`
    } else if (sec > 59) {
        return `${Math.floor(min)} mins ago`;
    } else if (hour < 2) {
        return `an hour ago`
    } else if (min > 59) {
        return `${Math.floor(hour)} hours ago`;
    } else if (day < 2) {
        return `a day ago`
    } else if (hour > 23) {
        return `${Math.floor(day)} days ago`
    };

};

// console.log(showTime())





// Get items from the localStorage upon page load.
if (localNotes) {
    JSON.parse(localNotes)
    notes(localNotes);
};


// Create Button
button.addEventListener('click', (e) => {
    // create.classList.add('hidden');
    homepage.classList.add('hidden');
    ncr.classList.add('hidden');
    add.classList.remove('hidden');
    update.classList.add('hidden');
    notemain.classList.remove('hidden');
    // document.querySelector('#span').classList.add('hidden');
    remove.addEventListener('click', () => {
        notemain.classList.add('hidden');
        ncr.classList.remove('hidden');
        homepage.classList.remove('hidden');
    });

    title1.value = '';
    note1.value = '';
});



// Remove Button
remove.addEventListener('click', (e) => {
    const newArr = array.filter((subItem) => {
        return subItem.id !== updateItem;
    });
    localStorage.setItem('my-notes', JSON.stringify(newArr))
    notes(JSON.stringify(newArr));
    add.classList.remove('hidden');
    update.classList.add('hidden');
    notemain.classList.add('hidden');
    homepage.classList.remove('hidden');
    ncr.classList.remove('hidden');
});



// Filter value
const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

// sort function
const sortNotes = (array, sortBy) => {
    if (sortBy === 'byEdited') {
        return array.sort((a, b) => {
            if (a.Edited > b.Edited) {
                return -1;
            } else if (a.Edited < b.Edited) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return array.sort((a, b) => {
            if (a.Created > b.Created) {
                return -1;
            } else if (a.Created < b.Created) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlpha') {
        return array.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            } else if (a.title < b.title) {
                return -1;
            } else {
                return 0;
            }
        })
    }
};

// render
const renderNotes = (array, filters) => {
    array = sortNotes(array, filters.sortBy);
    const neArr = array.filter((item) => {
        return item.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    ncr.innerHTML = '';

    neArr.forEach((item) => {
        const li = document.createElement('li');
        // const liT = document.createTextNode(item.title);
        // li.appendChild(liT);
        li.innerHTML = `<p>${item.title}</p><span>LastEdited: ${showTime(item.Edited)}</span>`;
        li.style.cursor = 'pointer';
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = '250px';
        li.style.width = '100%';
        div3.classList.add('hidden');

        li.addEventListener('click', () => {
            updateItem = item.id;
            add.classList.add('hidden');
            update.classList.remove('hidden');
            notemain.classList.remove('hidden');
            homepage.classList.add('hidden');
            ncr.classList.add('hidden');
            let activeItem = { ...item };
            title1.value = activeItem.title;
            note1.value = activeItem.description;
        });
        ncr.appendChild(li);
    })
}


// sort By
document.querySelector('#sortBy').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(array, filters);
})

// Search filter
searchInp.addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(array, filters);
});


// Home nav
home.addEventListener('click', (e) => {
    homepage.classList.remove('hidden');
    notemain.classList.add('hidden');
    ncr.classList.remove('hidden');
    document.querySelector('#span').classList.add('hidden');
    // notes();
});



// ul styling
ncr.style.marginTop = '30px';
ncr.style.fontSize = '20px';


// Add button
add.addEventListener('click', (e) => {
    notemain.classList.add('hidden');
    homepage.classList.remove('hidden');
    ncr.classList.remove('hidden');
    if (title1.value && note1.value) {
        const li = document.createElement('li');
        const liT = document.createTextNode(`${title1.value}`);
        li.appendChild(liT);
        ncr.appendChild(li);
        const list = {
            title: title1.value,
            description: note1.value,
            id: parseInt(Math.random() * 1000),
            Edited: timeStamp(),
            Created: timeStamp(),
        };
        array.push(list);
        let listJSON = JSON.stringify(array);
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = '250px';
        li.style.width = '100%';
        div3.classList.add('hidden');

        li.addEventListener('click', () => {
            notemain.classList.remove('hidden');
            homepage.classList.add('hidden');
            ncr.classList.add('hidden');
        });
        if (title1.value && note1.value) {
            localStorage.setItem('my-notes', listJSON);
        };
        notes();
        title1.value = '';
        note1.value = '';
    };
});




// console.log(n - m);