    document.addEventListener('DOMContentLoaded', () => {
        const generators = document.querySelectorAll('.generator-list button');
        const outputContainer = document.querySelector('.output-container');

        generators.forEach(generator => {
            generator.addEventListener('click', () => {
                const generatorId = generator.id;
                fetchGeneratorData(generatorId)
                    .then(data => {
                        displayOutput(data, generatorId);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        outputContainer.innerHTML = '<p>Ocurrió un error al generar la salida.</p>';
                    });
            });
        });

        function fetchGeneratorData(generatorId) {
            const apiUrl = determineApiUrl(generatorId);
            return fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos del generador.');
                    }
                    return response.json();
                });
        }

        function determineApiUrl(generatorId) {
            switch (generatorId) {
                case 'user-generator':
                    return 'https://randomuser.me/api/';
                case 'number-generator':
                    return 'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new';
                case 'text-generator':
                    return 'https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1';
                case 'inspirational-quote-generator':
                    return 'https://api.quotable.io/random';
                    case 'avatar-generator':
                        return 'https://randomuser.me/api/?inc=name';
                case 'color-generator':
                    return 'https://www.thecolorapi.com/random';
                default:
                    return '';
            }
        }

        function displayOutput(data, generatorId) {
            const output = parseOutput(data, generatorId);
            outputContainer.innerHTML = output;
        }

        function parseOutput(data, generatorId) {
            let output = '';
            switch (generatorId) {
                case 'user-generator':
                    output = parseUserData(data);
                    break;
                case 'number-generator':
                    output = parseNumberData(data);
                    break;
                case 'text-generator':
                    output = parseTextData(data);
                    break;
                case 'inspirational-quote-generator':
                    output = parseQuoteData(data);
                    break;
                    case 'avatar-generator':
                        output = parseAvatarData(data);
                        break;
                case 'color-generator':
                    output = parseColorData(data);
                    break;
                default:
                    break;
            }
            return output;
        }

        function parseUserData(data) {
            const user = data.results[0];
            return `
                <div>
                    <img src="${user.picture.large}" alt="Profile Picture">
                    <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Country:</strong> ${user.location.country}</p>
                    <p><strong>Gender:</strong> ${user.gender}</p>
                </div>
            `;
        }

        function parseNumberData(data) {
            return `<p><strong>Number:</strong> ${data}</p>`;
        }

        function parseTextData(data) {
            return data.join('<br>');
        }

        function parseQuoteData(data) {
            return `<p><em>"${data.content}"</em> - ${data.author}</p>`;
        }

        function parseAvatarData(data) {
            const user = data.results[0];
            const avatarUrl = `https://ui-avatars.com/api/?name=${user.name.first}+${user.name.last}&background=0D8ABC&color=fff&size=128`;
            return `
                <div>
                    <img src="${avatarUrl}" alt="Avatar">
                    <p><strong>Avatar for:</strong> ${user.name.first} ${user.name.last}</p>
                </div>
            `;
        }

        function parseColorData(data) {
            return `<p><strong>Color:</strong> ${data.name.value}</p>`;
        }
    });
