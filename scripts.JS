   function showSection(sectionId) {
    // Esconde todas as seções
    document.getElementById('envelopes').classList.add('hidden');
    document.getElementById('numeros').classList.add('hidden');
    document.getElementById('comparador').classList.add('hidden');
    
    // Mostra a seção selecionada
    document.getElementById(sectionId).classList.remove('hidden');

    // Atualiza a aba ativa
    const menuLinks = document.querySelectorAll('.menu a'); // Seleciona todos os links do menu
    menuLinks.forEach(link => link.classList.remove('active')); // Remove a classe 'active' de todas as abas
    document.querySelector(`.menu a[href="#${sectionId}"]`).classList.add('active'); // Adiciona a classe 'active' à aba selecionada
}

function formatKeys() {
    const keysInput = document.getElementById('keysInput').value.trim();
    if (keysInput) {
        let formattedKeys = '';
        if (keysInput.includes('\n')) {
            formattedKeys = keysInput.replace(/\n/g, ' ').replace(/ /g, ' OR ');
        } else {
            for (let i = 0; i < keysInput.length; i += 36) {
                if (i > 0) {
                    formattedKeys += ' OR ';
                }
                formattedKeys += keysInput.substring(i, i + 36);
            }
        }
        document.getElementById('formattedKeys').value = formattedKeys;
    } else {
        alert("Por favor, cole os ID's no campo de entrada.");
    }
}

function formatNumbers() {
    const numbersInput = document.getElementById('numbersInput').value.trim();
    if (numbersInput) {
        const numbersArray = numbersInput.split('\n').map(num => num.trim());
        const formattedNumbers = numbersArray.map((num, index) => 
            (index + 1) % 8 === 0 && index !== numbersArray.length - 1 ? `${num},\n` : `${num}, `
        ).join('').slice(0, -2); // Remove the last comma and space
        document.getElementById('formattedNumbers').value = formattedNumbers;
    } else {
        alert("Por favor, cole os números no campo de entrada.");
    }
}

function clearInput() {
    ['keysInput', 'formattedKeys', 'numbersInput', 'formattedNumbers'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    if (copyText.value) {
        navigator.clipboard.writeText(copyText.value).then(() => {
            alert("Texto copiado para a área de transferência!");
        }).catch(err => {
            alert("Falha ao copiar o texto: ", err);
        });
    }
}

 function clearInput() {
        document.getElementById('keysInput').value = '';
        document.getElementById('formattedKeys').value = '';
        document.getElementById('numbersInput').value = '';
        document.getElementById('formattedNumbers').value = '';
    }

    function copyToClipboard(elementId) {
        var copyText = document.getElementById(elementId);
        if (copyText.value) {
            copyText.select();
            document.execCommand("copy");
        }
    }

    function updateCount() {
        const textarea = document.getElementById('idsToProcess');
        const countElement = document.getElementById('countToProcess');
        const ids = textarea.value.split('\n').map(id => id.trim()).filter(id => id);
        countElement.textContent = `Total de IDs: ${ids.length}`;
    }

    function extractKey(path) {
        const match = path.match(/\\([^\\]+)"?$/);
        return match ? match[1].replace(/"$/, '') : path;
    }

    function compareIDs() {
        const idsToProcess = document.getElementById('idsToProcess').value.split('\n').map(id => extractKey(id.trim())).filter(id => id);
        const idsProcessed = document.getElementById('idsProcessed').value.split('\n').map(id => extractKey(id.trim())).filter(id => id);

        const setToProcess = new Set(idsToProcess);
        const setProcessed = new Set(idsProcessed);

        const commonIDs = [...setToProcess].filter(id => setProcessed.has(id));
        const differentIDs = [...setToProcess].filter(id => !setProcessed.has(id)).concat([...setProcessed].filter(id => !setToProcess.has(id)));

        const commonIDsTextarea = document.getElementById('commonIDs');
        commonIDsTextarea.textContent = commonIDs.join('\n') || 'Nenhum ID em comum encontrado.';

        const differentIDsTextarea = document.getElementById('differentIDs');
        differentIDsTextarea.textContent = differentIDs.join('\n') || 'Nenhum ID diferente encontrado.';
    }

    document.getElementById('idsToProcess').addEventListener('input', updateCount);
	function clearTextarea(id) {
    document.getElementById(id).value = '';
	document.getElementById('countToProcess').textContent = 'Total de IDs: 0';
}