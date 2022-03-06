// Controls
const rightButton = document.getElementById('right')
const leftButton = document.getElementById('left')
const input = document.getElementById('search')
const submitButton = document.getElementById('submit')
const infoButton = document.getElementById('info-button')
// Screen
const modal = document.getElementById('info-modal')
const leftHalfScreen = document.getElementById('left-half-screen')
const rightHalfScreen = document.getElementById('right-half-screen')
const pokeName = document.getElementById('name')
///// Didn't need to declare variables for attack, size, etc
const sprite = document.getElementById('poke-pic')
const pokemonID = document.getElementById('id')
const errorScreen = document.getElementById('invalid-modal')
const errorName = document.getElementById('invalid-name')
const continueButton = document.getElementById('continue')
const isNot = document.getElementById('is-not')

var data 
let id = 0

async function searchFunction(e) {
  let search = input.value
  e.preventDefault()
  if(input.value = ''){
    showError(search)
  } else {
    await fetch(
      `https://pokeapi.co/api/v2/pokemon/${search}/`
    ) 
    .then(res => res.json())
    .then(data => {
      //// These HTML elements will update w/o declaring them....
      sprite.src = data.sprites.front_default
      pokeName.innerHTML = data.name
      type.innerHTML = `type: ${data.types[0].type.name}`
      height.innerHTML = `height: ${data.height}0 cm`
      weight.innerHTML = `weight: ${Math.floor(data.weight * 0.1)} kg`
      attack.innerHTML = `attack: ${data.abilities[0].ability.name}`
      pokemonID.innerHTML = `id: ${data.id}`
      id = data.id
    })
    .catch(err => {
      showError(search)
      showHideErrorModal()
    })
      errorScreen.style.display = "none"
      modal.style.display = "none"
      leftHalfScreen.style.display = "flex"
      rightHalfScreen.style.display = "flex"
      input.value = ''
      return data
    }
  }

function showError (error) {
  if(error === ''){
    errorName.innerHTML = 'Input field is empty!'
    isNot.style.display = 'none'
  } else {
    errorName.innerHTML = error 
    isNot.style.display = 'block'
  }
    input.value = ''
    errorScreen.style.display = "flex"
    leftHalfScreen.style.display = "none"
    rightHalfScreen.style.display = "none"
    modal.style.display = "none"
}

function previousID () {
  hideModal()
  if(id === 1 ){
    id = 151
  } else if (id === 0) {
    id = 1 
  } else {
  id--
  }
  nextOrPreviousPokemon(id)
}

function nextID () {
  hideModal()
  if(id === 151) {
    id = 1
  } else {
  id++
  }
  nextOrPreviousPokemon(id)
}

async function nextOrPreviousPokemon (id) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  )
  data = await res.json()
  sprite.src = data.sprites.front_default
    pokeName.innerHTML = data.name
    type.innerHTML = `type: ${data.types[0].type.name}`
    height.innerHTML = `height: ${data.height}0 cm`
    weight.innerHTML = `weight: ${Math.floor(data.weight * 0.1)} kg`
    attack.innerHTML = `ability: ${data.abilities[0].ability.name}`
    pokemonID.innerHTML = `id: ${data.id}`

    return data
}

function hideModal () {
    modal.style.display = "none"
    leftHalfScreen.style.display = "flex"
    rightHalfScreen.style.display = "flex"
    errorScreen.style.display = "none"
    leftHalfScreen.style.display = "flex"
    rightHalfScreen.style.display = "flex"
}

function showHideModal() {
  if(modal.style.display === "flex" || !modal.style.display) {
    modal.style.display = "none"
    leftHalfScreen.style.display = "flex"
    rightHalfScreen.style.display = "flex"
  } else {
    modal.style.display = "flex"
    leftHalfScreen.style.display = "none"
    rightHalfScreen.style.display = "none"
  }
}

// Event Listeners
input.addEventListener('keyup', ((e) => {
  e.key == "Enter" ? submitButton.click(): null
})
)
submitButton.addEventListener('click', searchFunction)
leftButton.addEventListener('click', previousID)
rightButton.addEventListener('click', nextID)
infoButton.addEventListener('click', showHideModal)
continueButton.addEventListener('click', hideModal)
document.onload(nextOrPreviousPokemon(1))
