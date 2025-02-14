const form = document.getElementById('myForm');


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const word = document.getElementById("myWord").value;
    const li = document.createElement("li");

    localStorage.setItem("analyzedWord", word);
    li.innerHTML = localStorage.getItem("analyzedWord");
    li.classList.add("list-word")
    document.getElementById("myList").appendChild(li);

    
}
);
