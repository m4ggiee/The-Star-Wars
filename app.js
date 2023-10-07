/* CHARACTERS */
document.getElementById('btn-character').addEventListener('click', function() {
    fetch('https://swapi.dev/api/people/')
    .then(response => response.json())
    .then(data => {
        let characters = data.results;
        let person = '';
        characters.forEach(function(character) {
            person += `<p>${character.name}</p>`;
            console.log(person)
        });
        document.getElementById('person').innerHTML = person;
    })
    .catch(error => console.error(error))
});

document.getElementById('person').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == "P") {
        let characterName = e.target.textContent;
        fetch(`https://swapi.dev/api/people/?search=${characterName}`)
        .then(response => response.json())
        .then(data => {
            let character = data.results[0];
            let planetUrl = character.homeworld;
            let vehiclesUrls = character.vehicles;
            fetch(planetUrl)
            .then(response => response.json())
            .then(data => {
                let planetName = data.name;
                let vehiclesPromises = vehiclesUrls.map(url => fetch(url).then(response => response.json()));
                Promise.all(vehiclesPromises)
                .then(vehicles => {
                    let vehiclesNames = vehicles.map(vehicle => vehicle.name);
                    document.getElementById('characterDetails').innerHTML = `Character: ${characterName}<br>Planet: ${planetName}<br>Vehicles: ${vehiclesNames.join(', ')}`;
                    let myModal = new bootstrap.Modal(document.getElementById('characterModal'));
                    myModal.show();
                });
            });
        })
        .catch(error => console.error(error))
    }
});


/* PLANETS */
document.getElementById('btn-planets').addEventListener('click', function() {
    fetch('https://swapi.dev/api/planets/')
    .then(response => response.json())
    .then(data => {
        let planets = data.results;
        let p = '';
        planets.forEach(function(planet) {
            p += `<p>${planet.name}</p>`;
            console.log(p)
        });
        document.getElementById('p').innerHTML = p;
    })
    .catch(error => console.error(error))
});

document.getElementById('p').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == "P") {
        let planetName = e.target.textContent;
        fetch(`https://swapi.dev/api/planets/?search=${planetName}`)
        .then(response => response.json())
        .then(data => {
            let planet = data.results[0];
            document.getElementById('planetDetails').innerHTML = `Planet: ${planet.name}<br>Climate: ${planet.climate}<br>Population: ${planet.population}`;
            let myModal = new bootstrap.Modal(document.getElementById('planetModal'));
            myModal.show();
        })
        .catch(error => console.error(error))
    }
});



/* VEHICLES */
document.getElementById('btn-vehicles').addEventListener('click', function() {
    fetch('https://swapi.dev/api/vehicles/')
    .then(response => response.json())
    .then(data => {
        let vehicles = data.results;
        let v = '';
        vehicles.forEach(function(vehicle) {
            v += `<p>${vehicle.name}</p>`;
        });
        document.getElementById('v').innerHTML = v;
    })
    .catch(error => console.error(error))
});

document.getElementById('v').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == "P") {
        let vehicleName = e.target.textContent;
        fetch(`https://swapi.dev/api/vehicles/?search=${vehicleName}`)
        .then(response => response.json())
        .then(data => {
            let vehicle = data.results[0];
            document.getElementById('vehicleDetails').innerHTML = `Vehicle: ${vehicle.name}<br>Model: ${vehicle.model}<br>Manufacturer: ${vehicle.manufacturer}`;
            let myModal = new bootstrap.Modal(document.getElementById('vehicleModal'));
            myModal.show();
        })
        .catch(error => console.error(error))
    }
});