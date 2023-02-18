var app = {
     temPermissao: true,
     // Application Constructor
     initialize: function() {
         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
         
     },
 
     // deviceready Event Handler
     //
     // Bind any cordova events here. Common events are:
     // 'pause', 'resume', etc.
     onDeviceReady: function() {
         var self = this;
         window.plugins.speechRecognition.hasPermission(
                 function(temPermissao){
                     if(!temPermissao){
                         window.plugins.speechRecognition.requestPermission(
                                 function(deuPermissao){
                                        self.temPermissao = true;
                                        alert("deu rock!"+deuPermissao);
                                 },
                                 function(erro){
                                     self.temPermissao = false;
                                     alert("erro na permissao"+erro);
                                 });
                     }
                 },
                 function(error){
                     alert("erro");
                     alert(error);
                 }
                 );
         
         
     },
     stop: function(){
         window.plugins.speechRecognition.stopListening(
                 function(){
                     alert("parou");
                 },
                 function(){
                     alert("erro");
                 });
     },
     vai: function(){
         var self = this;
		 //var falado = '';
         
         if(!self.temPermissao){
             alert("Sem permissão para usar o microfone ");
             
             return false;
         }
         
         var options = {
             language: "pt-BR",
             showPartial: true,
             showPopup: false
           };
 
           window.plugins.speechRecognition.startListening(
                   function(dados){
                       $.each(dados,function(key,texto){
                           //if(falado != ''){
						   	//$("#q").html(falado).append(texto);
						   //}else{
							$("#q").html("").append(texto);
						   //}
                       });
					   //falado = $("#q").val();
                  },
                  function(erro){
                      alert("erro: "+erro);
                  },options);
     },
     isAbaliable: function(){
         window.plugins.speechRecognition.isRecognitionAvailable(
                 function(data){
                     alert("sucesso!");
                     alert(data);
                 },
                 function (error){
                     alert("erro!");
                     alert(error);
                 }
                 );
     }
 };
 
 app.initialize();