const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const {StringStream} = require("scramjet");
const request = require("request");
const request2 = require("request");

let data = []
let companyData = [];
request.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&datatype=csv&outputsize=compact&apikey=AARDO0PWKSGLOW5U")
    .pipe(new StringStream())
    .CSVParse({header: true}) // parse CSV output into row objects

    .consume(object => data.push(object))

    .then(() => console.log("success"));

request2.get({
    url: "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=AARDO0PWKSGLOW5U",
    json: true,
    headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
    if (err) {
        console.log('Error:', err);
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
    } else {
        // data is successfully parsed as a JSON object:
        //companyData.push({symbol: data.symbol, description: data.description});
        companyData.push(
        {
            desc: data.Description,
            sector: data.Sector,
            industry: data.Industry,
            divShare: data.DividendPerShare

        });
        companyData = JSON.stringify(companyData);
        console.log(companyData);

    }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/stockChartData', (req, res) => {
    res.json(data);
    //console.log(data);
});

 app.get('/CompanyData', (req, res) => {
     res.json(JSON.parse(JSON.stringify(companyData)));
     console.log(companyData);
 });

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

