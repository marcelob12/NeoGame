
export interface Game {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: Date;  // Aquí puede ser tipo Date, pero se mantendrá como string para manejar la fecha fácilmente
    freetogame_profile_url: string;

}

export interface CartGame extends Game {
    quantity: number;
}

export interface Category {
    id: number;
    name: string;
    description?: string; // Descripción opcional si es que la hay
}
