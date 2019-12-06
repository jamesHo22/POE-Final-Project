// let socket = io.connect('http://' + document.domain + ':' + location.port);
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

socket.on( 'my response', function( msg ) {
    console.log( msg )
    $( 'h3' ).remove()
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
    $.each($('#all_plots div'), function(index){
        let elementId = $(this).attr('id')
        let plotName = $(this).attr('title')
        initPlot(elementId, plotName);
        console.log("yeet")
    })
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
          title: "x Axis",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        },
        yaxis: {
          title: "y Axis",
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
        y:[0, 5, 5, 5],
        type:'line',
    }], layout);
    return plotElement
}
setUpAllPlots();
// setInterval(function() {
//     Plotly.extendTraces(TESTER, { y: [[getData()]] }, [0])
// }, 200);

// var cnt = 0;

// setInterval(function(){
//     Plotly.extendTraces(TESTER,{ y:[[getData()]]}, [0]);
//     cnt++;
    
//     if(cnt > 500) {
//         // code for chart 'sliding' here
//         Plotly.relayout(TESTER,{
//             xaxis: {
//                 range: [cnt-500,cnt]
//             }
//         });
//     }

// }, 15);