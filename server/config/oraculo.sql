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
    FOREIGN KEY (cedula_empleado) REFERENCES Empleado(cedula_empleado),
    FOREIGN KEY (titulo_politica, cedula_empresa) REFERENCES Politica(titulo, cedula_empresa)
);

CREATE TABLE Libres (
	cedula_empleado VARCHAR(255) NOT NULL,
	titulo_politica VARCHAR(255) NOT NULL,
	cedula_empresa VARCHAR(255) NOT NULL,
	dias_libres_disponibles DECIMAL(5, 2) NOT NULL,
	dias_libres_utilizados DECIMAL(5, 2) NOT NULL,
	periodos_recorridos DECIMAL(5, 2) NOT NULL,
	PRIMARY KEY (cedula_empleado,titulo_politica,cedula_empresa),
	FOREIGN KEY (cedula_empleado) REFERENCES Empleado(cedula_empleado),
	FOREIGN KEY (titulo_politica, cedula_empresa) REFERENCES Politica(titulo, cedula_empresa)
);


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[actualizarTiempos]
    @Empresa VARCHAR(255),
    @EmpleadosModificados INT OUTPUT
AS
BEGIN
    -- VARIABLES --
        DECLARE @Hoy DATETIME = GETDATE();
        DECLARE @HaceUnMes DATETIME = DATEADD(MONTH, -1, GETDATE());
    -- CURSOR VARIABLES -- 
        DECLARE calculoTiempos CURSOR FOR
        SELECT L.cedula_empleado, L.titulo_politica, L.dias_libres_disponibles, 
            P.periodo, P.fecha_inicio, P.fecha_final, P.dias_a_dar, P.inicia_desde_contrato, P.acumulativo, P.incrementativo, P.dias_a_incrementar, L.periodos_recorridos
        FROM Libres AS L
        INNER JOIN Politica AS P ON L.titulo_politica = P.titulo
        WHERE P.cedula_empresa = @Empresa
        AND P.fecha_inicio <= @Hoy
        AND P.fecha_final >= @HaceUnMes
        AND P.activo = 1;
    -- CONTENEDORES -- 
        DECLARE @PivoteIzq DATE;
        DECLARE @PivoteDer DATE;
        DECLARE @CantPeriodos DECIMAL(5,2);
        DECLARE @DiasNuevos DECIMAL(5,2);
        DECLARE @DiasExtra DECIMAL(5,2);
        DECLARE @contratacion DATE;
        DECLARE @periodosTotales DECIMAL(5,2);
        DECLARE @comadreja DECIMAL(5,2);
        DECLARE @CEDULA VARCHAR(255);
        DECLARE @TITULO VARCHAR(255);
        DECLARE @DIAS_LIBRES DECIMAL(5,2);
        DECLARE @PERIODO DECIMAL(5,2);
        DECLARE @INICIO DATE;
        DECLARE @FINAL DATE;
        DECLARE @DIAS_A_DAR DECIMAL(5,2);
        DECLARE @CONTRATO BIT;
        DECLARE @ACUMULATIVO BIT;
        DECLARE @INCREMENTATIVO BIT;
        DECLARE @DIAS_INCREMENTAR DECIMAL(5,2);
        DECLARE @RECORRIDOS DECIMAL(5,2);

    OPEN calculoTiempos;
    FETCH NEXT FROM calculoTiempos INTO @CEDULA , @TITULO , @DIAS_LIBRES, @PERIODO , @INICIO , @FINAL , @DIAS_A_DAR , @CONTRATO , @ACUMULATIVO , @INCREMENTATIVO , @DIAS_INCREMENTAR, @RECORRIDOS

    WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE @FECHA_CONTRATACION DATE = (SELECT fecha_contratacion FROM Empleado WHERE cedula_empleado = @CEDULA);

        SET @PivoteIzq = CASE
            WHEN @contratacion >= @INICIO AND @contratacion >= @HaceUnMes THEN @contratacion
            WHEN @INICIO >= @contratacion AND @INICIO >= @HaceUnMes THEN @INICIO
            ELSE @HaceUnMes
        END;

        SET @PivoteDer = CASE
            WHEN @Hoy <= @FINAL THEN @Hoy
            WHEN @FINAL <= @Hoy THEN @FINAL
            ELSE @Hoy
        END;

        SET @CantPeriodos = DATEDIFF(DAY, @PivoteIzq, @PivoteDer) / @PERIODO;
        SET @periodosTotales = DATEDIFF(DAY,
                CASE
                    WHEN @contratacion >= @INICIO THEN @contratacion
                    ELSE @INICIO
                END,
            @PivoteDer) / @PERIODO;
        SET @DiasNuevos = CASE
            WHEN @ACUMULATIVO = 1 THEN (@CantPeriodos * @DIAS_A_DAR) + @DIAS_LIBRES
            ELSE @CantPeriodos*@DIAS_A_DAR
        END;

        SET @DiasExtra = CASE
            WHEN @INCREMENTATIVO = 1 THEN (@DIAS_INCREMENTAR * (@periodosTotales * (@periodosTotales + 1) / 2 - @RECORRIDOS * (@RECORRIDOS + 1) / 2))
            ELSE 0
        END;

        PRINT 'Politica   ' + @TITULO + 'Izq   ' + CAST(@PivoteIzq AS NVARCHAR(255)) + 
             '  Der ' + CAST(@PivoteDer AS NVARCHAR(255)) +
             '  Periodos    ' + CAST(@CantPeriodos AS NVARCHAR(255)) +
             '  Totales    ' + CAST(@periodosTotales AS NVARCHAR(255)) +
             '  DiasNuevos  ' + CAST(@DiasNuevos AS NVARCHAR(255)) +
             '  Hace un mes  ' + CAST(@HaceUnMes AS NVARCHAR(255)) +
             '  DiasExtra    ' + CAST(@DiasExtra AS NVARCHAR(255));

        UPDATE Libres SET dias_libres_disponibles = (@DiasNuevos + @DiasExtra), periodos_recorridos = (@periodosTotales - @CantPeriodos)
            WHERE cedula_empleado = @CEDULA AND titulo_politica = @TITULO

        FETCH NEXT FROM calculoTiempos INTO @CEDULA , @TITULO , @DIAS_LIBRES, @PERIODO , @INICIO , @FINAL , @DIAS_A_DAR , @CONTRATO , @ACUMULATIVO , @INCREMENTATIVO , @DIAS_INCREMENTAR , @RECORRIDOS
    END;
    SELECT @EmpleadosModificados = COUNT(DISTINCT cedula_empleado)
        FROM Libres AS L
        INNER JOIN Politica AS P ON L.titulo_politica = P.titulo
        WHERE P.cedula_empresa = @Empresa
            AND P.fecha_inicio <= @Hoy
            AND P.fecha_final >= @HaceUnMes
            AND P.activo = 1;
    CLOSE calculoTiempos;
    DEALLOCATE calculoTiempos;
END;
GO
