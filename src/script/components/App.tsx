import * as React from 'react';
import { CoverageTable } from './CoverageTable';
import coverage from '../../data/coverage.json';

/**
 * The main application component. Loads the initial data from the JSON and
 * feeds the table object.
 * 
 * @returns The JSX Element of the component.
 */
export const App = () => (
    <CoverageTable
        vehicleModels={coverage['vehicle-models']}
        years={coverage.years}
        coverage={coverage.coverage} />
);
