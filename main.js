"use strict";

$(function() {

    let timer = null;
    let width;
    let growthAmount;
    let growRate;
    let numberOfCircles;

    $("#start").click(function() {
        clearInterval(timer);
        $("#plane").empty();
        width = $("#width").val();
        growthAmount = $("#growth-amount").val();
        growRate = $("#grow-rate").val();
        numberOfCircles = $("#number-circles").val();
        showCircles();
    });

    function showCircles() {

        const circles = [];
        let circle;
        //generate circle
        for (let i = 0; i < numberOfCircles; i++) {
            circle = $("<div />", {
                "alt": "circle",
                "class": "circle",
                "id": "circle-" + i,
                "css": {
                    "background-color": generateColor(),
                    "height": width + "px",
                    "width": width + "px",
                    "border-radius": width + "px",
                    "position": "absolute",
                    "left": Math.random() * window.innerWidth,
                    "top": Math.random() * window.innerHeight,
                },
                //to hide the circle on click
                "click": function() {
                    $("#circle-" + i).hide();
                },
                //changes opacity on mouse hover
                "mousemove": function() {
                    $("#circle-" + i).css("opacity", function(idx, old) {
                        return old - 0.01;
                    });
                },
                //sets opacity to 1 when mouse is not hovered on the circle 
                "mouseleave": function() {
                    $("#circle-" + i).css("opacity", 1);
                }
            });
            circles.push(circle);
        }

        $("#plane").prepend(circles);
        grow();
    }
    //sets interval for circle growth
    function grow() {
        timer = setInterval(function() {
            $(".circle").css("height", function(idx, old) {
                return parseInt(old) + parseInt(growthAmount) + "px";
            });
            $(".circle").css("width", function(idx, old) {
                return parseInt(old) + parseInt(growthAmount) + "px";
            });
            $(".circle").css("border-radius", function(idx, old) {
                return parseInt(old) + parseInt(growthAmount) + "px";
            });
        }, growRate)
    }
    //generates random color for the circle
    function generateColor() {
        const ranges = [
            [150, 256],
            [0, 190],
            [0, 30]
        ];
        var g = function() {
            var range = ranges.splice(Math.floor(Math.random() * ranges.length), 1)[0];
            return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
        }
        return "rgb(" + g() + "," + g() + "," + g() + ")";
    };
});