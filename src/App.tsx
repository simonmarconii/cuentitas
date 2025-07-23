import { useState } from 'react'
import './index.css'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'
import ModeToggle from './components/mode-theme-toogle'
import { X } from 'lucide-react'

type Person = {
  name: string,
  amount: string
}

type Transfer = {
  from: string,
  to: string,
  amount: number
}

function App() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const [exceded, setExceded] = useState<boolean>(false)

  const [persons, setPersons] = useState<Person[]>([])
  const [transfer, setTransfer] = useState<Transfer[]>([])

  const handleNameChange = (event: any) => {
    setName(event.target.value)
  }

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    addPerson()
  }

  const addPerson = () => {
    if (persons.length > 15) {
      setExceded(true)
      setName('')
      setAmount('')
      return
    }
    const newPerson = { name, amount }
    setPersons([...persons, newPerson])
    setExceded(false)
    setName('')
    setAmount('')
  }

  const restart = () => {
    setName('')
    setAmount('')
    setExceded(false)
    setPersons([...[]])
    setTransfer([...[]])
  }

  const calculate = async () => {
    await fetch('http://localhost:3001/api/transfer', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(persons)
    })
      .then(response => response.json())
      .then(data => setTransfer(data))
      .catch(error => console.error('Error:', error));
    // setTransfer(transfer)
  }

  const eliminate = (indexToRemove: number) => {
    setPersons((prev) => prev.filter((_, index) => index !== indexToRemove));
    setExceded(false)
  }

  return (
    <div className='w-screen h-screen flex justify-center bg-gradient-to-b from-[#ffffff] to-[#FAF6E9] dark:bg-gradient-to-b dark:from-[#282b28] dark:to-[#101110]'>
      <div className='h-screen'>
        <div className='responsiveWidth'>
          <div className='grid justify-items-center gap-6 py-8'>
            <div className='w-full flex justify-end pr-12'>
              <ModeToggle />
            </div>
            <div className=''>
              <h1 className={cn('font-bold items-center', 'title')}>Cuentitas</h1>
            </div>
            <div className='px-8'>
              <h1 className={cn('font-bold items-center text-center', 'subtitle')}>Calcula cuanto hay que pagar segun cuanto puso el resto</h1>
            </div>
            <div className='w-5/6'>
              <form onSubmit={handleSubmit} className={cn('border rounded-xl', 'formBox')}>
                <div className='grid gap-5'>
                  <div className=''>
                    <Input placeholder='Nombre' className='' type='text' value={name} onChange={handleNameChange} required />
                  </div>
                  <div className=''>
                    <Input placeholder='Monto' className='' type='number' value={amount} onChange={handleAmountChange} required />
                  </div>
                  <div className='flex justify-center gap-5'>
                    <Button type='submit'>Agregar</Button>
                    <Button type='button' onClick={restart}>Limpiar</Button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              {persons.map((value, index) => (
                <div key={index} className='flex gap-3 items-center'>
                  <h1>{value.name.toUpperCase()}</h1>
                  <h1>{`$${value.amount.toUpperCase()}`}</h1>
                  <div className='cursor-pointer'>
                    <X size={14} className='text-destructive' onClick={() => eliminate(index)} />
                  </div>
                </div>
              ))}
              <div className='mt-3'>
                {exceded && <h1 className='text-destructive '>MAXIMO 15 PERSONAS</h1>}
              </div>
            </div>
            <div className=''>
              <Button onClick={calculate}>Calcular</Button>
            </div>
            <div>
              {transfer?.map((value, index) => (
                <div key={index} className='flex gap-1'>
                  <h1>{`${value.from.toUpperCase()}`}</h1>
                  <h1>{`debe a ${value.to.toUpperCase()}`}</h1>
                  <h1>{`$${value.amount}`}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
