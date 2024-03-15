const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/authMiddleware');
const pool = require('../database/database');
const app = express();
const bodyParser = require('body-parser');
const multer = require("multer");
const jwt = require('jsonwebtoken');
const csvtojson = require('csvtojson');
const path = require('path');
const fs = require('fs');
var Logger = require('../services/elk');
app.use(bodyParser.json());


router.post('/login', (req, res) => {
  const sql = "select * from users where email = ? and password = ?";
  pool.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Err")

    } if (data.length > 0) {
      const id = data[0].id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3000 });
      return res.json({ Login: true, token, data });

    } else {
      return res.json("Fail")
    }
  })
});

router.get('/file', async (req, res) => {
  try {
    const { page, limit } = req.query
    const offset = (page - 1) * limit
    const [data] = await pool.query('select * from cdrfiletable limit ? offset ?', [+ limit, + offset])
    const [totalPageData] = await pool.query('SELECT count(*) AS count FROM cdrfiletable')
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit)
    res.json({
      data: data,
      pagination: {
        page: +page,
        limit: +limit,
        totalPage
      }
    })
  } catch (error) {
    console.log(error)
  }
});

router.get("/file/:accountcode", async function (req, res) {
  try {
    await new Promise(resolve => {
      const fetchid = req.params.accountcode;
      pool.query('select * from cdrfiletable where accountcode=?', fetchid, (err, results) => {
        if (err) {
          throw err
        } else {
          res.send(results)
        }
        resolve(results)
      });
    })
  }
  catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/phone/:diallednumber", async function (req, res) {
  try {
    await new Promise(resolve => {
      const fetchidphone = req.params.diallednumber;
      pool.query('select * from cdrfiletable where diallednumber=?', fetchidphone, (err, results) => {
        if (err) {
          throw err
        } else {
          res.send(results)
        }
        resolve(results)
      });
    })
  }
  catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
router.put("/cdr/csv", (req, res, next) => {
  try {
    upload.single("data")(req, res, next)
  } catch (e) {
    Logger.error({
      function: "api:/cdr/csv",
      error: error?.stack?.split("\n"),
      raw_error: err
    })
    res.json({
      success: false,
      error: error?.stack?.split("\n")
    })
  }
}, async function (req, res, next) {
  Logger.debug({
    function: "api:/cdr/csv",
    start: true
  })
  try {
    const fileName = req.file.path;
    const nameFile = path.resolve(fileName);
    const source = await csvtojson().fromFile(nameFile);
    function changeKeys(item, index) {
      return Object.keys(item).reduce((result, key) => {
        const cleanKey = key.replace(/\s+/g, '').replace(/\W+/g, '')
        result[cleanKey] = source[index][key];
        return result;
      }, {});
    }
    const result = source.map(changeKeys);
    const data = result.map(d => {
      const { ID, CallID, SIPCallID, TimeStart, TimeConnect, TimeEnd, Status, AccountCode, AccountName, DialledNumber, OutboundNumber } = d
      return [ID, CallID, SIPCallID, TimeStart, TimeConnect, TimeEnd, Status, AccountCode, AccountName, DialledNumber, OutboundNumber]
    })
    console.log("checkaccode", data);
    while (data.length > 0) {
      const insertStatement = "INSERT IGNORE INTO `cdrfiletable`(ID, CallID, SIPCallID	,TimeStart	,TimeConnect	,TimeEnd	,Status,	AccountCode,	AccountName, DialledNumber, OutboundNumber) VALUES ?";
      await new Promise(resolve => {
        // Inserting data of current row into database
        const insertRows = data.splice(-500)
        pool.query(insertStatement, [insertRows], async (err, results, fields) => {
          if (err) {
            Logger.error({
              function: "api:/cdr/csv",
              error: err?.stack?.split("\n"),
              raw_error: err
            })
          }
          await new Promise(resolve => {
            setTimeout(resolve, 200)
          })
          resolve(results)
        });

      })
    }
    res.json({
      success: true,
    });
    Logger.debug({
      function: "api:/cdr/csv",
      done: true
    })
  } catch (error) {
    Logger.error({
      function: "api:/cdr/csv",
      error: error?.stack?.split("\n")
    })
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cdr/csv", async function (req, res, next) {
  let dirUpload = path.join(__dirname, '../', 'uploads')
  let lf = fs.readdirSync(dirUpload)
  let ls = []
  for (let item of lf) {
    ls.push({
      fileName: item,
      createTime: fs.statSync(path.join(dirUpload, item)).ctime
    })
  }
  res.json({
    success: true,
    ls
  })

})



module.exports = router;