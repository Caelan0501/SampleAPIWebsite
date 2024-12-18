async function pokemonExample()
{
    try{
        const pokemonInput:HTMLInputElement = document.getElementById("pokemonName") as HTMLInputElement;
        let pokemonName:string = pokemonInput.value.toLowerCase();
        const response:Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Could not find pokemon data.");
        const data:any = await response.json();
        let pokemonSpriteAddress:any = data.sprites.front_default;
        const imgElement:HTMLImageElement | null = document.getElementById("pokemonImage") as HTMLImageElement;
        if (imgElement !== null)
        {
            imgElement.src = pokemonSpriteAddress;
            imgElement.style.display = "block";
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function DestinyExample()
{
    const loadingElement:HTMLImageElement | null = document.getElementById("loading") as HTMLImageElement;
    loadingElement.style.display = "block";
    const LoadoutTable:HTMLTableElement | null = document.getElementById("LoadoutTable") as HTMLTableElement;
    LoadoutTable.style.display = "none";
    const apiKey: string = "a2ac1068c9024ae280279bbe5947ad76";

    const accountName:HTMLInputElement | null = document.getElementById("accountName") as HTMLInputElement;
    let displayName: string | undefined = accountName.value;

    const accountType: HTMLInputElement | null = document.getElementById("accountType") as HTMLInputElement ;
    let PlatformType = accountType.value;

    displayName = displayName.replace('#', "%23");
    try
    {
        const getPlayerResponse = await fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${PlatformType}/${displayName}`, {
            method: "GET",
            headers: { "X-API-Key": apiKey }
        });
        const Player = await getPlayerResponse.json();
        const membershipType:string = Player.Response[0].membershipType;
        const membershipID:string = Player.Response[0].membershipId;

        //Call API
        const response:Response = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipID}/?components=200,205`, {
            method: "GET",
            headers: { "X-API-Key": apiKey }
        });
        if (!response.ok) throw new Error("Could not find destiny character data");
        //store data
        const data:any = await response.json();
        const characters:any = data.Response.characters.data;
        const characterIDs:string[] = Object.keys(characters);


        let num: number = 1;
        characterIDs.forEach((id) => {
            let result:string = "";
            let classType:number = characters[id].classType;
            if (classType === 0) result = "Titan";
            else if (classType === 1) result = "Hunter";
            else if (classType === 2) result = "Warlock";
            let cell:HTMLElement | null = document.getElementById(`Character${num}`) as HTMLElement;
            cell.innerHTML = result;
            num++;
        });
        num = 1;
        const equipment = data.Response.characterEquipment.data;
        let ItemHashes: Array<string> = [];
        for (const id of characterIDs) {
            let i:number = 0;
            equipment[id].items.forEach((obj:any) => {
                if (i < 8) { ItemHashes[i] = obj.itemHash; }
                i++;
            });
            const BaseURL = "https://www.bungie.net/";
            let slot: Array<string> = ['Kinetic', 'Energy', 'Power', 'Helm', 'Arms', 'Chest', 'Legs', 'Class'];
            let slotNum :number = 0;
            for (const id of ItemHashes) {
                const responseItem = await fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}`, {
                    method: "GET",
                    headers: { "X-API-Key": apiKey }
                });
                const item = await responseItem.json();
                const img = document.getElementById(`${slot[slotNum]}${num}`) as HTMLImageElement;
                img.src = BaseURL + item.Response.displayProperties.icon;
                slotNum++;
            }
            num++;
        }
    }
    catch(error)
    {
        console.log(error);
    }
    loadingElement.style.display = "none";
    LoadoutTable.style.display = "block";
}

async function DictionaryExample() {
    try {
        const wordInput: HTMLInputElement | null = document.getElementById("wordInput") as HTMLInputElement;
        let word:string;
        if (wordInput == null) throw new Error("Could not find wordInput");

        word = wordInput.value;
        const response: Response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) throw new Error("Could not find en");

        const data: any = await response.json();
        const DefinitionLabel: HTMLLabelElement | null = document.getElementById("Definition") as HTMLLabelElement;
        DefinitionLabel.innerHTML = data[0].meanings[0].definitions[0].definition;
    }
    catch(error) {
        console.log(error);
    }
}

function togglePokemon():void {
    const div:HTMLDivElement | null = document.getElementById("pokemonExample") as HTMLDivElement;
    div.style.display = div.style.display == "none" ? "block" : "none";
}
function toggleDestiny():void {
    const div:HTMLDivElement | null = document.getElementById("destinyExample") as HTMLDivElement;
    div.style.display = div.style.display == "none" ? "block" : "none";
}
function toggleDictionary():void {
    const div:HTMLDivElement | null = document.getElementById("dictionaryExample") as HTMLDivElement;
    div.style.display = div.style.display == "none" ? "block" : "none";
}