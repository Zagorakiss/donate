// ALTERNATIVE PRELOADER SCRIPT ------------------------------------------

// <script>
//     $(window).load(function () {  
//       $('#preloader').fadeOut('slow',function(){$(this).remove();});
//       replaceWithPaths($('svg'));
//       startSVGAnimation($('svg'));
//     });
//     </script>

// ALTERNATIVE PRELOADER SCRIPT END --------------------------------------








// HEADER ---------------------------------------------------


$(function() { 
  // Replay button
  $('p.name').on('click', function(e) {
    e.preventDefault();
    setTimeout(function() {
      drawSVGPaths('svg', 1000, 2000, 50);
      $('p.name').blur();
    }, 300);
  });
});




jQuery.extend( jQuery.easing,
{
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
  }
});




function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function replaceRectsWithPaths(parentElement) {

    var rects = $(parentElement).find('rect');

    $.each(rects, function() {

        var rectX = $(this).attr('x');
        var rectY = $(this).attr('y');

        var rectX2 = parseFloat(rectX) + parseFloat($(this).attr('width'));
        var rectY2 = parseFloat(rectY) + parseFloat($(this).attr('height'));

        var convertedPath = 'M' + rectX + ',' + rectY + ' ' + rectX2 + ',' + rectY + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX + ',' + rectY2 + ' ' + rectX + ',' + rectY;


        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .attr('stroke-linecap', $(this).attr('stroke-linecap'))
        .insertAfter(this);

    });

    $(rects).remove();
}



function replaceLinesWithPaths(parentElement) {


    var lines = $(parentElement).find('line');

    $.each(lines, function() {

        var lineX1 = $(this).attr('x1');
        var lineY1 = $(this).attr('y1');

        var lineX2 = $(this).attr('x2');
        var lineY2 = $(this).attr('y2');

        var convertedPath = 'M' + lineX1 + ',' + lineY1 + ' ' + lineX2 + ',' + lineY2;


        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .attr('stroke-linecap', $(this).attr('stroke-linecap'))
        .insertAfter(this);

    });

    $(lines).remove();
}



function replaceCirclesWithPaths(parentElement) {

    var circles = $(parentElement).find('circle');

    $.each(circles, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var r = $(this).attr('r');
        var r2 = parseFloat(r * 2);

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-r) + ', 0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + r2 + ',0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + (-r2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .attr('stroke-linecap', $(this).attr('stroke-linecap'))
        .insertAfter(this);

    });

    $(circles).remove();
}


function replaceEllipsesWithPaths(parentElement) {


    var ellipses = $(parentElement).find('ellipse');

    $.each(ellipses, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var rX = $(this).attr('rx');
        var rY = $(this).attr('ry');

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-rX) + ', 0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + rX*2 + ',0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + (-rX*2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .attr('stroke-linecap', $(this).attr('stroke-linecap'))
        .insertAfter(this);

    });

    $(ellipses).remove();
}


function replacePolygonsWithPaths(parentElement) {

    var polygons = $(parentElement).find('polygon');

    $.each(polygons, function() {

        var points = $(this).attr('points');
        var polyPoints = points.split(/[ ,]+/);
        var endPoint = polyPoints[0] + ', ' + polyPoints[1];

        $(SVG('path'))
        .attr('d', 'M' + points + ' ' + endPoint)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .attr('stroke-linecap', $(this).attr('stroke-linecap'))
        .insertAfter(this);

    });

    $(polygons).remove();
}


function replacePolylinesWithPaths(parentElement) {


    var polylines = $(parentElement).find('polyline');

    $.each(polylines, function() {

        var points = $(this).attr('points');

        $(SVG('path'))
        .attr('d', 'M' + points)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .attr('stroke-linecap', $(this).attr('stroke-linecap'))
        .insertAfter(this);

    });

    $(polylines).remove();
}

function hideSVGPaths(parentElement) {

    var paths = $(parentElement).find('path');

    //for each PATH..
    $.each( paths, function() {

        //get the total length
        var totalLength = this.getTotalLength();

        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });
    });
}

function drawSVGPaths(_parentElement, _timeMin, _timeMax, _timeDelay) {


    var paths = $(_parentElement).find('path');

    //for each PATH..
    $.each( paths, function(i) {

        //get the total length
        var totalLength = this.getTotalLength();


        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });

        //animate
        $(this).delay(_timeDelay*i).animate({
            'stroke-dashoffset': 0
        }, {
            duration: Math.floor(Math.random() * _timeMax) + _timeMin
            ,easing: 'easeInOutQuad'
        });
    });
}

function replaceWithPaths(parentElement) {

    replaceRectsWithPaths(parentElement);
    replaceLinesWithPaths(parentElement);
    replaceEllipsesWithPaths(parentElement);
    replaceCirclesWithPaths(parentElement);
    replacePolygonsWithPaths(parentElement);
    replacePolylinesWithPaths(parentElement);    
}

function startSVGAnimation(parentElement) {
    drawSVGPaths(parentElement, 1000, 2000, 50);
}

replaceWithPaths($('svg'));
startSVGAnimation($('svg'));

// HEADER END ------------------------------------------------









// NAV -----------------------------------------------------------

(function() {
  
  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var brand = document.querySelector('.menu__brand');
    var menuItems = document.querySelectorAll('.menu__item');
    
    var active = false;
    
    var toggleMenu = function() {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }
        
        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }
        
        active = false;
      }
    };
    
    var bindActions = function() {
      burger.addEventListener('click', toggleMenu, false);
      menu.addEventListener('click', toggleMenu, false);
    };
    
    var init = function() {
      bindActions();
    };
    
    return {
      init: init
    };
    
  }());
  
  Menu.init();
  
}());

// NAV END -----------------------------------------------------------














// TERMINAL ------------------------------------------------------------


$(document).ready(function() {
        "use strict";

        // UTILITY
        function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
        }
        // END UTILITY

        // COMMANDS
        function clear() {
                terminal.text("");
        }

        function help() {
                terminal.append("COMMANDS: clear, help, list, echo, fortune\n");
        }
  
        function list() {
                terminal.append("MY SKILLS: html5, css3, less, javascript (native, jQuery, APIs), svg \n- Frameworks: bootstrap, ink, lumx, mdl, materialize, material-ui \n- Others: npm, bower, gulp, postcss, font awesome, icomoon, git \n- Design: photoshop, illustrator \n");
        }
    
        function echo(args) {
                var str = args.join(" ");
                terminal.append(str + "\n");
        }

        function fortune() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
                xhr.send(null);

                if (xhr.status === 200) {
                        var fortunes = xhr.responseText.split("%");
                        var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
                        terminal.append(fortune + "\n");
                }
        }
        // END COMMANDS

        var title = $(".title");
        var terminal = $(".terminal");
        var prompt = "➜";
        var path = "~";

        var commandHistory = [];
        var historyIndex = 0;

        var command = "";
        var commands = [{
                        "name": "clear",
                        "function": clear
                }, {
                        "name": "help",
                        "function": help
                }, {
                        "name": "list",
                        "function": list
                }, {
                        "name": "fortune",
                        "function": fortune
                }, {
                        "name": "echo",
                        "function": echo
                }];

        var hintMessage = "Try 'help' or 'list'";

function processCommand() {
        var isValid = false;

        // Create args list by splitting the command
        // by space characters and then shift off the
        // actual command.

        var args = command.split(" ");
        var cmd = args[0];
        args.shift();

        // Iterate through the available commands to find a match.
        // Then call that command and pass in any arguments.
        for (var i = 0; i < commands.length; i++) {
                if (cmd === commands[i].name) {
                        commands[i].function(args);
                        isValid = true;
                        break;
                }
        }

        // No match was found...
        if (!isValid) {
                terminal.append("zsh: command not found: " + command + "\n");
        }

        // Add to command history and clean up.
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        command = "";
}

function displayPrompt() {
        terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
        terminal.append("<span class=\"path\">" + path + "</span> ");
}

// Delete n number of characters from the end of our output
function erase(n) {
        command = command.slice(0, -n);
        terminal.html(terminal.html().slice(0, -n));
}

function clearCommand() {
        if (command.length > 0) {
                erase(command.length);
        }
}

function appendCommand(str) {
        terminal.append(str);
        command += str;
}

/*
    //  Keypress doesn't catch special keys,
    //  so we catch the backspace here and
    //  prevent it from navigating to the previous
    //  page. We also handle arrow keys for command history.
    */

$(document).keydown(function(e) {
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // BACKSPACE
        if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
                if (command !== "") {
                        erase(1);
                }
        }

        // UP or DOWN
        if (keyCode === 38 || keyCode === 40) {
                // Move up or down the history
                if (keyCode === 38) {
                        // UP
                        historyIndex--;
                        if (historyIndex < 0) {
                                historyIndex++;
                        }
                } else if (keyCode === 40) {
                        // DOWN
                        historyIndex++;
                        if (historyIndex > commandHistory.length - 1) {
                                historyIndex--;
                        }
                }

                // Get command
                var cmd = commandHistory[historyIndex];
                if (cmd !== undefined) {
                        clearCommand();
                        appendCommand(cmd);
                }
        }
});

$(document).keypress(function(e) {
        // Make sure we get the right event
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // Which key was pressed?
        switch (keyCode) {
                // ENTER
                case 13:
                        {
                                terminal.append("\n");

                                processCommand();
                                displayPrompt();
                                break;
                        }
                default:
                        {
                                appendCommand(String.fromCharCode(keyCode));
                        }
        }
});

// Set the window title
title.text("urname@dvmrt: ~");

// Get the date for our fake last-login
var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and promt
terminal.append("Last login: " + date + "\n" + hintMessage + "\n"); displayPrompt();
});

// TERMINAL END -------------------------------------------------------------------









// FORM ---------------------------------------------------------------------------

// in the body and stepform.js

// FORM END ------------------------------------------------------------------------








// FOOTER ---------------------------------------------------------------------------

$(function() { 
  // Replay button
  $('div.logo').on('click', function(e) {
    e.preventDefault();
    setTimeout(function() {
      drawSVGPaths('svg', 1000, 2000, 50);
      $('div.logo').blur();
    }, 300);
  });
});

// FOOTER END ---------------------------------------------------------------------------