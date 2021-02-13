const connection = require('./connection.js');

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
const orm = {
  selectAll(tableInput, colToSearch) {
    const queryString = 'SELECT * FROM ??';
    connection.query(
      queryString,
      [tableInput, colToSearch],
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );
  },
  selectPartyType(whatToSelect, table, partyType, specificParty) {
    const queryString = 'SELECT ?? FROM ?? WHERE ?? = ?';
    console.log(queryString);
    connection.query(
      queryString,
      [whatToSelect, table, partyType, specificParty],
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );
  },
  selectAllClientParties(tableOneCol, tableTwoCol, tableOne, tableTwo, tableTwoForeignKey) {
    const queryString =
      'SELECT ??, ?? FROM ?? INNER JOIN ?? ON ??.?? = ??.id';
    connection.query(
      queryString,
      [
        tableOneCol,
        tableTwoCol,
        tableOne,
        tableTwo,
        tableTwo,
        tableTwoForeignKey,
        tableOne,
      ],
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );
  },
};

module.exports = orm;
