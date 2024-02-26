const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const port = 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set up AWS DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'ap-south-1',
  accessKeyId: 'AKIAV3ZPCBUJFG4R5VNG',
  secretAccessKey: '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'
});


// Define API endpoint to fetch data
app.get('/data', (req, res) => {
  // Define DynamoDB parameters
  const params = {
    TableName: 'bibhuti'
  };

  // Query DynamoDB to get data
  dynamoDB.scan(params, (err, data) => {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).send('Error fetching data from DynamoDB');
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      res.json(data.Items); // Send data as JSON response
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});