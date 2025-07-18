import { useState } from 'react'
import './index.css'
import calculateTransfers from './utils/calculateTransfersTo'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'
import ModeToggle from './components/mode-theme-toogle'

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
    const newPerson = { name, amount }
    setPersons([...persons, newPerson])
    setName('')
    setAmount('')
  }

  const restart = () => {
    setName('')
    setAmount('')
    setPersons([...[]])
    setTransfer([...[]])
  }

  const calculate = () => {
    const transfer = calculateTransfers(persons)
    setTransfer(transfer)
  }

  return (
    <div className='w-screen h-screen flex justify-center bg-gradient-to-b from-[#ffffff] to-[#FAF6E9] dark:bg-gradient-to-b dark:from-[#282b28] dark:to-[#101110]'>
      <div className='h-screen'>
        <div className='responsiveWidth'>
          <div className='grid justify-items-center gap-6 py-8'>
            <div className='w-full flex justify-end pr-8'>
              <ModeToggle/>
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
                    <Input placeholder='Nombre' className='' type='text' value={name} onChange={handleNameChange} />
                  </div>
                  <div className=''>
                    <Input placeholder='Monto' className='' type='text' value={amount} onChange={handleAmountChange} />
                  </div>
                  <div className='flex justify-center gap-5'>
                    <Button className='border' type='submit'>Agregar</Button>
                    <Button className='border' type='button' onClick={restart}>Limpiar</Button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              {persons.map((value, index) => (
                <div key={index} className='flex gap-3'>
                  <h1>{value.name.toUpperCase()}</h1>
                  <h1>{`$${value.amount.toUpperCase()}`}</h1>
                </div>
              ))}
            </div>
            <div className=''>
              <Button className='border' onClick={calculate}>Calcular</Button>
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
