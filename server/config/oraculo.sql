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
    id BIGINT PRIMARY KEY IDENTITY(1, 1),
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

CREATE TABLE Libres (
    cedula_empleado VARCHAR(255) NOT NULL,
    titulo_politica VARCHAR(255) NOT NULL,
    cedula_empresa VARCHAR(255) NOT NULL,
    dias_libres_disponibles DECIMAL(5, 2) NOT NULL,
    dias_libres_utilizados DECIMAL(5, 2) NOT NULL,
    ultima_actualizacion DATE,
    PRIMARY KEY (cedula_empleado,titulo_politica,cedula_empresa),
    FOREIGN KEY (cedula_empleado) REFERENCES Empleado(cedula_empleado),
    FOREIGN KEY (titulo_politica, cedula_empresa) REFERENCES Politica(titulo, cedula_empresa) ON UPDATE CASCADE
);

-- Jeremy
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

CREATE PROC obtenerDatosEmpleadorPorCedula @cedula_empresa varchar(255)
AS
BEGIN
	SELECT u.cedula,u.nombre, u.primer_apellido, 
	u.segundo_apellido,u.correo1, u. correo2,
	u.telefono1, u.telefono2, em.nombre AS 'nombre_empresa'
	FROM Usuario u
	INNER JOIN Empresa em ON em.cedula_empleador = u.cedula AND em.cedula_juridica = @cedula_empresa
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

-- Creado por Ulises
CREATE PROCEDURE ObtenerSolicitudesDeEmpresa @cedula_empresa varchar(255)
AS
SELECT CONCAT(u.nombre, ' ', u.primer_apellido,
' ', u.segundo_apellido) AS 'nombre_completo',
s.cedula_empleado AS 'cedula', s.titulo_politica AS 'politica',
s.fecha_solicitud, s.inicio_fechas_solicitadas,
s.dias_libres_solicitados, s.hora_de_inicio, s.horas_solicitadas,
s.estado, s.comentarios
FROM Empleado e, Solicitud s, Usuario u
WHERE s.cedula_empresa=@cedula_empresa
AND e.cedula_empleado=u.cedula
AND s.cedula_empleado=e.cedula_empleado

-- Creado por Ulises
CREATE PROCEDURE ObtenerSolicitudesDeEmpleado @cedula varchar(255)
AS
SELECT CONCAT(u.nombre, ' ', u.primer_apellido,
' ', u.segundo_apellido) AS 'nombre_completo',
s.cedula_empleado AS 'cedula', s.titulo_politica AS 'politica',
s.fecha_solicitud, s.inicio_fechas_solicitadas,
s.dias_libres_solicitados, s.hora_de_inicio, s.horas_solicitadas,
s.estado, s.comentarios
FROM Empleado e, Solicitud s, Usuario u
WHERE s.cedula_empleado=@cedula
AND e.cedula_empleado=u.cedula
AND s.cedula_empleado=e.cedula_empleado


-- Creado por Ulises
CREATE TRIGGER bajarLibresPorSolicitud
ON Solicitud
AFTER INSERT
AS
UPDATE Libres
SET dias_libres_disponibles=(dias_libres_disponibles-i.dias_libres_solicitados)
FROM inserted i, Libres l
WHERE i.cedula_empleado=l.cedula_empleado
AND i.cedula_empresa=l.cedula_empresa
AND i.titulo_politica=l.titulo_politica

-- Jeremy :>
GO
CREATE PROCEDURE BorrarEmpresa(@cedula_empresa VARCHAR(255))
AS
BEGIN
    -- 1. Borrar Politicas
    DECLARE @titulo_politica VARCHAR(255);
    DECLARE PoliticasCursos CURSOR FOR
    SELECT titulo
    FROM Politica WHERE cedula_empresa = @cedula_empresa

    OPEN PoliticasCursos;
    FETCH NEXT FROM PoliticasCursos INTO @titulo_politica
    WHILE @@FETCH_STATUS = 0
    BEGIN 
        BorrarPolitica(@titulo_politica, @cedula_empresa)
        FETCH NEXT FROM PoliticasCursos INTO @titulo_politica
    END
    CLOSE PoliticasCursos;
    DEALLOCATE PoliticasCursos;
    -- 2. Borrar Empleados
    DECLARE @cedula_empleado VARCHAR(255);
    DECLARE EmpleadosCursos CURSOR FOR
    SELECT cedula_empleado
    FROM Empleado WHERE cedula_empresa = @cedula_empresa

    OPEN EmpleadosCursos;
    FETCH NEXT FROM EmpleadosCursos INTO @cedula_empleado
    WHILE @@FETCH_STATUS = 0
    BEGIN 
        BorrarEmpleado(@cedula_empleado)
        FETCH NEXT FROM EmpleadosCursos INTO @cedula_empleado
    END
    CLOSE EmpleadosCursos;
    DEALLOCATE EmpleadosCursos;
    --3.Borrar Empresa y Empleador
    UPDATE Empresa SET activa = 0 WHERE cedula_juridica = @cedula_empresa
    UPDATE Empleador SET activa = 0 WHERE cedula_empleador = (SELECT cedula_empleador FROM Empresa WHERE cedula_juridica = @cedula_empresa)

END;        

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

CREATE PROCEDURE BorrarPolitica @titulo nvarchar(255), @cedula_empresa varchar(255)
AS
    DELETE FROM Politica
    WHERE titulo = @titulo
    AND @titulo NOT IN (SELECT DISTINCT titulo_politica FROM Libres);

    UPDATE Politica
    SET
    activo=0
    WHERE
    titulo=@titulo AND cedula_empresa = @cedula_empresa;
END;

CREATE PROCEDURE BorrarEmpleado @cedula_empleado nvarchar (255)
AS
    UPDATE Usuario
        SET
        activo=0
        WHERE
        cedula=@cedula_empleado;
    UPDATE Libres
        SET
        dias_libres_disponibles=0,
        dias_libres_utilizados=0
        WHERE
        cedula_empleado=@cedula_empleado;
END;

GO;

-- Creado por Ulises
CREATE PROCEDURE ObtenerInfoLibresPorPolitica @cedula varchar(255)
AS
SELECT 
    l.cedula_empleado, 
    l.titulo_politica, 
    l.dias_libres_disponibles,
    COALESCE(sp.dias_pendientes_aprobacion, 0) AS dias_pendientes_aprobacion,
    COALESCE(sa.dias_proximos_utilizar, 0) AS dias_proximos_utilizar
FROM 
    Libres l JOIN Politica p ON l.titulo_politica = p.titulo
    LEFT JOIN 
        (SELECT s.titulo_politica, s.cedula_empleado,
            SUM(s.dias_libres_solicitados) AS dias_pendientes_aprobacion
         FROM Solicitud s
         WHERE s.estado = 'Pendiente'
         GROUP BY s.cedula_empleado, titulo_politica) sp
		 ON l.cedula_empleado = sp.cedula_empleado
		 AND l.titulo_politica = sp.titulo_politica
    LEFT JOIN 
        (SELECT s.titulo_politica, s.cedula_empleado, 
             SUM(s.dias_libres_solicitados) AS dias_proximos_utilizar
         FROM 
             Solicitud s
         WHERE s.estado = 'Aprobada' AND GETDATE() < s.inicio_fechas_solicitadas
         GROUP BY s.cedula_empleado, s.titulo_politica) sa
		 ON l.cedula_empleado = sa.cedula_empleado
		 AND l.titulo_politica = sa.titulo_politica
WHERE (p.activo = 1
    OR (l.dias_libres_disponibles != 0
    OR COALESCE(sp.dias_pendientes_aprobacion, 0) != 0
    OR COALESCE(sa.dias_proximos_utilizar, 0) != 0)) AND l.cedula_empleado = @cedula;
    
CREATE PROCEDURE ActualizarPolitica
    @titulo VARCHAR(255),
	@titulo_nuevo VARCHAR(255),
    @cedula_empresa VARCHAR(255),
    @periodo DECIMAL(5, 2),
    @fecha_final DATE,
    @dias_a_dar DECIMAL(5, 2),
    @incrementativo BIT,
    @dias_a_incrementar DECIMAL(5, 2),
    @acumulativo BIT,
    @activo BIT,
    @descripcion VARCHAR(255)
AS
BEGIN
    UPDATE Politica
    SET
		titulo = @titulo_nuevo,
        periodo = @periodo,
        fecha_final = @fecha_final,
        dias_a_dar = @dias_a_dar,
        incrementativo = @incrementativo,
        dias_a_incrementar = @dias_a_incrementar,
        acumulativo = @acumulativo,
        activo = @activo,
        descripcion = @descripcion
    WHERE titulo = @titulo AND cedula_empresa = @cedula_empresa;
END

CREATE NONCLUSTERED INDEX IX_CedulaEmpresa_Empleado
ON Empleado (cedula_empresa);

CREATE NONCLUSTERED INDEX IX_CedulaEmpresa_Politica
ON Politica (cedula_empresa);

CREATE NONCLUSTERED INDEX IX_CedulaEmpresa_Solicitud
ON Solicitud (cedula_empresa);

CREATE NONCLUSTERED INDEX IX_CedulaEmpresa_Libres
ON Libres (cedula_empresa);