// Ajoute un élément HTML dans le BODY
function add_element_to_body(element)
{
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(element);
}

// Affiche les informations
var show = function show_infos()
{
	// Cache le bouton
	document.getElementById("reduce_div").style.display = "none";

	// Créé une zone d'affichage
	var div = document.createElement("div");
	div.id = "infos_div";

	// Récupère les informations voulues
	nb_div = document.getElementsByTagName("div").length;
	nb_span = document.getElementsByTagName("span").length;
	nb_img = document.getElementsByTagName("img").length;

	// Insère les informations
	div.innerHTML = "Infos<br />Div : "+nb_div+"<br />Span : "+nb_span+"<br />Img : "+nb_img;
	add_element_to_body(div);
}

// Affiche le bouton
function show_maximise_button()
{
	// Créé un zone d'affichage
	var div = document.createElement("div");
	div.id = "reduce_div";

	// Insertion des éléments dans cette zone
	var button = document.createElement("button");
	button.id = "maximise_button";
	button.addEventListener("click", show);

	var title = document.createTextNode('+');
	button.appendChild(title);

	div.appendChild(button);
	add_element_to_body(div);
}

// Initialise l'affichage
show_maximise_button();