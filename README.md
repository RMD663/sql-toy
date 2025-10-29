# SQL Playground - Doc

## 📋 Visão Geral

O **SQL Playground** permite executar e testar consultas SQL diretamente no navegador. Desenvolvido com HTML, CSS e JavaScript, utiliza a biblioteca SQL.js para emular um banco de dados SQLite totalmente client-side.

## ✨ Funcionalidades

- **Execução de consultas SQL** em tempo real
- **Validação automática** de sintaxe SQL
- **Sugestões inteligentes** para correção de erros
- **Highlight de erros** na consulta
- **Visualização de resultados** em formato de tabela

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Banco de Dados**: SQL
- **Estilo**: Tema escuro

## 📁 Estrutura do Projeto

```
sql-toy/
├── index.html          # Página principal
├── styles/
│   └── style.css       # Estilos da aplicação
├── scripts/
│   └── script.js       # Lógica da aplicação
└── README.md           # Este arquivo
```

## 🚀 Como Usar

1. **Acesse a aplicação** abrindo o arquivo `index.html` em um navegador web
2. **Digite sua consulta SQL** na área de texto fornecida
3. **Clique em "Executar"** para rodar a consulta
4. **Visualize os resultados** no terminal abaixo
5. **Corrija erros** com base nas sugestões automáticas

### 📝 Exemplos de Consultas

```sql
-- Consulta básica
SELECT 'Hello World' AS mensagem;

-- Criar tabela
CREATE TABLE usuarios (id INTEGER, nome TEXT);

-- Inserir dados
INSERT INTO usuarios VALUES (1, 'João'), (2, 'Maria');

-- Consultar dados
SELECT * FROM usuarios;
```

## 🎨 Características da Interface

- **Terminal interativo** com scroll automático
- **Feedback visual** para erros
- **Tabelas estilizadas** para resultados

## 🔧 Funcionalidades Técnicas

### Validação em Tempo Real
- Verificação de sintaxe durante a digitação
- Highlight automático de erros
- Classes CSS dinâmicas para estados de erro

### Sistema de Sugestões
- Detecção de tabelas inexistentes
- Correção de erros de sintaxe comuns
- Sugestões contextuais baseadas no erro
- Auto-correção de case para palavras-chave SQL

### Manipulação de Banco de Dados
- Criação e gerenciamento de tabelas
- Execução de consultas SELECT, INSERT, UPDATE, DELETE
- Persistência durante a sessão do navegador

## 🌐 Compatibilidade

- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Suporte a dispositivos móveis**: iOS, Android
- **Requisitos**: JavaScript habilitado, suporte a WebAssembly

## 📄 Licença

Este projeto é destinado para fins educacionais e de aprendizado.

## ⚠️ Limitações

- Os dados são armazenados apenas na sessão atual do navegador
- Recursos avançados do SQLite podem não estão disponíveis
- Performance pode variar

---

**Desenvolvido para projeto de monitoria**
