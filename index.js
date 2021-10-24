const express = require('express');
const Contenedor = require('./models/Contenedor.js');
const Mensajes = require('./models/Mensajes')
const contenedor = new Contenedor('/data/productos.json');
const mensajeria = new Mensajes('/data/mensajes.json');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const PORT = 8080;

// WebSocket

io.on('connection', async socket => {
    console.log(`Nueva connexion desde socket: ${socket.id}`);

    //Productos
    const products = await contenedor.getAll();
    socket.emit('products', products);

    socket.on('new-product',async product => {
      await contenedor.save(product);

      const products = await contenedor.getAll();
      io.sockets.emit('products', products);
    });

    //Mensajes
    const messages = await mensajeria.getAll();
    socket.emit('messages', messages);

    socket.on('new-message', async(message) => {
        await mensajeria.save(message);

        const messages = await mensajeria.getAll();
        io.sockets.emit('messages', messages);
  });
})


//Routing
app.get('/', async (req, res) => {
    const lista = await contenedor.getAll();
    res.render('index', {
        lista: lista
    });
});

// app.post('/', async (req, res) => {
//   const newProduct = req.body;

//   const idProductSaved = await contenedor.save(newProduct);

//   res.redirect('/');
// });


//Server init y error
const server = httpServer.listen(PORT, () => 
    console.log(`Servidor abierto en http://localhost:${PORT}/`)
)

app.on('error', (error) => console.log('Error: ', error));

