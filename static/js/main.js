
let socket = io.connect('https://' + document.domain + ':' + location.port);
console.log('https://' + document.domain + ':' + location.port)
socket.on('connect', function() {
    socket.emit('my event', {data: 'User connected!'});
    // This is jQuery
    var form = $('form').on('submit', function(e) {
        console.log('Message sent')
        e.preventDefault()
        let user_name = $( 'input.username' ).val()
        let user_input = $( 'input.message' ).val()
        socket.emit( 'my event', {user_name : user_name, message : user_input});
        $( 'input.message' ).val( '' ).focus()
    
    }) 
});
// get reference to all plots
let plotElements = setUpAllPlots();
var cnt = 0;
socket.on( 'my response', function( msg ) {
    console.log( typeof msg )
    let dataArray = msg.toString().split(',');
    // PLot the X acceleration
    let X_accel = dataArray[1];
    Plotly.extendTraces(plotElements['X_acceleration'],{ y:[[X_accel]]}, [0]);
    // scroll graph
    Plotly.relayout(plotElements['X_acceleration'],{
        xaxis: {
            range: [cnt-50,cnt]
        }
    });

    $( 'div.message_holder' ).append( '<div>'+msg+'</div>' )
    
    if( typeof msg.user_name !== 'undefined' ) {
        $( 'h3' ).remove()
        $( 'div.message_holder' ).append( '<div><b style="color: #000">'+msg.user_name+'</b> '+msg.message+'</div>' )
    }
})

// Plotting acceleration
function getData() {
    /**
     * Returns a random ass number
     */
    return Math.random();
}

function setUpAllPlots() {
    /**
     * initalizes all the plots on the page and returns 
     * a dictionary of graph Elements
     * @returns {Object} a map of each plotElement so that plotly can append data to them
     */
    let plotElement = {}
    let cart = [];
    $.each($('#all_plots div'), function(index){
        let elementId = $(this).attr('id');
        let plotName = $(this).attr('title');
        plotElement[elementId] = initPlot(elementId, plotName);
        cart.push(plotElement);
    });
    console.log(plotElement);
    return plotElement;
}

function initPlot(elementId, plotName) {
    /**
     * This function takes in an element ID and instantiates a plot
     * TODO: call this function in a loop to instantiate the plots
     * @param {String} elementId the ID of the html element you want to plot in
     * @returns {Element} returns the element corresponding to the plot you specified
     */
    // Layout options
    var layout = {
        title: plotName,
        xaxis: {
          title: "Time (s)",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        },
        yaxis: {
          title: "Value",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        }
      };
    // This plots one data point
    plotElement = document.getElementById(elementId);
    Plotly.plot(plotElement,[{
        y:[0, 7, 5, 6],
        type:'line',
    }], layout);
    return plotElement
}
// Initialize the empty plots
// let plotElements = setUpAllPlots();

// setInterval(function() {
//     Plotly.extendTraces(plotElements['X_acceleration'], { y: [[getData()]] }, [0])
// }, 200);

// var cnt = 0;

// setInterval(function(){
//     // This test function populates the plots with random data
//     // Acceleration
//     Plotly.extendTraces(plotElements['X_acceleration'],{ y:[[getData()]]}, [0]);
//     Plotly.extendTraces(plotElements['Y_acceleration'],{ y:[[getData()]]}, [0]);
//     Plotly.extendTraces(plotElements['Z_acceleration'],{ y:[[getData()]]}, [0]);
//     // Angular velocity
//     Plotly.extendTraces(plotElements['X_rot'],{ y:[[getData()]]}, [0]);
//     Plotly.extendTraces(plotElements['Y_rot'],{ y:[[getData()]]}, [0]);
//     Plotly.extendTraces(plotElements['Z_rot'],{ y:[[getData()]]}, [0]);
//     cnt++;

//     // let 50 = 50
    
//     if(cnt > 50) {
//         // code for chart 'sliding' here
//         Plotly.relayout(plotElements['X_acceleration'],{
//             xaxis: {
//                 range: [cnt-50,cnt]
//             }
//         });
//         Plotly.relayout(plotElements['Y_acceleration'],{
//             xaxis: {
//                 range: [cnt-50,cnt]
//             }
//         });
//         Plotly.relayout(plotElements['Z_acceleration'],{
//             xaxis: {
//                 range: [cnt-50,cnt]
//             }
//         });

//         Plotly.relayout(plotElements['X_rot'],{
//             xaxis: {
//                 range: [cnt-50,cnt]
//             }
//         });
//         Plotly.relayout(plotElements['Y_rot'],{
//             xaxis: {
//                 range: [cnt-50,cnt]
//             }
//         });
//         Plotly.relayout(plotElements['Z_rot'],{
//             xaxis: {
//                 range: [cnt-50,cnt]
//             }
//         });
//     }

// }, 15);