'use client'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import './globals.css'
import Typography from '@mui/material/Typography';



export default function Home() {
  const router = useRouter()

  return (
    <div>
      <Typography variant="h5" gutterBottom>
      Bienvenue dans notre application, notre solution tout-en-un pour une gestion efficace de la production !<br /><br />
      </Typography>
      <Typography variant="h6" gutterBottom>
      Notre application web simplifie le processus de planification et de gestion de la production, vous permettant de prendre des décisions éclairées et d'optimiser vos opérations pour une efficacité maximale.      </Typography>
      <br /><br />
      <Typography variant="subtitle1" gutterBottom>
      Avec cette application, vous pouvez :<br />

      •	Optimiser vos processus de production en utilisant la méthode de Lot Sizing de Wagner Whitin pour dimensionner vos lots de production de manière optimale.<br />

•	Planifier efficacement vos besoins en matériaux et en ressources grâce à notre module MRP (Material Requirements Planning).

            </Typography>
            <br /><br />
            <Typography variant="h6" gutterBottom>
            Que vous soyez une petite entreprise ou une grande entreprise, notre application est conçue pour répondre à vos besoins en matière de gestion de la production, vous aidant à réduire les coûts, à améliorer la qualité des produits et à maximiser votre efficacité opérationnelle.
            </Typography>
            <br /><br />
            <Typography variant="subtitle1" gutterBottom>

            Découvrez dès maintenant comment cette application peut transformer votre façon de gérer la production et vous aider à atteindre vos objectifs commerciaux. Commencez dès aujourd'hui !
            </Typography>
            <div className='buttons'>

      <Button sx={{ margin: 2,borderRadius:'10px' }} variant='contained' onClick={() => router.push('/page1')}>OBTENIR MON MRP</Button>
      <Button sx={{ margin: 2,borderRadius:'10px' }} variant='contained' onClick={() => router.push('/page2')}>OBTENIR MON PLAN DE LOT SIZING</Button>
            </div>
    </div>
  );
}
