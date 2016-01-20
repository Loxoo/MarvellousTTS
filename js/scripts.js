function simplifier_affichage_load() {
  chrome.tabs.executeScript({
    file: 'js/simplifier_affichage_load.js'
  }); 
}
document.getElementById('simp_affi_load').addEventListener('click', simplifier_affichage_load);

function simplifier_affichage_unload() {
  chrome.tabs.executeScript({
    file: 'js/simplifier_affichage_unload.js'
  }); 
}
document.getElementById('simp_affi_unload').addEventListener('click', simplifier_affichage_unload);

/////////////

function supprimer_images_load() {
  chrome.tabs.executeScript({
    file: 'js/supprimer_images_load.js'
  }); 
}
document.getElementById('supp_images_load').addEventListener('click', supprimer_images_load);

function supprimer_images_unload() {
  chrome.tabs.executeScript({
    file: 'js/supprimer_images_unload.js'
  }); 
}
document.getElementById('supp_images_unload').addEventListener('click', supprimer_images_unload);

/////////////

function unifier_police_load() {
  chrome.tabs.executeScript({
    file: 'js/unifier_police_load.js'
  }); 
}
document.getElementById('unif_police_load').addEventListener('click', unifier_police_load);

function unifier_police_unload() {
  chrome.tabs.executeScript({
    file: 'js/unifier_police_unload.js'
  }); 
}
document.getElementById('unif_police_unload').addEventListener('click', unifier_police_unload);