import express from "express"
import cors from "cors"
import { Sequelize, DataTypes }  from 'sequelize';

// Creamos e configuramos a aplicación de Express
const app = express()
app.use(cors()) // Aceptar peticións desde outras URL
app.use(express.json()) // Manexar os datos recibidos como JSON

/**
 * CONFIGURAR TABLAS BASE DE DATOS
 */

/**
 * Creamos una instancia de sequelize apuntando a una
 * base de datos, en este caso un fichero de SQLite.
 * El fichero de SQLite se creará automáticamente.
 */

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

/**
 * Definimos nuestros "modelos".
 * Los modelos representan a los datos almacenados
 * en una tabla de la base de datos.
 */

// O noso almacen de datos.
// Normalmente en lugar do array atoparemos unha base de datos.


const Tarefa = sequelize.define('Tarefa', {
    // id: Sequelize se ocupa del id de los modelos por nosotros.
    descripcion: {
      type: DataTypes.STRING
    },
    completada: {
      type: DataTypes.BOOLEAN
    }
  });
  await sequelize.sync({ alter: true })




// let tarefas = [
    // {
        // id: 0,
        // descripcion: "Unha tarefa de exemplo",
        // completada: true,
    // }
// ]

// Definicions de endpoints
app.post("/tarefas/", controladorPost)
app.get("/tarefas/", controladorGet)
app.put("/tarefas/", controladorPut)
app.delete ("/tarefas/", controladorDelete)

// Controladores executados polos endpoints

async function controladorPost(peticion, respuesta){
    // tarefas.push(peticion.body)
    try {
        const tarefa = await Tarefa.create(peticion.body)
        respuesta.setHeader("Content-Type", "application/json")
        respuesta.status(201)
        respuesta.send(tarefa.toJSON())
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
}


async function controladorGet (peticion, respuesta) {
   
        try {
            const todasAsTarefas = await Tarefa.findAll()
            respuesta.setHeader("Content-Type", "application/json")
            respuesta.status(200)
            respuesta.send(JSON.stringify(todasAsTarefas))
            } catch (error) {
            respuesta.status(500)
            respuesta.send('Error.')
            // respuesta.send(JSON.stringify(tarefas))
            }
        }     


async function controladorPut (peticion,respuesta){
    try {
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.update(peticion.body)
        // tarefas.splice(posicion, 1, peticion.body) 
        respuesta.status(200)
        respuesta.send ("Ok")
    }catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }}

async function controladorDelete (peticion,respuesta){
    try {
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.destroy()
        respuesta.status(200)
        respuesta.send("Ok")      
     } catch (error) {
            respuesta.status(500)
            respuesta.send('Error.')
        }}

// Posta en marcha da aplicación de Express
app.listen( 8000, function () {
    console.log("Express traballando...");
})
