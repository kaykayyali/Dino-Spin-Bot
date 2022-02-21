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
        const permittedFoodTypes = [];
        for (const dinoObjectname in this.localDinoMap) {
            const currentDino = this.localDinoMap[dinoObjectname]
            if (this.permittedDinos.includes(dinoObjectname) && !permittedFoodTypes.includes(currentDino.foodType)) {
                permittedFoodTypes.push(currentDino.foodType)
            }
        }
        // Useful for debugging
        console.log(`Current Map is ${this.map}`);
        console.log(`Available Dinos are:`);
        console.log(this.permittedDinos);
        console.log(`Available Dinos Food Types are:`);
        console.log(permittedFoodTypes);
        console.log(`Mode is : ${this.mode.identifier}`)
    }
    random_dino() {
        return this[`get_random_dino_by_${this.mode.identifier}`]()
    }

    get_random_dino_by_foodType() {
        let typesCount = this.permittedFoodTypes.length;
        let randomTypeIndex = this.get_random_int(typesCount);
        let foodType = this.permittedFoodTypes[randomTypeIndex];

    }
    get_random_dino_by_name() {
        return this.get_random_dino(this.permittedDinos);
    }
    get_random_dino(list) {
        // Get the random integer
        let dinoCount = list.length;
        let randomDinoIndex = this.get_random_int(dinoCount);
        // We want to return a name the bot can easily use in a string
        return this.get_dino_by_name(list[randomDinoIndex]);
    }

    get_dino_by_name(key) {
        // Returns the dino's proper name. Edit this in the config file
        return this.localDinoMap[key].name;
    }

    get_random_int(max) {
        return Math.floor(Math.random() * max);
    }
}