import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('expenses-app')

const promisifyTx = (statement, args) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        statement, 
        args,
        (_, resultset) => resolve(resultset),
        (_, err) => reject(err)
      )
    })
  })
}

export const migrate = async () => {
  const commands = []

  commands.push(promisifyTx(
    'create table if not exists accounts (' +
      'id integer primary key not null, name text, balance float' +
    ');'
  ))

  commands.push(promisifyTx(
    'create table if not exists incomes (' +
      'id integer primary key not null,' +
      'name text,' +
      'value float,' +
      'date text,' +
      'period text' +
    ');'
  ))

  commands.push(promisifyTx(
    'create table if not exists bills (' +
      'id integer primary key not null,' +
      'name text,' +
      'value float,' +
      'date text,' +
      'period text' +
    ');'
  ))

  commands.push(new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists cycles (' +
          'id integer primary key not null,' +
          'date integer' +
        ');',
        [],
        null,
        (_, err) => reject(err)
      )

      tx.executeSql(
        'insert into cycles (id, date) values (0, 31)',
        [],
        resolve,
        resolve
      )
    })
  }))

  return Promise.all(commands)
}


export const selectAccounts = () => {
  return promisifyTx('select * from accounts', [])
}

export const insertAccount = (name, balance) => {
  return promisifyTx(
    'insert into accounts (name, balance) values(?, ?)', 
    [name, balance]
  )
}

export const updateAccount = (id, name, balance) => {
  return promisifyTx(
    'update accounts set name = ?, balance = ? where id = ?', 
    [name, balance, id]
  )
}

export const deleteAccount = (id) => {
  return promisifyTx('delete from accounts where id = ?', [id])
}

export const selectIncomes = () => {
  return promisifyTx('select * from incomes', [])
}

export const insertIncome = (name, value, date, period) => {
  return promisifyTx(
    'insert into incomes (name, value, date, period) values(?, ?, ?, ?)', 
    [name, value, date, period]
  )
}

export const updateIncome = (id, name, value, date, period) => {
  return promisifyTx(
    'update incomes set name=?, value=?, date=?, period=? where id=?', 
    [name, value, date, period, id]
  )
}

export const deleteIncome = (id) => {
  return promisifyTx('delete from incomes where id = ?', [id])
}

export const selectBills = () => {
  return promisifyTx('select * from bills', [])
}

export const insertBill = (name, value, date, period) => {
  return promisifyTx(
    'insert into bills (name, value, date, period) values(?, ?, ?, ?)', 
    [name, value, date, period]
  )
}

export const updateBill = (id, name, value, date, period) => {
  return promisifyTx(
    'update bills set name=?, value=?, date=?, period=? where id=?', 
    [name, value, date, period, id]
  )
}

export const deleteBill = (id) => {
  return promisifyTx('delete from bills where id = ?', [id])
}

export const selectCycle = () => {
  return promisifyTx('select date from cycles')
}

export const updateCycle = (date) => {
  return promisifyTx('update cycles set date=?', [date])
}