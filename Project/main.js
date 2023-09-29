const homepage = document.querySelector('.homepage');
const notemain = document.querySelector('.notemain')
const button = document.querySelector('button');
const btn = document.querySelector('.AddRem');
const home = document.querySelector('a');
const remove = document.querySelector('.rem');
const add = document.querySelector('.add');
const ncr = document.querySelector('.ncr');
const title1 = document.querySelector('.title');
const note1 = document.querySelector('.note');
const update = document.querySelector('.update');
const array = [];


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
});


ncr.style.marginTop = '30px';
ncr.style.fontSize = '20px';

add.addEventListener('click', (e) => {
    // localStorage.setItem('sad', 'depr');
    notemain.classList.add('hidden');
    homepage.classList.remove('hidden');

    const li = document.createElement('li');
    const liT = document.createTextNode(`${title1.value}`);
    li.appendChild(liT);
    ncr.appendChild(li);
    const list = {title:title1.value, description:note1.value};
    array.push(list);
    let listJSON = JSON.stringify(array);
    localStorage.setItem('my-notes', listJSON);

    let list1 = JSON.parse(localStorage.getItem(listJSON));

    
    li.style.background = '#F7F7F7';
    li.style.border = '1px solid gray';
    li.style.marginBottom = '20px';
    li.style.padding = '10px';
    li.style.maxWidth = '700px';
    li.style.marginLeft = '250px';
    li.style.width = '100%';
    li.addEventListener('click', () => {
        notemain.classList.remove('hidden');
        homepage.classList.add('hidden');
        ncr.classList.add('hidden');
    });

    ncr.classList.remove('hidden');
    if(title1.value == '' && note1.value == '') {
        title1.value == '';
    } else {
        div3.classList.add('hidden');
    };
})
