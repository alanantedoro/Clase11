const { response } = require('express');
const fs = require('fs');



class Contenedor {


	constructor(file) {
		this.file = file;
}


	async save(producto){
		try {
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');

			let productos = [];

			if(contenido === ''){
			producto.id = 1;
			productos.push(producto);
			} else {
				const listaDeProductos = JSON.parse(contenido);

				producto.id = listaDeProductos[listaDeProductos.length - 1].id + 1;
				listaDeProductos.push(producto);
				productos = listaDeProductos;
			}

		const productosString = JSON.stringify(productos, null, 2);
		await fs.promises.writeFile(`./${this.file}`, productosString);

		return producto.id;
		
	} catch(error) {
		console.log('Error: ', error);
		};
	}



	async getByID(idRequested){
		try {
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');

			const listaDeProductos = JSON.parse(contenido);
			let result = listaDeProductos.filter(items => items.id == idRequested);

			if(listaDeProductos === '' || result == ''){
				return null;
			} else {
				return result;
				}
	
	} catch(error) {
			console.log('Error: ', error);
		};
	
	};

	
	async getAll(){
		try{
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
			const listaDeProductos = JSON.parse(contenido);
			return listaDeProductos;
		} catch(error) {
			console.log('Error: ', error);
		}

	};

	async deleteById(deleteId){
		try {
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');

			const listaDeProductos = JSON.parse(contenido);

			let arrayCheck = listaDeProductos.filter(items => items.id == parseInt(deleteId));
			let newArray = listaDeProductos.filter(items => items.id !== parseInt(deleteId));

			let respuesta;

			if(arrayCheck.length === 0){

				respuesta = 'producto no encontrado';

			} else {
				
				const productosString = JSON.stringify(newArray, null, 2);
	
				await fs.promises.writeFile(`./${this.file}`, productosString);

				respuesta = 'Item deleted successfully';
			}

			return respuesta

		} catch(error) {
			console.log('Error: ', error);
			};
	
	};

	async deleteAll(){
		try{
			const contenido = await fs.promises.writeFile(`./${this.file}`, '');
		} catch(error) {
			console.log('Error: ', error);
		}
	}

	async update(id, product){
		const list = await this.getAll();
		console.log(list);
		const productSaved = list.find((item) => item.id === parseInt(id));
		console.log(productSaved);
		const indexProductSaved = list.findIndex((item) => item.id === parseInt(id));
		console.log(indexProductSaved);
		
		if(!productSaved){
			console.error(`Product ID ${id} was not found`);
			return null;
		}

		const productUpdated = {
			...productSaved,
			...product
		}

		list[indexProductSaved] = productUpdated;

		const productosString = JSON.stringify(list, null, 2);
		await fs.promises.writeFile(`./${this.file}`, productosString);
	
		return productUpdated;
	}

}





module.exports = Contenedor;