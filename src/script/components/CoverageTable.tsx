import * as React from 'react';

/**
 * Props for the CoverageTable class.
 */
type CoverageTableProps = {

    /**
     * Array of vehicle models.
     */
    vehicleModels: string[];

    /**
     * Array of model-years covered.
     */
     years: number[];

     /**
      * A dict object holding the covered model-years for each vehicle model.
      */
    coverage: Record<string, number[]>;

    /**
     * Optional style properties for the component's topmost container.
     */
    containerStyle?: React.CSSProperties;
};

/**
 * Table of vehicle models covered per year.
 * 
 * Data from the JSON file is copied here, sorted, and the coverage is edited.
 * The whole component doesn't need to be rendered when it changes, so no
 * properties were added to its React state object. Each cell keeps its own 
 * state, re-renders when necessary, and updates the coverage object.
 */
export class CoverageTable extends React.Component<CoverageTableProps> {

    /**
     * Array sorted in ascending order of vehicle models.
     */
    private vehicleModels: string[];

    /**
     * Array sorted in descending order of model-years covered.
     */
    private years: number[];

    /**
     * A dict object holding the covered model-years for each vehicle model.
     * Includes models that don't have any covered model-year.
     */
    private coverage: Record<string, number[]>;

    /**
     * Instantiates a new component. Creates local copies of the JSON attributes,
     * sorting the vehicle model and model-year lists, and setting absent models
     * in the coverage dict with empty arrays.
     * 
     * @param props - Object properties.
     */
    constructor(props: CoverageTableProps) {
        super(props);
        this.vehicleModels = [...props.vehicleModels].sort();
        this.years = [...props.years].sort().reverse();
        this.coverage = this.vehicleModels
            .reduce(function (coverage, model) {
                coverage[model] = props.coverage[model] || [];
                return coverage;
            }, {});
    }

    /**
     * Renders the component.
     * 
     * @returns The JSX Element of the component.
     */
    render() {
        return (
            <div className="coverage-table" style={this.props.containerStyle}>
                <div className="coverage-table-padding-top" />
                <div className="coverage-table-responsive">
                    <div className="coverage-table-padding-left" />
                    <div className="coverage-table-models">
                        <div className="coverage-table-logo-container">
                            <div className="coverage-table-logo-padding-top" />
                            <div className="coverage-table-logo-background" />
                        </div>
                        {this.vehicleModels.map(model => [
                            <div className="coverage-table-vspacing" key={model + 'SP'} />,
                            <div className="coverage-table-model" key={model}>{model}</div>
                        ])}
                    </div>
                    {this.years.map(year => [
                        <div className="coverage-table-hspacing" key={year + 'SP'} />,
                        <div className="coverage-table-year-column" key={year}>
                            <div className="coverage-table-year">{year}</div>
                            {this.vehicleModels.map(model => [
                                <div className="coverage-table-vspacing" key={model + 'SP'} />,
                                <CoverageButton
                                    covered={this.coverage[model].includes(year)}
                                    onChange={covered => this.updateCoverage(model, year, covered)}
                                    key={model} />,
                            ])}
                        </div>
                    ])}
                    <div className="coverage-table-hspacing" />
                </div>
            </div >
        );
    }

    /**
     * Updates the coverage object. It's called when a cell changes its status.
     * 
     * @param model - The vehicle model.
     * @param year - The model-year.
     * @param covered - True if the model-year of this model is covered.
     */
    private updateCoverage(model: string, year: number, covered: boolean) {
        let years = this.coverage[model];
        const index = years.indexOf(year);
        if (covered && index < 0) {
            years.push(year)
            years.sort().reverse();
        } else if (!covered && index >= 0) {
            years.splice(index, 1)
        }
    }
}

/**
 * The cell/button that indicates if a vehicle model's model-year is covered.
 * It will toggle its status if clicked, and trigger the update of the main
 * coverage object at the table object.
 * 
 * @param props - Object properties.
 * @returns The JSX Element of the component.
 */
const CoverageButton = (props: { covered: boolean; onChange: (covered: boolean) => void }) => {
    const [covered, setCovered] = React.useState(props.covered);
    function update(newStatus: boolean) {
        props.onChange(newStatus);
        setCovered(newStatus);
    }
    return covered
        ? <div className="coverage-table-covered" onClick={() => update(false)} />
        : <div className="coverage-table-uncovered" onClick={() => update(true)} />;
};
