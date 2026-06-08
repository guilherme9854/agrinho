document.getElementById('search').addEventListener('keyup', function() {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll('#tabela-precos tbody tr');

    rows.forEach(row => {
        const produto = row.cells[0].textContent.toLowerCase();
        row.style.display = produto.includes(query) ? '' : 'none';
    });
});