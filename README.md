# pyother-lucchese-demo

## Installation

You can use this project in the following ways:

### • Run Locally

To run the project locally, clone the repository and install the dependencies:

```sh
git clone https://github.com/Pyother/pyother-lucchese-demo.git
```
```sh
cd pyother-lucchese-demo
npm install
```

After installing the dependencies, create a `.env` file in the root directory with the following content:

```ini
EXTERNAL_API=https://77feu16q40.execute-api.us-east-1.amazonaws.com/dev
PORT=50034
```

Then start the application:

```sh
npm run dev
```

### • Live Demo

The project is hosted at: https://lucchese-bootmaker-demo.pyother.pl/. 

## Tests

To run the tests for this project, install following packages:

```sh
npx playwright install
```

After installation, ensure that server is running:

```
npm run dev
```

In another terminal run the tests with this command:

```
npm run test
```


