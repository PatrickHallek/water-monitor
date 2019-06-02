# Ionic Mobile Water Monitoring App

This is mobile IoT App for monitoring the waterlevel of your plants.
To make this Ionic App a useful application, you need the water humidity sensors I developed, which send data to an ESP8266 Wifi modul. This module has to be connected to the wifi through the app to send the sensor data to a cloud server account specific. The app then fetches the plant data from the database of the cloud server and displays it.

![Ionic App](https://raw.githubusercontent.com/PatrickHallek/Water-Monitor/master/src/assets/Watermonitor-1.png)
![Ionic App](https://raw.githubusercontent.com/PatrickHallek/Water-Monitor/master/src/assets/Watermonitor-2.png)

## Installation

Clone the repository:

```cmd
git clone https://github.com/PatrickHallek/Gif-Calendar
```

Install the the NoSQL-database from here: [MongoDB](https://www.mongodb.com/download-center/community)

Install all [node](https://nodejs.org/en/) packages for the Angular frontend:

```cmd
npm install
```

Install all [node](https://nodejs.org/en/) packages for the Node.js backend:

```cmd
npm install ./backend
```

Start the frontend (running on port 4200):

```cmd
npm start
```

Start the backend (running on port 3000):

```cmd
npm start ./backend
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
