# Rest-Soap-CS453
Rest and soap server project for CS453


To run, 
```shell
docker-compose build 
```
this will build the project, then run up to start the docker containers
```shell
docker-compose up
```

This creates two containers the Rest server & the Soap server

they can be reached at
Rest: [http://localhost:3000/cars](http://localhost:3000/cars)
Soap: [http://localhost:8000/soap](http://localhost:8000/soap)


##Rest

Postman was used to test it - [https://learning.postman.com/docs/getting-started/settings/](https://learning.postman.com/docs/getting-started/settings/)
you can also use curl 
```shell
curl -X POST -H "Content-Type: application/json" -d '{
  "vin": "12345678901234567",
  "plateNumber": "ABC123",
  "state": "CA",
  "make": "Toyota",
  "model": "Camry",
  "year": 2022,
  "owner": {
    "name": "John Doe",
    "address": "123 Main St, Anytown, USA",
    "dlNumber": "DL12345678"
  }
}' http://localhost:3000/cars

```
Getting cars
```shell
curl -X GET --location "http://localhost:3000/cars"
```
All paths can be found in the openapi.yaml

## Soap

again Postman was used but curl is also an option

all paths can be found in the parts-service.wsdl

Since this is a smaller project only 3 parts are coded in :
```shell
  'PART001': { price: 100, deliveryDate: '2023-08-10' },
  'PART002': { price: 75, deliveryDate: '2023-08-05' },
  'PART003': { price: 50, deliveryDate: '2023-08-15' },
```


## Notes

Ensure node.js is installed

to close the containers ctrl^c

made by Ethan A. Thank:)
