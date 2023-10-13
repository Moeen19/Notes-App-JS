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
const div3 = document.querySelector('#div3')
const update = document.querySelector('.update');
const searchInp = document.querySelector('#search');
const timeStamp = () => Date.now();
let array = [];

let localNotes = localStorage.getItem('my-notes');
let activeItem;
let updateItem;

// function to getItems


let notes = (data) => {

    data.forEach((item) => {
        console.log('ss')
        const li = document.createElement('li');
        li.style.cursor = 'pointer';
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = 'auto';
        li.style.marginRight = 'auto';
        li.style.paddingLeft = 'auto';
        li.style.width = '100%';
        div3.classList.add('hidden');
        li.innerHTML = `${item.todo}`;
        li.addEventListener('click', () => {
            document.querySelector('#span').classList.remove('hidden')
            remove.classList.remove('hidden');
            document.querySelector('#span').innerText = `Edited: ${showTime(item.Edited)}`
            updateItem = item.id;
            add.classList.add('hidden');
            update.classList.remove('hidden');
            notemain.classList.remove('hidden');
            homepage.classList.add('hidden');
            ncr.classList.add('hidden');
            let activeItem = { ...item };
            title1.value = activeItem.todo;
            note1.value = activeItem.description;
        });
        ncr.appendChild(li)
    })
}

let gNotes = async () => {
    const response = await fetch('https://dummyjson.com/todos');
    if (response.status === 200) {
        let data = await response.json();
        console.log(data.todos, ' ---')
        array = await data.todos;
        notes(array);
    }
}

gNotes();


// const notes = (b) => {
//     if (b) {
//         array = [...JSON.parse(b)];
//     }
//     ncr.innerHTML = null;
//     array.forEach((item) => {
//         const li = document.createElement('li');
//         li.style.cursor = 'pointer';
//         li.style.background = '#F7F7F7';
//         li.style.border = '1px solid gray';
//         li.style.marginBottom = '20px';
//         li.style.padding = '10px';
//         li.style.maxWidth = '700px';
//         li.style.marginLeft = 'auto';
//         li.style.marginRight = 'auto';
//         li.style.paddingLeft = 'auto';
//         li.style.width = '100%';
//         div3.classList.add('hidden');
//         li.innerHTML = `<p>${item.title}</p><span>LastEdited: ${showTime(item.Edited)}</span>`;
//         li.addEventListener('click', () => {
//             document.querySelector('#span').classList.remove('hidden')
//             remove.classList.remove('hidden');
//             document.querySelector('#span').innerText = `Edited: ${showTime(item.Edited)}`
//             updateItem = item.id;
//             add.classList.add('hidden');
//             update.classList.remove('hidden');
//             notemain.classList.remove('hidden');
//             homepage.classList.add('hidden');
//             ncr.classList.add('hidden');
//             let activeItem = { ...item };
//             title1.value = activeItem.title;
//             note1.value = activeItem.description;
//         });
//         ncr.appendChild(li);
//     });
// };

// Update Button
update.addEventListener('click', (e) => {
    ncr.innerHTML = '';
    let updArr = async () => {
        const request = await fetch('https://dummyjson.com/todos/1', {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: false,
            })
        })
        if (request.status === 200) {
            let data = await request.json();
            // data.id = updateItem
            console.log(data, 'ssg')
            array = array.map((item) => {
                if (item.id === updateItem) {
                    // let a = Date.now();
                    id = item.id;
                    item.todo = title1.value;
                };
                return item;
            })
            console.log(array, 'arr')
            notes(array)
        } else {
            throw new Error('An error has occured')
        }
    }
    updArr()
    // let updArr = array.map((item) => {
    //     if (item.id === updateItem) {
    //         let a = Date.now();
    //         id = item.id;
    //         item.title = title1.value;
    //         item.description = note1.value;
    //         item.Edited = a;
    //     };
    //     return item;
    // });
    // notes(JSON.stringify(updArr));
    homepage.classList.remove('hidden');
    notemain.classList.add('hidden');
    ncr.classList.remove('hidden');
    // localStorage.setItem('my-notes', JSON.stringify(updArr));
});

const showTime = (Edited) => {
    const difference = Date.now() - Edited;
    const sec = difference / 1000;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;

    if (sec < 60) {
        return `a few secs ago`;
    } else if (min <= 59) {
        return min < 2 ? 'a min ago' : `${Math.floor(min)} mins ago`;
    } else if (hour <= 23) {
        return hour < 2 ? 'an hour ago' : `${Math.floor(hour)} hours ago`;
    } else {
        return day < 2 ? `a day ago` : `${Math.floor(day)} days ago`;
    }
};


// Get items from the localStorage upon page load.
// if (localNotes) {
//     JSON.parse(localNotes)
//     notes(localNotes);
// };

// Create Button
button.addEventListener('click', (e) => {
    // create.classList.add('hidden');
    homepage.classList.add('hidden');
    ncr.classList.add('hidden');
    add.classList.remove('hidden');
    update.classList.add('hidden');
    notemain.classList.remove('hidden');
    remove.classList.add('hidden');
    title1.value = '';
    note1.value = '';
});



// Remove Button
remove.addEventListener('click', (e) => {
    ncr.innerHTML = null;
    let removeNote = async (id) => {
        const request = await fetch('https://dummyjson.com/todos/1', {
            method: 'DELETE',
        })
        if (request.status === 200) {
            let data = await request.json();
            // data.todo = title1.value
            // data.id = parseInt(Math.random() * 1000);
            console.log(data)
            console.log(updateItem)

            array = array.filter((item) => {
                return item.id !== updateItem;
            })
            notes(array);

            console.log(array, 'ss')
        }
    }
    removeNote()
    // const newArr = array.filter((subItem) => {
    //     return subItem.id !== updateItem;
    // });
    document.querySelector('#span').classList.add('hidden')
    div3.classList.remove('hidden')
    // localStorage.setItem('my-notes', JSON.stringify(newArr))
    // notes(JSON.stringify(newArr));
    add.classList.remove('hidden');
    update.classList.add('hidden');
    notemain.classList.add('hidden');
    homepage.classList.remove('hidden');
    ncr.classList.remove('hidden');
});



// Filter value
const filters = {
    searchText: '',
    sortBy: 'byEdited',
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
    const newArr = array.filter((item) => {
        return item.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    if (newArr.length === 0) {
        div3.classList.remove('hidden');
    }
    ncr.innerHTML = '';

    newArr.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<p>${item.title}</p><span>LastEdited: ${showTime(item.Edited)}</span>`;
        li.style.cursor = 'pointer';
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = 'auto';
        li.style.marginRight = 'auto';
        li.style.width = '100%';
        div3.classList.add('hidden');
        li.addEventListener('click', () => {
            updateItem = item.id;
            remove.classList.remove('hidden');
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
    remove.classList.add('hidden');
    document.querySelector('#span').classList.add('hidden');
    // notes();
});



// ul styling
ncr.style.marginTop = '30px';
ncr.style.fontSize = '20px';



// Add button
add.addEventListener('click', (e) => {
    ncr.classList.remove('hidden');
    ncr.innerHTML = null;
    if (title1.value) {
        let newNote = async () => {
            response = await fetch('https://dummyjson.com/todos/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    todo: title1.value,
                    completed: false,
                    userId: 5,
                })
            })
            if (response.status === 200) {
                let data = await response.json();
                console.log('data ', data)
                return data;
            } else {
                throw new Error('An error has occured')
            }
        }
        notes = newNote().then((data) => {
            array.push(data);
            console.log(data);
            array.forEach((item) => {
                const li = document.createElement('li');
                li.style.cursor = 'pointer';
                li.style.background = '#F7F7F7';
                li.style.border = '1px solid gray';
                li.style.marginBottom = '20px';
                li.style.padding = '10px';
                li.style.maxWidth = '700px';
                li.style.marginLeft = 'auto';
                li.style.marginRight = 'auto';
                li.style.paddingLeft = 'auto';
                li.style.width = '100%';
                div3.classList.add('hidden');
                li.innerHTML = `${item.todo}`;
                li.addEventListener('click', () => {
                    document.querySelector('#span').classList.remove('hidden')
                    remove.classList.remove('hidden');
                    document.querySelector('#span').innerText = `Edited: ${showTime(item.Edited)}`
                    updateItem = item.id;
                    add.classList.add('hidden');
                    update.classList.remove('hidden');
                    notemain.classList.remove('hidden');
                    homepage.classList.add('hidden');
                    ncr.classList.add('hidden');
                    let activeItem = { ...item };
                    title1.value = activeItem.todo;
                    // note1.value = activeItem.description;
                });
                ncr.appendChild(li)
            })
        }).catch((err) => {
            console.log(err)
        })
        notemain.classList.add('hidden')
        homepage.classList.remove('hidden')
    }
    // if (title1.value && note1.value) {
    //     const li = document.createElement('li');
    //     const liT = document.createTextNode(`${title1.value}`);
    //     li.appendChild(liT);
    //     ncr.appendChild(li);
    //     const list = {
    //         title: title1.value,
    //         description: note1.value,
    //         id: parseInt(Math.random() * 1000),
    //         Edited: timeStamp(),
    //         Created: timeStamp(),
    //     };
    //     array.push(list);
    //     let listJSON = JSON.stringify(array);
    //     li.style.background = '#F7F7F7';
    //     li.style.border = '1px solid gray';
    //     li.style.marginBottom = '20px';
    //     li.style.padding = '10px';
    //     li.style.maxWidth = '700px';
    //     li.style.marginLeft = '250px';
    //     li.style.width = '100%';
    //     div3.classList.add('hidden');
    //     notemain.classList.add('hidden');
    //     homepage.classList.remove('hidden');
    //     li.addEventListener('click', () => {
    //         notemain.classList.remove('hidden');
    //         homepage.classList.add('hidden');
    //         ncr.classList.add('hidden');
    //     });
    //     if (title1.value && note1.value) {
    //         localStorage.setItem('my-notes', listJSON);
    //     };
    //     notes();
    //     title1.value = '';
    //     note1.value = '';
});