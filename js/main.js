//navbar menu
const menu = document.getElementById('menu');
document.getElementById('link').classList.add('hidden');
menu.addEventListener('click', () =>{
    document.getElementById('link').classList.toggle('hidden')
})




//load all pets
const loadAllPets = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then(res => res.json())
    .then(data => {
        displayAllPets(data.pets)
    })
}

//display all pets
const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";

    if(pets.length === 0){
       petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
           <div class="min-h-[600px] w-full p-6 bg-gray-200 rounded-lg flex flex-col justify-center items-center gap-4 text-center">
              <img src="./images/error.webp" alt="no data"/>
              <h1 class="text-2xl font-semibold">No Information Available!</h1>
              <p>Sorry, we currently don't have any data available about this category. Please check back later for updates.</p>
           </div>
        `;
        return;
    } else{
        petsContainer.classList.add('grid');
    }

   
   
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `

            <div class="flex flex-col gap-2 border p-2 rounded-lg">
                <div class="mb-2 rounded-lg w-[200px] sm:max-w-[325px] flex justify-center items-center mx-auto">
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
                    <button onclick="saveLikedPets('${pet.image}')" class="px-3 py-1 border rounded ">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                            <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
                            </svg>               
                    </button>

                    <button onclick="adoptPet()" class="px-3 py-1 border rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">Adopt</button>

                    <button onclick="modal('${pet.petId}')" class="px-3 py-1 border rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" >Details</button>
                </div>
            </div> 

        `;
        petsContainer.append(div);

    });


    document.getElementById('sort').addEventListener('click', ()=> {
        const sortPets = pets.sort((a,b) => b.price - a.price);
        displayAllPets(sortPets);
    })
     

   
}

//load all category
const loadCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        displayCategory(data.categories)
    })
    console.log(id)
}

//show category wise data
const loadCategoryItems = (CateName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${CateName}`)
    .then(res => res.json())
    .then(data => {
        displayAllPets(data.data)
        console.log(data.data)
    })
}

//display all category
const displayCategory = (category) => {

    const cateContainer = document.getElementById('categoryContainer');

    category.forEach(cate => {    
        const div = document.createElement('div');
        // console.log(cate.category)
       
        div.innerHTML = `

           <button onclick="loadCategoryItems('${cate.category}')" class="cmn-btn cursor-pointer border border-lime-300 rounded-lg px-4  py-2 flex justify-center items-center gap-1 sm:gap-2 hover:rounded-xl hover:bg-blue-200 transition-colors sm:px-8">
                <img class="w-[20px] sm:w-full" src=${cate.category_icon} alt="image of category">
                <span class="text-base sm:text-lg font-semibold">${cate.category}</span>
            </button> 

        `;
        cateContainer.append(div);
    })
}


//liked pets
const saveLikedPets = (like) => {
    const likedContainer = document.getElementById('likedPets');
    const div = document.createElement('div');
    div.classList.add('p-2', 'h-full','flex', 'justify-start', 'items-start');
    div.innerHTML = `
        <div class="p-1 border rounded">
            <img class="rounded w-full object-cover" src=${like} />
        </div>
    `;
    likedContainer.append(div);

}
 

//show modal for details
const modal = (detailId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailId}`)
    .then((res) => res.json())
    .then((data) => {
        const modalContainer = document.getElementById('modal-content');
        modalContainer.innerHTML = ` 
            <div>
                <img src=${data.petData.image} class="w-full rounded" alt="ani">
                <div class="border-b pb-4">
                    <h3 class="text-lg font-bold">${data.petData.pet_name ? data.petData.pet_name : 'Not Available!'}</h3>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/application.png" />
                        </span>
                        Breed:${data.petData.breed ? data.petData.breed : 'Not Available!'}
                    </p>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/gender-fluid.png" />
                        </span>
                        Gender: ${data.petData.gender ? data.petData.gender : 'Not Available!'}
                    </p>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/gender-fluid.png" />
                        </span>
                        Vaccinated status: ${data.petData.vaccinated_status ? data.petData.vaccinated_status : 'Not Available!'}
                    </p>
                    <p class="text-base flex flex-row items-center gap-1">
                        <span>
                            <img src="./images/date.png" />
                        </span>
                        Birth: ${data.petData.date_of_birth ? data.petData.date_of_birth : 'Not Available!'}
                    </p>
        
                    <p class="text-base flex flex-row items-center gap-1">
                       <span>
                            <img src="./images/dollar.png" />
                       </span>
                       Price: ${data.petData.price ? data.petData.price : 'Not Available!'}$
                    </p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Details Information</h3>
                    <p>${data.petData.pet_details ? data.petData.pet_details : 'Not Available!'}</p>
                </div>
            </div>        
        `;
        document.getElementById('modal').showModal();
    });
}

//adopt button functionality
const adoptPet = () => {
    const modal = document.getElementById('modalAdopt');
    const countDown = document.getElementById('count-down');

    modal.showModal();

    let maxTime = 3;
    countDown.innerText = maxTime;
    const countDownTimer = setInterval(() => {

        maxTime--;
        if(maxTime > 0){
            countDown.innerText = maxTime;
        }else{
            clearInterval(countDownTimer);
            modal.close();
        }

    }, 1000);
}

 

loadCategory();
loadAllPets();
