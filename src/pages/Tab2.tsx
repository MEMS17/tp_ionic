import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonAvatar, IonSpinner, IonButton, IonSelect, IonSelectOption
} from '@ionic/react';
import { useState, useEffect } from "react";
import './Tab2.css'; 
 
interface Pokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: string | null;
  };
  talents: {
    name: string;
    tc: boolean;
  }[];
  types: {
    name: string;
    image: string;
  }[];
  height?: string;
  weight?: string;
}
 
const Tab2: React.FC = () => {
  const [pList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
 
  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon', error);
      } finally {
        setLoading(false);
      }
    };
 
    getPokemons();
  }, []);
 
  const handleSelectChange = (event: CustomEvent) => {
    setSelectedPokemonId(event.detail.value);
  };
 
  const handleButtonClick = (pokedex_id: number) => {
    setSelectedPokemonId(pokedex_id);
  };
 
  const handleBackToList = () => {
    setSelectedPokemonId(null);
  };
 
  const selectedPokemon = pList.find(pokemon => pokemon.pokedex_id === selectedPokemonId);
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des pokémons</IonTitle>
        </IonToolbar>
      </IonHeader>
 
      <IonContent fullscreen>
 
        {loading ? (
          <div>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <>
            {!selectedPokemonId && (
              <>
                <IonList>
                  {pList.map(pokemon => (
                    <IonItem key={pokemon.pokedex_id}>
                      <IonAvatar slot="start">
                        <img
                          src={pokemon.sprites.regular || 'https://via.placeholder.com/150'}
                          alt={pokemon.name.en}
                        />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{pokemon.name.en}</h2>
                        <h3>Catégorie : {pokemon.category}</h3>
                        <h3>Génération : {pokemon.generation}</h3>
                      </IonLabel>
                      <IonButton
                        slot="end"
                        onClick={() => handleButtonClick(pokemon.pokedex_id)}
                      >
                        Details
                      </IonButton>
                    </IonItem>
                  ))}
                </IonList>
              </>
            )}
 
            {/* Affichage des détails du Pokémon sélectionné */}
            {selectedPokemon && (
              <IonList>
                <IonItem>
                  <IonAvatar slot="start">
                    <img
                      src={selectedPokemon.sprites.regular || 'https://via.placeholder.com/150'}
                      alt={selectedPokemon.name.en}
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h1>{selectedPokemon.name.en}</h1><br />
                    <h2>Nom en Japonais : {selectedPokemon.name.jp}</h2><br />
                    <h3>Catégorie : {selectedPokemon.category}</h3><br />
                    <h3>Génération : {selectedPokemon.generation}</h3><br />
                    <h3>Height : {selectedPokemon.height || 'N/A'}</h3><br />
                    <h3>Weight : {selectedPokemon.weight || 'N/A'}</h3><br />
                    <h3>Talents : {selectedPokemon.talents.map(talent => talent.name).join(', ')}</h3><br />
                    <h3>Types : {selectedPokemon.types.map(type => type.name).join(', ')}</h3><br />
                    <IonButton onClick={handleBackToList}>
                       Les Pokemons
                    </IonButton>
                  </IonLabel>
                </IonItem>
              </IonList>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
 
export default Tab2;
