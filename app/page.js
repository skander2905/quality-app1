'use client'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import './globals.css'



export default function Home() {
  const router = useRouter()

  return (
    <div>
      <Button sx={{ margin: 2 }} variant='contained' onClick={() => router.push('/page1')}>Go to first page</Button>
      <Button sx={{ margin: 2 }} variant='contained' onClick={() => router.push('/page2')}>Go to second page</Button>
    </div>
  );
}
