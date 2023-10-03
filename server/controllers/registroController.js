const UsuarioModel = require('../models/usuariosModel');
const UsuarioCorreoModel = require('../models/correosUsuarioModel');
const UsuarioTelModel = require('../models/telefonosUsuarioModel');

const EmpleadorModel = require('../models/empleadorModel');

const EmpresaModel = require('../models/empresasModel');
const EmpresaCorreoModel = require('../models/correosEmpresasModel');
const EmpresaTelModel = require('../models/telefonosEmpresaModel');

async function RegistrarEmpleador(req, res) {
    try {
        const data = req;
        let empleadorCedu = data["empleadorCedu"];
        empleadorCedu = empleadorCedu.replace(/-/g, '');

        let success = await UsuarioModel.createUsuario(
            empleadorCedu,
            data["empleadorPass"],
            data["empleadorName"],
            data["empleadorApe1"],
            data["empleadorApe2"],
            true
        );

        success = await EmpleadorModel.createEmpleador(
            empleadorCedu,
        );

        for (let i = 1; i <= 2; ++i) {
            success = await UsuarioCorreoModel.createCorreoUsuario(
                empleadorCedu,
                data["empleadorCorreo"+i] || ' '
            );
            let empresaTel = data["empresaTel"+i];
            empresaTel = empresaTel.replace(/-/g, '');

            success = await UsuarioTelModel.createTelefonoUsuario(
                empleadorCedu,
                empresaTel || ' ',
            );
        }
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
        empleadorCedu = empleadorCedu.replace(/-/g, '');
        let success = await EmpresaModel.createEmpresa(
            data["empresaCedu"],
            data["empresaName"],
            empleadorCedu,
        );

        for (let i = 1; i <= 2; ++i) {
            success = await EmpresaCorreoModel.create(
                data["empresaCedu"] || ' ',
                data["empresaCorreo"+i] || ' '
            );
            // let empresaTel = data["empresaTel"+i];
            // empresaTel = empresaTel.replace(/-/g, '');
            success = await EmpresaTelModel.create(
                data["empresaCedu"] || ' ',
                data["empresaTel"+i].replace(/-/g, '') || ' '
            );
        }
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
        cedula_empleador = cedula_empleador.replace(/-/g, '');

        const [existenUsuario, existenEmpresa] = await Promise.all([
            UsuarioModel.getByCedula(cedula_empleador),
            EmpresaModel.getEmpresaByCedula(data["empresaCedu"])
        ]);

        // Verifica si existen registros en Usuario y Empresa
        const existen = (existenUsuario ? 1 : 0) + (existenEmpresa ? 2 : 0);

        if (existen) {
            console.log("existen: ", existen);
            res.status(409).json({ message: existen });
        }
        else{
            console.log("No existen: ", existen);

            const promises = [RegistrarEmpleador(data, res), RegistrarEmpresa(data, res)];
            const results = await Promise.all(promises);
            const [successEmpleador, successEmpresa] = results;

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