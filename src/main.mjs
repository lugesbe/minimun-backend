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

// Controladores executados polos endpoints
function controladorPost (peticion, respuesta) {
    tarefas.push(peticion.body)
    respuesta.status(201)
    respuesta.send("Ok")
}

function controladorGet (peticion, respuesta) {
    respuesta.status(200)
    respuesta.send(JSON.stringify(tarefas))
}


// Posta en marcha da aplicación de Express
app.listen( 8000, function () {
    console.log("Express traballando...");
})


//Daniel
const indice = tarefas.findIndex( estaTarefa => 
    estaTarefa.id
     === 
    peticion.body.id
     ) 

     Daniel dice:tarefas.splice(indice,1,peticion.body) 