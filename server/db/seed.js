const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: `recommendations.csv`,
  header: [
    {id: 'id', title: 'Id'},
    {id: 'genre', title: 'Genre'},
    {id: 'name', title: 'Name'},
    {id: 'price', title: 'Price Range'},
    {id: 'description', title: 'Description'},
    {id: 'pics', title: 'Pictures'},
    {id: 'recs', title: 'Recommendations'},
  ],
  fieldDelimiter: ';',
  append: true
});

const seed = (num) => {
  let data = [];
  const genres = ['American', 'Asian', 'Mexican', 'Indian'];
  const prices = ['$', '$$', '$$$', '$$$$'];

  for (let i = 1 + (num - 1) * 1000; i <= 1000 + (num - 1) * 1000; i++) {
    const genre = genres[Math.floor(Math.random() * Math.floor(genres.length))];
    const name = faker.company.companyName();
    let recommendationPage = {
      id: i,
      genre: genre,
      name: name,
      price: prices[Math.floor(Math.random() * prices.length)],
      description: faker.lorem.sentence(),
      pics: [],
      recs: []
    }

    const randomRecs = Math.floor(Math.random() * 3) + 4;
    for (let j = 0; j < randomRecs; j++) {
      recommendationPage.recs.push(Math.floor(Math.random() * 10000000) + 1);
    }

    const randomPics = Math.floor(Math.random() * 3) + 5;
    for (let k = 0; k < randomPics; k++) {
      const urlId = Math.floor(Math.random() * 707) + 1;
      recommendationPage.pics.push(urlId);
    }

    data.push(recommendationPage);
  }

  csvWriter
    .writeRecords(data)
    .then(()=> {
      if (num + 1 <= 10000){
        seed(num + 1);
      } else {
        console.log('The CSV file was written successfully');
      }
    })
    .catch(err => console.log('ERROR:', err))
};

seed(1);