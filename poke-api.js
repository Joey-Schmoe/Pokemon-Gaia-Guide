var P = new Pokedex.Pokedex({protocol: 'https'});

function BuildPokemonThumbnail(index, container) {
    FetchPokemon(index)
        .then(function(pokemon) {
            console.log(pokemon);

            //Build thumbnail
            container.innerHTML = "<div><img><h3></h3></div>"

            var div = container.childNodes[0];

            //Fill in thumbnail info/display
            div.childNodes[1].textContent = toUpper(pokemon.name);
            div.childNodes[0].src = 
                pokemon.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default;
        });
}

async function FetchPokemon(index) {
    const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
    var response = await fetch(url);
    var pokemon = await response.json();
    return pokemon;
}

//Converts the first letter of each word to upper case
function toUpper(str) {
    var seperators = [" ", "-"];
    return str
        .toLowerCase()
        .split(new RegExp(seperators.join('|'), 'g'))
        .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
}

//Builds and fills out thumbnails for pokemon on the page
function LoadThumbnails() {
    let thumbnails = document.getElementsByClassName("poke-thumbnail");

    for (let i = 0; i < thumbnails.length; i++) {
        let e = thumbnails[i];

        BuildPokemonThumbnail(e.getAttribute('data-value'), e);

        e.addEventListener('click', function () {
            DisplayInfo(e.getAttribute('data-value'));
        });
    }
}

function DisplayInfo(index) {
    //Enable info-window
    let container = document.getElementById("info-popup")
    container.parentElement.classList.toggle('do-not-display');

    let infoDiv = container.childNodes[3];
    let statDiv = container.childNodes[5];
    let evoDiv = container.childNodes[7];

    let img = infoDiv.childNodes[1];
    let name = infoDiv.childNodes[3];
    let type = infoDiv.childNodes[5];

    let stats = document.getElementById('stat-grid');
    stats.innerHTML = "";

    console.log(infoDiv.childNodes);
    console.log(statDiv.childNodes);
    console.log(evoDiv.childNodes);

    //Display pokemon information to it
    FetchPokemon(index)
        .then(function(pokemon) {
            //Set Sprite
            img.src = pokemon.sprites.other["official-artwork"].front_default;

            //Name
            name.textContent = toUpper(pokemon.name);

            //Type
            let typeText = [];
            type.innerHTML = "";
            
            for (let i = 0; i < pokemon.types.length; i++) {
                let typeString = pokemon.types[i].type.name;
                let span = document.createElement("span");
                span.classList.add(`type-${typeString}`);

                if (i < pokemon.types.length - 1) {
                    span.innerHTML = `${toUpper(pokemon.types[i].type.name)}-`
                } else {
                    span.innerHTML = `${toUpper(pokemon.types[i].type.name)}`
                }
                
                type.append(span);
            }

            //Stats
            let statNames = [];
            let statValues = [];

            for (let i = 0; i < pokemon.stats.length; i++) {
                //Push stat name
                statNames.push(toUpper(pokemon.stats[i].stat.name));
                
                //push stat value
                statValues.push(pokemon.stats[i].base_stat);
            }

            for (let i = 0; i < statNames.length; i++) {
                let p = document.createElement("p");
                p.textContent = statNames[i];
                p.classList.add('stat-name');
                stats.append(p);

                p = document.createElement("p");
                p.textContent = statValues[i];
                p.classList.add('stat-value');
                stats.append(p);
            }

            //Evolutions
        });
}

LoadThumbnails();

document.getElementById("info-popup-exit").addEventListener('click', function() {
    this.parentElement.parentElement.classList.toggle('do-not-display');
});