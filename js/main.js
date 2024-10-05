//navbar menu
const menu = document.getElementById('menu');
document.getElementById('link').classList.add('hidden');
menu.addEventListener('click', () =>{
    document.getElementById('link').classList.toggle('hidden')
})