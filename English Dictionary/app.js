const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");

async function fetchAPI(word){
    try {
    
        infoText.style.display="block";
        infoText.innerText=`Searching the meaning of "${word}"`;   
        meaningContainer.style.display="none";
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=>{
            return res.json();
        });
        if(result.title){
            infoText.innerHTML=`<p>Word Title : <strong>${word}</strong></p>\n<p>Meaning : <strong>${result.title}</strong></p>`;
        }else{
            infoText.style.display="none";
            meaningContainer.style.display="block";
            title.innerText=result[0].word;
            meaning.innerText=result[0].meanings[0].definitions[0].definition;
            audio.src=result[0].phonetics[0].audio||result[0].phonetics[1].audio;
        }
    } catch (error) {
        infoText.innerText="An error happend,try again later!"
    }
};
input.addEventListener("keyup",(event)=>{
    if(event.target.value && event.key==="Enter"){
        fetchAPI(event.target.value);
    }
});