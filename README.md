# Short test

## Provided

A json file, containing very little data, and a png of the visual we want this component to use.
The visual is inspired by one of our sites (http://www.idatastart.com/en/products/product/CMMIXA0/vehicles)

## Requirements

What we are looking for is a single page "app" that displays years and vehicle models in a grid format.
We want a grid with the contents of "years" as the header, and "vehicle-models" as the first column.
On page load, we want the corresponding box to be blue (as in the mockup.png) if the entry for that vehicle model and year exists in the "coverage" segment of the json. And grey if it doesn't exist.
We also want that if we click on a vehicle-model/year box, it is toggled (removes the entry from the javascript "coverage" object if it previously existed or adds it if it did not...) and the visual displays the new state.

Example:

Entry Before: 
"coverage":{"RLX":[2012,2011,2010]}

After clicking on the 2013 column next to RLX: 
"coverage":{"RLX":[2013,2012,2011,2010]}

The visual should now show a blue box for the year 2013 next to RLX.

And then clicking on the 2010 column next to RLX: 
"coverage":{"RLX":[2013,2012,2011]}

The visual should now show a grey box for the year 2010 next to RLX.

## Evaluation

This will be evaluated on the compliance to the supplied visual (mockup.png), and the cleanliness of the code and how readable it is. Use this ReactJS project as a boilerplate. This test should take around 2 hours to complete. You will have the opportunity to justify your decisions in person. You may bring it with you to the second interview.

## Installation

### Install Parcel

Parcel is required for this project to run properly.

```sh
npm install -g parcel-bundler
```

### Install dependencies

```sh
npm install
```

## Run dev environment

```sh
npm run dev
```

Navigate to http://localhost:1234
