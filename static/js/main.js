
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
// let plotElements = setUpAllPlots();
var cnt = 0;
firstTime = 0;
// var frame = 50;
socket.on( 'my response', function( msg ) {
    console.log( typeof msg )
    let dataArray = msg.toString().split(',');
    console.log(dataArray);
    // PLot the X acceleration
    time = Number(dataArray[0]);

    // initialize the graphs on the first datapoint
    if(firstTime == 0) {
        setUpAllPlots(time);
        firstTime++
    }

    X_accel = Number(dataArray[1]);
    Y_accel = Number(dataArray[2]);
    Z_accel = Number(dataArray[3]);

    X_rot = Number(dataArray[4]);
    Y_rot = Number(dataArray[5]);
    Z_rot = Number(dataArray[6]);
    console.log(typeof X_accel)
    console.log(X_accel)

    var update = {
        x: [[time], [time], [time], [time], [time], [time]],
        y: [[X_accel], [Y_accel], [Z_accel], [X_rot], [Y_rot], [Z_rot]]
      }
    Plotly.extendTraces('subplots', update, [0,1, 2, 3, 4, 5])
    
    var updateLayout = {
        xaxis: {
            range: [cnt-50,cnt]
        }
    }
    if(cnt > 50) {
        Plotly.relayout('subplots', [updateLayout,updateLayout,updateLayout,updateLayout,updateLayout,updateLayout]);
    }
    cnt++;
    // Old method of having many plots

    // Plotly.extendTraces(plotElements['X_acceleration'],{y:[[X_accel]]}, [0]);
    // Plotly.extendTraces(plotElements['Y_acceleration'],{y:[[Y_accel]]}, [0]);
    // Plotly.extendTraces(plotElements['Z_acceleration'],{y:[[Z_accel]]}, [0]);

    // Plotly.extendTraces(plotElements['X_rot'],{y:[[X_rot]]}, [0]);
    // Plotly.extendTraces(plotElements['Y_rot'],{y:[[Y_rot]]}, [0]);
    // Plotly.extendTraces(plotElements['Z_rot'],{y:[[Z_rot]]}, [0]);
    // // scroll graph
    // if(cnt > 50) {
    //     Plotly.relayout(plotElements['X_acceleration'],{
    //         xaxis: {
    //             range: [cnt-50,cnt]
    //         }
    //     });

    //     Plotly.relayout(plotElements['Y_acceleration'],{
    //         xaxis: {
    //             range: [cnt-50,cnt]
    //         }
    //     });

    //     Plotly.relayout(plotElements['Z_acceleration'],{
    //         xaxis: {
    //             range: [cnt-50,cnt]
    //         }
    //     });

    //     Plotly.relayout(plotElements['X_rot'],{
    //         xaxis: {
    //             range: [cnt-50,cnt]
    //         }
    //     });

    //     Plotly.relayout(plotElements['Y_rot'],{
    //         xaxis: {
    //             range: [cnt-50,cnt]
    //         }
    //     });

    //     Plotly.relayout(plotElements['Z_rot'],{
    //         xaxis: {
    //             range: [cnt-50,cnt]
    //         }
    //     });
    // }
    // cnt++;

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

function setUpAllPlots(times) {
    /**
     * initalizes all the plots on the page and returns 
     * a dictionary of graph Elements
     * @returns {Object} a map of each plotElement so that plotly can append data to them
     */
    // let plotElement = {}
    // let cart = [];
    // $.each($('#all_plots div'), function(index){
    //     let elementId = $(this).attr('id');
    //     let plotName = $(this).attr('title');
    //     plotElement[elementId] = initPlot(elementId, plotName);
    //     cart.push(plotElement);
    // });
    // console.log(plotElement);
    // return plotElement;

    var trace1 = {
        title: "X Acceleration (m/s^2)",
        x: [time],
        y: [0],
        type: 'scatter'
    };
      
    var trace2 = {
        title: "Y Acceleration (m/s^2)",
        x: [time],
        y: [0],
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter'
    };
      
    var trace3 = {
        title: "Z Acceleration (m/s^2)",
        x: [time],
        y: [0],
        xaxis: 'x3',
        yaxis: 'y3',
        type: 'scatter'
    };

    var trace4 = {
        title: "X angular velocity (rad/s)",
        x: [time],
        y: [0],
        xaxis: 'x4',
        yaxis: 'y4',
        type: 'scatter'
    };
      
    var trace5 = {
        title: "Y angular velocity (rad/s)",
        x: [time],
        y: [0],
        xaxis: 'x5',
        yaxis: 'y5',
        type: 'scatter'
    };
      
    var trace6 = {
        title: "Z angular velocity (rad/s)",
        x: [time],
        y: [0],
        xaxis: 'x6',
        yaxis: 'y6',
        type: 'scatter'
    };

    
    var data = [trace1, trace2, trace3, trace4, trace5, trace6];
    
    var layout = {
    grid: {
        rows: 3,
        columns: 2,
        pattern: 'independent',
        roworder: 'top to bottom'}
    };
      
    Plotly.newPlot('subplots', data, layout);
}

// var interval = setInterval(function() {
//     var update = {
//       x: [[getData()], [getData()], [getData()]],
//       y: [[getData()], [getData()], [getData()]]
//     }
//     Plotly.extendTraces('subplots', update, [0,1, 2])
//   }, 500);

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
        y:[0],
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