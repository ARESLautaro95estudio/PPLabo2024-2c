class Vehiculo
{
    Modelo="";
    VelocidadMaxima=0;
    añoFabrica=0;
    Id="";
    constructor(a_Modelo,a_añoFabrica,a_VelocidadMaxima,a_id)
    {
        this.Modelo = a_Modelo;
        this.VelocidadMaxima = a_VelocidadMaxima;
        if(a_añoFabrica<1985)
        {
            a_añoFabrica=1985;
        }
        this.añoFabrica = a_añoFabrica;
        this.Id = a_id;
    }
}
class Aereo extends Vehiculo
{
    altMax=0;
    Autonomia=0;
    constructor(a_modelo,a_añoFabrica,a_velocidadMaxima,a_id,a_altMax,a_Autonomia)
    {
        super(a_modelo,a_añoFabrica,a_velocidadMaxima,a_id);
        if(a_altMax<1)
        {
            a_altMax=100;
        }
        this.altMax=a_altMax;
        if(a_Autonomia<1)
        {
            a_Autonomia=100;
        }
        this.Autonomia=a_Autonomia;
    }
}
class Terrestre extends Vehiculo
{
    cantRue=0;
    cantPue=0;
    constructor (a_modelo,a_añoFabrica,a_velocidadMaxima,a_id,a_cantRue,a_cantPue)
    {
        super(a_modelo,a_añoFabrica,a_velocidadMaxima,a_id);
        this.cantRue =a_cantRue;
        this.cantPue=a_cantPue;
    }
}//Modelos
//Recibo el string
// ' [{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},{"id":2,"nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},{"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},{"id":4, "nombre":"Fernando", "apellido":"Nieto","edad":18, "compras":8000, "telefono":"152111131"},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20,"compras":50000, "telefono":"42040077"},{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23,"compras":7000, "telefono":"1813181563"}]';
let miCadena='[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]'


//lo parseo a jason
let ar=JSON.parse(miCadena);
// Mapeo el json a objetos segun corresponda
array =ar.map( vehiculos => //cada item del json es llamado People
    {//Discimino los items por la propiedad ventas para diferenciar data de cliente o empleado e instanciar asi el objeto que
    //corresponda
    if (vehiculos.autonomia ===undefined)
    {//instancio el objeto
        return new Terrestre(vehiculos.modelo,vehiculos.anoFab,vehiculos.velMax,vehiculos.id,vehiculos.cantPue,vehiculos.cantRue);
    }
    else
    {//instancio el objeto
        return new Aereo(vehiculos.modelo,vehiculos.anoFab,vehiculos.velMax,vehiculos.id,vehiculos.autonomia,vehiculos.altMax);
    }
}
);//mi variable array tiene todos los objetos instanciados segun corresponda
//funcionamiento en gral
window.addEventListener("load",()=>
{
    array.forEach(item => cargarAtabla(item));
    botonAlta();
    filtrarinfo();
});
function botonAlta()
{
    head = document.getElementById("cabezadeTabla");
    btn = document.createElement("button");
    btn.textContent="Alta";
    btn.addEventListener("click",()=>
    {
       ALTA();
    });
    head.appendChild(btn);
}
function ALTA()
{
    document.getElementById("tabla").style.display="none";
    document.getElementById("div-chechks").style.display="none";

    rdb =document.querySelectorAll('input[name="coe"]'); 
    rdb.forEach(radioBtn =>{
        radioBtn.addEventListener('change', (event) =>{
            if(radioBtn.value=="Terrestre")
                {
                   usuario = "Terrestre";
                }
                else
                {
                  usuario = "Aereo";
                }
        });
     });
    btnAceptar  = document.createElement("button");
    btnAceptar.textContent="Aceptar";
    btnAceptar.id="btn-ABM-aceptar";
    formulario =document.getElementById("form-ABM"); 
    formulario.appendChild(btnAceptar);
    formulario.style.display="flex";
    document.getElementById("btn-ABM-aceptar").addEventListener("click",(e)=>
        {
        e.preventDefault();
        if(!formulario.checkValidity())
        {
            alert("Formulario incomplieto");
            return;
        }
        if(usuario=="Terrestre")
        {
            usuario= new Terrestre(
                formulario.Modelo.value,
                formulario.Velocidad_maxima.value,
                formulario.Año_de_fabrica.value,
                formulario.id.value,
                formulario.Cantidad_de_ruedas.value,
                formulario.Cantidad_de_puertas.value,
            );
        }
        else
        {
            usuario= new Aereo(
            formulario.Modelo.value,
            formulario.Año_de_fabrica.value,
            formulario.Velocidad_maxima.value,
            formulario.id.value,
            formulario.Altura_maxima.value,
            formulario.Autonomia.value,
        );

        }    
        cargarAtabla(usuario)
        formulario.style.display="none";
        document.getElementById("form-ABM").reset();
        document.getElementById("tabla").style.display="table";
        document.getElementById("div-chechks").style.display="flex";
        formulario.removeChild(btnAceptar);
    });
}
function cargarAtabla(usuario)
{
    //creo tabla
    tr=document.createElement("tr");
    for(let atributo in usuario)
    {
        td = document.createElement("td");
        if (usuario instanceof Terrestre)
        {   
            td.textContent=usuario[atributo];
            if(atributo=="Id")
            {
                tr.appendChild(td);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
            }
            else
            {
                tr.appendChild(td);
            }
        }
        if (usuario instanceof Aereo)
        {   
            td.textContent=usuario[atributo];
            if(atributo=="Autonomia")
            {
                tr.appendChild(td);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
            }
            else
            {
                tr.appendChild(td);
            }
        }   
    }
    tr=botonesDeTabla(tr,usuario.Id);
    body = document.getElementById("cuerpoDeTabla");
    body.appendChild(tr);
}
function botonesDeTabla(tr,id)
{
    td=document.createElement("td");
    btnEliminar = document.createElement("button");
    btnEliminar.textContent="Borrar";
    btnEliminar.id="boton-eliminar";
    btnEliminar.addEventListener("click",()=>
    {
        btnEliminar.id=id;
        document.getElementById("cuerpoDeTabla").removeChild(tr);
    })
    td.appendChild(btnEliminar);
    tr.appendChild(td);
    td=document.createElement("td");
    btnModificar = document.createElement("button");
    btnModificar.textContent="Modificar";
    btnModificar.id="boton-modificar";
    btnModificar.addEventListener("click",()=>
    {
        btnModificar.id=id;
        document.getElementById("tabla").style.display="none";
        document.getElementById("div-chechks").style.display="none";
        Modificar(tr);
    })
    td.appendChild(btnModificar);
    tr.appendChild(td);
    return tr;
}
function Modificar(tr)
{
    form =document.getElementById("form-ABM"); 
    form.style.display="flex";
    bandera=false;
    if(tr.children[5].textContent!="-----")
    {
        bandera=true;
    }
    form.Modelo.value=tr.children[0].textContent;
    form.Año_de_fabrica.value=tr.children[1].textContent;
    form.Velocidad_maxima.value=tr.children[2].textContent;
    form.id.value=tr.children[3].textContent;
    form.Altura_maxima.value=tr.children[4].textContent;
    form.Autonomia.value=tr.children[5].textContent;
    form.Cantidad_de_ruedas.value=tr.children[6].textContent;
    form.Cantidad_de_puertas.value=tr.children[7].textContent;
    btnAceptar  = document.createElement("button");
    btnAceptar.textContent="Aceptar";
    btnAceptar.id="btn-ABM-aceptar";
    form.appendChild(btnAceptar);
    document.getElementById("btn-ABM-aceptar").addEventListener("click",(e)=>
    {
        e.preventDefault();
            tr.children[0].textContent=form.Modelo.value;
            tr.children[1].textContent=form.Año_de_fabrica.value;
            tr.children[2].textContent=form.Velocidad_maxima.value;
            
            if(bandera)
            {
                tr.children[4].textContent=form.Altura_maxima.value;
                tr.children[5].textContent=form.Autonomia.value;
            }
            else
            {
                tr.children[6].textContent=form.Cantidad_de_ruedas.value;
                tr.children[7].textContent=form.Cantidad_de_puertas.value;
            }
            form.style.display="none";
            document.getElementById("cuerpoDeTabla").appendChild(tr);
            document.getElementById("form-ABM").reset();
            document.getElementById("tabla").style.display="table";
            document.getElementById("div-chechks").style.display="flex";
            form.removeChild(btnAceptar);
    });
}

function filtrarinfo()
{
    grupoChebocks = document.querySelectorAll('input[name="filtros"]');
    grupoChebocks.forEach((box)=>{
        box.addEventListener("change", ()=>{
            auxiliar(box);
        });
    });
}

function auxiliar(box)
{
    thead=document.getElementById("thead");
    tbody=document.getElementById("cuerpoDeTabla");
    console.log(box.value);
    switch(box.value)
    {
        case "Modelo":
            if(box.checked)
            {
                thead.children[0].children[0].style.display="none";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[0].style.display="none";
                })
            }
            else
            { thead.children[0].children[0].style.display="flex";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[0].style.display="flex";
                })}
            break;
        case "autonomia":
            if(box.checked)
            {thead.children[0].children[5].style.display="none";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[5].style.display="none";
                })}
            else
            {thead.children[0].children[5].style.display="flex";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[5].style.display="flex";
                })}
            
            break;
        case "Año":
            if(box.checked)
                {thead.children[0].children[2].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[0].style.display="none";
                    })}
                else
                {thead.children[0].children[2].style.display="flex";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[2].style.display="flex";
                    })}
            
            break;
        case "velocidad":
            if(box.checked)
                {thead.children[0].children[1].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[1].style.display="none";
                    })}
                else
                {thead.children[0].children[1].style.display="flex";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[1].style.display="flex";
                    })}
            
            break;
        case "altura":
            if(box.checked)
                { thead.children[0].children[4].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[4].style.display="none";
                    })}
                else
                {thead.children[0].children[4].style.display="flex";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[4].style.display="flex";
                    })}
           
            break;
        case "ruedas":
            if(box.checked)
                { thead.children[0].children[7].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[7].style.display="none";
                    })}
                else
                {thead.children[0].children[7].style.display="flex";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[7].style.display="flex";
                    })}
           
            break;
        case "puertas": 
        if(box.checked)
            {thead.children[0].children[6].style.display="none";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[6].style.display="none";
                })}
            else
            {thead.children[0].children[6].style.display="flex";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[6].style.display="flex";
                })}
        
            break;
        case "id":
            if(box.checked){ 
                thead.children[0].children[3].style.display="none";
            Array.from(tbody.children).forEach((tr)=>{
                tr.children[3].style.display="none";
            })}
                else
                {thead.children[0].children[3].style.display="flex";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[3].style.display="flex";
                    })}
            
            break;
    }
}