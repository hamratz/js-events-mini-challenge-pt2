/***** Deliverable 1 *****/
const header = document.querySelector("#header")
// console.log("Here's your header:", header)


/***** Deliverable 2 *****/
header.style.color = "green"


/***** Deliverable 3 *****/
// console.log('This is what the traveler object looks like: ', traveler)

const profileImg = document.querySelector("#profile img")
profileImg.src = traveler.photo
profileImg.alt = traveler.name

const profileH2 = document.querySelector("#profile h2")
profileH2.textContent = traveler.name

const profileEm = document.querySelector("#profile em")
profileEm.textContent = traveler.nickname

const likes = document.querySelector("#profile .likes")
likes.textContent = `${traveler.likes} Likes`


/***** Deliverable 4 *****/
function renderAnimalSightingPost(animalObject) {
    const li = document.createElement("li")
    li.dataset.id = animalObject.id

    const p = document.createElement("p")
    p.textContent = animalObject.description

    const img = document.createElement("img")
    img.src = animalObject.photo
    img.alt = animalObject.species

    const a = document.createElement("a")
    a.href = animalObject.link
    a.target = "_blank"
    a.textContent = `Here's a video about the ${animalObject.species} species!`

    const sightLikesPtag = document.createElement('p')
    sightLikesPtag.className = 'likes-display'
    sightLikesPtag.textContent = `${animalObject.likes} Likes`

    const likeButton = document.createElement('button')
    likeButton.classList.add('like-button')
    likeButton.type = 'button'
    likeButton.textContent = 'Like'

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.type = 'button'
    deleteButton.textContent = 'Delete'
    
    const updateButton = document.createElement('button')
    updateButton.classList.add('toggle-update-form-button')
    updateButton.type = 'button'
    updateButton.textContent = 'Toggle Update Form'

    const updateForm = document.createElement('form')
    updateForm.className = 'update-form'
    updateForm.innerHTML = `
    <input type='text' value='${animalObject.description}'/>
    <input type="submit" value="Update description" />
    `
    updateForm.style.display = 'none'


    li.append(p, img, a, sightLikesPtag, likeButton, deleteButton, updateButton, updateForm)

    const animalsUl = document.querySelector("#animals")
    animalsUl.append(li)
}

traveler.animalSightings.forEach(function (animalSightingObject) {
    renderAnimalSightingPost(animalSightingObject)
})

/***** Deliverable 5 *****/
// const animalToRemove = document.querySelector("[data-id='3'")
// animalToRemove.remove()

/************************** EVENTS PART 1 JS MINI CHALLENGE ******************************/

/***** Deliverable 1 *****/
function toggleColor(element) {
    if (element.style.color === "green") {
        element.style.color = "black"
    } else {
        element.style.color = "green"
    }
}

header.addEventListener('click', function (event) {
    toggleColor(event.target)
})

/***** Deliverable 2 *****/
const button = document.querySelector('button.like-button')

button.addEventListener('click', function () {
    likes.textContent = `${++traveler.likes} Likes`
})


/***** Deliverable 3 *****/
const newSightingForm = document.querySelector('form#new-animal-sighting-form')

newSightingForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const species = event.target[0].value
    const video = event.target[1].value
    const photo = event.target[2].value
    const description = event.target[3].value
    const lastIndex = traveler.animalSightings.length - 1

    const newSightingObject = {
        id: traveler.animalSightings[lastIndex].id + 1,
        travelerId: 1,
        species: species,
        photo: photo,
        link: video,
        description: description,
        likes: 0
    }

    renderAnimalSightingPost(newSightingObject)
    newSightingForm.reset()

})


/***** End of Starter Code *****/
/************************** EVENTS PART 2 JS MINI CHALLENGE ******************************/


// EVENT DELEGATION
// Identify which elements you care to listen for an event on
//      'clicks'

// delete and likes buttons of all the posts
// Find the closest common parent of all these elements
//      <ul id="animals"> == $0


//can click on 'like' 'delete' and 'toggle update form' for each animal sighting post
const animalsCollection = document.querySelector('ul#animals')

animalsCollection.addEventListener('click', function (event) {

    const li = event.target.closest('li')
    
    // before review
    // if (event.target.matches('button.like-button')){
    //     const likesPtag = event.target.previousElementSibling
    //     const likes = parseInt(likesPtag.textContent) + 1
    //     likesPtag.textContent = `${likes} Likes`
    // }

    //after review
    if (event.target.matches('button.like-button')){
        const likesPtag = li.querySelector('p.likes-display')
        const currlikes = parseInt(likesPtag.textContent) + 1
        likesPtag.textContent = `${currlikes} Likes`
    }

    //before review
    // else if (event.target.matches('button.delete-button')) {
    //     const animals = event.target.closest('li')
    //     animals.remove()
    // }
    // getting error: index.js:163 Uncaught TypeError: Cannot read property 'remove' of null
    // at HTMLUListElement.<anonymous> (index.js:163)
    // when trying to click on 'delete' button. not sure what is wrong with the code.

    //after review
    else if(event.target.className === 'delete-button') {
        li.remove()
    }
    else if(event.target.matches('button.toggle-update-form-button')) {
        

         const form = li.querySelector('form')

        // if(form.style.display === 'block') {
        //     form.style.display
        // }
        // else {
        //     form.style.display = 'block'
        // }

        form.style.display = form.style.display === 'block' ? 'none' : 'block'

    }
    
})

//after review
animalsCollection.addEventListener('submit', function(event) {
    if (event.target.matches('form.update-form')) {
        event.preventDefault()
        
        const descriptionInput = event.target[0].value
        const li = event.target.closest('li')
        const descriptionPtag = li.querySelector('p')
        descriptionPtag.textContent = descriptionInput

    }
})