var testsContext = require.context('../src', true, /spec\.ts$/);
testsContext.keys().forEach(testsContext);

// var srcContext = require.context('../src', true, /\.ts$/);
// srcContext.keys().forEach(srcContext);
