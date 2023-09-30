const UsuarioModel = require('../models/usuarioModel');
const UsuarioCorreoModel = require('../models/correosUsuarioModel');
const UsuarioTelModel = require('../models/telefonosUsuarioModel');

const EmpleadorModel = require('../models/EmpleadorModel');

const EmpresaModel = require('../models/empresasModel');
const EmpresaCorreoModel = require('../models/correosEmpresasModel');
const EmpresaTelModel = require('../models/telefonosEmpresasModel');

function RegistrarEmpleador(req, res) {
    try {
        const data = req;

        success = UsuarioModel.createUsuario(
            data["empleadorCedu"],
            data["empleadorPass"],
            data["empleadorName"],
            data["empleadorApe1"],
            data["empleadorApe2"],
            true
        );

        success += EmpleadorModel.create(
            data["empleadorCedu"],
        );

        for (let i = 1; i <= 2; ++i) {
            success += UsuarioCorreoModel.createCorreoUsuario(
                data["empleadorCedu"],
                data["empleadorCorre"+i]
            );

            success += UsuarioTelModel.createTelefonoUsuario(
                data["empleadorCedu"],
                data["empleadorTel"+i]
            );
        }
        return success;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        return error;
    }
}

function RegistrarEmpresa(req, res) {
    try {
        const data = req;

        success = EmpresaModel.createEmpresa(
            data["empresaCedu"],
            data["empresaName"],
            data["empleadorCedu"],
        );

        for (let i = 1; i <= 2; ++i) {
            success += EmpresaCorreoModel.create(
                data["empresaCedu"],
                data["empresaCorre"+i]
            );

            success += EmpresaTelModel.create(
                data["empresaCedu"],
                data["empresaTel"+i]
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

        const existen = UsuarioModel.getByCedula(data["empleadorCedu"]);
        existen += EmpresaModel.getEmpresaByCedula(data["empresaCedu"]);

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