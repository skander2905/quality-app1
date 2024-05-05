'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



const Home = () => {
    const [rootName, setRootName] = useState('');
    const [treeData, setTreeData] = useState([]);
    const [openFiniDialog, setOpenFiniDialog] = useState(false)
    const [openCompoDialog, setOpenCompoDialog] = useState(false)
    const [lancementPrevFini, setLancementPrevFini] = useState(Array(12).fill(0))


    const TreeNode = ({ node, onAddChild }) => {
        const [newChildName, setNewChildName] = useState('');
        const [decalageFini, setDecalgeFini] = useState()
        const [rootInitialStock, setRootInitialStock] = useState(Array(13).fill(0));
        const [rootIncomingReception, setRootIncomingReception] = useState(Array(12).fill(0));
        const [monthlyNeeds, setMonthlyNeeds] = useState(Array(12).fill(0));
        const [besoinnet, setBesionnet] = useState(Array(12).fill(0));
        const [lancementPrev, setLancementPrev] = useState(Array(12).fill(0))
        const [DecalageCompo, setDecalageCompo] = useState()
        const [coefCompo, setCoefCompo] = useState()
        const [stockInitCompo, setStockInitCompo] = useState(Array(13).fill(0));
        const [ravCompo, setRavCompo] = useState(Array(12).fill(0));
        const [besoinBrutComposant, setBesoinBrutComposant] = useState(Array(12).fill(0));
        const [besoinnetcomposant, setBesionnetcomposant] = useState(Array(12).fill(0));
        const [lpCompo, setLpCompo] = useState(Array(12).fill(0))



        const handleAddChild = () => {
            if (newChildName.trim() !== '') {
                onAddChild(
                    node,
                    newChildName.trim(),
                );
            }
        };

        return (
            <div style={{ marginLeft: 20, marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>
                    {node.name}
                </Typography>
                <Button sx={{
                    margin: 1
                }} variant='contained' onClick={() => {
                    if (node.name == treeData[0]?.name) {
                        setOpenFiniDialog(true)
                    } else {
                        setOpenCompoDialog(true)
                    }
                }} >Plus d'information</Button>

                <Dialog
                    open={openFiniDialog}
                    onClose={() => {
                        setOpenFiniDialog(false)
                    }}
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogContent>
                        <DialogContentText>
                            <div>{node.name}</div>
                            <TextField sx={{
                                margin: 1
                            }} type='number' value={decalageFini} onChange={(e) => { setDecalgeFini(parseFloat(e.target.value)) }} id="outlined-basic" label="Decalage" variant="outlined" />
                            <TextField sx={{
                                margin: 1
                            }} type="number" value={rootInitialStock[0]} onChange={(e) => {
                                const updatedNeeds = Array(13).fill(0);
                                updatedNeeds[0] = parseInt(e.target.value);
                                setRootInitialStock(updatedNeeds);
                            }} id="outlined-basic" label="Stock initial du produit fini:" variant="outlined" />
                            <div>
                                <label>Réception à venir du nœud racine:</label>
                            </div>
                            {rootIncomingReception?.map((element, index) => (

                                <TextField sx={{
                                    margin: 1
                                }} key={index} type="number" value={element} onChange={(e) => {
                                    const updatedNeeds = [...rootIncomingReception];
                                    updatedNeeds[index] = parseInt(e.target.value);
                                    setRootIncomingReception(updatedNeeds);
                                }} id="outlined-basic" label={`reception a venir du mois ${index + 1}`} variant="outlined" />
                            ))}
                            <div>
                                <label>Besoins bruts mensuels:</label>
                            </div>
                            <div>
                                {monthlyNeeds.map((need, index) => (
                                    <TextField sx={{
                                        margin: 1
                                    }} key={index} type="number" value={need}
                                        onChange={(e) => {
                                            const updatedNeeds = [...monthlyNeeds];
                                            updatedNeeds[index] = parseInt(e.target.value);
                                            setMonthlyNeeds(updatedNeeds);
                                        }}
                                        id="outlined-basic" label={`Besoin du mois ${index + 1}`} variant="outlined" />
                                ))}
                            </div>
                        </DialogContentText>
                        <Button sx={{
                            margin: 1
                        }} onClick={() => {
                            let updatedNeeds = [...rootInitialStock];
                            let besoinetupdated = [...besoinnet]
                            let a = true
                            rootInitialStock.map((element, index) => {
                                if (index > 0) {
                                    if ((updatedNeeds[index - 1] + rootIncomingReception[index - 1] - monthlyNeeds[index - 1]) < 0) {
                                        a = false
                                    }
                                    if (a) {
                                        updatedNeeds[index] = updatedNeeds[index - 1] + rootIncomingReception[index - 1] - monthlyNeeds[index - 1];
                                    } else {
                                        updatedNeeds[index] = 0
                                        besoinetupdated[index] = - updatedNeeds[index - 1] - rootIncomingReception[index - 1] + monthlyNeeds[index - 1]
                                    }
                                }
                            })
                            let changearray = [...lancementPrev];
                            lancementPrev.map((element, index) => {
                                changearray[index] = besoinetupdated[index + decalageFini + 1]
                            })
                            let arr = changearray
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === undefined) {
                                    arr[i] = 0;
                                }
                            }
                            console.log(arr)
                            setLancementPrev(arr)
                            setRootInitialStock(updatedNeeds);
                            setBesionnet(besoinetupdated)
                        }} variant='contained'>
                            Calculer resultat
                        </Button>
                        <div>
                            <table style={tableStyles}>
                                <thead>
                                    <tr>
                                        <th style={thStyles}>Période</th>
                                        {[...Array(13).keys()].map((period) => (
                                            <th key={period} style={thStyles}>{period}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {['BB', 'RAV', 'SD', 'BN', 'RP', 'LP'].map((category) => (
                                        <tr key={category}>
                                            <td style={tdStyles}>{category}</td>
                                            {[...Array(13).keys()].map((period) => (
                                                <td key={`${category}-${period}`} style={tdStyles}>
                                                    {category === 'BB' ? (period === 0 ? 'Initial' : monthlyNeeds[period - 1]) : ''}
                                                    {category === 'RAV' ? (period === 0 ? 'Initial' : rootIncomingReception[period - 1]) : ''}
                                                    {category === 'SD' ? (period === 0 ? rootInitialStock[0] : rootInitialStock[period]) : ''}
                                                    {category === 'BN' ? (period === 0 ? 'Initial' : besoinnet[period]) : ''}
                                                    {category === 'RP' ? (period === 0 ? 'Initial' : besoinnet[period]) : ''}
                                                    {category === 'LP' ? (period === 0 ? 'Initial' : lancementPrev[period - 1]) : ''}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpenFiniDialog(false)
                        }}>Close</Button>
                        <Button onClick={() => {
                            setLancementPrevFini(lancementPrev)
                            setOpenFiniDialog(false)

                        }}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openCompoDialog}
                    // 
                    onClose={() => {
                        setOpenCompoDialog(false)
                    }}
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogContent>
                        <DialogContentText>
                            <div>{node.name}</div>

                            <TextField sx={{ margin: 1 }} type='number' value={DecalageCompo} onChange={(e) => { setDecalageCompo(parseFloat(e.target.value)) }} id="outlined-basic" label="Decalage" variant="outlined" />
                            <TextField sx={{ margin: 1 }} type='number' value={coefCompo} onChange={(e) => { setCoefCompo(parseFloat(e.target.value)) }} id="outlined-basic" label="Coeficient" variant="outlined" />
                            <div>
                                <TextField sx={{ margin: 1 }} type='number' value={stockInitCompo[0]} onChange={(e) => {
                                    let arr = [...stockInitCompo]
                                    arr[0] = parseInt(e.target.value)
                                    setStockInitCompo(arr)
                                }} id="outlined-basic" label="Entrez le stock initial" variant="outlined" />
                            </div>
                            {ravCompo?.map((element, index) => (
                                <TextField sx={{ margin: 1 }} key={index} type='number' value={element} onChange={(e) => {
                                    const updatedNeeds = [...ravCompo];
                                    updatedNeeds[index] = parseInt(e.target.value);
                                    setRavCompo(updatedNeeds);
                                }} id="outlined-basic" label={`reception a venir du mois ${index + 1}`} variant="outlined" />
                            ))}
                        </DialogContentText>
                        <Button sx={{
                            margin: 1
                        }} onClick={() => {
                            let multipliedArray = Array(12).fill(0);
                            for (let i = 0; i < lancementPrevFini.length; i++) {
                                multipliedArray[i] = lancementPrevFini[i] * coefCompo;
                            }
                            setBesoinBrutComposant(multipliedArray)
                            let besoinetcomposantupdated = [...besoinnetcomposant]
                            let updatedNeeds = [...stockInitCompo];
                            let a = true
                            stockInitCompo.map((element, index) => {
                                if (index > 0) {
                                    if ((updatedNeeds[index - 1] + ravCompo[index - 1] - multipliedArray[index - 1]) < 0) {
                                        a = false
                                    }
                                    if (a) {
                                        updatedNeeds[index] = updatedNeeds[index - 1] + ravCompo[index - 1] - multipliedArray[index - 1];
                                    } else {
                                        updatedNeeds[index] = 0
                                        besoinetcomposantupdated[index] = - updatedNeeds[index - 1] - ravCompo[index - 1] + multipliedArray[index - 1]
                                    }
                                }
                            })
                            setStockInitCompo(updatedNeeds)
                            setBesionnetcomposant(besoinetcomposantupdated)
                            let changearray = [...lpCompo];
                            lpCompo.map((element, index) => {
                                changearray[index] = besoinetcomposantupdated[index + DecalageCompo + 1]
                            })
                            let arr = changearray
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === undefined) {
                                    arr[i] = 0;
                                }
                            }
                            setLpCompo(arr)
                        }} variant='contained'>
                            Calculer resultat
                        </Button>

                        <table style={tableStyles}>
                            <thead>
                                <tr>
                                    <th style={thStyles}>Période</th>
                                    {[...Array(13).keys()].map((period) => (
                                        <th key={period} style={thStyles}>{period}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {['BB', 'RAV', 'SD', 'BN', 'RP', 'LP'].map((category) => (
                                    <tr key={category}>
                                        <td style={tdStyles}>{category}</td>
                                        {[...Array(13).keys()].map((period) => (
                                            <td key={`${category}-${period}`} style={tdStyles}>
                                                {category === 'BB' ? (period === 0 ? 'Initial' : besoinBrutComposant[period - 1]) : ''}
                                                {category === 'RAV' ? (period === 0 ? 'Initial' : ravCompo[period - 1]) : ''}
                                                {category === 'SD' ? (period === 0 ? stockInitCompo[0] : stockInitCompo[period]) : ''}
                                                {category === 'BN' ? (period === 0 ? 'Initial' : besoinnetcomposant[period]) : ''}
                                                {category === 'RP' ? (period === 0 ? 'Initial' : besoinnetcomposant[period]) : ''}
                                                {category === 'LP' ? (period === 0 ? 'Initial' : lpCompo[period - 1]) : ''}

                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpenCompoDialog(false) }}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <div>
                    <TextField sx={{
                        minWidth: '400px'
                    }} onChange={(e) => setNewChildName(e.target.value)} id="outlined-basic" value={newChildName} label="Entrez le nom du nouvel composant" variant="outlined" />
                </div>
                <Button sx={{ margin: 1 }} variant='contained' onClick={handleAddChild} >Ajouter un composant</Button>
                {node.children && node.children.length > 0 && (
                    <div style={{ marginLeft: 20 }}>
                        {node.children.map((child) => (
                            <TreeNode key={child.name} node={child} onAddChild={onAddChild} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleAddChild = (
        parentNode,
        childName,
        childDelay,
        childCoefficient,
        childInitialStock,
        childIncomingReception
    ) => {
        const newChild = {
            name: childName,
            delay: childDelay,
            coefficient: childCoefficient,
            initialStock: childInitialStock,
            incomingReception: childIncomingReception,
            children: []
        };

        parentNode.children.push(newChild);
        setTreeData([...treeData]);
    };

    const handleCreateTree = () => {
        const newRoot = {
            name: rootName.trim(),
            children: []
        };
        setTreeData([newRoot]);
    };
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
        <div className='page'>
            <h1>Produit</h1>
            <div>
                <TextField sx={{
                    minWidth: '300px'
                }} value={rootName} id="outlined-basic" label="Entrez le nom du produit fini" variant="outlined" onChange={(e) => setRootName(e.target.value)} />
            </div>
            <Button sx={{
                margin: 1
            }} variant='contained' onClick={handleCreateTree}>Créer le produit</Button>
            {treeData.length > 0 && (
                <div >
                    {treeData.map((rootNode) => (
                        <TreeNode key={rootNode.name} node={rootNode} onAddChild={handleAddChild} />
                    ))}
                </div>
            )}
        </div>
    );
};


export default Home;
