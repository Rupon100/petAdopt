//navbar menu
const menu = document.getElementById('menu');
document.getElementById('link').classList.add('hidden');
menu.addEventListener('click', () =>{
    document.getElementById('link').classList.toggle('hidden')
})




//load all pets
const loadAllPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data =>  displayAllPets(data.pets))
}
//display all pets
const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `

            <div class="flex flex-col gap-2 border p-2 rounded-lg">
                <div class="mb-2 rounded-lg">
                    <img class="w-full rounded-lg" src=${pet.image} alt="nai">
                </div>
                <div class="text-left space-y-1">
                    <h3 class="text-lg font-bold">${pet.pet_name}</h3>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/application.png" />
                        </span>
                        Breed: ${pet.breed ? pet.breed : 'Not Available!'}
                    </p>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/date.png" />
                        </span>
                        Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available!'}
                    </p>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/gender-fluid.png" />
                        </span>
                        Gender: ${pet.gender ? pet.gender : 'Not Available!'}
                    </p>
                    <p class="text-base flex flex-row items-center gap-1">
                       <span>
                            <img src="./images/dollar.png" />
                       </span>
                       Price: ${pet.price ? pet.price : `Not Available!`}$
                    </p>
                </div>
                     
                <div class="flex justify-between items-center gap-3 border-t pt-2">
                    <button class="px-3 py-1 border rounded ">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                            <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
                            </svg>               
                    </button>
                    <button class="px-3 py-1 border rounded text-blue-500">Adopt</button>
                    <button class="px-3 py-1 border rounded text-blue-500">Details</button>
                </div>
            </div> 

        `;
        petsContainer.append(div);
    });
}

//load all category
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.categories))
}
const displayCategory = (category) => {
    const cateContainer = document.getElementById('categoryContainer');
    category.forEach(cate => {
        const div = document.createElement('div');
        div.innerHTML = `

           <div class="border border-lime-300 rounded-lg px-8 py-2 flex justify-center items-center gap-2">
                <img src=${cate.category_icon} alt="image of category">
                <span class="text-lg font-semibold">${cate.category}</span>
            </div> 

        `;
        cateContainer.append(div);
    })
}


loadCategory();
loadAllPets();
