// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var site;
var key1;
var key2;

function setRadio(name, value) {
  var radios = document.querySelectorAll('input[name="' + name + '"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = (radios[i].value == value);
    radios[i].disabled = !getEnabled();
  }
}

function update() {
  document.body.className = getEnabled() ? '' : 'disabled';

  if (getEnabled()) {
    $('title').innerText = chrome.i18n.getMessage('highcontrast_enabled');
    $('toggle').innerHTML =
        '<b>' + chrome.i18n.getMessage('highcontrast_disable') + '</b><br>' +
        '<span class="kb">(' + key1 + ')</span>';
    $('subcontrols').style.display = 'block';
  } else {
    $('title').innerText = chrome.i18n.getMessage('highcontrast_disabled');
    $('toggle').innerHTML =
        '<b>' + chrome.i18n.getMessage('highcontrast_enable') + '</b><br>' +
        '<span class="kb">(' + key1 + ')</span>';
    $('subcontrols').style.display = 'none';
  }

  setRadio('keyaction', getKeyAction());
  if (site) {
    setRadio('scheme', getSiteScheme(site));
    $('make_default').disabled = (getSiteScheme(site) == getDefaultScheme());
  } else {
    setRadio('scheme', getDefaultScheme());
  }
  if (getEnabled()) {
    document.documentElement.setAttribute(
        'hc',
        site ? 'a' + getSiteScheme(site) : 'a' + getDefaultScheme());
  } else {
    document.documentElement.setAttribute('hc', 'a0');
  }
  chrome.extension.getBackgroundPage().updateTabs();
}

function onToggle() {
  setEnabled(!getEnabled());
  update();
}

function onForget() {
  resetSiteSchemes();
  update();
}

function onRadioChange(name, value) {
  switch (name) {
    case 'keyaction':
      setKeyAction(value);
      break;
    case 'apply':
      setApply(value);
      break;
    case 'scheme':
      if (site) {
        setSiteScheme(site, value);
      } else {
        setDefaultScheme(value);
      }
      break;
  }
  update();
}

function onMakeDefault() {
  setDefaultScheme(getSiteScheme(site));
  update();
}

function addRadioListeners(name) {
  var radios = document.querySelectorAll('input[name="' + name + '"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function(evt) {
      onRadioChange(evt.target.name, evt.target.value);
    }, false);
    radios[i].addEventListener('click', function(evt) {
      onRadioChange(evt.target.name, evt.target.value);
    }, false);
  }
}

function init() {
  var i18nElements = document.querySelectorAll('*[i18n-content]');
  for (var i = 0; i < i18nElements.length; i++) {
    var elem = i18nElements[i];
    var msg = elem.getAttribute('i18n-content');
    elem.innerHTML = chrome.i18n.getMessage(msg);
  }

  addRadioListeners('keyaction');
  addRadioListeners('apply');
  addRadioListeners('scheme');
  $('toggle').addEventListener('click', onToggle, false);
  $('make_default').addEventListener('click', onMakeDefault, false);
  $('forget').addEventListener('click', onForget, false);
  if (navigator.appVersion.indexOf('Mac') != -1) {
    key1 = '&#x2318;+Shift+F11';
    key2 = '&#x2318;+Shift+F12';
  } else {
    key1 = 'Shift+F11';
    key2 = 'Shift+F12';
  }

  chrome.windows.getLastFocused({'populate': true}, function(window) {
    for (var i = 0; i < window.tabs.length; i++) {
      var tab = window.tabs[i];
      if (tab.active) {
        if (isDisallowedUrl(tab.url)) {
          $('scheme_title').innerText =
              chrome.i18n.getMessage('highcontrast_default');
          $('make_default').style.display = 'none';
        } else {
          site = siteFromUrl(tab.url);
          $('scheme_title').innerHTML =
              chrome.i18n.getMessage('highcontrast_',
                  '<b>' + site + '</b>:<br>' +
                  '<span class="kb">(' + key2 + ')</span>');
          $('make_default').style.display = 'block';
        }
        update();
        return;
      }
    }
    site = 'unknown site';
    update();
  });
}

window.addEventListener('load', init, false);

/*
 
 * This file contains code that displays Grafical User Interface
 *
	var prevstate = 0,
		status = 'play',
		bg = chrome.extension.getBackgroundPage(), // get background page
		button = document.getElementById('button'),
		reload = document.getElementById('reload'),
		canvas = document.getElementById('volume'),
		error = document.getElementById('error'),
		logo = document.getElementById('logo'),
		replaybtn = document.getElementById("replay"),
		play = document.getElementById("play"),
		options = JSON.parse(localStorage.getItem("options"));

----------------------------------------------------------------------------
*/
	canvas.addEventListener('click', function() // Volume adjustment
	{
		volume = calculateVolume(event.clientX,event.clientY);
		drawVolume(volume);
	    bg.setVolume(parseFloat(volume));
	}, false);

	play.addEventListener('click', function() // Audio state
	{
		bg.resumeAudio();	
	}, false);
	
	replaybtn.addEventListener('click', function() // Audio state
	{
		bg.replayAudio();
	}, false);

	reload.addEventListener('click', function() // Audio state
	{
		bg.reload();
		window.close();
	}, false);

	button.addEventListener('click', function() // Audio state
	{
		if(status == 'playing')
		{
			bg.pauseAudio();
			status = 'paused';
		}
		else
		{
			status = 'playing';
		}
		onClick(status);
	}, false);
	
	error.addEventListener('click', function()
	{
		// goes to Google TTS API and check if human confirmation is required 
		chrome.tabs.create({url: 'http://goo.gl/OOVgp'});
	}, false);
	

	
/*
 * -----------------------------------------------------------------------------
 * Manipulating onClick button event
 * -----------------------------------------------------------------------------
*/
function onClick(state) 
{
	var zen = document.getElementById("zen");
	var circle = document.getElementById("circle");
	var playbtn = document.getElementById("play");
	
	if(state == 'replay')
	{
		replaybtn.style.display = "block";
		playbtn.style.display = "none";
		circle.className = "circle rotate";
		zen.className = "replay";
	}
	else
	{
		playbtn.style.display = "block";
		replaybtn.style.display = "none";

		if(state == "playing" )
		{
			circle.className = "circle rotate";
			zen.className = "play";
		}
		else 
		{
			circle.className = "circle"
			zen.className = "";
		}
	}

	status = state;
	bg.log('State: '+state);
};

/*
 * -----------------------------------------------------------------------------
 * Functions for controlling audio
 * -----------------------------------------------------------------------------
*/
function displayProgress(seconds) 
{
	prevstate++;
	progress.style['-webkit-transition-duration'] = seconds+'s';
	deg = 360*prevstate;
	progress.style.webkitTransform = "rotate("+deg+"deg)";
}

/*
 * -----------------------------------------------------------------------------
 * Show error information
 * -----------------------------------------------------------------------------
*/
function showError()
{
	error.innerHTML = chrome.i18n.getMessage('lang_error');
	error.style.display = "block";
}

/*
 * -----------------------------------------------------------------------------
 * Recieve audio state 
 * -----------------------------------------------------------------------------
*/
function sendState(state)
{
	onClick(state);
}

/*
 * -----------------------------------------------------------------------------
 * Draw volume level in canvas element
 * -----------------------------------------------------------------------------
*/
function drawVolume(volume)
{
	var radius = 63;
	canvas.width = canvas.width; // clear canvas and preppare for new drawing
	var context = canvas.getContext('2d');
	var canvas_size = [canvas.width, canvas.height];
	var center = [canvas_size[0]/2, canvas_size[1]/2];
	
	
	
	context.arc // draw volume
	(  
		center[0],
		center[1],
		radius,
		0, // 0 sets set the start to be top
		Math.PI * (2 * (volume)),
		false
    );

   
    var rad = context.createRadialGradient(center[0], center[1], 50, center[0], center[1], 50);
    rad.addColorStop(0, '#CC7200');
    rad.addColorStop(1, '#FFAF22');
    
	context.lineWidth   = 8;
	context.strokeStyle = '#FF8F00';
	context.stroke();
}

/*
 * -----------------------------------------------------------------------------
 * Calculating aduio volume by point coordinates selected by user
 * -----------------------------------------------------------------------------
*/
function calculateVolume(x,y)
{
	x = x-(window.innerWidth/2);
	y = (y-75)*-1;
	
	radius = Math.sqrt((x*x )+(y*y));
	
	if(x > 0 && y >= 0) // detecting angle quadrand
	{
		angle = Math.asin(Math.abs(y)/radius)*(180/Math.PI);		
	}
	else if(x < 0 && y >= 0)
	{
		angle = 180-(Math.asin(Math.abs(y)/radius)*(180/Math.PI));		
	}
	else if(x <= 0 && y < 0)
	{
		angle = 180+(Math.asin(Math.abs(y)/radius)*(180/Math.PI));
	}
	else
	{
		angle = 360-(Math.asin(Math.abs(y)/radius)*(180/Math.PI));
	}
	volume = 1-(angle/360);

	return volume;
}

/*
 * -----------------------------------------------------------------------------
 * Display donations button if it's not disabled from options
 * -----------------------------------------------------------------------------
*/
function showLogo()
{
	if(options.logo)
	{
		logo.style.display = "block";		
	}
}

/*
 * -----------------------------------------------------------------------------
 * Initalization on main and background functions
 * -----------------------------------------------------------------------------
*/
	showLogo();
	bg.getSelection(); // invoke SpeakIt main function
	sendState(bg.getState());
	drawVolume(options.volume);