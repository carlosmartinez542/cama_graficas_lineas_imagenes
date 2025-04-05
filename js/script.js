//Lienzo del canvas
const canvas = document.getElementById("lineChart");
const ctx = canvas.getContext("2d");

// Datos que se van a graficar
const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
const sanSalvador = [30, 32, 34, 35, 36, 37, 36, 35, 34, 32, 31, 30];
const santaTecla = [25, 26, 28, 29, 31, 32, 32, 31, 30, 28, 27, 26];

// Imágenes de bordes izquierdo y derecho
const marginLeft = 50;
const marginRight = 50;

// Función para dibujar la linea con etiquetas
function drawLineWithLabels(data,color){
    ctx.beginPath(); // Se coloca el puntero de inicio de la línea
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    for(let i=0; i<data.length; i++){
        //Iniciar y finalizar en los bordes establecidos del lienzo (no sale de los bordes)
        const x = (i/(data.length -1)) * (canvas.width - marginLeft - marginRight) + marginLeft;
        const y = canvas.height - (data[i] - 15) * 10; // Ajuste de escala
                                    //Arreglo -15 px*10px
         
        //Dibujar la linea                            
        if (i === 0){
            ctx.moveTo(x,y); // Se mueve el puntero a la posición inicial
        }else{
            ctx.lineTo(x,y); // Se dibuja la línea hasta la posición actual
        }

        ctx.fillStyle = color;
        ctx.font = "12px Arial";
        ctx.fillText(data[i]+"°C", x+5, y-5); // Se dibuja la etiqueta del dato
    }
    ctx.stroke(); // Se dibuja la línea
}


//Funcion para dibujar las etiquetas y los ejes
function drawAxes() {
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    // Eje X
    ctx.moveTo(50,canvas.height-50);
    ctx.lineTo(canvas.width-50,canvas.height-50);

    // EJE Y
    ctx.moveTo(50,canvas.height-50);
    ctx.lineTo(50,50);

    // Dibujar
    ctx.stroke();

    // Etiquetas en el eje x
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    for (let i = 0; i < labels.length; i++) {
        const x = (i / (labels.length - 1)) * (canvas.width - marginLeft - marginRight) + marginLeft;
        ctx.fillText(labels[i], x - 20, canvas.height - 30);
    }

    // Etiquetas en el eje Y
    for(let i=20; i<=40; i+=5){
        const y = canvas.height - 50 - (i-20) * 10;
        ctx.fillText(i+"°C",20, y+5);
    }
}

drawAxes(); // Dibuja los ejes
drawLineWithLabels(sanSalvador,'red'); // Dibuja la línea de San Salvador
drawLineWithLabels(santaTecla,'blue'); // Dibuja la línea de Santa Tecla

// Leyenda
ctx.fillStyle = 'red';
ctx.fillRect(70,20,10,10); // Cuadro rojo
ctx.fillStyle = 'black';
ctx.fillText("San Salvador",85,30); // Texto San Salvador

ctx.fillStyle = 'blue';
ctx.fillRect(170,20,10,10); // Cuadro azul
ctx.fillStyle = 'black';
ctx.fillText("Santa Tecla",185,30); // Texto Santa Tecla