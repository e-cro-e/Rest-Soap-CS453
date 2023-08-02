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

##Soap

again Postman was used but curl is also an option



to close the containers ctrl^c

made by Ethan A. Thank:)
