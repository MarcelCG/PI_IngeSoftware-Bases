USE ElEquipo

CREATE TABLE Usuario (
    cedula VARCHAR(255) PRIMARY KEY,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    primer_apellido VARCHAR(255) NOT NULL,
    segundo_apellido VARCHAR(255),
    telefono1 VARCHAR(255) NOT NULL,
    telefono2 VARCHAR(255),
    correo1 VARCHAR(255) NOT NULL,
    correo2 VARCHAR(255),
    activo BIT NOT NULL
);

CREATE TABLE Empleador (
    cedula_empleador VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (cedula_empleador) REFERENCES Usuario(cedula)
);

CREATE TABLE Empresa (
    cedula_juridica VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cedula_empleador VARCHAR(255) NOT NULL,
    telefono1 VARCHAR(255) NOT NULL,
    telefono2 VARCHAR(255),
    correo1 VARCHAR(255) NOT NULL,
    correo2 VARCHAR(255),
    FOREIGN KEY (cedula_empleador) REFERENCES Usuario(cedula)
);

CREATE TABLE Empleado (
    cedula_empleado VARCHAR(255) PRIMARY KEY,
    cedula_empresa VARCHAR(255) NOT NULL,
    rol VARCHAR(255),
    fecha_contratacion DATE NOT NULL,
    FOREIGN KEY (cedula_empleado) REFERENCES Usuario(cedula),
    FOREIGN KEY (cedula_empresa) REFERENCES Empresa(cedula_juridica)
);

CREATE TABLE Politica (
    titulo VARCHAR(255),
    cedula_empresa VARCHAR(255),
    descripcion VARCHAR(255),
    periodo DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_final DATE,
    dias_a_dar DECIMAL(5, 2),
    inicia_desde_contrato BIT NOT NULL,
    acumulativo BIT NOT NULL,
    incrementativo BIT NOT NULL,
    dias_a_incrementar decimal(5,2),
    activo BIT NOT NULL,
    PRIMARY KEY (titulo, cedula_empresa),
    FOREIGN KEY (cedula_empresa) REFERENCES Empresa(cedula_juridica)
);

CREATE TABLE Solicitud (
    id BIGINT PRIMARY KEY,
    cedula_empleado VARCHAR(255) NOT NULL,
    titulo_politica VARCHAR(255) NOT NULL,
    cedula_empresa VARCHAR(255) NOT NULL,
    fecha_solicitud DATE NOT NULL,
    inicio_fechas_solicitadas DATE NOT NULL,
    dias_libres_solicitados DECIMAL(5, 2) NOT NULL,
    hora_de_inicio TIME (0),
    horas_solicitadas INT,
    estado VARCHAR(255) NOT NULL,
    comentarios VARCHAR(255),
    FOREIGN KEY (cedula_empleado) REFERENCES Empleado(cedula_empleado),
    FOREIGN KEY (titulo_politica, cedula_empresa) REFERENCES Politica(titulo, cedula_empresa)
);

USE ElEquipo
ALTER TABLE Libres
ADD ultima_actualizacion DATE;


CREATE TABLE Libres (
    cedula_empleado VARCHAR(255) NOT NULL,
    titulo_politica VARCHAR(255) NOT NULL,
    cedula_empresa VARCHAR(255) NOT NULL,
    dias_libres_disponibles DECIMAL(5, 2) NOT NULL,
    dias_libres_utilizados DECIMAL(5, 2) NOT NULL,
    ultima_actualizacion DATE,
    PRIMARY KEY (cedula_empleado,titulo_politica,cedula_empresa),
    FOREIGN KEY (cedula_empleado) REFERENCES Empleado(cedula_empleado),
    FOREIGN KEY (titulo_politica, cedula_empresa) REFERENCES Politica(titulo, cedula_empresa)
);

DROP TRIGGER InsertarLibre
GO;
CREATE TRIGGER InsertarLibre 
ON Libres
INSTEAD OF INSERT
AS 
BEGIN
    DECLARE @EMPLEADO VARCHAR(255);
        DECLARE @POLITICA VARCHAR(255);
        DECLARE @EMPRESA VARCHAR(255);
        DECLARE @DISPONIBLES DECIMAL(5,2);
        DECLARE @UTILIZADOS DECIMAL(5,2);
        DECLARE @ULTIMA DATE;
        DECLARE @RC_ANTERIOR INT = 0;

    DECLARE libsInsertados CURSOR FOR
    SELECT  cedula_empleado,
            titulo_politica,
            cedula_empresa,
            dias_libres_disponibles,
            dias_libres_utilizados,
            ultima_actualizacion
    FROM inserted;

    OPEN libsInsertados;
    FETCH NEXT FROM libsInsertados INTO 
        @EMPLEADO,
        @POLITICA,
        @EMPRESA,
        @DISPONIBLES,
        @UTILIZADOS,
        @ULTIMA;
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @RC_ANTERIOR = @@ROWCOUNT;
        UPDATE Libres
            SET dias_libres_disponibles = @DISPONIBLES,
                ultima_actualizacion = @ULTIMA
            WHERE cedula_empleado = @EMPLEADO
            AND cedula_empresa = @EMPRESA
            AND titulo_politica = @POLITICA;

        IF @RC_ANTERIOR = @@ROWCOUNT 
            BEGIN
                INSERT INTO Libres (cedula_empleado,
                    titulo_politica,
                    cedula_empresa,
                    dias_libres_disponibles,
                    dias_libres_utilizados,
                    ultima_actualizacion)
                VALUES (@EMPLEADO, @POLITICA, @EMPRESA, @DISPONIBLES, @UTILIZADOS, @ULTIMA);
            END
        FETCH NEXT FROM libsInsertados INTO 
            @EMPLEADO,
            @POLITICA,
            @EMPRESA,
            @DISPONIBLES,
            @UTILIZADOS,
            @ULTIMA;
    END

    CLOSE libsInsertados;
    DEALLOCATE libsInsertados;
END;
GO;

-- Creados por Richard C03200
CREATE PROC obtenerDatosEmpleador @cedula_empleador varchar(255)
AS
BEGIN
	SELECT u.cedula,u.nombre, u.primer_apellido, 
	u.segundo_apellido,u.correo1, u. correo2,
	u.telefono1, u.telefono2, em.nombre AS 'nombre_empresa'
	FROM Usuario u
	INNER JOIN Empresa em ON em.cedula_empleador = u.cedula AND u.cedula = @cedula_empleador
END;
GO;

CREATE PROC obtenerDatosEmpleado @cedula_empleado varchar(255), @cedula_empresa varchar(255)
AS
BEGIN
	SELECT u.cedula,u.nombre, u.primer_apellido, 
	u.segundo_apellido,u.correo1, u. correo2,
	u.telefono1, u.telefono2, em.fecha_contratacion, em.rol
	FROM Usuario u
	INNER JOIN Empleado em ON em.cedula_empleado = u.cedula AND u.cedula = @cedula_empleado AND em.cedula_empresa = @cedula_empresa
END;
GO;

CREATE PROC ActualizarEstadoSolicitud @id bigInt, @estado varchar(255)
AS
BEGIN
	IF @estado = 'Rechazada'
	BEGIN
		DECLARE @cedulaEmpleado varchar(255)
		DECLARE @cedulaEmpresa varchar(255)
		DECLARE @diasSolicitados decimal(5,2)
		DECLARE @politica varchar(255)

		SELECT 
            @cedulaEmpleado = cedula_empleado, 
            @cedulaEmpresa = cedula_empresa, 
            @diasSolicitados = dias_libres_solicitados, 
            @politica = titulo_politica
        FROM Solicitud
        WHERE id = @id

		UPDATE Libres
        SET dias_libres_disponibles = dias_libres_disponibles + @diasSolicitados,
		dias_libres_utilizados = dias_libres_utilizados - @diasSolicitados
        WHERE cedula_empleado = @cedulaEmpleado 
            AND cedula_empresa = @cedulaEmpresa 
            AND titulo_politica = @politica

	END

	UPDATE Solicitud
	SET estado = @estado
	WHERE id = @id
END;
GO;