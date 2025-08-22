import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'rsuite';
import { debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { baseURL, SEARCH_SLICED } from '../../constants/apiUrls';
import { getCamleCaseString } from '../../constants/pokemon.types';
import PokemonContext from '../../context/pokemonContext/pokmon.context';
import { getAllParallelCall, getPokemonGenders, getPokemonTypes, removeDuplicateBy } from '../../services/common.service';
import { Pokemon } from '../../types/pokemon.types';
import "./filter.scss";
import AppMultiSelectDropDown from './multiSelectdropDown/multiSelectdropDown';
import SearchFilter from './search/search.filter';

interface AppFilterProps {
  isFilterEnable: (enabled: boolean) => void;
}

const AppFilter: React.FC<AppFilterProps> = ({ isFilterEnable }) => {
  const { state, getPokemonData, dispatch, setAppLoading, getPokemonDetailsListByUrl } = useContext(PokemonContext);
  const { allPokemonsList, pokemonsTypes, pokemonGenderList } = state;

  const [isOpenTypeFilter, setIsOpenTypeFilter] = useState(false);
  const [isOpenGendreFilter, setIsOpenGenderFilter] = useState(false);

  let data$ = of([]);

  const onOpenTypeHandler = (): void => {
    setIsOpenTypeFilter(true);
  };

  const onCloseTypeHandler = (): void => {
    setIsOpenTypeFilter(false);
  };

  const onOpenGenderHandler = (): void => {
    setIsOpenGenderFilter(true);
  };

  const onCloseGenderHandler = (): void => {
    setIsOpenGenderFilter(false);
  };

  const onCleanTypeHandler = (event: any): void => {
    if (event) {
      isFilterEnable(false);
    }
  };

  const onSearchChangeHandler = (value: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    value = value.trim();
    setAppLoading(true);
    if (value.length) {
      isFilterEnable(true);
      data$ = of(allPokemonsList).pipe(
        debounceTime(4000),
        distinctUntilChanged(), 
        map((pokmons) => {
          return pokmons.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
        })
      );
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }

    data$.subscribe(pokemanList => {
      if (pokemanList.length > SEARCH_SLICED) {
        pokemanList = pokemanList.slice(0, SEARCH_SLICED);
      }
      getPokemonDetailsListByUrl(pokemanList).then(res => { filterPokemonData(res); });
    });
    setAppLoading(false);
  };

  const onTypeChangeHandler = (value: string[], event: any): void => {
    event.preventDefault();
    if (value.length) {
      isFilterEnable(true);
      getAllParallelCall(value).then(pokemonList => {
        pokemonList = pokemonList.map((res: any) => res.pokemon);
        pokemonList = pokemonList.flat().map((res: any) => res.pokemon);
        pokemonList = removeDuplicateBy(pokemonList, 'name');
        if (pokemonList.length > SEARCH_SLICED) {
          pokemonList = pokemonList.slice(-SEARCH_SLICED);
        }
        getPokemonDetailsListByUrl(pokemonList).then(res => { filterPokemonData(res); });
      }).catch(err => Error(err));
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }
  };

  const onGenderChangeHandler = (value: string[], event: any): void => {
    event.preventDefault();
    if (value.length) {
      isFilterEnable(true);
      getAllParallelCall(value).then(pokemonList => {
        pokemonList = pokemonList.map((res: any) => res.pokemon_species_details).flat();
        pokemonList = pokemonList.map((res: any) => baseURL + "/pokemon" + res.pokemon_species.url.split("pokemon-species")[1]);
        pokemonList = [...new Set(pokemonList)];
        if (pokemonList.length > SEARCH_SLICED) {
          pokemonList = [...pokemonList.slice(0, SEARCH_SLICED), ...pokemonList.slice(-SEARCH_SLICED)];
        }
        pokemonList = pokemonList.map(res => ({ url: res }));
        getPokemonDetailsListByUrl(pokemonList).then(res => { filterPokemonData(res); });
      }).catch(err => Error(err));
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }
  };

  const filterPokemonData = (data: Pokemon[]): void => {
    dispatch({
      type: "ACTIONS.SET_FILTERED_POKEMON_LIST",
      payload: data
    });
  };

  const setPokemonTypes = (data: any[]): void => {
    if (data.length) {
      data = data.map(item => ({ label: getCamleCaseString(item.name), value: item.url, url: item.url }));
      dispatch({
        type: "ACTIONS.SET_POKEMON_TYPE",
        payload: data
      });
    } else {
      dispatch({
        type: "ACTIONS.SET_POKEMON_TYPE",
        payload: []
      });
    }
  };

  const setPokemonGendersList = (genderList: any[]): void => {
    genderList = genderList.map(item => ({ label: getCamleCaseString(item.name), value: item.url, url: item.url }));
    if (genderList.length) {
      dispatch({
        type: "ACTIONS.SET_POKEMON_GENDER_LIST",
        payload: genderList
      });
    } else {
      dispatch({
        type: "ACTIONS.SET_POKEMON_GENDER_LIST",
        payload: []
      });
    }
  };

  const getAllPokemonType = async (): Promise<void> => {
    getPokemonTypes().then(res => {
      setPokemonTypes(res.results);
    }).catch(err => {
      return new Error(err);
    });
  };

  const getPokemonGendersList = async (): Promise<void> => {
    getPokemonGenders().then(res => {
      setPokemonGendersList(res.results);
    }).catch(err => {
      return new Error(err);
    });
  };

  useEffect(() => {
    getAllPokemonType();
    getPokemonGendersList();
  }, []);

  return (
    <>
      <div className="filter-container">
        <div className="filter-wrap">
          <Row lg={24} xl={24} className="filter-row-wrap show-grid">
            <Col lg={16} xl={16} xs={24} sm={24}>
              <div>
                <SearchFilter 
                  placeholder="Name or Number" 
                  inputClass="pokemon-search-filter" 
                  label="Search By" 
                  onChangeHandler={onSearchChangeHandler} 
                />
              </div>
            </Col>
            <Col lg={4} xl={4} xs={24} sm={24}>
              <div>
                <AppMultiSelectDropDown 
                  placeholder="Select Types" 
                  isOpen={isOpenTypeFilter} 
                  data={pokemonsTypes} 
                  label="Type" 
                  onChangeHandler={onTypeChangeHandler} 
                  onOpenHandler={onOpenTypeHandler} 
                  onCloseHandler={onCloseTypeHandler} 
                  onCleanHandler={onCleanTypeHandler} 
                />
              </div>
            </Col>
            <Col lg={4} xl={4} xs={24} sm={24}>
              <div>
                <AppMultiSelectDropDown 
                  placeholder="Select Gender" 
                  isOpen={isOpenGendreFilter} 
                  data={pokemonGenderList} 
                  label="Gender" 
                  onChangeHandler={onGenderChangeHandler} 
                  onOpenHandler={onOpenGenderHandler} 
                  onCloseHandler={onCloseGenderHandler} 
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AppFilter;
