import React, { useEffect, useContext } from 'react';
import ContextApi from '../Context/ContextApi';

export default function Table() {
  const { setData, filter } = useContext(ContextApi);
  const { filterByName: { name }, filterByNumericValues } = filter;
  let { data } = useContext(ContextApi);

  const {
    column,
    comparison,
    value,
  } = filterByNumericValues[filterByNumericValues.length - 1];

  if (filterByNumericValues.length > 1) {
    data = data.filter((element) => {
      if (comparison === 'menor que') {
        return element[column] < parseInt(value, 10);
      }

      if (comparison === 'igual a') {
        return element[column] === value;
      }

      return element[column] > parseInt(value, 10);
    });
  }

  if (name !== '') {
    data = data.filter((element) => element.name.toLowerCase()
      .includes(name.toLowerCase()));
  }

  useEffect(() => {
    async function getApi() {
      const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(ENDPOINT).then((dataResult) => dataResult.json());
      setData(results);
    }
    getApi();
  }, [setData]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
