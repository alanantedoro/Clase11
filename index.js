const express = require('express');
const Contenedor = require('./Contenedor.js');
const contenedor = new Contenedor('./productos.json');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const PORT = 8080;


//Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/productos', async (req, res) => {
  const newProduct = req.body;

  const idProductSaved = await contenedor.save(newProduct);

  res.render('index');
});

app.get('/productos', async (req, res) => {
    var lista = await contenedor.getAll();

    res.render('resultados',{
        lista: lista
    });
});

//Server init y error
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

app.on('error', (error) => console.log('Error: ', error));

