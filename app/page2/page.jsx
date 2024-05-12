'use client'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


const Page = () => {
    const [besoinNet, setBesoinNet] = useState(Array(12).fill(0))
    const [coutSetup, setCoutSetup] = useState()
    const [coutStockage, setCoutStockage] = useState()
    const [recepPrev,setRecepPrev] = useState(Array(12).fill(0))
    const [stockDispo,setStockDispo] = useState(Array(12).fill(0))
    const [coutStockageTotal, setCoutStockageTotal] = useState()
    const [nbSetup, setNbSetup] = useState()
    const [coutTotal, setCoutTotal] = useState()


    const tableStyles = {
        borderCollapse: 'collapse',
        width: '100%'
    };

    const thStyles = {
        backgroundColor: '#f2f2f2',
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        fontWeight: 'bold'
    };

    const tdStyles = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center'
    };

    return (
        <div>
                  <Typography sx={{
                    marginBottom:'40px'
                  }} variant="h6" gutterBottom>
                  Il est fréquent d’avoir des temps/couts de reconfiguration importants, en particulier lorsqu’il s’agit de systèmes de production non flexibles, ce qui rendrait plus intéressant de n’effectuer les lancements que par lots. On applique donc une méthode de dimensionnement de lot (lot sizing) aux Besoins Nets afin d’obtenir les Réceptions Prévisionnelles. Les niveaux des stocks devraient être affectés.
                  </Typography>
            {/* <TextField sx={{
                margin: 1
            }} type="number" value={rootInitialStock[0]} onChange={(e) => {
                const updatedNeeds = Array(13).fill(0);
                updatedNeeds[0] = parseInt(e.target.value);
                setRootInitialStock(updatedNeeds);
            }} id="outlined-basic" label="Stock initial du produit fini:" variant="outlined" /> */}
            <div>
                {besoinNet.map((element, index) => (
                    <TextField sx={{
                        margin: 1
                    }} key={index} type="number" value={element}
                        onChange={(e) => {
                            const updatedNeeds = [...besoinNet];
                            updatedNeeds[index] = parseInt(e.target.value);
                            setBesoinNet(updatedNeeds);
                        }}
                        id="outlined-basic" label={`Besoin Periode ${index + 1}`} variant="outlined" />
                ))}
            </div>
            <div>
                <TextField sx={{
                    margin: 1
                }} type='number' onChange={(e) => {
                    setCoutSetup(parseFloat(e.target.value))
                }} id="outlined-basic" label="Cout du Setup" variant="outlined" />
                <TextField sx={{
                    margin: 1
                }} onChange={(e) => {
                    setCoutStockage(parseFloat(e.target.value))
                }} id="outlined-basic" label="Cout du Stockage" variant="outlined" />
            </div>
            <Button sx={{margin: 3,borderRadius:'10px'}} variant='contained' onClick={() => {
                let matrice = [Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0), Array(12).fill(0),]
                matrice[0] = besoinNet
                for (let i = 0; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i + 1; j++) {
                        a = a + j * besoinNet[j]
                    }
                    matrice[1][i] = coutSetup + coutStockage * a
                }
                for (let i = 1; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i; j++) {
                        a = a + j * besoinNet[j + 1]
                    }
                    matrice[2][i] = coutSetup + coutSetup + coutStockage * a
                }
                let min = matrice[1][1]
                for (let i = 1; i < 3; i++) {
                    if (matrice[i][1] < min) {
                        min = matrice[i][1]
                    }
                }
                for (let i = 2; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 1; j++) {
                        a = a + j * besoinNet[j + 2]
                    }
                    matrice[3][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][2]
                for (let i = 1; i < 4; i++) {
                    if (matrice[i][2] < min) {
                        min = matrice[i][2]
                    }
                }
                for (let i = 3; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 2; j++) {
                        a = a + j * besoinNet[j + 3]
                    }
                    matrice[4][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][3]
                for (let i = 1; i < 5; i++) {
                    if (matrice[i][3] < min) {
                        min = matrice[i][3]
                    }
                }
                for (let i = 4; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 3; j++) {
                        a = a + j * besoinNet[j + 4]
                    }
                    matrice[5][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][4]
                for (let i = 1; i < 6; i++) {
                    if (matrice[i][4] < min) {
                        min = matrice[i][4]
                    }
                }
                for (let i = 5; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 4; j++) {
                        a = a + j * besoinNet[j + 5]
                    }
                    matrice[6][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][5]
                for (let i = 1; i < 7; i++) {
                    if (matrice[i][5] < min) {
                        min = matrice[i][5]
                    }
                }
                for (let i = 6; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 5; j++) {
                        a = a + j * besoinNet[j + 6]
                    }
                    matrice[7][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][6]
                for (let i = 1; i < 8; i++) {
                    if (matrice[i][6] < min) {
                        min = matrice[i][6]
                    }
                }
                for (let i = 7; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 6; j++) {
                        a = a + j * besoinNet[j + 7]
                    }
                    matrice[8][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][7]
                for (let i = 1; i < 9; i++) {
                    if (matrice[i][7] < min) {
                        min = matrice[i][7]
                    }
                }
                for (let i = 8; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 7; j++) {
                        a = a + j * besoinNet[j + 8]
                    }
                    matrice[9][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][8]
                for (let i = 1; i < 10; i++) {
                    if (matrice[i][8] < min) {
                        min = matrice[i][8]
                    }
                }
                for (let i = 9; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 8; j++) {
                        a = a + j * besoinNet[j + 9]
                    }
                    matrice[10][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][9]
                for (let i = 1; i < 11; i++) {
                    if (matrice[i][9] < min) {
                        min = matrice[i][9]
                    }
                }
                for (let i = 10; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 9; j++) {
                        a = a + j * besoinNet[j + 10]
                    }
                    matrice[11][i] = min + coutSetup + coutStockage * a
                }
                min = matrice[1][10]
                for (let i = 1; i < 12; i++) {
                    if (matrice[i][10] < min) {
                        min = matrice[i][10]
                    }
                }
                for (let i = 11; i < 12; i++) {
                    let a = 0
                    for (let j = 0; j < i - 10; j++) {
                        a = a + j * besoinNet[j + 11]
                    }
                    matrice[12][i] = min + coutSetup + coutStockage * a
                }
                console.log(matrice)        
                let a = []
                for (let i = 11; i >= 0; i--) {
                        let minimumindex = 1
                        let minimum = matrice[1][i]
                        for (let j = 1; j <12 ; j++) {
                                if (matrice[j][i] >0) {

                                    if (matrice[j][i] < minimum) {
                                        minimum = matrice[j][i]
                                        minimumindex=j
                                    }
                                }
                            }
                            a.push(minimumindex)
                            i = minimumindex - 1 
                }
                let recprev=Array(12).fill(0)
                console.log(a)
                // a=a.reverse()
                // console.log(a)
                let j=11
                a.map((element,index)=>{
                    let x=0
                    for (let i =j;i>=element-1;i-- ){
                    x=x+besoinNet[i]
                    }
                    recprev[element-1]=x
                    
                    j=element-2
                })
                console.log(recprev)
                setRecepPrev(recprev)
                let stockdispo = Array(12).fill(0)
                a=a.reverse()
                console.log(a)
                for (let i =0;i<a.length;i++){
                    console.log(a[i])
                    // console.log(i)
                    // console.log(recprev[a[i]-1])
                    if (i==a.length-1){
                        let y = recprev[a[i]-1]
                    for (let j = a[i]-1; j<12;j++){
                        // console.log(besoinNet[j])
                        console.log(j)
                        stockdispo[j] = y-besoinNet[j]
                        y = stockdispo[j]
                    }
                    }else{
                        let y = recprev[a[i]-1]
                        for (let j = a[i]-1; j<a[i+1]-1;j++){
                            // console.log(besoinNet[j])
                            console.log(j)
                            stockdispo[j] = y-besoinNet[j]
                            y = stockdispo[j]
                        }
                    }
                }
                console.log(stockdispo)
                setStockDispo(stockdispo)
                let s=0
                stockdispo.map((element)=>{
                    s=s+element
                })
                setCoutStockageTotal(s*coutStockage)
                setNbSetup(a.length)
                setCoutTotal(s*coutStockage +a.length*coutSetup )
            }}>Obtenir le Plan</Button>
            <div>
                <table style={tableStyles}>
                    <thead>
                        <tr>
                            <th style={thStyles}>Période</th>
                            {[...Array(12).keys()].map((period) => (
                                <th key={period} style={thStyles}>{period + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {['Besoin Net', 'Reception Previsionnelles', 'Stock Disponible'].map((category) => (
                            <tr key={category}>
                                <td style={tdStyles}>{category}</td>
                                {[...Array(12).keys()].map((period) => (
                                    <td key={`${category}-${period}`} style={tdStyles}>
                                        {category === 'Besoin Net' ? besoinNet[period] : ''}
                                        {category === 'Reception Previsionnelles' ? recepPrev[period] : ''}
                                        {category === 'Stock Disponible' ? stockDispo[period] : ''}
                                        {/* {category === 'Reception Previsionnelles' ? (period === 0 ? 'Initial' : ravCompo[period - 1]) : ''}
                                        {category === 'Stock Disponible' ? (period === 0 ? stockInitCompo[0] : stockInitCompo[period]) : ''} */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Typography sx={{ margin: 5 }} variant="h5" gutterBottom>
                    Cout de Stockage: {coutStockageTotal}
                </Typography>
            </div>
            <div>
                <Typography sx={{ margin: 5 }} variant="h5" gutterBottom>
                    Nombre de setup: {nbSetup}
                </Typography>
            </div>
            <div>
                <Typography sx={{ margin: 5 }} variant="h5" gutterBottom>
                    Cout Total: {coutTotal}
                </Typography>
            </div>
            
        </div>
    )
}
export default Page