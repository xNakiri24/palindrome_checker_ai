const form = document.getElementById('myForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const word = document.getElementById("myWord").value;
    const li = document.createElement("li");
    const p = document.createElement("p")
    const details = document.createElement("details");
    const summary = document.createElement("summary");

    function isPalindrome(word) {
        return word === word.split('').reverse().join('');
    }
    console.log(isPalindrome(word)); 

    let resultWord = ""
    if(!isPalindrome(word)){
        resultWord = "Not a palindrome"
    }else{
        resultWord = "Word is a palindrome"
    }

    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5e863294damshf24c1ceb1dba2e9p17223djsn9efabe82a2b4',
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.list && result.list.length > 0) {
            const firstDefinition = result.list[0].definition;
            console.log("First Definition:", firstDefinition);

            summary.innerHTML = localStorage.getItem("analyzedWord") + " - " + resultWord;
            p.innerHTML = firstDefinition;

            details.appendChild(summary);
            details.appendChild(p);

            localStorage.setItem("analyzedWord", word);
            li.appendChild(details);
            li.classList.add("list-word")
            document.getElementById("myList").appendChild(li);
        } else {
            console.log("No definitions found.");
            
        }
    } catch (error) {
        console.error(error);
    }

    form.reset();
});
