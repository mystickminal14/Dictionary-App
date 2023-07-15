
let srchbtn= document.getElementById('searchBtn')
let link='https://api.dictionaryapi.dev/api/v2/entries/en/'
const sound = document.getElementById("sound");
srchbtn.addEventListener('click',()=>{
    let search= document.getElementById('search').value

    if (search.trim() === '') {
        document.getElementsByClassName('msg')[0].style.display = 'block';
        document.getElementsByClassName('warning')[0].innerHTML = `<h1> You need to write something before you search OR there might be an error in your spelling </h1>
            <h1>⚠️</h1>`;
    }else{
      
 let c=  fetch(`${link}${search}`)
 document.getElementsByClassName('msg')[0].style.display = 'none';
    c.then((resp)=>{
        if(!resp.ok){
            console.log('slight server error')
           
        }
        return resp.json()
    }).then((value)=>{
        console.log(value[0].phonetics[0].audio)
        console.log(value[0].meanings[0].definitions[0].example)
      
        document.getElementsByClassName('word')[0].style.display = 'flex'
        document.getElementsByClassName('adj')[0].style.display = 'flex'
        document.getElementsByClassName('sentce')[0].style.display = 'flex'
        document.getElementsByClassName('word')[0].innerHTML = `<h1 id='letter'>${value[0].word}</h1>
               <button onclick="playSound()"> <i class="fa-solid fa-headset"></i></button>`
        document.getElementsByClassName('adj')[0].innerHTML = ` <h5 id="adjective">${value[0].phonetic}</h5> <p id="meaning"><span >Meaning : </span>&nbsp ${value[0].meanings[0].definitions[0].definition}</p>`
      document.getElementsByClassName("sentce")[0].innerHTML= `<p id="sentence">${value[0].meanings[0].definitions[0].example}</p>`
      sound.setAttribute("src", `https:${value[0].phonetics[0].audio}`);
      document.getElementById('search').value = '';
     })
    }
})

function playSound() {
    sound.play();
}