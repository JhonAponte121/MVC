
var personas=[];
var datos={};

    async function buscarDatos(){
    console.log("nad");
    validar = document.getElementsByName('cedula');
    todoBien=true;
    for (let k = 0; k < validar.length; k++) {
        campo = validar[k];
        campo.setAttribute('class','form-control');
        datos[campo.id]=campo.value;
        if (campo.value.length<1) {
        campo.setAttribute('class','form-control is-invalid');
        alert("Porfavor rellene el espacio de cedula");
        todoBien=false;
            
        }
    }

    cedula = datos.cedula;
    console.log(cedula);

      URL = "http://173.249.49.169:88/api/test/consulta/"+cedula;
      const resp = await fetch(URL);
      const data = await resp.json();

    if(data.Ok){
     document.getElementById('nombre').value=data.Nombres+" "+data.Apellido1+" "+data.Apellido2;
     fechaVa = data.FechaNacimiento.slice(0,10);

     document.getElementById('fechanacimiento').value=fechaVa;
     document.getElementById('lugarnacimiento').value=data.LugarNacimiento;
     document.getElementById('foto').src=data.Foto;

     document.getElementById('signo').value=signo(data.FechaNacimiento,data.FechaNacimiento);

        alert("Datos Recopilados -Aceptar para continuar-");

        }else{
       alert("ERROR al introducir la Cedula, Verifique que este correcta.");
     }
}

    function signo (diaa, nacimiento){
    x1=nacimiento.slice(5,7);
    mes = parseInt(x1);
    s2=diaa.slice(8,10);
    dia = parseInt(s2);
    signo="";
    
    switch (mes) {
        case 1:

            if(dia>21){
                signo="ACUARIO";
            }else{
                signo="CAPRICORNIO";
            }
            
            break;
            case 2:

                if(dia>19){
                    signo="PISCIS";
                }else{
                    signo="ACUARIO";
                }
                
                break;
                case 3:

                if(dia>20){
                    signo="ARIES";
                }else{
                    signo="PISCIS";
                }
                
                break;
                case 4:

                if(dia>20){
                    signo="TAURO";
                }else{
                    signo="ARIES";
                }
                
                break;
                case 5:

                if(dia>21){
                    signo="GEMINIS";
                }else{
                    signo="TAURO";
                }
                
                break;

                case 6:
                if(dia>20){
                    signo="CANCER";
                }else{
                    signo="GEMINIS";
                }
                
                break;
                case 7:

                if(dia>22){
                    signo="LEO";
                }else{
                    signo="CANCER";
                }

                
                break;
                case 8:
                if(dia>21){
                    signo="VIRGO";
                }else{
                    signo="LEO";
                }
                
                break;
                case 9:
                if(dia>22){
                    signo="LIBRA";
                }else{
                    signo="VIRGO";
                }
                
                break;
                case 10:
                if(dia>19){
                    signo="ESCORPION";
                }else{
                    signo="LIBRA";
                }
                
                break;
                case 11:
                if(dia>21){
                    signo="SAGITARIO";
                }else{
                    signo="ESCORPION";
                }
                
                 break;
                 case 12:
                 if(dia>21){
                    signo="CAPRICORNIO";
                }else{
                    signo="SAGITARIO";
                }
                
                break;
    
        default:
            break;
    }
    return signo;
}

    function confirmarDatos(){
    cedula=document.getElementById('cedula').value;
    nombre=document.getElementById('nombre').value;
    FechaNacimiento=document.getElementById('fechanacimiento').value;
    LugarNacimiento=document.getElementById('lugarnacimiento').value;
    foto=document.getElementById('foto').src;
    signo=document.getElementById('signo').value;

     if(cedula!=""&&nombre!=""&&FechaNacimiento!=""&&LugarNacimiento!=""&&foto!=""&&signo!=""){
     document.getElementById('cedulaDesign').innerHTML=cedula;
     document.getElementById('nombreDesign').innerHTML=nombre;
     document.getElementById('lugarDesign').innerHTML=LugarNacimiento;
     document.getElementById('fechaDesign').innerHTML=FechaNacimiento;
     document.getElementById('fotoDesign').src=foto;
     document.getElementById('fotoDesign2').src=foto;
     document.getElementById('fotoSigno').src="Signo/"+signo+".png";
     document.getElementById('horoscopoDesign').innerHTML=signo;
   }

    toDataURL(foto, function(dataURL){
    $('#fotoDesign').attr('src', dataURL);
    $('#fotoDesign2').attr('src', dataURL);
    })
   }

    function guardarLocal(){
    localStorage.setItem('Personas',JSON.stringify(personas));
    }  
     var personas_edit = null;

     function guardarPersonas(){

    name=document.getElementById('cedulaDesign').innerHTML;
    name2=document.getElementById('nombreDesign').innerHTML;
    name3=document.getElementById('lugarDesign').innerHTML;
    name4=document.getElementById('fechaDesign').innerHTML;
    name5=document.getElementById('fotoDesign').src;
    name6=document.getElementById('fotoDesign2').src;
    name7=document.getElementById('fotoSigno').src;
    name8=document.getElementById('horoscopoDesign').innerHTML;

    if(name!=""&&name2!=""&&name3!=""&&name4!=""&&name5!=""&&name6!=""&&name7!=""&&name8!=""){

    if(personas_edit==null){
    datos.nombre=name2;
    datos.cedula=name;
    datos.lugarnacimiento=name3;
    datos.fechanacimiento=name4;
    datos.foto=name5;
    datos.foto2=name6;
    datos.fotosigno=name7;
    datos.signo=name8;

    personas.push(datos);
     guardarLocal();
    traerLocal();
    alert("Guardado Exitosamente");

    }
   
    }else{

    datos.nombre=name2;
    datos.cedula=name;

    datos.lugarnacimiento=name3;
    datos.fechanacimiento=name4;

    datos.foto=name5;
    datos.foto2=name6;
     
    datos.fotosigno=name7;
    datos.signo=name8;

    personas[personas_edit]=datos;
    guardarLocal();
    alert("Actualizado");
    traerLocal();
    }
}

   function traerLocal(){
  tmp=localStorage.getItem('Personas');

  if(tmp!= null){
      personas=JSON.parse(tmp);
  }
     destino=document.getElementById('cedulasCargadas');
     destino.innerHTML="";
     modelo=document.getElementById('text_modelo').value;

     for (x = 0; x< personas.length;x++) {
     person = personas[x];
     div=document.createElement('div');
     div.setAttribute('class','col-sm-4');
     txt=modelo;
     for(k in person){
         txt=txt.replace('{'+k+'}',person[k]);
     }

     div.innerHTML=txt;
     div2 = document.createElement('div');
     div2.setAttribute('id','div2');
      
     button=document.createElement('button');
     button.setAttribute('class','btn btn-success');
     button.setAttribute('onclick','generCedular('+x+')');
     i=document.createElement('i');


     button.append(i);
     button.appendChild(document.createTextNode('Generar'));
     div2.appendChild(button);

     button2=document.createElement('button');
     button2.setAttribute('class','btn btn-danger');
     button2.setAttribute('onclick','eliminarPersonas('+x+')');
     i2=document.createElement('i');
     button2.append(i2);

     button2.appendChild(document.createTextNode('Eliminar'));
     div2.appendChild(button2);

      div.appendChild(div2);

     destino.appendChild(div);
     
      }
     }
 
   $("#cedulasGuardas").hide('slow');

   function eliminarPersonas(position){
   if(confirm("¿Seguro que desea borrar esta cedula?")){
       personas.splice(position,1);
         for(i=0;i<personas.length;i++){
             localStorage.removeItem(personas[i]);
         }
         guardarLocal();
         traerLocal();
   }
  }


     function generCedular(position){
     personas_edit=position;
     edi = personas[position];
     atras();

     document.getElementById("cedula").value=edi["cedula"];
     document.getElementById("nombre").value=edi["nombre"];
     document.getElementById("lugarnacimiento").value=edi["lugarnacimiento"];
     document.getElementById("fechanacimiento").value=edi["fechanacimiento"];
     document.getElementById("foto").src=edi["foto"];
     document.getElementById("signo").value=edi["signo"];

     document.getElementById("cedulaDesign").innerHTML=edi["cedula"];
     document.getElementById("nombreDesign").innerHTML=edi["nombre"];
     document.getElementById("lugarDesign").innerHTML=edi["lugarnacimiento"];
     document.getElementById("fechaDesign").innerHTML=edi["fechanacimiento"];
     document.getElementById("fotoDesign").src=edi["foto"];

             document.getElementById("horoscopoDesign").innerHTML=edi["signo"];
             document.getElementById("fotoDesign2").src=edi["foto2"];
             document.getElementById("fotoSigno").src=edi["fotosigno"];

     }

       function verCedulas(){
       $("#cedulasGuardas").show('slow');
       $("#divPrincipal").hide('slow');
       }

       function atras() {
       $("#cedulasGuardas,#captura").hide('slow');
        $("#divPrincipal").show('slow');
       Webcam.reset();
      }

       function exportarIMAGE(){
       cedula= document.getElementById('cedula').value;
    
           html2canvas($("#cedulaImage"),{
           onrendered: function(canvas){
           saveAs(canvas.toDataURL(),cedula+'_cedula.png');
           }

           });

    function saveAs(uri,filename){
        var link = document.createElement('a');
        if(typeof link.download==='string'){
            link.href=uri;
            link.download=filename;
            document.body.append(link);
            link.click();
            document.body.removeChild(link);
            }else{
            window.open(uri);
           }
         }
        }

    $("#captura").hide('slow');
    function capturar(){
    $("#captura").show('slow');
    $("#divPrincipal").hide('slow');


        Webcam.set({
        ancho:300,
        altura:428,
        image_format:'jpeg',
        jpeg_quality:150
    });

    Webcam.attach('#my_camera');
    Webcam.on('error', function(err){
        alert("La camara no funciona o no esta activada");
    })
  }

        function take_snapshot(){
        Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML='<im id="imageprev" src="'+data_uri+'"/>';
        document.getElementById('foto').src=data_uri;
        })
        }

     function toDataURL(src, callback){
      var xhttp = new XMLHttpRequest();
    

    xhttp.onload = function(){
        var fileReader = new FileReader();
        fileReader.onloadend = function(){
            callback(fileReader.result);
        };
        fileReader.readAsDataURL(xhttp.response);
    }; 

    xhttp.responseType = 'blob';
    xhttp.open('GET', src, true);
    xhttp.send(); 
     }