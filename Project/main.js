const homepage = document.querySelector('.homepage');
const notemain = document.querySelector('.notemain')
const button = document.querySelector('button');
const btn = document.querySelector('.AddRem');
const home = document.querySelector('a');
const remove = document.querySelector('.rem');
console.log(remove)
const add = document.querySelector('.add');
const ncr = document.querySelector('.ncr');
let title1 = document.querySelector('.title');
let note1 = document.querySelector('.note');
const update = document.querySelector('.update');
let array = [];
let localNotes = localStorage.getItem('my-notes')
let activeItem;

function call() {
    array = [...JSON.parse(localNotes)]
    array.forEach((item) => {
        const li = document.createElement('li');
        const liT = document.createTextNode(item.title);
        li.appendChild(liT);
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = '250px';
        li.style.width = '100%';
        div3.classList.add('hidden');

        li.addEventListener('click', (e) => {
            homepage.classList.add('hidden');
            homepage.classList.remove('hidden');
            let activeItem = {...item};
            title1.value = activeItem.title;
            note1.value = activeItem.description;
        })
        
    })
}



if(localNotes) {
    array = [...JSON.parse(localNotes)]
    array.forEach((item) => {
        const li = document.createElement('li');
        const liT = document.createTextNode(item.title);
        li.appendChild(liT);
        li.style.background = '#F7F7F7';
        li.style.border = '1px solid gray';
        li.style.marginBottom = '20px';
        li.style.padding = '10px';
        li.style.maxWidth = '700px';
        li.style.marginLeft = '250px';
        li.style.width = '100%';
        div3.classList.add('hidden');
        remove.addEventListener('click', (e) => {
            const newArr = array.filter((subItem) => {
                 return subItem.id !==item.id
            });
            location.reload();
            localStorage.setItem('my-notes', JSON.stringify(newArr))
            notemain.classList.add('hidden');
            homepage.classList.remove('hidden');
        });
        li.addEventListener('click', () => {
            notemain.classList.remove('hidden');
            homepage.classList.add('hidden');
            ncr.classList.add('hidden');
            let activeItem = {...item};
            title1.value = activeItem.title;
            note1.value = activeItem.description;
            // return this.title1.value, note1.value;
        });
        ncr.appendChild(li);

    });
};

function clear() {
    localStorage.clear();
}

// clear()




button.addEventListener('click', (e) => {
    // create.classList.add('hidden');
    homepage.classList.add('hidden');
    ncr.classList.add('hidden');
    notemain.classList.remove('hidden');
    remove.addEventListener('click', () =>{
        notemain.classList.add('hidden');
        ncr.classList.remove('hidden');
        homepage.classList.remove('hidden');
    });
    
    if(title1.value == '' || note1.value == '') {
        title1.value = '';
        note1.value = '';
    } else if(title1.value == '') {
        title1.value = '';
        note1.value = '';
    }
});




home.addEventListener('click', (e) =>{
    homepage.classList.remove('hidden');
    notemain.classList.add('hidden');
    ncr.classList.remove('hidden');
    location.reload();
});


ncr.style.marginTop = '30px';
ncr.style.fontSize = '20px';



add.addEventListener('click', (e) => {
    // localStorage.setItem('sad', 'depr');
    notemain.classList.add('hidden');
    homepage.classList.remove('hidden');
    ncr.classList.remove('hidden');
    call()
    if(title1.value && note1.value) {
        call();
        div3.classList.add('hidden');
        
        if(title1.value && note1.value ) {
            localStorage.setItem('my-notes', listJSON);
        };
        title1.value = '';
        note1.value = '';
    };
    
})


