const { S3 } = require("aws-sdk");
const https = require("https");
const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routers/routes');
const logger = require('./logger/winston');
const fs = require("fs"); 

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  sslEnabled: process.env.AWS_SSL_ENABLE,
  s3ForcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE,

  httpOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }),
  },
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_S3_URL,
});


const PORT = process.env.PORT || 3002
const app = express();
app.use(bodyParser.json());
app.use('/', routes);
 
app.get("/logs", (req, res) => { 
  const logs = fs.readFileSync("autocall.logs", "utf8"); 
  res.json({ logs: logs }); 
}); 
logger.info("Info message"); 
logger.debug("Debug message");
logger.warn("Warning message"); 
logger.error("Error message"); 

app.get('/', (req, res) => {
  try {
    s3.listBuckets((err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error listing buckets');
        return;
      }
      res.send(`
          <h1>
          List of Avaialbe Buckets :
          <a href="/upload"> Click here To Upload</a>
          </h1>
          <ul>
            ${data.Buckets.map(b => `<li><a href="/bucket/${b.Name}">${b.Name}</a></li>`).join('')}
          </ul>
        `);
    });
  } catch (error) {
    console.log(error)
  }
});
app.get('/bucket/:name', (req, res) => {
  const { name } = req.params;
  s3.listObjects({ Bucket: name }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error listing objects in bucket ${name}`);
      return;
    }
    res.send(`
        <h1>Objects in bucket ${name}:</h1>
        <ul>
          ${data.Contents.map(o => `<li><a href="/bucket/${name}/${encodeURIComponent(o.Key)}">${o.Key}</a></li>`).join('')}
        </ul>
      `);
  });
});
app.get('/bucket/:name/:key', (req, res) => {
  const { name, key } = req.params;
  s3.getObject({ Bucket: name, Key: key }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error getting object ${key} from bucket ${name}`);
      return;
    }
    if (key.endsWith(".txt") || key.endsWith(".dart") || key.endsWith(".js")) {
      const fileContent = data.Body.toString("utf-8");
      res.send(`
        <h1>Object: ${key}</h1>        
        <ul>
        <li><a href="/bucket/${name}/${encodeURIComponent(key)}/link"> Genrate sharable link</a></li>
        <li><a href="/delete/${name}/${encodeURIComponent(key)}"> Click here to delete</a></li>
        </ul>
      `);
    } else {
      const fileContent = Buffer.from(data.Body).toString("base64");
      res.send(`
        <h1>Object: ${key}</h1>        
        <ul>
        <li><a href="/bucket/${name}/${encodeURIComponent(key)}/link"> Genrate sharable link</a></li>
        <li><a href="/delete/${name}/${encodeURIComponent(key)}"> Click here to delete</a></li>
        </ul>
        
      `);
    }
  });
});
app.get('/bucket/:name/:key/link', (req, res) => {
  const { name, key } = req.params;
  const url = s3.getSignedUrl('getObject', {
    Bucket: name,
    Key: key,
    Expires: 7200 // URL expires in 6000 seconds
  });
  res.send(url);
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});


