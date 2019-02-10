# NODE-API-CLIENT

Cliente Node (No oficial) para consumir el API de Flow.

**Flow.cl** es una pasarela de pagos para comercio electrónico. Este cliente le permite integrar su ecommerce para recibir pagos online.

## Requerimientos

- Node 8.x o superior

## Instalación

Instale la última versión en su proyecto desde npm
```ssh
npm install flowcl-node-api-client --save
```

## Documentación

La documentación completa del API REST de Flow la encuentrá aquí: https://www.flow.cl/docs/api.html

## Comenzando

### Configurando el cliente

Configure correctamente el cliente en el archivo **lib/config.json**.
Lo primero que debe configurar es su apiKey y secretKey del comercio registrado en Flow. Esto lo obtiene en la sección **Mis datos** acceda a https://www.flow.cl, una vez autenticado con su cuenta Flow, seleccione Mis datos y recupere su apiKey y secretKey desde la sección Seguridad.

- **apiKey** el apiKey obtenida desde su cuenta Flow
- **secretKey** el secretKey obtenida desde su cuenta Flow
- **apiURL** la URL del endpoint del API de Flow, Aquí podrá configurar el endpoint de producción o del sandbox. Esta información se obtiene en la documentación del API https://www.flow.cl/docs/api.html
- **baseURL** La URL base donde instaló el cliente en su servidor

```json
{
  "apiKey": "1F90971E-8276-4713-97FF-2BLF5091EE3B",
  "secretKey": "f8b45f9b8bcdb5702dc86a1b894492303741c405",
  "apiURL": "https://www.flow.cl/api",
  "baseURL": "https://www.misitio/apiFlow"
}
```

### Llamando a un servicio

En este ejemplo crearemos una Orden de Cobro y redireccionaremos el browser del pagador para efectuar el pago

```javascript
/**
 * Ejemplo de creación de una orden de cobro, iniciando una transacción de pago
 * Utiliza el método payment/create
 */
const FlowApi = require("flowcl-node-api-client");
const config = require("./config.json");

//Para datos opcionales campo "optional" prepara un arreglo JSON
const optional = {
      "rut": "9999999-9",
      "otroDato": "otroDato"
};
//Prepara el arreglo de datos
const params = {
    "commerceOrder": Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
    "subject": "Pago de prueba",
    "currency": "CLP",
    "amount": 5000,
    "email": "efuentealba@json.cl",
    "paymentMethod": 9,
    "urlConfirmation": config.baseURL + "/payment_confirm",
    "urlReturn": config.baseURL + "/result",
    ...optional
};
//Define el metodo a usar
const serviceName = "payment/create";

try {
    // Instancia la clase FlowApi
    const flowApi = new FlowApi(config);
    // Ejecuta el servicio
    let response = await flowApi.send(serviceName, params, "POST");
    //Prepara url para redireccionar el browser del pagador
    redirect = response.url + "?token=" + response.token;
    console.log(`location: ${redirect}`)
} catch(error) {
    console.log(error.message)
}
```

Otros ejemplos los podrá ver en la carpeta **examples/server.js** de este cliente.
