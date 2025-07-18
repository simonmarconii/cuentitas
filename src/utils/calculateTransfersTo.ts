type Person = {
    name: string,
    amount: string
}

type Transfer = {
    from: string,
    to: string,
    amount: number
}

export default function calculateTransfers(personas: Person[]): Transfer[] {
  // Convertimos los montos a números
  const gastos = personas.map(p => ({
    name: p.name,
    mount: parseFloat(p.amount)
  }));

  const total = gastos.reduce((sum, p) => sum + p.mount, 0);
  const promedio = total / gastos.length;

  // Calculamos cuánto debe o le deben a cada uno
  const balances = gastos.map(p => ({
    name: p.name,
    balance: +(p.mount - promedio).toFixed(2) // Redondeamos a 2 decimales
  }));

  // Separar deudores y acreedores
  const deudores = balances.filter(p => p.balance < 0).map(p => ({ ...p }));
  const acreedores = balances.filter(p => p.balance > 0).map(p => ({ ...p }));

  const transferencias: Transfer[] = [];

  for (let deudor of deudores) {
    for (let acreedor of acreedores) {
      if (deudor.balance === 0) break;
      if (acreedor.balance === 0) continue;

      const monto = Math.min(-deudor.balance, acreedor.balance);
      if (monto > 0) {
        transferencias.push({
          from: deudor.name,
          to: acreedor.name,
          amount: +monto.toFixed(2)
        });

        deudor.balance += monto;
        acreedor.balance -= monto;
      }
    }
  }

  return transferencias;
}