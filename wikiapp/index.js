// Function to search for articles in Wikipedia
const search = () => {
    let url = 'https://en.wikipedia.org/w/api.php';
    let wiki = 'https://en.wikipedia.org/?curid=';

    let params = {
        action: "query",
        list: "search",
        srsearch: document.getElementById('search').value,
        format: "json",
        srprop: "snippet%7Ctitlesnippet"

    };

    url = `${url}?origin=*`;
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            document.getElementById('result').innerHTML = "" //Clear contents of search before displaying new results
            let result = response.query.search

            // Loop through results and create page with results
            for (let i = 0; i < result.length; i++) {
                let para = document.createElement('p')
                let link = document.createElement('a')
                link.style.width = "auto"
                link.target = "_blank"
                link.classList.add("m-3", "p-3", "list-group-item", "list-group-item-action")
                let title = result[i].title
                let snippet = result[i].snippet
                link.innerHTML = `${title} <br/> ${snippet}`
                link.href = `${wiki}${result[i].pageid}`
                document.getElementById('result').appendChild(para)
                document.getElementById('result').appendChild(link)
            }
        })
        .catch(function (error) {
            document.getElementById('result').innerHTML = "<p class=m-3 p-3>Unable to find anything at the moment. Please try again later</p>"
            console.log(error);
        });
}

