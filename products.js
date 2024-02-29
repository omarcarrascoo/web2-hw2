const fs = require('fs')

class Contenedor {
  constructor(rutaArchivo){
    this.rutaArchivo = rutaArchivo
  }

  async #leerUnArchivo(){
    try{
      const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
      const contenidoParseado = JSON.parse(contenido)
      return contenidoParseado
    } catch (error){
      console.log(error)
    }
  }
  async save (obj){
    const contenidoArchivo = await this.#leerUnArchivo()
    if (contenidoArchivo.length !==0 ){
      await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}],null,2), 'utf-8')
    }
    else {
      await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...obj, id:1}]))
    }
  }

  async randomGet(){
    const contenidoArchivo = await this.#leerUnArchivo();
    const randomItem = contenidoArchivo[Math.floor(Math.random()*contenidoArchivo.length)]
    console.log (randomItem)
    return randomItem
    

  }
  async getAll(){
    const contenidoArchivo = await this.#leerUnArchivo()
    console.log(contenidoArchivo)
    return contenidoArchivo;
    // return this.contenidoParseado
    // console.log(this.contenidoParseado)
  }

  async getById(id){
    const contenidoArchivo = await this.#leerUnArchivo()
    contenidoArchivo.find(object =>{
      if(object.id === id){
          console.log(object);
      }
  });
  }
  async delateById(id){
    const contenidoArchivo = await this.#leerUnArchivo()
    const indexOfObject = contenidoArchivo.findIndex(object => {
      return object.id === id;
    });
    if (id == id) {
      contenidoArchivo.splice(indexOfObject, 1)
      await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contenidoArchivo],null,2), 'utf-8')
      console.log(contenidoArchivo)

    }else{
      console.log("No se encontro el producto")
    }
 
  }
  async delateAll (){
    await fs.promises.unlink(this.rutaArchivo)
  }
}

// contenedor.save({producto: 'Cahoa', precio: 100 })
// contenedor.getById(3)
// contenedor.getAll()
// contenedor.delateById(3)
// contenedor.delateAll()
module.exports = Contenedor;