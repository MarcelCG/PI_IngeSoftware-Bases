import React from "react";
import { Document, Page, View, Text, Image } from  "@react-pdf/renderer"

const ReportePDF = (props) => {
    const datos = props.datos;
    const columnas = props.columnas;
    const cargando = props.cargando;
    const empresa = props.datosEmpresa;
    console.log(empresa)
    return (
            <Document>
                <Page size="A4">
                    <View style={{backgroundColor: "#243A69", height: "40px"}}>
                        <Image style={{width: "120px;"}} src="/logo_oraculo_menu.png" alt='Logo Oraculo'/>
                    </View>
                    <View>
                        {empresa? (
                            <View style={{marginBottom: "40px", display: "flex"}}>
                                <Text>{empresa.nombre}</Text>
                                <Text>Telefono: {empresa.telefono1}</Text>
                                <Text>{empresa.correo1}</Text>
                            </View>
                        ):(<></>)}
                    </View>
                    <View className='rounded p-3'>
                        <View className='rounded'>
                            <View className='overflow-hidden rounded'>
                                {!cargando?(
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        {columnas.map((col, index) => (
                                            <Text key={index} >
                                                {col.nombre}
                                            </Text>
                                        ))}
                                    </View>
                                ):(<></>)}
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        
    );
}

export default ReportePDF;
