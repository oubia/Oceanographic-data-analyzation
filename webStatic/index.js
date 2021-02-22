// var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// L.tileLayer('https://api.maptiler.com/maps/hybrid/tiles.json?key=NJr1SJ7c7bkyqnFq9WPH', {
//     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);

// var marker = L.marker([51.5, -0.09]).addTo(mymap);
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");


// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

// mymap.on('click', onMapClick);



var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});



// search date line  /////////////////


// var slider = new Slider("#ex13", {
//     ticks: [0, 100, 200, 300, 400],
//     ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
//     ticks_snap_bounds: 30
// });







//////////////////////////////////////////////////////
////////////////////imorter data excel/////////////////////





    var Path_file;    // Chemin du fichier
    var oExcel;       // Application Excel
    var oExcelSheet;  // Feuille de calcul
    var oWkBooks;     // Contenu du fichier Excel
    
    // Chemin du fichier EXCEL avec des "/" et non des "\"
    // Le chemin peut aussi être mis en "dur" exemple : Path_file = "C:/Users/hanan/Desktop/ISDS_S3/PFE/Mogador MPA data/Data/Mogador MPA data"
    // var Rep_cour = window.location.href;           // Répertoire de la page htm en cours
    // var Index = Rep_cour.lastIndexOf("/");         // Rechecher du dernier séparateur /
    // var Rep_cour = Rep_cour.substring(0,Index);    // Répertoire du fichier
    Path_file =  "C:/Users/hanan/Desktop/ISDS_S3/PFE/Mogador MPA data/Data/Mogador MPA data";
    // fetch(Path_file)
    //     .then(Response=>Response.json())
    //     .then((data)=>{console.log(data)});
    

Path_file.forEach(console.log(Path_file.valueOf(Path_file)))
    // const export_csv = (Path_file) => {
    //     let header = arrayHeader.join(delimiter) + '\n';
    //     let csv = header;
    //     Path_file.forEach( array => {
    //         csv += array.join(delimiter)+"\n";
    //     });

    //     let csvData = new Blob([csv], { type: 'text/csv' });  
    //     let csvUrl = URL.createObjectURL(csvData);

    //     let hiddenElement = document.createElement('a');
    //     hiddenElement.href = csvUrl;
    //     hiddenElement.target = '_blank';
    //     hiddenElement.download = fileName + '.csv';
    //     hiddenElement.click();
    // console.log(csvData)
    // Lancement de EXCEL
//     oExcel = new ActiveXObject('Excel.Application');
//     oExcel.WorkBooks.Open (Path_file);
    
//     // Pour rendre EXCEL visible sinon supprimer la ligne
//     oExcel.Visible = true;
    
    
//     var total = oExcel.ActiveSheet.cells(2,2).value + oExcel.ActiveSheet.cells(3,2).value + oExcel.ActiveSheet.cells(4,2).value;
//     document.getElementById("TOT").innerHTML = total;
    
//     // fermeture de EXCEL sinon supprimer les deux lignes
//     oExcel.WorkBooks.Close;
//     oExcel.Quit();
//     }
//   ImportFromXLS_Direct();
//     console.log("hello");






