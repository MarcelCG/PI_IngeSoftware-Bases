const UsuarioModel = require('../models/usuarioModel');
const UsuarioCorreoModel = require('../models/correosUsuarioModel');
const UsuarioTelModel = require('../models/telefonosUsuarioModel');

const EmpleadorModel = require('../models/EmpleadorModel');

const EmpresaModel = require('../models/empresasModel');
const EmpresaCorreoModel = require('../models/correosEmpresasModel');
const EmpresaTelModel = require('../models/telefonosEmpresasModel');

async function RegistrarEmpleador(req, res) {
    try {
        const data = req;

        const empleadorCedu = data["empleadorCedu"];
        empleadorCedu = empleadorCedu.replace(/-/g, '');

        success = await UsuarioModel.createUsuario(
            empleadorCedu,
            data["empleadorPass"],
            data["empleadorName"],
            data["empleadorApe1"],
            data["empleadorApe2"],
            true
        );

        success += await EmpleadorModel.create(
            empleadorCedu,
        );

        for (let i = 1; i <= 2; ++i) {
            success += await UsuarioCorreoModel.createCorreoUsuario(
                empleadorCedu,
                data["empleadorCorre"+i]
            );
            const empresaTel = data["empresaTel"+i];
            empresaTel = empresaTel.replace(/-/g, '');

            success += await UsuarioTelModel.createTelefonoUsuario(
                empleadorCedu,
                empresaTel
            );
        }
        return success;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        return error;
    }
}

async function RegistrarEmpresa(req, res) {
    try {
        const data = req;

        const empleadorCedu = data["empleadorCedu"];
        empleadorCedu = empleadorCedu.replace(/-/g, '');

        success = await EmpresaModel.createEmpresa(
            data["empresaCedu"],
            data["empresaName"],
            empleadorCedu,
        );

        for (let i = 1; i <= 2; ++i) {
            success += await EmpresaCorreoModel.create(
                data["empresaCedu"],
                data["empresaCorre"+i]
            );
            const empresaTel = data["empresaTel"+i];
            empresaTel = empresaTel.replace(/-/g, '');
            success += await EmpresaTelModel.create(
                data["empresaCedu"],
                empresaTel
            );
        }
        return success; 
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        return error; 
    }
}

async function Registrarse(req, res) {
    try {
        const data = req.body.formData
        const success = 200;

        const existen = await UsuarioModel.getByCedula(data["empleadorCedu"]);
        existen += await EmpresaModel.getEmpresaByCedula(data["empresaCedu"]);

        if (!existen) {
            return existen;
        }

        status = RegistrarEmpleador(data, res);
        status = RegistrarEmpresa(data, res);
    
        if ( success == 11 ) { 
            res.status(201).json({ message: 'Creado nuevo usuario usuario' });
        } else {
            res.status(500).json({ message: 'Hubo un error' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    Registrarse
};