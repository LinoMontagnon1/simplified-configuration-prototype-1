// upload json
function uploadJson() {
    const fileInput = document.getElementById('json-upload');
    const fileLabel = document.getElementById('file-label');

    if (fileInput && fileLabel) {
        const file = fileInput.files[0];
        if (file) {
            fileLabel.textContent = file.name;

            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target.result;
                const data = JSON.parse(contents);
                populateInputs(data);
            };
            reader.readAsText(file);

            // Esconda o botão após o upload
            fileInput.style.display = 'none';
        } else {
            console.log('No file selected');
        }
    }
}


//preencher campos 
function populateInputs(data) {
    if (Array.isArray(data)) {
        for (let item of data) {
            populateSingleInput(item);
        }
    } else if (typeof data === 'object' && data !== null) {
        populateSingleInput(data);
    }
}


function populateSingleInput(item) {
    if (item.hasOwnProperty('kv')) {
        const kvInput = document.getElementById('kv-input');
        if (kvInput) {
            kvInput.value = item.kv;
        }
    }
    if (item.hasOwnProperty('mas')) {
        const masInput = document.getElementById('mas-input');
        if (masInput) {
            masInput.value = item.mas;
        }
    }
    if (item.hasOwnProperty('acquireTime')) {
        const acquireTimeInput = document.getElementById('acquire-time-input');
        if (acquireTimeInput) {
            acquireTimeInput.value = item.acquireTime;
        }
    }
    if (item.hasOwnProperty('exposures')) {
        const exposuresInput = document.getElementById('num-exposures-input');
        if (exposuresInput) {
            exposuresInput.value = item.exposures;
        }
    }
    if (item.hasOwnProperty('threshold')) {
        const thresholdInput = document.getElementById('threshold-input');
        if (thresholdInput) {
            thresholdInput.value = item.threshold;
        }
    }
    if (item.hasOwnProperty('sensorBias')) {
        const sensorBiasInput = document.getElementById('sensor-bias-input');
        if (sensorBiasInput) {
            sensorBiasInput.value = item.sensorBias;
        }
    }
    if (item.hasOwnProperty('gapTime')) {
        const gapTimeInput = document.getElementById('gap-time-input');
        if (gapTimeInput) {
            gapTimeInput.value = item.gapTime;
        }
    }
    if (item.hasOwnProperty('projections')) {
        const numProjectionsInput = document.getElementById('num-projections-input');
        if (numProjectionsInput) {
            numProjectionsInput.value = item.projections;
        }
    }
    if (item.hasOwnProperty('oversample')) {
        const oversampleInput = document.getElementById('oversample-input');
        if (oversampleInput) {
            oversampleInput.value = item.oversample;
        }
    }
    //segunda coluna
    if (item.hasOwnProperty('move')) {
        const moveInput = document.getElementById('move-input');
        if (moveInput) {
            moveInput.value = item.move;
        }
    }
    if (item.hasOwnProperty('rotate')) {
        const rotateInput = document.getElementById('rotate-input');
        if (rotateInput) {
            rotateInput.value = item.rotate;
        }
    }
    if (item.hasOwnProperty('altura')) {
        const alturaInput = document.getElementById('scan-input');
        if (alturaInput) {
            alturaInput.value = item.altura;
        }
    }
    if (item.hasOwnProperty('pitch')) {
        const pitchInput = document.getElementById('pitch-input');
        if (pitchInput) {
            pitchInput.value = item.pitch;
        }
    }
    if (item.hasOwnProperty('zeroz')) {
        const zerozInput = document.getElementById('zero-z-input');
        if (zerozInput) {
            zerozInput.value = item.zeroz;
        }
    }
    if (item.hasOwnProperty('origin')) {
        const originInput = document.getElementById('return-origin-input');
        if (originInput) {
            originInput.value = item.origin;
        }
    }
    if (item.hasOwnProperty('foco')) {
        const focoInput = document.getElementById('foco-input');
        if (focoInput) {
            focoInput.value = item.foco;
        }
    }
    if (item.hasOwnProperty('acquire')) {
        const acquireInput = document.getElementById('acquire-mode-input');
        if (acquireInput) {
            acquireInput.value = item.acquire;
        }
    }
    if (item.hasOwnProperty('zeroDegree')) {
        const zeroDegreeInput = document.getElementById('zero-degree-input');
        if (zeroDegreeInput) {
            zeroDegreeInput.value = item.zeroDegree;
        }
    }
}



//download json
function gerarJson() {
    const filenameInput = document.getElementById('filename');
    let filename = filenameInput.value || getFormattedDate();

    const parameters = JSON.parse(localStorage.getItem('parameters'));

    if (parameters) {
        const blob = new Blob([JSON.stringify(parameters, null, 2)], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${filename}.json`;

        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);

        document.querySelector('.button').addEventListener('click', function() {
            this.classList.add('animate');
        
            setTimeout(() => {
                this.classList.remove('animate');
            }, 800); 
        });

        localStorage.setItem('lastFilename', filename);
    } else {
        console.log('Não há parâmetros no localStorage.');
    }
}

//data como nome
function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    
    return `${day}.${month}.${year}`;
}

// EL
document.addEventListener('DOMContentLoaded', function() {
    const filenameInput = document.getElementById('filename');
    const lastFilename = localStorage.getItem('lastFilename');
    filenameInput.value = lastFilename || getFormattedDate();
});





// salvar parametros
function saveParametersa1() {
    const kv = document.getElementById('kv-input').value ? Number(document.getElementById('kv-input').value) : null;
    const mas = document.getElementById('mas-input').value ? Number(document.getElementById('mas-input').value) : null;
    const acquireTime = document.getElementById('acquire-time-input').value ? Number(document.getElementById('acquire-time-input').value) : null;
    const exposures = document.getElementById('num-exposures-input').value ? Number(document.getElementById('num-exposures-input').value) : null;
    const threshold = document.getElementById('threshold-input').value ? Number(document.getElementById('threshold-input').value) : null;
    const sensorBias = document.getElementById('sensor-bias-input').value ? Number(document.getElementById('sensor-bias-input').value) : null;
    const gapTime = document.getElementById('gap-time-input').value ? Number(document.getElementById('gap-time-input').value) : null;
    const projections = document.getElementById('num-projections-input').value ? Number(document.getElementById('num-projections-input').value) : null;
    const oversample = document.getElementById('oversample-input').value ? Number(document.getElementById('oversample-input').value) : null;

    const move = document.getElementById('move-input').value ? Number(document.getElementById('move-input').value) : null;
    const rotate = document.getElementById('rotate-input').value ? Number(document.getElementById('rotate-input').value) : null;
    const altura = document.getElementById('scan-input').value ? Number(document.getElementById('scan-input').value) : null;
    const pitch = document.getElementById('pitch-input').value ? Number(document.getElementById('pitch-input').value) : null;
    const zeroz = document.getElementById('zero-z-input').value ? Number(document.getElementById('zero-z-input').value) : null;
    const origin = document.getElementById('return-origin-input').value ? Number(document.getElementById('return-origin-input').value) : null;
    const foco = document.getElementById('foco-input').value ? Number(document.getElementById('foco-input').value) : null;
    const acquire = document.getElementById('acquire-mode-input').value ? Number(document.getElementById('acquire-mode-input').value) : null;
    const zeroDegree = document.getElementById('zero-degree-input').value ? Number(document.getElementById('zero-degree-input').value) : null;

    const parameters = {
        kv,
        mas,
        acquireTime,
        exposures,
        threshold,
        sensorBias,
        gapTime,
        projections,
        oversample,
        move,
        rotate,
        altura,
        pitch,
        zeroz,
        origin,
        foco,
        acquire,
        zeroDegree
    };

    localStorage.setItem('parameters', JSON.stringify(parameters));
    sessionStorage.setItem('parameters', JSON.stringify(parameters));

    console.log(JSON.stringify(parameters));
}

//animacao
document.querySelector('.button').addEventListener('click', function() {
    this.classList.add('animate');

    setTimeout(() => {
        this.classList.remove('animate');
    }, 800); 
});

//limpar campos
function limparCampos() {
    const camposParaLimpar = ['kv-input', 'mas-input', 'acquire-time-input', 'num-exposures-input', 'threshold-input', 'sensor-bias-input', 'gap-time-input', 'num-projections-input', 'oversample-input', 'move-input', 'rotate-input', 'scan-input', 'pitch-input', 'zero-z-input', 'return-origin-input', 'foco-input', 'acquire-mode-input', 'zero-degree-input'];

    camposParaLimpar.forEach(function (campoId) {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.value = '';
        }
    });
}





//descrição
var messages = {
    'move': "Movimenta o sistema para a posição z em mm.",
    'rotate': "Rotaciona a base giratória em d graus.",
    'altura': "Altura do objeto a ser imageado em mm.",
    'pitch': "Pitch é a razão entre a distância percorrida no eixo z e a largura do detector. Valor no intervalo entre 0,1 e 1. Valor de default é 1.",
    'zeroz': "Retorna o motor de passo à posição inicial z.",
    'origin': "Retorna o motor de passo à posição inicial (x, y, z).",
    'foco': "Tipo Binário Foco fino (0) ou grosso (1). O tubo não permite selecionar diretamente o foco fino ou grosso. Essa configuração é realizada indiretamente por meio da combinação kVp e mAs.",
    'acquire': "12 ou 24 bits. O padrão será 12 bits",
    'zerodegree': "Retorna o motor de passo ao ângulo 0.",
    'kv': "Potencial do tubo, intervalo entre 40 e 125 kVp.",
    'mas': "Produto corrente-tempo, intervalo entre 0,1 e 100 mAs.",
    'acquiretime': "Tempo de aquisição, isto é, o tempo que o detector ficará ligado para obter uma imagem em segundos. Valor pode ser entre 0,000008 e 9223372036854,5 segundos. O valor padrão será de 0,01 segundos.",
    'exposures': "Número de imagens adquiridas em sequência. Por padrão será 1, pois haverá um trigger externo.",
    'threshold': "Limiar de tensão no DAC para determinar um sinal detectado como um fóton. Valor entre 0 e 511. O padrão é 30.",
    'sensor': "Diferença de potencial aplicada entre os sensores. O valor padrão é 300 V",
    'gap': "Tempo entre as aquisições das imagens em segundos. O valor desta função tem como default o tempo de delay do tubo e detector a ser determinado no futuro.",
    'projections': "Número de projeções: determina o número de imagens adquiridas em uma rotação. A partir deste número será determinado o intervalo de ângulo entre cada passo. O valor estará entre 30 e 6000 projeções. O default é 360.",
    'oversample': "Número de imagens adquiridas na mesma posição (x, y, z). Valor entre 1 e 100.",
    'default': "Clique no '?' ao lado de cada parâmetro para uma descrição detalhada.<br><br><strong>Não se esqueça de salvar os parâmetros.</strong>"
};

function displayMessage(buttonPressed) {
    var message = messages[buttonPressed];

    if (message) {
        var container = document.querySelector('.description-container');
        var description = document.createElement('div');
        description.className = 'description';
        description.innerHTML = message;

        container.innerHTML = '';

        container.appendChild(description);
    } else {
        // console.error('Mensagem não encontrada para o botão pressionado.');
    }
}


function addButtonClickListener(buttonId, messageKey) {
    var button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            displayMessage(messageKey);
        });
    } else {
        // console.error('Botão não encontrado:', buttonId);
    }
}

function displayDefaultMessage() {
    displayMessage('default');
}

document.addEventListener('DOMContentLoaded', function () {
    addButtonClickListener('move-button', 'move');
    addButtonClickListener('rotate-button', 'rotate');
    addButtonClickListener('scan-button', 'altura');
    addButtonClickListener('pitch-button', 'pitch');
    addButtonClickListener('zeroz-button', 'zeroz');
    addButtonClickListener('origin-button', 'origin');
    addButtonClickListener('foco-button', 'foco');
    addButtonClickListener('acquire-button', 'acquire');
    addButtonClickListener('zero-degree-button', 'zerodegree');
    addButtonClickListener('kv-button', 'kv');
    addButtonClickListener('mas-button', 'mas');
    addButtonClickListener('acquire-time-button', 'acquiretime');
    addButtonClickListener('exposures-button', 'exposures');
    addButtonClickListener('threshold-button', 'threshold');
    addButtonClickListener('sensor-button', 'sensor');
    addButtonClickListener('gap-button', 'gap');
    addButtonClickListener('projections-button', 'projections');
    addButtonClickListener('oversample-button', 'oversample');

    displayDefaultMessage();
});
