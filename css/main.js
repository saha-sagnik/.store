fetch('/api/data') 
    .then(res=>res.json())
    .then((data)=> {
        console.log(data)
        process(data) 
})

function process(data){
    if(data==false){

    }
    else{
        console.log(data)
        user = document.querySelector('.btn')
        console.log(user)
        user.classList.add("hide")
        name_of_user = document.querySelector('.user_name')
        console.log(name_of_user)
        name_of_user.innerText = data
    }
}

