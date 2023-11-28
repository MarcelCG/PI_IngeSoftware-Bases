import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from  "@react-pdf/renderer"

const ReportePDF = (props) => {
    let datos = props.datos;
    const columnas = props.columnas;
    const cargando = props.cargando;
    const empresa = props.datosEmpresa;
    const titulo = props.titulo;
    const tamanioColumna = (100/columnas.length)+"%";

    const styles = StyleSheet.create({
        contenido: {
            padding: '10px 35px'
        },
        tabla: { 
            display: 'table', 
            width: 'auto', 
            borderStyle: 'solid', 
            borderColor: '#bfbfbf',
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0
        },
        filaTabla: { 
            margin: 'auto', 
            flexDirection: 'row' 
        },
        tituloColumna: { 
            width: tamanioColumna,
            borderStyle: 'solid', 
            borderColor: '#bfbfbf',
            borderBottomColor: '#000',
            borderWidth: 1,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            backgroundColor: '#f2f2f2',
        },  
        tablaColumna: { 
            width: tamanioColumna,
            borderStyle: 'solid', 
            borderColor: '#bfbfbf',
            borderWidth: 1,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            marginLeft: 0,
            paddingLeft: 0,
            textAlign: 'left',
        },
          contenidoTituloColumna: {
            marginLeft: 5,
            marginTop: 5, 
            marginBottom: 5,
            fontSize: 12,
            fontWeight: 'bold'
        },
          tablaCelda: {
            marginLeft: 5,
            marginTop: 5, 
            marginBottom: 5, 
            fontSize: 10,
            textAlign: 'left'
        }
    });

    const hoy = new Date().toLocaleDateString();
    return (
        <Document>
            <Page size="A4">
                <View fixed style={{backgroundColor: "#243A69", height: "40px", marginBottom:"20px"}}>
                    <Image style={{width: "120px", marginLeft: "40%"}} src="/logo_oraculo_menu.png" alt='Logo Oraculo'/>
                </View>
                <View style={styles.contenido}>
                    <Text style={{fontSize: "32px", textAlign: "center", marginBottom: "16px"}}>{empresa.nombre}</Text>
                    <View>
                        {empresa? (
                            <Text style={{fontSize: "16px", textAlign: "center"}}>
                                Contacto: {empresa.telefono1} | {empresa.correo1}
                            </Text>
                        ):(<></>)}
                    </View>
                    <Text style={{fontSize: "20px", marginTop:"30px", marginBottom:"10px", fontWeight:"bold"}}>{titulo}</Text>
                    <Text style={{fontSize: "16px", marginBottom:"20px", fontWeight:"bold"}}>Creado: {hoy}</Text>
                    <View style={styles.tabla}>
                        <View style={styles.filaTabla}>
                            {!cargando? (
                                columnas.map((col, index) => (
                                    <View style={styles.tituloColumna}>
                                        <Text style={styles.contenidoTituloColumna} key={index} >
                                            {col.nombre}
                                        </Text>
                                    </View>
                                ))
                            ):(<></>)}
                        </View>
                        {!cargando? (
                            datos.map((dato, rowIndex) => (
                                <View style={styles.filaTabla} key={rowIndex}>
                                  {columnas.map((col, colIndex) => (
                                    <View style={styles.tablaColumna} key={colIndex}>
                                        <Text style={styles.tablaCelda}>{dato[col.id]||'-'}</Text>
                                    </View>
                                  ))}
                                </View>
                            ))
                        ):(<></>)}
                    </View>    
                </View>
            </Page>
        </Document>
        
    );
}

export default ReportePDF;
