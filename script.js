const formulario = document.getElementById('formulario-quiniela');
const contenedorResultado = document.getElementById('contenedor-resultado');
const textoPremio = document.getElementById('valor-premio');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

     document.activeElement.blur();
   
    const loteria = document.getElementById('loteria').value;
    const montoApostado = parseFloat(document.getElementById('apuesta').value);
    const cifras = parseInt(document.getElementById('cifras').value);
    const posicion = parseInt(document.getElementById('posicion').value);
    const loteriasFlexibles = ['santa-fe', 'entre-rios', 'corrientes'];
    const posicionesPermitidasEstandar = [1, 5, 10, 20];

    
    if (loteria === 'santa-fe' && cifras === 5) {
        alert("La Lotería de Santa Fe no permite apuestas a 5 cifras en la quiniela tradicional.");
        return;
    }


    if (!loteriasFlexibles.includes(loteria) && !posicionesPermitidasEstandar.includes(posicion)) {
        alert("En esta Lotería solo se permiten apuestas directas a las posiciones: 1, 5, 10 o 20.");
        return; 
    }


    let multiplicador = 0;
    if (cifras === 1) multiplicador = 7;
    if (cifras === 2) multiplicador = 70;
    if (cifras === 3) multiplicador = 600; // Estandarizado para todas
    if (cifras === 4) multiplicador = 3500;
    if (cifras === 5) multiplicador = 12500;


    let premioBruto = (montoApostado / posicion) * multiplicador;

  
    let beneficioNeto = premioBruto - montoApostado;
    let premioFinal = premioBruto;


    if (beneficioNeto > 50000) {
        let retencion = beneficioNeto * 0.279; // Retención efectiva 27,9%
        premioFinal = premioBruto - retencion;
    }

   
    contenedorResultado.classList.remove('resultado-oculto');
    textoPremio.innerText = `$ ${premioFinal.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

   
    contenedorResultado.classList.remove('animar-resultado');
    void contenedorResultado.offsetWidth; 
    contenedorResultado.classList.add('animar-resultado');

  
    if (premioFinal > 0) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#27ae60', '#ffffff']
        });
    }

    contenedorResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
});