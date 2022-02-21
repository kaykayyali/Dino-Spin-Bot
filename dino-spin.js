export default class Dino_Spinner {

    // this.permittedDinos should be an easily iterable array of dinos available on your selected map

    constructor(map, mode, config) {
        this.map = map || process.env.SELECTED_MAP;
        this.dino_config = config
        this.mode = mode;
        this.build_lists();
    }
    build_lists() {
        this.permittedDinos = this.dino_config.maps[this.map];
        // Convert Json to Something we can use and avoid name mismatches
        this.localDinoMap = this.dino_config.dinos.reduce((accumulator, currentDino) => ({ ...accumulator, [currentDino.name.toLowerCase()]: currentDino }), {})
        // Determine what food types are available based on the current map
        this.permittedFoodTypes = [];
        this.localDinosByFoodMap = {}
        for (const dinoObjectname in this.localDinoMap) {
            const currentDino = this.localDinoMap[dinoObjectname];
            // Avoid adding the type to the array if its already in there
            if (this.permittedDinos.includes(dinoObjectname) && !this.permittedFoodTypes.includes(currentDino.foodType)) {
                this.permittedFoodTypes.push(currentDino.foodType)
            }
            // Ensure the object has the right format to avoid type checking down the road
            if (!this.localDinosByFoodMap[currentDino.foodType]) {
                this.localDinosByFoodMap[currentDino.foodType] = [];
            }
            if (this.permittedDinos.includes(dinoObjectname)) {
                this.localDinosByFoodMap[currentDino.foodType].push(dinoObjectname); 
            }
        }
        // Useful for debugging
        console.log(`Current Map is ${this.map}`);
        console.log(`Available Dinos are:`);
        console.log(this.permittedDinos);
        console.log(`Available Dinos Food Types are:`);
        console.log(this.permittedFoodTypes);
        console.log(`Available Dinos By Food Types are:`);
        console.log(this.localDinosByFoodMap)
        console.log(`Mode is : ${this.mode.identifier}`)
    }
    random_dino() {
        let randomString = this[`get_random_dino_by_${this.mode.identifier}`]();
        if (this.mode === "foodType") {
            `${this.mode.contentString}: ${randomString}`
        }
        return this.mode.contentString + ": " +randomString + "\n" + "You can pick from: \n" + this.format_list_for_output(this.localDinosByFoodMap[randomString]);
    }

    format_list_for_output_with_BP(list) {
        let formattedList = [];
        list.forEach((key) => {
            let name = key.replace(/^\w/, (c) => c.toUpperCase());
            let bpValue = this.localDinoMap[key].bluePrint;
            formattedList.push(`${name}: ${bpValue}` + "\n");
        })
        return formattedList.join("");
    }


    format_list_for_output(list) {
        return this.capitalize_names(list.join(","));
    }

    capitalize_names(string) {
        let s = string;
        let w = [];
        s = s.split(",").forEach(i => {
            let n = i.split("");
            n[0] = i[0].toUpperCase();
            w = w.concat(n.join(""));
        })
        return w.join(" \n");
    }

    get_random_dino_by_foodType() {
        return this.get_random_food_type();
    }

    get_random_dino_by_foodNameType() {
        return this.get_random_dino(this.localDinosByFoodMap[this.get_random_food_type()]);
    }

    get_random_dino_by_name() {
        return this.get_random_dino(this.permittedDinos);
    }

    get_random_food_type() {
        let typesCount = this.permittedFoodTypes.length;
        let randomTypeIndex = this.random_int(typesCount);
        let foodType = this.permittedFoodTypes[randomTypeIndex];
        return foodType;
    }

    get_random_dino(list) {
        // Get the random integer
        let dinoCount = list.length;
        let randomDinoIndex = this.random_int(dinoCount);
        // We want to return a name the bot can easily use in a string
        return this.dino_by_name(list[randomDinoIndex]);
    }

    dino_by_name(key) {
        // Returns the dino's proper name. Edit this in the config file
        return this.localDinoMap[key].name;
    }

    random_int(max) {
        return Math.floor(Math.random() * max);
    }
}