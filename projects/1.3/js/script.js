var membersDiv;

function search() {
    var bandName = document.querySelector("#bandName").value;
    console.log(bandName);

    // API for getting info about an artist/band by name
    var url = encodeURI("https://wasabi.i3s.unice.fr/api/v1/artist/name/" + bandName);

    console.log(url);
    membersDiv.innerHTML = "";
    fetch(url)
    .then(function(response) {
        // response is a json string,
        // convert it to a pure JavaScript object
        return response.json();
    })
    .then(function(band) {
        membersDiv.innerHTML += "<h2>Current and old members of " +band.name + "</h2>"
        displayMembers(band.members);
    })
    .catch(function(error) {
        console.log('Error during fetch: ' + error.message);
        membersDiv.innerHTML += "<h2>No Results</h2>"
    });
    searchWiki(bandName);
}

function displayMembers(listOfMembers) {
    // users is a JavaScript object
    var table = document.createElement("table");

    // create header
    var headers = ["Band Member", "Instrument", "Years Active"];
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    headers.forEach(function (e) {
        var th = document.createElement("th");
        th.innerHTML = e;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
      
    listOfMembers.forEach(function(member) {
        // iterate on the array of members
        var row = tbody.insertRow();
        var memberNameCell = row.insertCell();
        memberNameCell.innerHTML = member.name;
      
        // Show instruments played by this member
        var instrumentCell = row.insertCell();
        member.instruments.forEach(function(inst, index) {
            instrumentCell.innerHTML += inst;
            if(index !== member.instruments.length-1) {
                instrumentCell.innerHTML += ",";
            }
        });
        var activeYearsCell = row.insertCell();
        activeYearsCell.innerHTML += member.begin;
        if(member.end !== "") {
            activeYearsCell.innerHTML += " - " + member.end;
        } else {
            activeYearsCell.innerHTML += " - still active in band";
        }
    });
    table.appendChild(tbody);
    membersDiv.appendChild(table);
}

function searchWiki(bandName) {
    $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&callback=?&titles=' + bandName, processResult);
}

function processResult(apiResult){
    $('#wikiInfo').html('');
    if (apiResult.query.pages[-1]){
        console.log("No results");   
    } else {
        console.log(apiResult);
        var pages = apiResult.query.pages;
        var imgSource = pages[Object.keys(pages)[0]].original.source;
        console.log(imgSource);
        $('#wikiInfo').html('<img src='+imgSource+'>');
    }
}

window.onload = function() {
    membersDiv = document.querySelector("#members");
}