function agrupados(){
     let noAgrupados = document.getElementById("noAgrupados");
     let agrupados = document.getElementById("agrupados");
     agrupados.removeAttribute("onclick");
     noAgrupados.setAttribute("onclick","noAgrupados()");
     document.getElementById("divAgrupados").style.display="block";
     document.getElementById("divNoAgrupados").style.display="none";
     if(noAgrupados.hasAttribute("onclick")){
          mainB();
     };
}

function mainB(){     
     var creados = 0;
     var table = document.getElementById("table");
     var intervalos = document.getElementsByClassName("interval");
     var variables =[]
     var media = document.getElementsByClassName("media");
     var mediana = document.getElementsByClassName("mediana");
     var moda = document.getElementsByClassName("moda");
     var cantTh = document.getElementsByClassName("th").length;

     intervalos[0].addEventListener("click",function(){
          crearArray(cantTh,variables);
          creados++;
     });
     intervalos[1].addEventListener("click",function(){
          if(creados > 0){
               var borrar = table.lastChild;
               table.removeChild(borrar);
               creados--;
               variables.pop()
          }
     });

     media[0].addEventListener("click",function(){
          var writeMedia = hallarMedia(variables);
          media[1].innerHTML = writeMedia;
     });

     mediana[0].addEventListener("click",function(){
          var writeMediana = hallarMediana(variables);
          mediana[1].innerHTML = writeMediana;
     })

     moda[0].addEventListener("click",function(){
          var writeModa = hallarModa(variables);
          moda[1].innerHTML = writeModa;
     })
}

function crearArray(cantTh,variables){
     var fila = document.createElement("tr");
     variables.push([fila])
     table.appendChild(fila)
     var cantFilas = variables.length -1;
     for(let i = 0; i < cantTh; i++){
          var td = document.createElement("td");
          variables[cantFilas].push([td]);
          variables[cantFilas][0].appendChild(td);
      
     }
     for(let i = 0; i<2;i++){
          var number = document.createElement("input");
          number.setAttribute("type","number");
          variables[cantFilas][1].push(number)
          variables[cantFilas][1][0].appendChild(number)
     }
     var number = document.createElement("input");
     number.setAttribute("type","number"); 
     variables[cantFilas][2].push(number)
     variables[cantFilas][2][0].appendChild(number)
     return variables
}

function hallarModa(variables){
     var n = sumaN(variables);
     var a = 0;
     posicion = n/2
     var x = 0;
     do{
          x = x + parseFloat(variables[a][2][1].value);
          if(posicion < x)
          {
               a = a;
          }
          else a++;
     }while( posicion > x)
     if( posicion == x){
          return posicion
     }
     var limiteInferior = parseFloat(variables[a][1][1].value);
     var amplitud = parseFloat(variables[a][1][2].value) - limiteInferior;  
     var fiAnterior;
     var fiSuperior;
     if(a>0)  fiAnterior = variables[a-1][2][1].value;
     else fiAnterior = 0;
     if(a + 1 == variables.length)     fiSuperior = 0;
     else fiSuperior = variables[a+1][2][1].value;
     var d1 = variables[a][2][1].value - fiAnterior;
     var d2 = variables[a][2][1].value - fiSuperior;
     var moda = limiteInferior + (amplitud*(d1/(d1 + d2)));
     moda = (Math.floor(moda*100))/100;
     return moda;

}

function hallarMediana(variables){
     var n = sumaN(variables);
     var a = 0;
     posicion = n/2
     var x = 0;
     do{
          x = x + parseFloat(variables[a][2][1].value);
          if(posicion < x)
          {
               a = a;
          }
          else a++;
     }while( posicion > x)
     if( posicion == x){
          return posicion
     }
     var limiteInferior = parseFloat(variables[a][1][1].value);
     var amplitud = parseFloat(variables[a][1][2].value) - limiteInferior;  
     var FiAnterior;
     var fi = parseFloat(variables[a][2][1].value)
     if(a > 0){
          FiAnterior = x - fi;
     }
     else FiAnterior = 0;
     var mediana = limiteInferior + ((amplitud*(posicion - FiAnterior))/fi);
     mediana = Math.floor(mediana*100)/100;
     return mediana
}

function hallarMedia(variables){
     var total = 0;
     var media = 0;
     var n = sumaN(variables);
     for(let i = 0; i < variables.length; i++){
          var mc = (parseFloat(variables[i][1][2].value) + parseFloat(variables[i][1][1].value))/2
          total = total + mc*parseFloat(variables[i][2][1].value)
     }
     media = total/n;
     media = Math.floor(media*100)/100;     
     return media;
}

function sumaN(variables){
     var n = 0;
     for(let i = 0; i < variables.length; i++){
          n = n + parseFloat(variables[i][2][1].value)
     }
     return n;
}