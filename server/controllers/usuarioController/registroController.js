const UsuarioModel = require('../../models/usuarioModel/usuariosModel');
const UsuarioCorreoModel = require('../../models/usuarioModel/correosUsuarioModel');
const UsuarioTelModel = require('../../models/usuarioModel/telefonosUsuarioModel');

const EmpleadorModel = require('../../models/usuarioModel/Empleador/empleadorModel');

const EmpresaModel = require('../../models/empresaModel/empresasModel');
const EmpresaCorreoModel = require('../../models/empresaModel/correosEmpresasModel');
const EmpresaTelModel = require('../../models/empresaModel/telefonosEmpresaModel');

async function RegistrarEmpleador(req, res) {
    try {
        const data = req;
        const empleadorCedu = data["empleadorCedu"];

        let empleadorTel2 = null;
        if (data["empleadorTel2"] != "") {
            empleadorTel2 = data["empleadorTel2"];
        }

        let empleadorCorreo2 = null;
        if (data["empleadorCorreo2"] != "") {
            empleadorCorreo2 = data["empleadorCorreo2"];
        }

        let success = await UsuarioModel.createUsuario(
            empleadorCedu,
            data["empleadorPass"],
            data["empleadorName"],
            data["empleadorApe1"],
            data["empleadorApe2"],
            data["empleadorTel1"],
            empleadorTel2,
            data["empleadorCorreo1"],
            empleadorCorreo2,
            true
        );

        success = await EmpleadorModel.createEmpleador(
            empleadorCedu,
        );

        return success;
    }
    catch (error) {
        console.log("Can not register Empleador ",error);
        return error;
    }
}

async function RegistrarEmpresa(req, res) {
    try {
        console.log("registrando Empresa");
        const data = req;
        let empleadorCedu = data["empleadorCedu"];
        empleadorCedu = empleadorCedu;

        let empresaTel2 = null;
        if (data["empresaTel2"] != "") {
            empresaTel2 = data["empresaTel2"];
        }

        let empresaCorreo2 = null;
        if (data["empresaCorreo2"] != "") {
            empresaCorreo2 = data["empresaCorreo2"];
        }

        let success = await EmpresaModel.createEmpresa(
            data["empresaCedu"],
            data["empresaName"],
            empleadorCedu,
            data["empresaTel1"],
            empresaTel2,
            data["empresaCorreo1"],
            empresaCorreo2
        );

        return success; 
    }
    catch (error) {
        console.log("Can not register Empresa ",error)
        return error; 
    }
}

async function Registrarse(req, res) {
    try {
        console.log(req.body.formData);
        const data = req.body.formData
        const success = 200;

        let cedula_empleador = data["empleadorCedu"];
        cedula_empleador = cedula_empleador;

        const [existenUsuario, existenEmpresa] = await Promise.all([
            UsuarioModel.getByCedula(cedula_empleador),
            EmpresaModel.getEmpresaByCedula(data["empresaCedu"])
        ]);

        // Verifica si existen registros en Usuarios y Empresa
        const existen = (existenUsuario ? 1 : 0) + (existenEmpresa ? 2 : 0);

        if (existen) {
            console.log("existen: ", existen);
            res.status(409).json({ message: existen });
        }
        else{
            console.log("No existen: ", existen);

            let successEmpleador = await RegistrarEmpleador(data, res);
            let successEmpresa = await RegistrarEmpresa(data, res);

            if (successEmpleador && successEmpresa) { 
                res.status(201).json({ message: 'Creado nuevo usuario usuario' });
            } else {
                res.status(500).json({ message: 'Hubo un error' });
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    Registrarse
};
