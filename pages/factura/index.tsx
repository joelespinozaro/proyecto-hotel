import React, { useState } from 'react'
import { jsPDF } from "jspdf";
import { Container } from 'react-bootstrap';
import styles from './_factura.module.css';
import Swal from 'sweetalert2'
import LoadingScreen from '../../components/LoadingScreen';

interface Factura {
    dias?: number;
    descripcion?: string;
    precio?: number;
}

const FacturaComponent = () => {

    const [arrayFactura, setArrayFactura] = useState<Factura[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [factura, setFactura] = useState<Factura>({
        dias: undefined,
        descripcion: '',
        precio: undefined
    });


    const emitirFactura = (e: any) => {
        e.preventDefault();
        let xTable = 25;
        let yTable=127;
        setLoading(true);
        const doc = new jsPDF();
        doc.setFontSize(50)
        doc.setTextColor(255, 0, 0)
        doc.text(80, 20, 'Factura')

        doc.setTextColor(10)
        doc.setFontSize(20)
        doc.text(20, 30, 'Logo')

        doc.setLineWidth(0.5)
        doc.line(20, 35, 60, 35)

        doc.setFontSize(10)
        doc.text(20, 40, 'Direccion')
        doc.setFontSize(10)
        doc.text(20, 45, 'Ciudad, Provincia 0000')
        doc.setFontSize(10)
        doc.text(20, 50, 'Telefono:(00)1111 111')
        doc.setFontSize(10)
        doc.text(20, 55, 'Num factura')
        doc.setFontSize(10)
        doc.text(20, 60, 'persona@ejemplo.com')

        doc.setLineWidth(0.5)
        doc.line(20, 62, 60, 62)

        doc.setLineWidth(0.5)
        doc.line(140, 35, 140, 62)

        doc.setFontSize(10)
        doc.text(145, 40, 'Fecha: 22/07/2021')
        doc.setFontSize(10)
        doc.text(145, 45, 'Factura :# 00001')
        doc.setFontSize(10)
        doc.text(145, 50, 'Para: nº Pedido 123456')
        doc.setLineWidth(0.7)
        doc.line(200, 35, 200, 62)

        doc.setLineWidth(1.5)
        doc.line(20, 68, 200, 68)

        doc.setDrawColor(0)
        doc.setLineWidth(0.9)
        doc.setFillColor(255, 204, 153)
        doc.roundedRect(20, 75, 180, 10, 3, 3, 'FD')

        doc.setTextColor(0)
        doc.setLineWidth(0.5)
        doc.text(25, 81, 'Factura para:')
        
        doc.setDrawColor(0)
        doc.setFillColor(245, 231, 253)
        doc.rect(20, 88, 180, 30, 'FD')
        doc.setLineWidth(0.5)
        doc.setTextColor(0)
        doc.text(25, 95, 'Contacto de la empresa')
        doc.text(25, 100, 'Nombre de la empresa')
        doc.text(25, 105, 'Direccion')
        doc.text(25, 110, 'Ciudad, Provincia 0000')
        doc.text(25, 115, 'Numbero: (00) 222 222')

        doc.setDrawColor(0)
        doc.setFillColor(255, 204, 153)
        doc.rect(20, 119, 180, 10, 'FD')
        doc.text(21, 125, 'Cantidad de dias')
        doc.text(100, 125, 'Descripcion')
        doc.text(179, 125, 'Importe')

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255)
        doc.rect(20, 129, 180, 100, 'FD')


        // doc.text(xTable, yTable, `Pagos: ${arrayFactura.length}`)
        
        arrayFactura.forEach(x=>{
           
            yTable = yTable +10;
            doc.text(xTable,yTable,x.dias)
            xTable = xTable + 75;
            doc.text(xTable,yTable,x.descripcion)
            xTable = xTable + 80;
            doc.text(xTable,yTable,x.precio)
            xTable=25;
           
        })
        doc.setDrawColor(0)
        doc.setFillColor(245, 231, 253)
        doc.rect(20, 229, 90, 30, 'FD')
        doc.setLineWidth(0.5)
        doc.setTextColor(0)
        doc.text(25, 236, 'OBERVACIONES:')

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255)
        doc.rect(165, 229, 35, 20, 'FD')
        doc.setLineWidth(0.5)
        doc.setTextColor(0)
        xTable=145;
        yTable=240;
        doc.text(xTable,yTable,`10%IGV:`)

        xTable=175;
        yTable=240;
        doc.text(xTable,yTable,`${total*0.10}`)
       

        doc.setDrawColor(0)
        doc.setFillColor(255, 204, 153)
        doc.rect(165, 249, 35, 20, 'FD')
        doc.setLineWidth(0.5)
        doc.setTextColor(0)

        xTable=145;
        yTable=260;
        doc.text(xTable,yTable,`TOTAL:`)

        xTable=175;
        yTable=260;
        doc.text(xTable,yTable,`${total+(total*0.10)}`)
    
       
        doc.setLineWidth(1.5)
        doc.line(20, 269, 200, 269)



        doc.save('factura.pdf')
        setLoading(false);

    }

    const agregarGasto = (e: any) => {
        e.preventDefault();
        setTotal(Number(total)+Number(factura.precio));
        if (factura) {
            setArrayFactura([...arrayFactura, factura])
        }
        setFactura({
            descripcion: ''
        })
        Swal.fire(
            '!Buen trabajo!',
            'Se agregó un gasto',
            'success'
        )
    }

    const handleInput = (e: any) => {
        setFactura({
            ...factura,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className={styles.container}>
            {
                loading && <LoadingScreen></LoadingScreen>
            }
            <form className={styles.formContainer}>
                <input
                    name="dias"
                    type="number"
                    className="form-control"
                    placeholder="Cantidad de días"
                    aria-label="Cantidad de días"
                    aria-describedby="basic-addon2"
                    style={{ margin: '10px 0' }}
                    value={factura?.dias || ''}
                    onChange={(e) => handleInput(e)}
                />
                <input
                    name="descripcion"
                    type="text"
                    className="form-control"
                    placeholder="Descripción"
                    aria-label="Descripción"
                    aria-describedby="basic-addon2"
                    style={{ margin: '10px 0' }}
                    value={factura?.descripcion}
                    onChange={(e) => handleInput(e)}
                />
                <input
                    name="precio"
                    type="number"
                    className="form-control"
                    placeholder="Precio"
                    aria-label="Precio"
                    aria-describedby="basic-addon2"
                    style={{ margin: '10px 0' }}
                    value={factura?.precio || ''}
                    onChange={(e) => handleInput(e)}
                />
                <div className={styles.buttonsContainer}>
                    <button className="btn-primary" onClick={(e) => agregarGasto(e)}>Agregar gasto</button>
                    <button className="btn btn-outline-primary" onClick={(e) => emitirFactura(e)}>Emitir factura</button>
                </div>
            </form>
            
        </div>
    )
}

export default FacturaComponent;
