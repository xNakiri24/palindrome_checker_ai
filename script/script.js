const form = document.getElementById('myForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const word = document.getElementById("myWord").value;
    const li = document.createElement("li");

    // const url = 'https://urban-dictionary7.p.rapidapi.com/v0/define?term=yeet';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-key': 'Sign Up for Key',
    //         'x-rapidapi-host': 'urban-dictionary7.p.rapidapi.com'
    //     }
    // };

    // try {
    //     const response = await fetch(url, options);
    //     const result = await response.text();
    //     console.log(result);
    // } catch (error) {
    //     console.error(error);
    // }

    localStorage.setItem("analyzedWord", word);
    li.innerHTML = localStorage.getItem("analyzedWord");
    li.classList.add("list-word")
    document.getElementById("myList").appendChild(li);

    form.reset();
});
