const form = document.getElementById('myForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent Page reload

    //Initialize variables
    const word = document.getElementById("myWord").value;
    const li = document.createElement("li");
    const p = document.createElement("p");
    const details = document.createElement("details");
    const summary = document.createElement("summary");

    // Function to check if a word is a palindrome
    function isPalindrome(word) {
        const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normalizedWord === normalizedWord.split('').reverse().join('');
    }

    //Check if word is a palindrome or not
    let resultWord = isPalindrome(word) ? "Word is a palindrome" : "Not a palindrome";

    //Connection to RAPID API Urban Dictionary
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5e863294damshf24c1ceb1dba2e9p17223djsn9efabe82a2b4',
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    try {
        //Fetch the api
        const response = await fetch(url, options);
        const result = await response.json();

        // Run palindrome check and meaning search
        if (result.list && result.list.length > 0) {
            const firstDefinition = result.list[0].definition;
            console.log("First Definition:", firstDefinition);

            // Retrieve the last analyzed word from localStorage
            const lastAnalyzedWord = localStorage.getItem("analyzedWord") || "No previous word";
            summary.innerHTML = `${word} - ${resultWord}`;
            p.innerHTML = firstDefinition;

            //add summary and  p tags to details
            details.appendChild(summary);
            details.appendChild(p);

            // Save the current word to localStorage
            localStorage.setItem("analyzedWord", word);

            // Retrieve the word from localStorage or initialize an empty array
            let wordHistory = JSON.parse(localStorage.getItem("wordHistory")) || [];

            // Add the current word to the array 
            wordHistory.push(word);

            // Save the updated history back to localStorage
            localStorage.setItem("wordHistory", JSON.stringify(wordHistory));

            //Add loist tag to html 
            li.appendChild(details);
            li.classList.add("list-word");
            document.getElementById("myList").appendChild(li);
        } else {
            console.log("No definitions found.");
        }
    } catch (error) {
        console.error(error); 
    }

    // reset the form
    form.reset();
});