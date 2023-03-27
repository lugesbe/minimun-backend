import express from "express"
import cors from "cors"

// Creamos e configuramos a aplicación de Express
const app = express()
app.use(cors()) // Aceptar peticións desde outras URL
app.use(express.json()) // Manexar os datos recibidos como JSON

// O noso almacen de datos.
// Normalmente en lugar do array atoparemos unha base de datos.
let tarefas = [
    {
        id: 0,
        descripcion: "Unha tarefa de exemplo",
        completada: true,
    }
]

// Definicions de endpoints
app.post("/tarefas/", controladorPost)
app.get("/tarefas/", controladorGet)
app.put("/tarefas/", controladorPut)
app.delete ("/tarefas/", controladorDelete)

// Controladores executados polos endpoints
function controladorPost (peticion, respuesta) {
    tarefas.push(peticion.body)
    respuesta.status(201)
    respuesta.send("Ok") //respuesta de insomnisa
}

function controladorGet (peticion, respuesta) {
    respuesta.status(200)
    respuesta.send(JSON.stringify(tarefas)) //respuesta de insomnisa
}


function controladorPut (peticion,respuesta){
    let posicion = tarefas.findIndex( 
        function (estaTarefa) { 
            const tarefaBuscada =  estaTarefa.id === peticion.body.id
            return tarefaBuscada
         } 
          ) 
        tarefas.splice(posicion, 1, peticion.body) 
        respuesta.status(200)
        respuesta.send ("Listo!")
}

function controladorDelete (peticion,respuesta){
    let posicion = tarefas.findIndex( 
    function (estaTarefa) { 
        const tarefaBuscada =  estaTarefa.id === peticion.body.id
        return tarefaBuscada
     } 
      )
      tarefas.splice(posicion, 1) 
      respuesta.status(200)
      respuesta.send ("borrada!")
}

// Posta en marcha da aplicación de Express
app.listen( 8000, function () {
    console.log("Express traballando...");
})
