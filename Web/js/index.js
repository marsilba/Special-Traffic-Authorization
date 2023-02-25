   	
	var gravaPolilinha;
	var contaMarker = 0;
	var markers = [];
	var map;
	var origin;
	var destination;
	var directionsDisplay;
	var contaGrava = 0;
	var coords = '';
	var verificaErro = 0;
	//var marker;
	
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
		streetViewControl: false,
		styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}],
        mapTypeControl: true,
        mapTypeId: 'satellite',
        center: {lat: -22.964237, lng: -43.033499}  // Australia.
        
		});

        var directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,
		  
        });

        directionsDisplay.addListener('directions_changed', function() {
						
          computeTotalDistance(directionsDisplay.getDirections());			
		  		
        });
        
		
		var listenerHandle = google.maps.event.addListener(map, 'click', function(event) {
		   placeMarker(event.latLng);
		});
				
				
		
		
		function placeMarker(location) {
			var marker = new google.maps.Marker({
				position: location, 
				draggable:true,
				map: map,
				icon: {						
					url: "img/marker04.png",
					scaledSize: new google.maps.Size(40,45),						
				}
			});
			
			markers.push(marker);			
			
			if(contaMarker == 0){
								
				contaMarker ++;
				origin = location;
				
				marker.addListener('dragend', handleEvent);
			
				function handleEvent(event) {
					
					origin = event.latLng.lat()+','+event.latLng.lng();
				}
								
			}else{
								
				google.maps.event.removeListener(listenerHandle);				
				destination = location;				
				contaMarker ++;
				displayRoute(origin,destination,directionsService,directionsDisplay);				
							
			}
			
		}
		
		
		$('#apagar').click(function(){
		  
			//gravaPolilinha = '';
			contaMarker = 0;
			markers = [];
			origin = '';
			destination = '';
			directionsDisplay = '';
			directionsService = '';		
			
			initMap();

		});
		  
		  
		 function showAlert(){
         $('#alert').show();
         setTimeout(function() { 
             $('#alert').hide(); 
         }, 5000);
        }		  
		
		 showAlert();
		
		
      } // fecha initmap	  
	 	 
	 function setMapOnAll() {
		  for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		  }
		}
		
		
		// Deletes all markers in the array by removing references to them.
		function deleteMarkers() {
		  setMapOnAll();
		  markers = [];
		}	
		
		
      function displayRoute(origin, destination, service, display) {
        				
		service.route({
          origin: origin,
          destination: destination,          
          travelMode: 'DRIVING',
		  //optimizeWaypoints: false,
          avoidTolls: true
        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            display.setDirections(response);			
			
			gravaPolilinhaRota(response.routes[0].overview_path);
						
          } else {
			  
            alert(status);

          }
        });	
					
      }
	  	   
		  
	  function gravaPolilinhaRota(pathCoords) {
									
			gravaPolilinha = '';
			gravaPolilinha = pathCoords;
		  	var coordStr = "";		  	
		  	
			for (var l = 0; l < markers.length; l++) {
				
				markers[l].setMap(null);										
				
				}				  
				
		  	markers = [];				  
		  		  
		  for (var i=0; i<pathCoords.length; i++) {
				 //coordStr += path.getAt(i).toUrlValue(6)+"<br>";
				 //var indice = (i+1);
				 //coordStr += "["+indice+"]"+path.getAt(i).toUrlValue(6)+"|";
				 
				 //var indice = (i+1);
				 coordStr += pathCoords[i].toUrlValue(6)+"|";
			   }
		  		  
		  	$("#listaObras").html('');
		  
		  	var coordinates1 = coordStr.split("|");
			var flightPlanCoordinates1 = new Array();
			for(i=0;i<pathCoords.length;i++)
			{  
			  var point1 = [coordinates1[i].split(',')[0],coordinates1[i].split(',')[1]];
			  flightPlanCoordinates1.push(point1);   
			}
		  
		  	line = turf.lineString(flightPlanCoordinates1);
				  
		var json = {
			rota: JSON.stringify(flightPlanCoordinates1)
        };
				  
		$.ajax({
                type: "POST",
                url: "http://www.busonline.com.br/api/polilinha/",                                
                data: json ,
                success: function (response) {

                    console.log('OK');
					console.log(response);

                },
                error: function () {
                    
					console.log('Erro');
					
                }
            });				
					  
		  verificaErro = 0;
		  		  
		  $.getJSON('http://busonline.com.br/api/obraarteespecial', function(objObras) {
						
			for (i = 0; i < objObras.length; i++) {			
			var latObra = objObras[i].latitude;
			var longObra = objObras[i].longitude;
			var tipoObra = objObras[i].tipo;
			var endObra = objObras[i].endereco;
			var larguraObra = objObras[i].largura;
			var alturaObra = objObras[i].altura;
			var pesoObra = objObras[i].peso;
							
			var alturaCarro = 3;
			var larguraCarro = 5;
			var pesoCarro = 40;
				
			pontMouse = [latObra,longObra];
		  		  	
			pt = turf.point(pontMouse);			
			snapped = turf.nearestPointOnLine(line, pt, {units: 'meters'});
		  
		  	var distancia = snapped.properties.dist;
			var distanciaPolilinha = snapped.properties.location;
								  		  
		  	if(distancia <= 30){ // tá na rota
				
				if(larguraObra != null){ // tem largura					
										
					if(larguraObra<=larguraCarro){
												
						verificaErro = 1;
						
					}else{											
						
					}
					
				}				
				
				if(alturaObra != null){ // tem altura										
										
					if(alturaObra<=alturaCarro){
												
						verificaErro = 1;
						
					}else{
												
					}					
				}		
				
				
				if(pesoObra != null){ // tem peso
					
					if(pesoObra<=pesoCarro){
												
						verificaErro = 1;
						
						
					}else{						
						
					}					
				}
				
								
				if(verificaErro == 0){ // não achou obstáculo
										
						var latlng = {lat: parseFloat(latObra), lng: parseFloat(longObra)};			
						var marker = new google.maps.Marker({
						  position: latlng,
						  map: map,					  
						  id: i+1,
						  numMarcador: i,
						  icon: {						
							url: "img/markerOk.png",
							scaledSize: new google.maps.Size(40,45),						
							}
						});
					
					markers.push(marker);
					
					alturaMostra = '';
					larguraMostra = '';
					pesoMostra = '';
					
					if(alturaObra != null){
					
						alturaMostra = 'Altura: '+alturaObra+' metros |';
						
					}
					
					if(larguraObra != null){
					
						larguraMostra = 'Largura: '+larguraObra+' metros |';
						
					}
					
					if(pesoObra != null){
						
						pesoMostra = 'Peso: '+pesoObra+' toneladas';
						
					}
										
					obraOk = '<div class="topinfo1 col-12 dadoscontain" style="padding: 10px;"><div class="col-10 dados" style="float: left;"><p>'+tipoObra+' - Km '+(distanciaPolilinha/1000).toFixed(2)+' </br><span id="distanciaPercurso">'+endObra+'</span></p></div><div class="col-2 dados" style="float: left; height: auto; display: flex; align-items: center; justify-content: center;"><img src="img/aprovado.fw.png" width="40" height="49" alt=""/> </div><div class="col-12 dados" style="float: left; font-size: 0.8em;"><span id="distanciaPercurso">'+alturaMostra+larguraMostra+pesoMostra+'</span></p></div></div>';
					
					$("#listaObras").append(obraOk);

					
				}else{ // achou obstáculo
										
						var latlng = {lat: parseFloat(latObra), lng: parseFloat(longObra)};			
						var marker = new google.maps.Marker({
						  position: latlng,
						  map: map,					  
						  id: i+1,
						  numMarcador: i,
						  icon: {						
							url: "img/markerNo.png",
							scaledSize: new google.maps.Size(40,45),						
							}
						});
					
					markers.push(marker);
					
					alturaMostra = '';
					larguraMostra = '';
					pesoMostra = '';
					
					if(alturaObra != null){
					
						alturaMostra = 'Altura: '+alturaObra+' metros |';
						
					}
					
					if(larguraObra != null){
					
						larguraMostra = 'Largura: '+larguraObra+' metros |';
						
					}
					
					if(pesoObra != null){
						
						pesoMostra = 'Peso: '+pesoObra+' toneladas';
						
					}					
					
					obraNo = '<div class="topinfo1 col-12 dadoscontain" style="padding: 10px;"><div class="col-10 dados" style="float: left;"><p>'+tipoObra+' - Km '+(distanciaPolilinha/1000).toFixed(2)+' </br><span id="distanciaPercurso">'+endObra+'</span></p></div><div class="col-2 dados" style="float: left; height: auto; display: flex; align-items: center; justify-content: center;"><img src="img/reprovado.fw.png" width="40" height="49" alt=""/> </div><div class="col-12 dados" style="float: left; font-size: 0.8em;"><span id="distanciaPercurso">'+alturaMostra+larguraMostra+pesoMostra+'</span></p></div></div>';

					$("#listaObras").append(obraNo);
					
				}
						
				verificaErro = 0;				
							
				}		  
			}
			  
		  });			
													
		}
		

      function computeTotalDistance(result) {
        var total = 0;
		var totalCoord = 0;
		var rota = '';
		coords = '';
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
		rota = myroute;
		  
		 tempoPercurso = myroute.legs[0].duration.text;
		 distanciaPercurso = total;
		  
		 $("#distanciaPercurso").html(distanciaPercurso+' Km');
		  
		 $("#tempoPercurso").html(tempoPercurso);
		 $("#barraTempoDist").show();
		  
		 coords = rota.overview_path;
	  
		  if (contaMarker > 2){
			gravaPolilinhaRota(coords);
			coords = '';
		  }
		
		contaMarker++;
      
	  }
	  	  
   