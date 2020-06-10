let generateRows = (columns, rows) => {
    let values = [];
    for (let i = 0; i < rows.length; i++) {
        let s = '(';
        for (let j = 0; j < columns.length; j++) {
            s += rows[i][columns[j]];
            if (columns.length - 1 !== j) {
                s += ', '
            }
        }
        s += ')';
        values.push(s);
    }

    return values.join(',');

};

let generateInsertQuery = (table, columns, rows) => {
    return 'INSERT INTO ' + table + ' (' + columns.join(', ') + ') VALUES ' + generateRows(columns, rows);
};

module.exports = {
    generateInsertQuery
};
