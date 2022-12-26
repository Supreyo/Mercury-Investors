const express = require('express')
const router = express.Router()
const dbObj = require('../vueauthclient-backend/database')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const {StringStream} = require('scramjet')
const fetch = require('node-fetch')
const axios = require('axios')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const request = require('request')
const request2 = require('request')
const { NormalModuleReplacementPlugin } = require('webpack')

const db = mysql.createConnection({
  host: '35.223.116.88',
  user: 'mercuryinvestors',
  database: 'mercury_investors',
  password: 'Mercury123'
})

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
router.use(bodyParser.json())
router.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// login
router.post('/login', async (req, res, next) => {
  var username = req.fields.email
  console.log(username)
  var pwd = req.fields.password

  var sql = 'select case when exists (SELECT * FROM Users WHERE UserName = "' + username + '" ) then 1 else 0 end AS Unit'
  // eslint-disable-next-line handle-callback-err
  db.query(sql, (error, results) => {
    // console.log(results)
    if (results[0].Unit < 1) {
      console.log('user doesnt exist')
      // return 0
    } else {
      var sql = "SELECT Hash, UserID AS UserID from Users where UserName='" + username + "' "

      db.query(sql, (error, results) => {
        if (results === 0) {
          return console.error(error.message)
        } else {
          let HashPwd = Object.values(JSON.parse(JSON.stringify(results)))
          var ID = HashPwd[0].UserID
          HashPwd = HashPwd[0].Hash
          console.log(HashPwd, ID)
          bcrypt.compare(pwd, HashPwd, (error, res) => {
            if (error) console.log(error)
            if (res) {
              console.log(res)
              Auth(ID)
              next()
            }
          })
        }
      })
    }
  })
  function Auth (ID) {
    res.json({valid: 'true'})
    res.app.set('ID', ID)
  }
})
// Stock Chart Data
router.post('/stockChartData', (req, res, next) => {
  const obj1 = {
    Symbol: req.fields.SearchValue
  }
  res.app.set('symbol', obj1.Symbol)
  ChartData(obj1.Symbol).then((data) => {
    let chartData = data
    res.app.set('data', chartData)
    res.send('Success')
    next()
  })
})

router.get('/stockChart', (req, res, next) => {
  let data = res.app.get('data')
  res.send(data)
  next()
})

async function ChartData (sym) {
  let data = []
  await request.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + sym + '&datatype=csv&outputsize=compact&apikey=AARDO0PWKSGLOW5U')
    .pipe(new StringStream())
    .CSVParse({header: true, delimiter: ',' }) // parse CSV output into row objects

    .consume(object => data.push(object))

  return data
}

router.get('/CompanyData', (req, res, next) => {
  let symbol = res.app.get('symbol')
  ComData(symbol, function (err, data2) {
    if (err) return res.send(err)
    // res.app.set("companyInfo", data2);
    res.send(data2)
    next()
  })
})

async function ComData (sym, callback) {
  let companyData = []

  await request2.get({
    url: 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + sym + '&apikey=AARDO0PWKSGLOW5U',
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err)
      return callback(null, err)
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode)
      return callback(null, res.statusCode)
    } else {
      // data is successfully parsed as a JSON object:
      // companyData.push({symbol: data.symbol, description: data.description});
      companyData.push(
        {
          desc: data.Description,
          sector: data.Sector,
          industry: data.Industry,
          name: data.Name,
          Exchange: data.Exchange,
          Currency: data.Currency,
          LatestQuarter: data.LatestQuarter,
          MarketCapitalization: data.MarketCapitalization,
          EBITDA: data.EBITDA,
          PERatio: data.PERatio,
          BookValue: data.BookValue,
          DividendPerShare: data.DividendPerShare,
          DividendYield: data.DividendYield,
          EPS: data.EPS,
          ProfitMargin: data.ProfitMargin,
          ReturnOnAssetsTTM: data.ReturnOnAssetsTTM,
          ReturnOnEquityTTM: data.ReturnOnEquityTTM,
          RevenueTTM: data.RevenueTTM,
          GrossProfitTTM: data.GrossProfitTTM,
          DilutedEPSTTM: data.DilutedEPSTTM,
          QuarterlyEarningsGrowthYOY: data.QuarterlyEarningsGrowthYOY,
          QuarterlyRevenueGrowthYOY: data.QuarterlyRevenueGrowthYOY,
          AnalystTargetPrice: data.AnalystTargetPrice,
          PriceToSalesRatioTTM: data.PriceToSalesRatioTTM,
          PriceToBookRatio: data.PriceToBookRatio,
          ftWeekHigh: data['52WeekHigh'],
          ftWeekLow: data['52WeekLow'],
          fDayMovingAverage: data['50DayMovingAverage'],
          thDayMovingAverage: data['200DayMovingAverage'],
          DividendDate: data.DividendDate,
          ExDividendDate: data.ExDividendDate
        })
      console.log(companyData)
      return callback(companyData, false)
    //  console.log(companyData)
    }
  })
}

// Signup
router.post('/signup', async (req, res) => {
  const salt = await bcrypt.genSalt(5)
  const HashPwd = await bcrypt.hash(req.fields.pwd, salt)

  const obj1 = {
    UserName: req.fields.Uname,
    FirstName: req.fields.Fname,
    LastName: req.fields.Lname,
    Email: req.fields.Email,
    Pwd: HashPwd
  }
  console.log(obj1)
  module.exports = JSON.stringify(obj1)
  dbObj.addUsers(obj1.UserName, obj1.FirstName, obj1.LastName, obj1.Email, obj1.Pwd)
})
// Portfolio Display
router.get('/portfolioTable', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  var ID = res.app.get('ID')
  console.log(ID)

  var sql = 'SELECT PortfolioID, PortfolioName, CurrencyType FROM Portfolios Where UserID="' + ID + '" '
  db.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      res.send(RestArray)
    }
  })
})

router.post('/portfolioEdit', (req, res) => {
  // console.log(req.fields.PortfolioName)

  const obj = {
    PortfolioName: req.fields.PortfolioName,
    Currency: req.fields.Currency,
    EditIndex: req.fields.EditIndex
  }

  console.log('editttttt INDEX ' + obj.EditIndex)
  dbObj.editPortfolio(obj.PortfolioName, obj.Currency, obj.EditIndex)
})

router.post('/portfolioDelete', (req, res) => {
  const obj = {
    DeleteIndex: req.fields.DeleteIndex
  }

  console.log('DELETE AT: ' + obj.DeleteIndex)
  // module.exports = JSON.stringify(obj)
  dbObj.deletePortfolio(obj.DeleteIndex)
})

router.post('/transactions', (req, res) => {
  const obj = {
    Stock: req.fields.Stock,
    Volume: req.fields.Volume,
    PricePerShare: req.fields.PricePerShare,
    Date: req.fields.Date,
    TransType: req.fields.TransType
  }
  var PID = res.app.get('PID')

  /* console.log("Stock Name at Router: " + obj.Stock)
  console.log("Volume at Router: " + obj.Volume)
  console.log("Price Per Share at Router: " + obj.PricePerShare)
  console.log("Date at Router: " + obj.Date)
  console.log("Transaction Type: " + obj.TransType) */

  dbObj.addTransactions(obj.Stock, obj.Volume, obj.PricePerShare, obj.Date, obj.TransType, PID)
})

router.post('/updateHoldings', (req, res) => {
  const obj = {
    Stock: req.fields.Stock,
    Volume: req.fields.Volume,
    PricePerShare: req.fields.PricePerShare,
    TransType: req.fields.TransType
  }
  var PID = res.app.get('PID')

  var totalPrice = obj.Volume * obj.PricePerShare
  console.log('Stock Name at updateHoldings: ' + obj.Stock)
  console.log('Volume at updateHoldings: ' + obj.Volume)
  console.log('Price Per Share at updateHoldings: ' + obj.PricePerShare)
  console.log('TotalPrice at updateHoldings: ' + totalPrice)

  if (obj.TransType === 'Buy') {
    dbObj.buyUpdateHoldings(obj.Stock, obj.Volume, totalPrice, PID)
    // eslint-disable-next-line eqeqeq
  } else if (obj.TransType === 'Sell') {
    var sellVolume
    sellVolume = obj.Volume * (-1)

    dbObj.sellUpdateHoldings(obj.Stock, sellVolume, PID)
  }
})

router.get('/transactionsTable', async (req, res) => {
  var ID = res.app.get('ID')
  var PID = res.app.get('PID')

  var sql = 'SELECT TransactionType, Symbol, TransactionDate, TransactionTotal, TransactionVolume FROM Transactions Where PortfolioID="' + PID + '" '
  db.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      res.send(RestArray)
    }
  })
})

router.get('/holdingsTable', async (req, res) => {
  var sql = 'SELECT Symbol, AvgUnitPrice, OwnedUnits, PortfolioID FROM Holdings'
  db.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      res.send(RestArray)
    }
  })
})

// Potfolio Creation
router.post('/portfolio', (req, res) => {
  // console.log(req.fields.PortfolioName)

  const obj = {
    PortfolioName: req.fields.PortfolioName,
    Currency: req.fields.Currency
  }
  var ID = res.app.get('ID')
  //    console.log(obj);
  module.exports = JSON.stringify(obj)
  dbObj.addPortfolio(obj.PortfolioName, obj.Currency, ID)
})

router.post('/Sprice', (req, res) => {
  const obj1 = {
    SearchValue: req.fields.SearchValue
  }
  var sym = obj1.SearchValue
  // console.log(sym)
  var data = []
  var price // avg of all owned
  request.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + sym + '&apikey=AARDO0PWKSGLOW5U&datatype=csv')
    .pipe(new StringStream())
    .CSVParse({header: true}) // parse CSV output into row objects
    .consume(object => data.push(object))
    .then(() => SetVal(data[0].close), sym)
  function SetVal (val) {
    dbObj.GetUnits(price, val, sym)
    // res.send(JSON.stringify(b))
  }
})
router.post('/PID', (req, res, next) => {
  console.log(req.fields)
  res.send('test')
  res.app.set('PID', req.fields.PID)
  next()
})

router.get('/Watchlist', async (req, res, next) => {
  var PID = res.app.get('PID')
  var sql = 'SELECT Symbol from Watchlists where PortfolioID ="' + PID + '"'
  db.query(sql, async (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      let watchlist = await watchlistDataFunc(RestArray)
      res.send(watchlist)
      console.log(watchlist)
      next()
    }
  })
})

router.get('/addToWatchlist', (req, res, next) => {
  let sym = res.app.get('symbol')
  let PID = res.app.get('PID')
  var sql = 'Insert INTO Watchlists (PortfolioID, Symbol) VALUES ("' + PID + '", "' + sym + '")'
  db.query(sql, async (error, results) =>{
    if (error) {
      return console.error(error.message)
    } else {
      res.send('success')
  }
})
})

router.get('/OwnedStock', async (req, res, next) => {
  var PID = res.app.get('PID')
  var sql = 'SELECT Symbol, AvgUnitPrice, OwnedUnits from Holdings where PortfolioID ="' + PID + '"'
  db.query(sql, async (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      let holdings = await holdingDataFunc(RestArray)
      res.send(holdings)
      console.log(holdings)
      next()
    }
  })
})

const watchlistDataFunc = async (ARR) => {
  let watchlistObj = {Symbol: null, Data: [], Price: null, Percent: null}
  let watchlistData = []
  let watchlist = []
  let watchlistPercent = 0
  let data = []
  for (let i = 0; i < ARR.length; i++) {
    await request.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ARR[i].Symbol + '&apikey=AARDO0PWKSGLOW5U&datatype=csv')
    .pipe(new StringStream())
    .CSVParse({header: true}) // parse CSV output into row objects
    .consume(object => data.push(object))
    for (let j = 0; j < 10; j++) {
      let num = Number(data[j].close)
      watchlistData.push(num)
    }
    let newNum = Number((data[1].close));
    let currNum = Number((data[0].close))
    let res = newNum - currNum;
    res = (res/currNum)*100;
    watchlistPercent = Math.round(res * 100) / 100;
    let wlData = JSON.parse(JSON.stringify(watchlistData))
    watchlistObj.Symbol = ARR[i].Symbol
    watchlistObj.Data.push(wlData)
    watchlistObj.Price = data[0].close
    watchlistObj.Percent = watchlistPercent
    //console.log(watchlistObj)
    watchlist.push({Symbol: watchlistObj.Symbol, Data: watchlistObj.Data, Price: watchlistObj.Price, Percent: watchlistObj.Percent})
    watchlistObj = {Symbol: null, Data: [], Price: null, Percent: null}
    //console.log(watchlist)
    watchlistData.length = 0
    data.length = 0
  }
  //console.log(watchlist)
  return watchlist
}


const holdingDataFunc = async (ARR) => {
  let holdingObj = {Symbol: null, Data: [], Price: null, Percent: null}
  let holdingData = []
  let holding = []
  let data = []
  for (let i = 0; i < ARR.length; i++) {
    await request.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ARR[i].Symbol + '&apikey=AARDO0PWKSGLOW5U&datatype=csv')
    .pipe(new StringStream())
    .CSVParse({header: true}) // parse CSV output into row objects
    .consume(object => data.push(object))
    for (let j = 0; j < 10; j++) {
      let num = Number(data[j].close)
      holdingData.push(num)
    }
    let newNum = Number((data[1].close));
    let currNum = Number((data[0].close))
    let res = newNum - currNum;
    res = (res/currNum)*100;
    let HoldingPercent = Math.round(res * 100) / 100;
    let hData = JSON.parse(JSON.stringify(holdingData))
    holdingObj.Symbol = ARR[i].Symbol
    holdingObj.Data.push(hData)
    holdingObj.percent = HoldingPercent
    holding.push({Symbol: holdingObj.Symbol, Data: holdingObj.Data, Price: ARR[i].AvgUnitPrice, owned: ARR[i].OwnedUnits, percent: holdingObj.percent})
    holdingObj = {Symbol: null, Data: [], Price: null, Percent: null}
    holdingData.length = 0
    data.length = 0
  }
  return holding
}

router.get('/portfolioChart', (req, res, next) => {
  let PID = res.app.get('PID')
  var sql = 'SELECT TotalValue, Date FROM DailyChange Where PortfolioID = ' + PID
  db.query(sql, async (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      res.send(RestArray)
      next()
    }
  })
})


router.get('/PortVal', (req, res,next) => {
  /* const obj1 = {
    PID: '113'
  } */
  var PID = res.app.get('PID')

  var sql = "SELECT Symbol, SUM(OwnedUnits) AS Units FROM Holdings WHERE PortfolioID='" + PID + "'" + 'GROUP BY Symbol'

  var TUnits
  var holdings = []
  db.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      TUnits = Object.values(JSON.parse(JSON.stringify(results)))
      var b = Object.keys(TUnits).length - 1
      var sym = ''
      for (var i = 0; i <= b; i++) {
        holdings.push(TUnits[i])
        sym = holdings[i].Symbol
        // console.log(sym)
      }
      var PortTotal = 0

      // eslint-disable-next-line no-return-assign
      GetTotal(holdings).then((result) => {
        PortTotal = result
        ValueChange(PortTotal, PID)
      }
      )
      return GetTotal(holdings)
    }

    async function SetHolding (Symbol, Units, ARR) {
      var data = []
      await request.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + Symbol + '&datatype=csv&outputsize=compact&apikey=AARDO0PWKSGLOW5U')
        .pipe(new StringStream())
        .CSVParse({header: true, delimiter: ',' }) // parse CSV output into row objects
        .consume(object => data.push(object))
      ARR.push({Symbol: Symbol, Units: Units, Price: data[0].close, Total: Units * data[0].close})
      data.length = 0

      // console.log(Symbol, Units, Price)
    }
    async function GetTotal (Arr) {
      // eslint-disable-next-line no-unused-vars
      var Total = 0
      var holdingData = []
      for (let i = 0; i < Arr.length; i++) {
        await SetHolding(Arr[i].Symbol, Arr[i].Units, holdingData)
        Total += Number(holdingData[i].Total)
        // console.log(Total)
      }

      return Total
    }
    function ValueChange (CurrentValue, PID) {
      var sql = "Select  Sum(Total) As PValue From Holdings WHERE PortfolioID = '" + PID + "'"
      db.query(sql, (error, results) => {
        if (error) {
          return console.error(error.message)
        } else {
          var PurchaseValue = Object.values(JSON.parse(JSON.stringify(results)))
          // console.log(PurchaseValue)
          var a = CurrentValue - PurchaseValue[0].PValue
          var b = (a / PurchaseValue[0].PValue) * 100
          var Dchange = Math.round(a * 100) / 100

          var Pchange = Math.round(b * 100) / 100
          var sql = "UPDATE Portfolios SET TotalValue = '" + CurrentValue + "'  WHERE PortfolioID='" + PID + "'"
          db.query(sql, async (error, results) => {
            if (error) {
              return console.error(error.message)
            }
          })
          var sql1 = 'INSERT INTO DailyChange (PortfolioID, TotalValue, Date) values (?,?,?) '
          // eslint-disable-next-line standard/array-bracket-even-spacing
          db.query(sql1, [PID, CurrentValue, new Date().toISOString().replace('T', ' ').split('.')[0] ], async (error, results) => {
            if (error) {
              return console.error(error.message)
            }
          })
          res.app.set('CurrentValue', CurrentValue)
          res.send(JSON.stringify({CurrentValue, Dchange, Pchange}))
        }
      })
    }
  })
})
module.exports = router
