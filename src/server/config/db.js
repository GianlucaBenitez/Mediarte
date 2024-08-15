const mysql = require(`mysql`)
const { promisify } = require(`util`) 

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mediarte',
  connectionLimit: 10, 
})

const promiseQuery = promisify(db.query).bind(db) 

db.getConnection((err, connection) => {
  if (err) {
    throw err
  } else {
    console.log('Conexión exitosa')
    
    connection.query(
      `CREATE TABLE IF NOT EXISTS usuarios(id_usuario int(5) NOT NULL AUTO_INCREMENT, nombre varchar(25) NOT NULL,
      email varchar(100) NOT NULL, contrasena varchar(100) NOT NULL, PRIMARY KEY(id_usuario));
      )`
    )

    connection.query(
        `CREATE TABLE IF NOT EXISTS audios(id_audio int NOT NULL AUTO_INCREMENT, nombre_audio varchar(25) NOT NULL,
        tipo_meditacion varchar(25) not NULL, cant_reprod int not NULL, PRIMARY KEY(id_audio));
        
        IF NOT EXISTS(SELECT * FROM sys.indexes WHERE name = 'idx_tipo_meditacion' AND object_id = OBJECT_ID('audios'))
    BEGIN
        CREATE INDEX idx_tipo_meditacion ON audios(tipo_meditacion);
    END 
        )`
    )

    connection.query(
        `CREATE TABLE IF NOT EXISTS guardados(id_usuario int(5) NOT NULL, tipo_meditacion varchar(25) not NULL,
        constraint fk_id_usuario foreign key (id_usuario) references usuarios(id_usuario),
        constraint fk_tipo_meditacion foreign key (tipo_meditacion) references audios(tipo_meditacion));
        CREATE UNIQUE INDEX idx_validacion_guardados ON guardados(id_usuario,tipo_meditacion);
        )`
    )
  }
})

module.exports = promiseQuery