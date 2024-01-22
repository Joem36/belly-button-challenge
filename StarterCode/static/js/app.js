// store URL in variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){ 

    // retrieve the json data and console log it
    d3.json(url).then(function(alldata){

        // Utilize D3 to obtain the dropdown menu
        let dropMenu = d3.select("#selDataset");

       
        let names = alldata.names;

        // getting dropdown 
        names.forEach(function(id){
            dropMenu.append("option").text(id).property("value");
        });
       
        // pass first subject and call the functions
        valuecharts(names[0]);
        metadata(names[0]);
    });
};
// function when the subject id changes
function optionChanged(intitiatevalue) {

    valuecharts(intitiatevalue);
    metadata(intitiatevalue);
};
// function to 
function  valuecharts(intitiatevalue){

    // json data
    d3.json(url).then(function(alldata){

        // retrieve all samples data & Filter
        let samples = alldata.samples;
        let id = samples.filter(take=>take.id == intitiatevalue);
        let sample_values = id[0].sample_values; 
        let otu_ids = id[0].otu_ids; 
        let otu_labels = id[0].otu_labels; 

        
        charts(sample_values, otu_ids, otu_labels);

    });
};
    
// function display for bubble chart


function charts(sample_values, otu_ids, otu_labels){

    // json data
    d3.json(url).then(function(alldata){
                
        // data for bubble chart
        let bubble_data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker:{
                color: otu_ids,
                colorscale: 'Earth',
                size: sample_values
            }
        }];
        // create bar chart
        let bar_data = [{
            type: 'bar',
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels,
            orientation: 'h'
        }];
        
        
     // format for bubble chart
     let bubble_layout = {
        title: 'Bubble Chart',
        height: 550,
        width: 1000 
    };
        // format for bar chart
        let bar_layout = {
            title: 'Bar Chart',
            height: 500,
            width: 400            
        };
        

        // image for bar chart
        Plotly.newPlot('bar', bar_data, bar_layout);
    

        // image for bubble chart
        Plotly.newPlot('bubble', bubble_data, bubble_layout);
        
    

    });
};
function metadata(intitiatevalue){

    // json data
    d3.json(url).then(function(alldata){

        // retrieve all samples data
        let samples = alldata.metadata;

        // filter data from metadata
        let id = samples.filter(take=>take.id == intitiatevalue);

        let metadata_d = d3.select("#sample-metadata");
        metadata_d.html('');

        // using array to iterate through the values
        Object.entries(id[0]).forEach(([key, value]) => {
            
            // display information in demographic info chart/table
            metadata_d.append("h3").text(`${key}: ${value}`);
        });
    });
};
init();