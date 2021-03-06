// const firestore = firebase.firestore();
let sellersOnly = [];
let fullDataSellers = [];
let fullDataSellers2 = [];

const dataExtractor = (jsonFile) => {
  return new Promise((resolve, reject) => {
    fetch(jsonFile) 
    .then(response => response.json())
      .then(data => { 
        const fullDataSellers = data;  
            return resolve(fullDataSellers);
        })
        // aca adentro va la funcion que haremos con esa respuesta que se recibe, reslove es ok reject es fail
  
      .catch((error) => {
          return reject(console.log('error' + error));
          
         });    
  });
};

window.onload = () => {
  dataExtractor('../../products.json').then((result) => {
    // console.log('promesa ejecutada' + JSON.stringify(result));
    fullDataSellers2 = result;
    result.forEach(element => {
      // console.log(element.Tienda);
      sellersOnly.push({
        "Seller": element.Tienda
      })
    })  
    // console.log(sellersOnly);
    printSellers();
  })
}

const printSellers = () => {
  const sellerList = document.getElementById('sellerListResultPlace');
  if (sellersOnly.length === 583){
    // console.log(sellersOnly);
    sellersOnly.forEach(seller => {
      // let id = seller.Seller; 
      // console.log(id);
      sellerList.innerHTML += `<p>${seller.Seller}</p>
      <button id=${seller.Seller} onclick="findSellerMatches(this.id)">Ver Productos</button>`
    })
  }
}

const findSellerMatches = (id) => {
  // console.log(sellersOnly);
  // console.log(fullDataSellers2); 
  const placeResult = document.getElementById('productSellerResultPlace');
  // console.log(id);
  let matches = fullDataSellers2.forEach((element) => {
      if (element.Tienda === id) {
        // console.log(element.Producto);
        let buttonID = element.Producto.replace(/ /g, "");
        // let buttonID2 = buttonID.replace(/\//g, '');
        placeResult.innerHTML += `<p>${element.Producto}</p>
        <button id=${buttonID} onclick="showProduct2(this.id)">Comparar</button>`
        return element;
      } else {
        console.log('no match');  
      }
    })
  };

    

  const showProduct2 = (id) => {

    //console.log(id);
    //console.log(fullData[0].nombre);
    let match = fullDataSellers2.find((element) => {
      if (element.Producto.replace(/ /g, "") === id) {
        return element;
      }
    });
    console.log(match);
    showProductPlace.innerHTML = `
      <img src="${match.Thumbnail}">
      <p>Nombre ${match.Producto}</p>
      <p>Tienda ${match.Tienda}</p>
      <p>Precio ${match.ValorUnidad}</p>
    `;
  };

