// news apiKey - 48a5e8c4657a469d825dc17daa0cb244
// https://newsapi.org/v2/everything?q=Apple&from=2023-10-29&sortBy=popularity&apiKey=48a5e8c4657a469d825dc17daa0cb244
//Stock apiKey = YMWGV7O8YSOP5RIK
// Stock apiUrl = https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=full&apikey=YMWGV7O8YSOP5RIK
const newsData = document.querySelector("section")
newsData.innerHTML='';
const currentDate = new Date();
function formatCurrentDate(inputDate) {
    const date = new Date(inputDate);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
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
 getNewsData= () =>{
    const newsApi = `https://newsapi.org/v2/top-headlines?country=in&from=2023-12-02&apiKey=48a5e8c4657a469d825dc17daa0cb244`;

    fetch(newsApi)
    .then(data => data.json())
    .then(data => {
        appendNewsData(data);
        console.log(data.articles);
    })
}
getNewsData();
const appendNewsData = (news) =>{
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
                    <p class="description">${element.description}</p>
                    
                    <div class="source-data">
                        <p>${formatCurrentDate(element.publishedAt)}</p>
                        <p>Source: ${element.source.name}</p>
                    </div>
                </div>
        `
        newsData.append(card);
    });
}