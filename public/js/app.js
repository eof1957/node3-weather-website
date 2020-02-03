console.log('client side javascript file is loaded!')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)
    fetch('http://127.0.0.1:3000/weather?address='+ location).then((response) =>{
    response.json().then((data) =>{
        if (data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

})
