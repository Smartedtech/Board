(function() {
    var img = new Image()
    img.src = 'img/screenshot.png' //this will use smarted image as the background later 

    var lc = LC.init(document.getElementsByClassName('literally')[0], {
        watermarkImage: img,
    });
    var tools = [{
        name: 'pencil',
        el: document.getElementById('tool-pencil'),
        tool: new LC.tools.Pencil(lc)
    }, {
        name: 'line',
        el: document.getElementById('tool-line'),
        tool: new LC.tools.Line(lc)
    }, {
        name: 'rectangle',
        el: document.getElementById('tool-rectangle'),
        tool: new LC.tools.Rectangle(lc)
    }, {
        name: 'text',
        el: document.getElementById('tool-text'),
        tool: new LC.tools.Text(lc)
    }, {
        name: 'polygon',
        el: document.getElementById('tool-polygon'),
        tool: new LC.tools.Polygon(lc)
    }, {
        name: 'pan',
        el: document.getElementById('tool-pan'),
        tool: new LC.tools.Pan(lc)
    }, {
        name: 'eyedropper',
        el: document.getElementById('tool-eyedropper'),
        tool: new LC.tools.Eyedropper(lc)
    }, {
        name: 'arrow',
        el: document.getElementById('tool-arrow'),
        tool: function() {
            arrow = new LC.tools.Line(lc);
            arrow.hasEndArrow = true;
            return arrow;
        }()
    }, {
        name: 'dashed',
        el: document.getElementById('tool-dashed'),
        tool: function() {
            dashed = new LC.tools.Line(lc);
            dashed.isDashed = true;
            return dashed;
        }()
    }, {
        name: 'ellipse',
        el: document.getElementById('tool-ellipse'),
        tool: new LC.tools.Ellipse(lc)
    }, {
        name: 'tool-select',
        el: document.getElementById('tool-select'),
        tool: new LC.tools.SelectShape(lc)
    }, {
        name: 'eraser',
        el: document.getElementById('tool-eraser'),
        tool: new LC.tools.Eraser(lc)
    }];


    var strokeWidths = [{
        name: 10,
        el: document.getElementById('sizeTool-1'),
        size: 10
    }, {
        name: 20,
        el: document.getElementById('sizeTool-2'),
        size: 20
    }, {
        name: 30,
        el: document.getElementById('sizeTool-3'),
        size: 30
    }, {
        name: 40,
        el: document.getElementById('sizeTool-4'),
        size: 40
    }, {
        name: 50,
        el: document.getElementById('sizeTool-5'),
        size: 50
    }];
    var activateTool = function(tool, val) {
        tool.forEach(function(set_tool) {
            if (val == set_tool) {
                set_tool.el.style.backgroundColor = 'yellow';
            } else {
                set_tool.el.style.backgroundColor = 'transparent';
            }
        });
    }

    tools.forEach(function(t) {
        t.el.style.cursor = "pointer";
        t.el.onclick = function(e) {
            e.preventDefault();
            lc.setTool(t.tool);
            activateTool(tools, t);
            activateTool(strokeWidths, strokeWidths[0]);
        };
    });

    strokeWidths.forEach(function(width) {
        width.el.style.cursor = "pointer";
        width.el.onclick = function(e) {
            e.preventDefault();
            lc.trigger('setStrokeWidth', width.size);
            activateTool(strokeWidths, width);
        }
    });
    var clearCanvas = document.getElementById('clear-canvas');
    var imageFile = document.getElementById('uploadImage');
    var uploadImg = document.getElementById('upload-img');
    var undo = document.getElementById('tool-undo');
    var redo = document.getElementById('tool-redo');
    var zoomIn = document.getElementById('tool-zoom-in');
    var zoomOut = document.getElementById('tool-zoom-out');
    var setImageSize = document.getElementById('change-img-size');
    clearCanvas.addEventListener('click', clearCanvasContent);
    uploadImg.addEventListener('click', uploadImage);
    // setImageSize

    undo.addEventListener('click', function() {
        lc.undo();
    });

    redo.addEventListener('click', function() {
        lc.redo();
    });

    zoomOut.addEventListener('click', function() {
        lc.zoom(-0.2);
    });

    zoomIn.addEventListener('click', function() {
        lc.zoom(0.2);
    });
    setImageSize.addEventListener('click', function() {
        var width = prompt('enter the image new size: width');
        if (width) {
            var height = prompt('enter the image new size: height');
            if (height) {
                lc.setImageSize(parseInt(width), parseInt(height));
            }
        }
    });

    function uploadImage() {
        imageFile.click();
    }

    //yet to finished
    imageFile.addEventListener('change', function(file) {
        var img = new Image();
        img.src = 'img/pencil.png';
        lc.saveShape(LC.createShape('Image', {
            x: 100,
            y: 100,
            image: img
        }));
        // 	console.log(document.getElementById('uploadImage'));
        // 	var reader = new FileReader();
        //     reader.onload = function(e) {
        //         var img = new Image();
        //         img.src = e.target.result;
        //         lc.saveShape(LC.createShape('Image', {
        //             x: 100,
        //             y: 100,
        //             image: img
        //         }))
        //     };
        //     reader.readAsDataURL(file);

    });

    function clearCanvasContent() {
        lc.clear();
    }
    activateTool(tools, tools[0]);
    activateTool(strokeWidths, strokeWidths[0]);
var localStorageKey = 'drawing'
lc.on('drawingChange', function() {
      localStorage.setItem(localStorageKey, JSON.stringify(lc.getSnapshot()));
    });
})();