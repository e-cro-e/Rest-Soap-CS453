//made by Ethan A. :)

const soap = require('soap');
const express = require('express');
const app = express();

// Hardcoded data (in a real-world scenario, you'd fetch this from a database or an external service)
const partData = {
  'PART001': { price: 100, deliveryDate: '2023-08-10' },
  'PART002': { price: 75, deliveryDate: '2023-08-05' },
  'PART003': { price: 50, deliveryDate: '2023-08-15' },
};

// SOAP Service implementation
const service = {
  PartsService: {
    PartsPort: {
      GetPartInfo: function (args) {
        const partNumber = args.partNumber;
        const partInfo = partData[partNumber] || null;

        let response = `price: $${partInfo ? partInfo.price : null} \n `;
        response += `Delivery Date: ${partInfo ? partInfo.deliveryDate : null}`;

        return { response };
      },
    },
  },
};

// Create the SOAP server with the WSDL XML and attach it to the Express app
const xml = require('fs').readFileSync('parts-service.wsdl', 'utf8');
const server = soap.listen(app, '/soap', service, xml);

const port = 8000;
app.listen(port, () => {
  console.log(`SOAP server is running on ${port}/soap`);
});
