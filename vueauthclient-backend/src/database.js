const mysql = require('mysql')
const request = require('request')
const bcrypt = require('bcrypt')
const {StringStream} = require('scramjet')

const db = mysql.createConnection({
  host: '35.223.116.88',
  user: 'mercuryinvestors',
  database: 'mercury_investors',
  password: 'Mercury123',
  multipleStatements: true

})

module.exports.addPortfolio = function (portName, portCurrency,ID) {
  const Name = portName
  const Crr = portCurrency
  const date = (new Date().toISOString().replace('T', ' ').split('.')[0])
  // db.query("INSERT INTO Portfolios PortfolioName = ?, CurrencyType = ?", [portName, portCurrency],)
  // let sql = `SELECT * FROM Users`;
  var sql = 'INSERT INTO Portfolios (PortfolioName,CurrencyType,TotalValue,DateCreated,UserID) values (?,?,?,?,?)'
  // eslint-disable-next-line standard/array-bracket-even-spacing
  db.query(sql, [ Name, Crr, '0', date, ID], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('1 record inserted')

    console.log(results)
  })
}
module.exports.addUsers = function (UserName, FirstName, LastName, Email, Password) {
  console.log(UserName)
  console.log(FirstName)

  console.log(LastName)

  console.log(Email)
  console.log(Password)
  var sql = 'INSERT INTO Users (UserName,FirstName,LastName,Email,Hash) values (?,?,?,?,?)'

  db.query(sql, [UserName, FirstName, LastName, Email, Password, Password], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('1 record inserted')

    console.log(results)
  })
}
module.exports.deletePortfolio = function (deleteIndex) {
  const index = deleteIndex

  var sql1 = 'DELETE FROM Watchlists WHERE PortfolioID=?'
  db.query(sql1, [ index], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('Deleted Watchlists row at: ' + index)

    console.log(results)
  })

  var sql2 = 'DELETE FROM Transactions WHERE PortfolioID=?'
  // eslint-disable-next-line standard/array-bracket-even-spacing
  db.query(sql2, [ index], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('Deleted transactions row at: ' + index)

    console.log(results)
  })

  var sql3 = 'DELETE FROM Holdings WHERE PortfolioID=?'
  // eslint-disable-next-line standard/array-bracket-even-spacing
  db.query(sql3, [ index], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('Deleted holdings row at: ' + index)

    console.log(results)
  })

  var sql = 'DELETE FROM DailyChange WHERE PortfolioID=?'
  db.query(sql, [ index], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('Deleted portfolio row at: ' + index)

    console.log(results)
  })

  var sql = 'DELETE FROM Portfolios WHERE PortfolioID=?'
  db.query(sql, [ index], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('Deleted portfolio row at: ' + index)

    console.log(results)
  })

  
}










module.exports.editPortfolio = function (portName, portCurrency, editIndex) {
  const Name = portName
  const Crr = portCurrency
  const index = editIndex

  console.log('DATABASE: ' + index)
  var sql = 'UPDATE Portfolios SET PortfolioName = ?, CurrencyType=? WHERE PortfolioID=?'

  // eslint-disable-next-line standard/array-bracket-even-spacing
  db.query(sql, [ Name, Crr, index], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('EDITED ROW')

    console.log(results)
  })
}

module.exports.addTransactions = function (stock, volume, pricePerShare, date, transtype, PID) {
  const pid = PID
  const Stock = stock
  const Volume = volume
  const TransactionTotal = pricePerShare * volume
  const Date = date
  const TransType = transtype

  var sql = 'INSERT INTO Transactions (PortfolioID,TransactionType,Symbol,TransactionDate,TransactionTotal,TransactionVolume) values (?,?,?,?,?,?)'

  db.query(sql, [pid, TransType, Stock, Date, TransactionTotal, Volume], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('1 record inserted')

    console.log(results)
  })
}

module.exports.buyUpdateHoldings = function (stock, volume, total, PID) {
  const Volume = volume
  const Total = total

  var sql = 'select case when exists (SELECT * FROM Holdings WHERE  PortfolioID = ? AND Symbol = ?) then 1 else 0 end AS Unit'

  db.query(sql, [PID, stock], (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      console.log(RestArray[0].Unit)

      if (RestArray[0].Unit === 1) {
        var sql1 = 'UPDATE Holdings SET OwnedUnits = OwnedUnits + ?, Total = Total + ?, AvgUnitPrice = Total/OwnedUnits WHERE Symbol=? AND PortfolioID=' + PID + '  '

        // eslint-disable-next-line standard/array-bracket-even-spacing
        db.query(sql1, [ volume, total, stock], (error, results) => {
          if (error) {
            return console.error(error.message)
          }

          console.log('UPDATED')
        })
      } else {
        var sql2 = 'INSERT INTO Holdings (PortfolioID, Symbol,  AvgUnitPrice, Total, OwnedUnits, DividendPrice, DividendDate) values (?,?,?,?,?,?,?) '

        db.query(sql2, [PID, stock, Total / Volume, total, volume, 200, '2022-04-07'], (error, results) => {
          if (error) {
            return console.error(error.message)
          }
          console.log('INSERTED')
        })
      }
    }
  })
}

module.exports.sellUpdateHoldings = function (stock, volume, PID) {

  var sql = 'select case when exists (SELECT * FROM Holdings WHERE PortfolioID = ? AND OwnedUnits > 0) then 1 else 0 end AS Unit'

  db.query(sql, [PID], (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      var RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      console.log(RestArray[0].Unit)

      if (RestArray[0].Unit === 1) {
        var sql = 'UPDATE Holdings SET OwnedUnits = OwnedUnits + ?, Total = AvgUnitPrice * OwnedUnits WHERE Symbol=? AND PortfolioID =?'

        db.query(sql, [volume, stock, PID], (error, results) => {
          if (error) {
            return console.error(error.message)
          }

          var sql = 'DELETE FROM Holdings WHERE OwnedUnits <= 0'
          db.query(sql, (error, results) => {
            if (error) {
              return console.error(error.message)
            }
            console.log('REMOVED AT SELL')
          })

          console.log('UPDATED AT SELL')
        })
      } else {
        var sql1 = 'DELETE FROM Holdings WHERE OwnedUnits <= 0'
        db.query(sql1, (error, results) => {
          if (error) {
            return console.error(error.message)
          }
          console.log('REMOVED AT SELL')
        })
      }
    }
  })
}

module.exports.PortfolioVal = function (PID) {
  var sql = ''

  db.query(sql, [UserName, FirstName, LastName, Email, Password, Password], (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    console.log('1 record inserted')

    console.log(results)
  })
}

const RetPort = function () {
  var sql = 'SELECT PortfolioName, CurrencyType FROM Portfolios'
  let test = []
  var RestArray = []
  Object.defineProperty(test, '', { writable: true })

  // eslint-disable-next-line standard/array-bracket-even-spacing
  db.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      RestArray = Object.values(JSON.parse(JSON.stringify(results)))
      console.log(results)
    }
  })
  console.log(RestArray)
  return RestArray
}

module.exports.PortData = function () {
  console.log(RetPort())
  return RetPort()
}

/* module.exports.getDollarChange = function (oldNumber, newNumber) {
  var a = GetUnits()
  var DChange = a - oldNumber
  var PChange = (DChange / oldNumber) * 100

  //console.log(a)
} */

module.exports.GetUnits = function (oldNumber, Newnumber, Sym) {
  // console.log(Sym)
  var sql = "SELECT AVG(Total) AS AVG ,SUM(OwnedUnits) AS Unit  FROM Holdings WHERE Symbol='" + Sym + "'"
  var TUnits
  db.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message)
    } else {
      TUnits = Object.values(JSON.parse(JSON.stringify(results)))
      var a = (TUnits[0].Unit)
      var b = (TUnits[0].AVG)
      getVal(b, Newnumber, a)
    }
  })
  // eslint-disable-next-line no-unused-vars
  function getVal (oldNumber, newNumber, Units) {
    console.log(oldNumber)
    console.log(newNumber)
    var a = Units * newNumber
    console.log(Units)
    var DChange = Math.round((a - oldNumber) * 100) / 100
    var PChange = Math.round(((DChange / oldNumber) * 100) * 100) / 100
    console.log([DChange, PChange])
  }
}

module.exports.PortVal = function (PID) {
  // console.log(PID)
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
        console.log(sym)
      }
      var PortTotal = 0

      // eslint-disable-next-line no-return-assign
      GetTotal(holdings).then((result) => {
        PortTotal = result
        return PortTotal
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
  })
}

module.exports.Auth = function (username, password) {
  var sql = "SELECT UserID from Users where UserName='" + username + "'"
  // eslint-disable-next-line handle-callback-err
  db.query(sql, (error, results) => {
    if (results === 0) {
      return 0
    }
    var sql = "SELECT Hash from Users where UserName='" + username + "'"

    db.query(sql, (error, results) => {
      if (results === 0) {
        return console.error(error.message)
      } else {
        let HashPwd = Object.values(JSON.parse(JSON.stringify(results)))
        HashPwd = HashPwd[0].Hash
        bcrypt.compare(password, HashPwd, (error, res) => {
          if (error) console.log(error)
          console.log(res)
        })
      }
    })
  })
}
