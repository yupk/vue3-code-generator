import {
    jsPlumb
} from "jsplumb";

const connectorStyle = {
    ConnectionsDetachable: false,
    MaxConnections: 100,
    //连线类型
    Anchors: ['Bottom', 'Top'],
    Connector: ["Flowchart"],

    Endpoints: [
        ["Dot", {
            radius: 7
        }],
        ["Dot", {
            radius: 11
        }]
    ],
    EndpointStyles: [{
        fill: "#225588"
    }, {
        fill: "#558822"
    }]


};

const lines = {
    condition: [
      
    ],
    default: [
       
        ['Label', {
            label: '<button class="add-node-btn">+</button>',
            cssClass: '',
            labelStyle: {
                color: 'red'
            },

            events: {
                click: function (diamondOverlay, originalEvent) {
                    console.log("double click on diamond overlay for : ", diamondOverlay.component);
                }
            }

        }],
    ]
}
const plumbIns = jsPlumb.getInstance();

plumbIns.importDefaults(connectorStyle);

export default {
    install: (app, options) => {
        app.directive('flow', function (el, binding) {
            console.log(binding);
            let lineType=binding.arg;
            console.log(lineType);
            let ele = binding.value;

            if ( ele && ele.father) {
                 
                plumbIns.connect({
                    target: el,
                    source: ele.father,
                    overlays:  lines[lineType] ,

                });
            }

        })

    }
}