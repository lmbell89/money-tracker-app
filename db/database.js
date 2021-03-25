import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabase('expenses-app')

export const migrate = () => {
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists accounts (id integer primary key not null, name text, balance float);'
    )
    tx.executeSql(
      'create table if not exists incomes (id integer primary key not null, name text, value float);'
    )
    tx.executeSql(
      'create table if not exists bills (id integer primary key not null, name text, value float);'
    )
  })
}

export const selectAccounts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'select * from accounts', 
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, err) => console.log(err)
    )
  })
}

export const insertAccount = (name, balance) => {
  db.transaction(tx => {
    tx.executeSql(
      'insert into accounts (name, balance) values(?, ?)', 
      [name, balance],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const updateAccount = (id, name, balance) => {
  db.transaction(tx => {
    tx.executeSql(
      'update accounts set name = ?, balance = ? where id = ?', 
      [name, balance, id],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const deleteAccount = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'delete from accounts where id = ?', 
      [id],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const selectIncomes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'select * from incomes', 
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, err) => console.log(err)
    )
  })
}

export const insertIncome = (name, value) => {
  db.transaction(tx => {
    tx.executeSql(
      'insert into incomes (name, value) values(?, ?)', 
      [name, value],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const updateIncome = (id, name, value) => {
  db.transaction(tx => {
    tx.executeSql(
      'update incomes set name = ?, value = ? where id = ?', 
      [name, value, id],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const deleteIncome = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'delete from incomes where id = ?', 
      [id],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const selectBills = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'select * from bills', 
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, err) => console.log(err)
    )
  })
}

export const insertBill = (name, value) => {
  db.transaction(tx => {
    tx.executeSql(
      'insert into bills (name, value) values(?, ?)', 
      [name, value],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const updateBill = (id, name, value) => {
  db.transaction(tx => {
    tx.executeSql(
      'update bills set name = ?, value = ? where id = ?', 
      [name, value, id],
      () => null,
      (_, err) => console.log(err)
    )
  })
}

export const deleteBill = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'delete from bills where id = ?', 
      [id],
      () => null,
      (_, err) => console.log(err)
    )
  })
}