const newsData = document.querySelector("section")

const currentDate = new Date();
function formatCurrentDate(inputDate) {
    const date = new Date(inputDate);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
window.addEventListener("load", () => getNewsData('india'));
function getQuoteOfTheDay() {
    const apiUrl = `https://api.quotable.io/quotes/random?maxLength=90`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const quoteElement = document.getElementById('quote');
            const authorElement = document.getElementById('author');

            quoteElement.textContent = `${data[0].content}`;
            authorElement.textContent = `- ${data[0].author}`;
        })
        .catch(error => {
            console.error('Error fetching quote of the day:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    getQuoteOfTheDay();
    const formattedDateElement = document.querySelector('.current-date');
    formattedDateElement.textContent = formatCurrentDate(currentDate);
    
});
 const getNewsData= (id) =>{
    const date = new Date()
    date.setDate(date.getDate() - 1);
    const newDate = date.toISOString().split('T')[0];

    const newsApi = `https://newsapi.org/v2/everything?q=${id}&from=${newDate}&sortBy=popularity&apiKey=48a5e8c4657a469d825dc17daa0cb244`;

    fetch(newsApi)
    .then(data => data.json())
    .then(data => {
        appendNewsData(data);
        console.log(data.articles);
    })
}

const appendNewsData = (news) =>{
    newsData.innerHTML='';
    news.articles.forEach(element => {
        console.log(element);
        if(!element.urlToImage) return;

        const card = document.createElement('div');
        card.className='card';
        card.innerHTML=`
                <div class="card-image">
                    <img src="${element.urlToImage}" alt="">
                </div>
                <div class="card-content">
                    <h3 class="title"><a href="${element.url}" class="read-more">${element.title}</a></h3>
                    <p class="description" id="descriptionId">${element.description}</p>
                    
                    <div class="source-data">
                        <p>${formatCurrentDate(element.publishedAt)}</p>
                        <p>Source: ${element.source.name}</p>
                    </div>
                </div>
        `
        newsData.append(card);
    });
}
// const getNavNewsData = (id) => {
//     const newsApi = `https://newsapi.org/v2/everything?q=${id}&apiKey=48a5e8c4657a469d825dc17daa0cb244`;

//     fetch(newsApi)
//         .then(data => {
//             if (!data.ok) {
//                 throw new Error(`Network response was not ok (${data.status})`);
//             }
//             return data.json();
//         })
//         .then(data => {
//             appendNewsData(data);
//             // console.log(data.articles);
//         })
//         .catch(error => {
//             console.error('Error fetching news data:', error);
//         });
// }

let navSelected = null;
function clickNavItem(id) {
    console.log(id);
    getNewsData(id);
    const navItem = document.getElementById(id);

    if (navSelected) {
        navSelected.classList.remove("active");
    }

    navSelected = navItem;
    navSelected.classList.add("active");
}

const searchButton = document.getElementById("button");
const searchText = document.getElementById("search-box");

searchButton.addEventListener("click", () => {
    const keyWord = searchText.value;
    if(!keyWord) return;
    getNewsData(keyWord);
})


