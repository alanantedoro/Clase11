const socket = io.connect();

//Productos
const renderProducts = (products) => {
  const htmls = products.map((product) => {
    return(`<tr>
        <td> ${product.name} </td>
        <td> ${product.price} </td>
        <td><img class="image-size" src=${product.thumbnail}></td>
     </tr>`
     );
  });

  const html = htmls.join(" ");

  document.getElementById('products').innerHTML = html;
}

const newProduct = (event) => {
  event.preventDefault();

  const producto = {
    name: document.getElementById('productName').value,
    price: document.getElementById('productPrice').value,
    thumbnail: document.getElementById('productImg').value,
  };

  socket.emit('new-product', producto);

  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImg').value = '';
}

const tabla = document.getElementById('productForm');
tabla.addEventListener('submit', newProduct);

socket.on('products', data => {
  console.log(data);
  renderProducts(data);
});



//Mensajes
var date = new Date()

const renderMessages = (messages) => {
  const htmls = messages.map((message) => {
    return(`
      <div>
        <strong class="message-email">${message.email}</strong><em class="message-time">[${message.time}]</em>:
        <em class="message-text">${message.text}</em>
      </div>
    `);
  });

  const html = htmls.join(" ");

  document.getElementById('messages').innerHTML = html;
}


const addMessage = (event) => {
  event.preventDefault();

  const mensaje = {
    email: document.getElementById('email').value,
    text: document.getElementById('texto').value,
    time: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  };

  socket.emit('new-message', mensaje);

  document.getElementById('email').value = '';
  document.getElementById('texto').value = '';
};

const chat = document.getElementById('chat-form');
chat.addEventListener('submit', addMessage);

socket.on('messages', data => {
  console.log(data);
  renderMessages(data);
});

