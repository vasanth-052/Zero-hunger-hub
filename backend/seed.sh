#!/bin/bash

echo "Seeding Food Banks..."

curl -X POST http://localhost:5000/api/foodBanks/add -H "Content-Type: application/json" -d '{
  "name": "Eastside Community Food Bank",
  "address": "123 Main St, Springfield, IL",
  "coordinates": { "lat": 39.7817, "lng": -89.6501 }
}'

curl -X POST http://localhost:5000/api/foodBanks/add -H "Content-Type: application/json" -d '{
  "name": "Westside Helping Hands",
  "address": "456 Elm St, Springfield, IL",
  "coordinates": { "lat": 39.7990, "lng": -89.6436 }
}'

curl -X POST http://localhost:5000/api/foodBanks/add -H "Content-Type: application/json" -d '{
  "name": "Northend Pantry",
  "address": "789 Oak Ave, Springfield, IL",
  "coordinates": { "lat": 39.8100, "lng": -89.6550 }
}'

curl -X POST http://localhost:5000/api/foodBanks/add -H "Content-Type: application/json" -d '{
  "name": "Southside Community Kitchen",
  "address": "101 Pine St, Springfield, IL",
  "coordinates": { "lat": 39.7701, "lng": -89.6402 }
}'

echo "✅ Food Banks seeded!"
