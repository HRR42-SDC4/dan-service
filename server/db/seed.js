const faker = require('faker');
const Recs = require('./recs.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: `recommendations.csv`,
  header: [
    {id: 'id', title: 'Id'},
    {id: 'genre', title: 'Genre'},
    {id: 'title', title: 'RestaurantTitle'},
    {id: 'zecs', title: 'recommendations'},
  ],
  fieldDelimiter: ';',
  append: true
});

const seed = (num) => {
  var data = [];
  var genres = ['American', 'Asian', 'Mexican', 'Indian'];
  var prices = ['$', '$$', '$$$', '$$$$'];

  for (var i = 1; i <= 1000; i++) {

    var genre = genres[Math.floor(Math.random() * Math.floor(genres.length))];
    var title1 = faker.company.companyName();
    var recommendationPage = {
      id: i,
      genre: genre,
      title: title1,
      zecs: []
    }

    var k = Math.floor(Math.random() * 5) + 1;
    for (var j = 0; j < k; j++) {
      var title2 = faker.company.companyName();
      var price = prices[Math.floor(Math.random() * prices.length)];
      var text = faker.lorem.sentence();
      var zec = {
        pics: [],
        title: title2,
        price: price,
        text: text
      };

      var m = Math.floor(Math.random() * 5 + 1);
      for (var l = 0; l < m; l++) {
        var photoNum = Math.floor(Math.random() * 812) + 1;
        var picUrl = `https://s3-us-west-1.amazonaws.com/hrr42-sdc4.s3.us-west-1.amazonaws.com/image${photoNum}.jpg`;
        zec.pics.push(picUrl);
      }
      recommendationPage.zecs.push(zec);
    }

    recommendationPage.zecs = JSON.stringify(recommendationPage.zecs);
    data.push(recommendationPage);
  }

  csvWriter
    .writeRecords(data)
    .then(()=> {
      console.log('The CSV file was written successfully');
      if (num + 1 <= 10000){
        seed(num + 1);
      } else {
        console.log('All the CSV files were written successfully');
      }
    })
    .catch(err => console.log('ERROR:', err))
};

seed(1);