function init() {
    var selector = d3.select("#selDataset");

    d3.json('samples.json').then((data) => {
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append('option')
                .text(sample)
                .property('value', sample);
        });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

    })
}

init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
};

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select('#sample-metadata');

        PANEL.html('');
        Object.entries(result).forEach(([key, value]) => {PANEL.append('h6').text(key + ': ' + value)});
  
    });
}
