async function loadSQL() {
    const SQL = await initSqlJs({ locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${filename}` });
    return new SQL.Database();
}

async function executeQuery() {
    let db = await loadSQL();
    let query = document.getElementById("sqlQuery").value;
    let outputDiv = document.getElementById("output");

    outputDiv.innerHTML = `<p><span style="color:cyan">$</span> ${query}</p>`;
    
    try {
        let result = db.exec(query);
        
        if (result.length > 0) {
            result.forEach((tableResult) => {
                outputDiv.innerHTML += `<h4 style="color: #00ff00;">Tabela: ${tableResult.name}</h4>`;
                outputDiv.innerHTML += formatTableResult(tableResult);
            });
        } else {
            outputDiv.innerHTML += `<p style="color: yellow;">Nenhum dado retornado.</p>`;
        }
        document.getElementById("sqlQuery").classList.remove("error");
    } catch (e) {
        document.getElementById("sqlQuery").classList.add("error");
        let [suggestion, correctedQuery] = getSQLSuggestion(query, e.message);
        let highlightedQuery = highlightError(query, correctedQuery);
        
        outputDiv.innerHTML += `<p><span style="color:red">Erro:</span> ${e.message}</p>`;
        outputDiv.innerHTML += `<p class="suggestion">Dica: ${suggestion}</p>`;
        outputDiv.innerHTML += `<p><span style="color:yellow">${highlightedQuery}</span></p>`;
    }

    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function validateSQL() {
    let query = document.getElementById("sqlQuery").value;
    let db = new SQL.Database();

    try {
        db.exec(query);
        document.getElementById("sqlQuery").classList.remove("error");
    } catch (e) {
        document.getElementById("sqlQuery").classList.add("error");
    }
}

function formatTableResult(tableResult) {
    let tableHTML = `<table class="table">`;
    tableHTML += `<thead><tr>`;
    
    tableResult.columns.forEach((column) => {
        tableHTML += `<th>${column}</th>`;
    });
    tableHTML += `</tr></thead><tbody>`;
    
    tableResult.values.forEach((row) => {
        tableHTML += `<tr>`;
        row.forEach((value) => {
            tableHTML += `<td>${value}</td>`;
        });
        tableHTML += `</tr>`;
    });
    tableHTML += `</tbody></table>`;

    return tableHTML;
}

function getSQLSuggestion(query, errorMessage) {
    let suggestion = "Revise a sintaxe.";
    let correctedQuery = query;

    if (errorMessage.includes("no such table")) {
        suggestion = "Verifique se a tabela existe. Use `SELECT name FROM sqlite_master WHERE type='table';` para listar as tabelas.";
    } else if (errorMessage.includes("syntax error")) {
        suggestion = "Parece haver um erro de sintaxe. Verifique se palavras-chave como SELECT, FROM, WHERE estão escritas corretamente.";
        
        let words = query.split(/\s+/);
        for (let i = 0; i < words.length; i++) {
            if (!["SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP"].includes(words[i].toUpperCase())) {
                correctedQuery = query.replace(words[i], words[i].toUpperCase());
                break;
            }
        }
    } else if (errorMessage.includes("unknown column")) {
        suggestion = "A coluna pode não existir ou estar escrita incorretamente.";
    } else if (errorMessage.includes("near")) {
        let match = errorMessage.match(/near "(.+?)"/);
        if (match) {
            let wrongWord = match[1];
            suggestion = `Erro próximo de "${wrongWord}". Verifique se está digitado corretamente.`;
            
            let words = query.split(/\s+/);
            for (let i = 0; i < words.length; i++) {
                if (words[i].toUpperCase().includes(wrongWord.toUpperCase())) {
                    correctedQuery = query.replace(words[i], words[i].toUpperCase());
                    break;
                }
            }
        }
    }

    return [suggestion, correctedQuery];
}

function highlightError(query, correctedQuery) {
    let wordsOriginal = query.split(/\s+/);
    let wordsCorrected = correctedQuery.split(/\s+/);

    for (let i = 0; i < wordsOriginal.length; i++) {
        if (wordsOriginal[i] !== wordsCorrected[i]) {
            return query.replace(wordsOriginal[i], `<span class="highlight-error">${wordsOriginal[i]}</span>`);
        }
    }

    return query;
}