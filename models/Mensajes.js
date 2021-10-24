const { response } = require('express');
const fs = require('fs');



class Mensajes {


	constructor(file) {
		this.file = file;
}


	async save(mensaje){
		try {
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');

			let mensajes = [];

			if(contenido === ''){
			mensaje.id = 1;
			mensajes.push(mensaje);
			} else {
				const listaDeMensajes = JSON.parse(contenido);

				mensaje.id = listaDeMensajes[listaDeMensajes.length - 1].id + 1;
				listaDeMensajes.push(mensaje);
				mensajes = listaDeMensajes;
			}

		const mensajesString = JSON.stringify(mensajes, null, 2);
		await fs.promises.writeFile(`./${this.file}`, mensajesString);

		return mensaje.id;
		
	} catch(error) {
		console.log('Error: ', error);
		};
	}


	
	async getAll(){
		try{
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
			const listaDeMensajes = JSON.parse(contenido);
			return listaDeMensajes;
		} catch(error) {
			console.log('Error: ', error);
		}

	};


}

module.exports = Mensajes;