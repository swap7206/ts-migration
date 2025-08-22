import './details.page.scss';
import React, { useState, useEffect } from "react";
import { Loader, Modal, Placeholder } from 'rsuite';
import { getPokemonDataById, getPokemonTypesById, getSpeciesDataById } from "../../services/common.service";
import DetailsHeader from '../../components/pokemonDetailsCard/detailsHeader/detailsHeader';
import PropertyCard from '../../components/pokemonDetailsCard/propertyCard/propertyCard';
import StatCard from '../../components/pokemonDetailsCard/statCard/statCard';
import EvolutionChainCard from '../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';
import { Pokemon, PokemonSpeciesResponse } from '../../types/pokemon.types';

interface DetailPageProps {
  isCardSelected: boolean;
  toggleModal: () => void;
  pokemonId?: number;
  offset: number;
}

const DetailPage: React.FC<DetailPageProps> = ({ 
  isCardSelected, 
  toggleModal, 
  pokemonId, 
  offset 
}) => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number | undefined>(pokemonId);
  const handleClose = (): void => toggleModal();
  const [data, setPokemonData] = useState<Pokemon | undefined>();
  const [isDetailLoading, setLoading] = useState(true);
  const [isModalOpen, setCloseModal] = useState(isCardSelected);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<PokemonSpeciesResponse | undefined>();
  const [pokemonTypeData, setPokemonTypeData] = useState<any>();

  useEffect(() => {
    if (!currentPokemonId) return;
    (async function setPokemonDetails() {
      setLoading(true);
      const response = await getPokemonDataById(currentPokemonId);
      setPokemonData(response);
      setLoading(false);
      const pokemonSpeciesData = await getSpeciesDataById(currentPokemonId);
      setPokemonSpeciesData(pokemonSpeciesData);
      const pokemonTypeData = await getPokemonTypesById(currentPokemonId);
      setPokemonTypeData(pokemonTypeData);
    })();
  }, [currentPokemonId]);

  const handleForwordClick = (): void => {
    if (currentPokemonId === offset) return;
    setCurrentPokemonId((currentPokemonId || 0) + 1);
  };

  const handleBackwordClick = (): void => {
    if (currentPokemonId === 1) return;
    setCurrentPokemonId((currentPokemonId || 0) - 1);
  };

  const closePopUp = (): void => {
    setCloseModal(false);
  };

  return (
    <>
      <Modal
        dialogClassName={"details-modal-container"}
        size={"md"}
        open={isModalOpen}
        onClose={handleClose}
        onExited={() => {
          setPokemonData(undefined);
        }}
      >
        {data ? (
          <>
            <div className="model-container">
              <Modal.Header closeButton={false} className="rs-modal-header-2">
                {isDetailLoading && (
                  <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
                )}
                {!isDetailLoading && (
                  <div>
                    <DetailsHeader 
                      data={data} 
                      speciesData={pokemonSpeciesData} 
                      forwordClick={handleForwordClick} 
                      backClick={handleBackwordClick} 
                      closeClick={closePopUp} 
                    />
                  </div>
                )}
                <div className="padding-components">
                  {pokemonTypeData && (
                    <PropertyCard 
                      speciesData={pokemonSpeciesData} 
                      data={data} 
                      pokemonTypeData={pokemonTypeData} 
                    />
                  )}
                </div>
                <div className="padding-components">
                  {data.stats && <StatCard stats={data.stats} />}
                </div>
                <div className="padding-components">
                  <EvolutionChainCard data={data} />
                </div>
              </Modal.Header>
              <Modal.Body>
                {/* <PokemonCard data={data} /> */}
              </Modal.Body>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Loader size="md" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailPage;
