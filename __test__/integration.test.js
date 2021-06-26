import axios from 'axios';

/*
PRUEBAS DE INTEGRACIÓN REALIZADAS
      1.  Usuarios
        a.	Autenticación de un usuario
        b.	Registro de un usuario
        c.	Actualización de un usuario
      2.	Libros
        a.	Registro de un libro
        b.	Actualización de un libro
        c.	Eliminar un libro
      3.	Compras
        a.	Ingreso de una compra
      4.	Bitácora
        a.	Registrar un evento
*/


describe('Pruebas de Integración de Servicio de Usuario', function () {
  test('Prueba de Login', async () => {
    const result = await axios.post('http://35.209.82.125:7000/login',{
        "user" : "admin@admin.com",
        "password" : "Abc123**"
    });
    expect(result.status).toBe(200);
  });
  
  test('Prueba de Registro de Usuario', async () => {
    const result = await axios.post('http://35.209.82.125:7000/usuario',{
        "primerNombre": "INTEGRACIÓN PRUEBAS",
        "segundoNombre": "",
        "primerApellido": "",
        "segundoApellido": "",
        "rol": "EDITORIAL",
        "username": "integracion@integracion.com",
        "password": "Abc123**",
        "telefono": "33322211",
        "direccion": "ZONA 1, GUATEMALA"
    });
    expect(result.status).toBe(200);
  });

  test('Prueba de Actualización de Usuario', async () => {
    const result = await axios.put('http://35.209.82.125:7000/usuario',{
        "idUser" : 2,
        "primerNombre": "EDITORIALES PRUEBAS",
        "segundoNombre": "",
        "primerApellido": "",
        "segundoApellido": "",
        "rol": "EDITORIAL",
        "username": "mail@editorial.com",
        "password": "Abc123**",
        "telefono": "12345678",
        "direccion": "ZONA 1, GUATEMALA"
    });
    expect(result.status).toBe(200);
  });
});

describe('Pruebas de Integración de Servicio de Libros', function () {
  test('Prueba de Registro de Libro', async () => {
    const result = await axios.post('http://34.72.218.226:7070/libro',{
        "nombre": "Lo que el viento 2se llevó",
        "autor": "Margaret Mitchell",
        "url": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-loqueelvientosellevo-1582115504.jpg",
        "idUser": 2,
        "stock" : 20,
        "precio" : 20.50,
        "generos": [      
            {
            "id": 1,
            "nombre": "Novela"
            }
        ]
    });
    expect(result.status).toBe(200);
  });

  test('Prueba de Actualización de Libro', async () => {
    const result = await axios.put('http://34.72.218.226:7070/libro',{
        "idLibro" : 1,
        "nombre": "La Ilíada",
        "autor": "Homero",
        "stock": 25,
        "url": "https://m.media-amazon.com/images/I/51vcz5D7OVL.jpg",
        "precio": 75.50,
        "generos": [      
            {
            "id": 1,
            "nombre": "Novela"
            },
            {
            "id": 2,
            "nombre": "Fábula"
            }
        ]
    });
    expect(result.status).toBe(200);
  });

  test('Prueba de Eliminación de Libro', async () => {
    const result = await axios.put('http://34.72.218.226:7070/libro/baja',{
          "idLibro" : 23
      });
    expect(result.status).toBe(200);
  });

});


describe('Pruebas de Integración de Servicio de Compras', function () {
  test('Prueba de Ingreso de Compra', async () => {
    const result = await axios.post('http://34.72.218.226:7060/compra',{
          "idLibro":1,
          "idUser":2,
          "cantidad": 1,
          "valorUnitario": 75.00,
          "valorImpuestos": 90,
          "valorFinal": 840.00,
          "tipoPago": "TARJETA",
          "tarjeta": "1234123412341234",
          "cvv": "256",
          "direccion": "ZONA 1"
      });
    expect(result.status).toBe(200);
  });
});

describe('Pruebas de Integración de Servicio de Bitacora', function () {
  test('Prueba de Ingreso de Actividad', async () => {
    const result = await axios.post('http://34.72.218.226:6060/bitacora',{
        "idLibro": 1,
        "idUser": 1, 
        "operacion": "MODIFICACION"
    });
    expect(result.status).toBe(200);
  });
});